import {  Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";



export default function CartPage () {
	return (
		<div className="flex justify-center  h-[90vh] ">
			<div>
				<Title title="Carrito" />
				<main className="w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<section>
						<div className="flex flex-col mb-16">
							<span className="text-sm">Agregar mas Items</span>
							<Link href={"/"} className="underline text-xs">
								Continuar comprando
							</Link>
						</div>

						<div className="max-h-[500px] overflow-y-auto ">
              <ProductsInCart />
            </div>
					</section>

					<section className="rounded-xl shadow-xl p-7 bg-white h-fit ">
						<h3 className="text-xl font-semibold mb-4">Resumen de Order</h3>

						<OrderSummary />

            <Link href={'/checkout/address'} className="block text-center btn-primary w-full">Checkout</Link>
					</section>
				</main>
			</div>
		</div>
	);
}
