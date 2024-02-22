"use client";

import { placeOrder } from "@/actions";
import { OrderSummary } from "@/app/(shop)/cart/ui/OrderSummary";
import { useAddressStore, useCartStore } from "@/store";
import { sleep } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummaryFull = () => {
	const address = useAddressStore((state) => state.address);

	const cart = useCartStore((state) => state.cart);

  const {clearCart} = useCartStore(state=> state)

	const [isprecingOrder, setIsprecingOrder] = useState(false);
	const [errorsInOrder, seterrorsInOrder] = useState("");

  const router = useRouter()


	const onPlacingToOrder = async () => {
		setIsprecingOrder(true);

		const productsToOrder = cart.map((pro) => ({
			id: pro.id,
			quantity: pro.quantity,
			size: pro.size,
		}));


		const res = await placeOrder(productsToOrder, address);

		if (!res.ok) {
			setIsprecingOrder(false);
			seterrorsInOrder(res.message);
		}

    router.replace('/orders/'+res.order?.id)

    clearCart()



	};

  useEffect(() => {
    if(cart.length === 0){
      router.push('/cart')
    }
  }, [cart,router])

	return (
		<section className="rounded-xl shadow-xl p-7 bg-white">
			<h3 className="text-xl font-semibold mb-4">Direccion de entrega</h3>
			<p className="capitalize font-medium ">
				{address.firstName + " " + address.lastName}
			</p>
			<p className="capitalize text-sm">{address.address}</p>
			<p className="capitalize text-sm">{address.country}</p>
			<p className="capitalize text-sm">{address.city}</p>
			<p className="capitalize text-sm">{address.postalCode}</p>
			<p className="capitalize text-sm">{address.phone}</p>

			<div className="w-full bg-gray-200 h-0.5 my-4"></div>

			<OrderSummary />

			<p className="my-2 text-xs mb-4">
				Al hacer click en Colocar order aceptas nuestros
				<Link className="underline" href={"/"}>
					Terminos y condiciones
				</Link>{" "}
				y{" "}
				<Link className="underline" href={"/"}>
					Politicas de privaciodad
				</Link>{" "}
			</p>

			{errorsInOrder.length > 0 && (
				<p className="text-rose-500 font-semibold mb-4">Error al crear</p>
			)}

			{/* href={"/orders/12345"} */}

			<button
				onClick={onPlacingToOrder}
				className={clsx("block text-center w-full", {
					"btn-primary ": !isprecingOrder,
					"btn-primary-disabled ": isprecingOrder,
				})}
			>
				Checkout
			</button>
		</section>
	);
};
