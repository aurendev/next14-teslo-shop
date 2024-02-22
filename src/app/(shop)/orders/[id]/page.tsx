import { getOrderById } from "@/actions/orders/get-order-by-id";
import { OrderStatus, PaypalButton, ProductsInCart, Title } from "@/components";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { notFound, redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
	params: {
		id: string;
	};
}

export default async function OrderByIdPage({ params }: Props) {
	const res = await getOrderById(params.id);

	if (!res.ok) notFound();

	const { order } = res;

	const {
		OrderItem: orderItems,
		OrderAddress: orderAddress,
		subTotal,
		isPaid,
		tax,
		total,
		itemsInOrder,
	} = order!;

	const productsInOrder = orderItems.map((item) => ({
		slug: item.product.slug,
		size: item.size,
		images: item.product.ProductImage[0].url,
		title: item.product.title,
		price: item.product.price,
		quantity: item.quantity,
	}));

	console.log({ order });

	return (
		<div className="flex justify-center items-center  ">
			<div>
				<Title title={`order #${params.id}`} />
				<main className="w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<section>
						<OrderStatus isPaid={order!.isPaid} />

						<ProductsInCart products={productsInOrder ?? []} />
					</section>

					<section className="rounded-xl shadow-xl p-7 bg-white">
						<h3 className="text-xl font-semibold mb-4">Direccion de entrega</h3>
						<p className="capitalize font-medium ">
							{orderAddress?.firstName + " " + orderAddress?.lastName}
						</p>
						<p className="capitalize text-sm">{orderAddress?.address}</p>
						<p className="capitalize text-sm">{orderAddress?.country.name}</p>
						<p className="capitalize text-sm">{orderAddress?.city}</p>
						<p className="capitalize text-sm">{orderAddress?.postalCode}</p>
						<p className="capitalize text-sm">{orderAddress?.phone}</p>

						<div className="w-full bg-gray-200 h-0.5 my-4"></div>

						<h3 className="text-xl font-semibold mb-4">Resumen de Order</h3>
						<div className="text-sm flex justify-between items-center mb-4">
							<span>No. Productos</span>
							<span>
								{itemsInOrder > 1 ? `${itemsInOrder} articulos` : "1 articulo"}
							</span>
						</div>
						<div className="text-sm flex justify-between items-center mb-4">
							<span>SubTotal</span>
							<span>{currencyFormat(subTotal)}</span>
						</div>
						<div className="text-sm flex justify-between items-center mb-4">
							<span>Impuestos(15%)</span>
							<span>{currencyFormat(tax)}</span>
						</div>
						<div className="text-xl font-semibold flex justify-between items-center mb-4">
							<span>Total</span>
							<span>{currencyFormat(total)}</span>
						</div>

						{order!.isPaid ? (
							<OrderStatus isPaid={order!.isPaid} />
						) : (
							<PaypalButton amount={order!.total} orderId={order!.id} />
						)}
					</section>
				</main>
			</div>
		</div>
	);
}
