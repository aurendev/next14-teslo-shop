import { ProductsInCart, QuantitySelector, Title } from "@/components";
import Link from "next/link";
import { OrderSummaryFull } from "./ui/OrderSummaryFull";
import { Items } from "./ui/Items";



export default function CheckoutPage() {
	return (
		<div className="flex justify-center items-center  ">
			<div>
				<Title title="Verificar order" />
				<main className="w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<section>
						<div className="flex flex-col mb-16">
							<span className="text-sm">Ajustar elementos</span>
							<Link href={"/cart"} className="underline text-xs">
								Editar carrito
							</Link>
						</div>

						<Items />
					</section>

					<OrderSummaryFull />
				</main>
			</div>
		</div>
	);
}
