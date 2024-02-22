"use client";

import { CartItemSkeletons } from "@/components";
import { Size } from "@/seed/seed";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
	products: {
		slug: string;
		size: Size;
		images: string;
		title: string;
		price: number;
    quantity: number;
	}[];
}

export const ProductsInCart = ({products}: Props) => {
	// 

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<>
			{loading ? (
				<div className="w-full">
					{[1, 2, 3, 4].map((item) => (
						<CartItemSkeletons key={item} />
					))}
				</div>
			) : (
				<>
					{products.map((product) => (
						<div
							key={product.slug + "-" + product.size}
							className="flex gap-2 mb-4"
						>
							<Image
								width={100}
								height={100}
								src={`/products/${product.images}`}
								alt={product.title}
								className="rounded"
							/>
							<div>
								<div className="text-sm flex flex-col">
									<span className="hover:underline">
										{product.size}-{product.title} ({product.quantity})
									</span>
									<span className="font-bold">
										{currencyFormat(product.price * product.quantity)}
									</span>
								</div>
							</div>
						</div>
					))}
				</>
			)}
		</>
	);
};
