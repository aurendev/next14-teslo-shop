"use server";

import { auth } from "@/auth.config";
import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Size } from "@/seed/seed";

interface ProductToOrder {
	id: string;
	quantity: number;
	size: Size;
}

export const placeOrder = async (
	productsToOrder: ProductToOrder[],
	address: Address
) => {
	const session = await auth();

	const userId = session?.user.id;

	if (userId === undefined)
		return {
			ok: false,
			message: "NO se encontro al usuario en la session",
		};

	//Obtener la informacion delos productos.
	const products = await prisma.product.findMany({
		where: {
			id: {
				in: productsToOrder.map((p) => p.id),
			},
		},
	});

	// Calcular los montos // Encabezado
	const itemsInOrder = productsToOrder.reduce(
		(count, p) => count + p.quantity,
		0
	);

	//Los totales de tax, subtotal , y total
	const { subTotal, tax, total } = productsToOrder.reduce(
		(totals, item) => {
			const product = products.find((p) => p.id === item.id);

			if (!product) throw Error(`${item.id} no existe - 500`);

			const subTotal = product.price * item.quantity;

			totals.subTotal += subTotal;
			totals.tax += subTotal * 0.15;
			totals.total += subTotal * 1.15;

			return totals;
		},
		{ total: 0, subTotal: 0, tax: 0 }
	);

	// Crear la transaccion de la base de datos

	try {
		const prismaTx = await prisma.$transaction(async (tx) => {
			//1 . Actualizar el stock de los Productos
			const updatedProductsPromises = products.map((product) => {
				//  Acumular los valores
				const productQuantity = productsToOrder
					.filter((p) => p.id === product.id)
					.reduce((acc, item) => item.quantity + acc, 0);

				if (productQuantity === 0) {
					throw new Error(`${product.id} no tiene cantidad definida`);
				}

				return tx.product.update({
					where: { id: product.id },
					data: {
						// inStock: product.inStock - productQuantity // no hacer
						inStock: {
							decrement: productQuantity,
						},
					},
				});
			});

			const updatedProducts = await Promise.all(updatedProductsPromises);

			// Verificar valores negativos en las existencia = no hay stock
			updatedProducts.forEach((product) => {
				if (product.inStock < 0) {
					throw new Error(`${product.title} no tiene inventario suficiente`);
				}
			});

			// 2.Crear la orden -Encabezado -Detalles
			const order = await tx.order.create({
				data: {
					userId: userId!,
					itemsInOrder,
					subTotal,
					tax,
					total,

					OrderItem: {
						createMany: {
							data: productsToOrder.map((p) => ({
								quantity: p.quantity,
								size: p.size,
								productId: p.id,
								price:
									products.find((product) => product.id === p.id)?.price ?? 0,
							})),
						},
					},
				},
			});

			// 3. Crear la direccion de la orden
			const { country, ...restAddress } = address;
			const orderAddress = await tx.orderAddress.create({
				data: {
					...restAddress,

					orderId: order.id,
					countryId: country,
				},
			});

			console.log("successful");

			return {
				order,
				updatedProducts,
				orderAddress,
			};
		});

		return {
			ok: true,
			order: prismaTx.order,
			prismaTx: prismaTx,
		};
	} catch (error: any) {

    console.log({error})
		return {
			ok: false,
			message: error?.message,
		};
	}
};
