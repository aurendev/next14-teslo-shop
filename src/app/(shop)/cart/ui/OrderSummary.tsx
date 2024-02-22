"use client";

import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
	const [isLoading, setIsLoading] = useState(true);

	const summary = useCartStore(state => state.orderSummary());

	const { subTotal, tax, total, totalProducts } = summary;

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<>
			{isLoading ? (
				<>
					<div className="text-sm flex justify-between items-center mb-4">
						<Skeleton className="rounded-md" />
					</div>
					<div className="text-sm flex justify-between items-center mb-4">
						<Skeleton className="rounded-md" />
					</div>
					<div className="text-sm flex justify-between items-center mb-4">
						<Skeleton className="rounded-md" />
					</div>
					<div className="text-xl font-semibold flex justify-between items-center mb-4">
						<Skeleton className="rounded-md" />
					</div>
				</>
			) : (
				<>
					<div className="text-sm flex justify-between items-center mb-4">
						<span>No. Productos</span>
						<span>
							{totalProducts > 1 ? `${totalProducts} articulos` : " 1 articulo"}{" "}
						</span>
					</div>
					<div className="text-sm flex justify-between items-center mb-4">
						<span>SubTotal</span>
						<span> {currencyFormat(subTotal)}</span>
					</div>
					<div className="text-sm flex justify-between items-center mb-4">
						<span>Impuestos(15%)</span>
						<span> {currencyFormat(tax)}</span>
					</div>
					<div className="text-xl font-semibold flex justify-between items-center mb-4">
						<span>Total</span>
						<span> {currencyFormat(total)}</span>
					</div>
				</>
			)}
		</>
	);
};
