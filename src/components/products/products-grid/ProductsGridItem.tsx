"use client";

import { Product } from "@/interfaces/product.interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
	product: Product;
}

export const ProductsGridItem = ({ product }: Props) => {
	const { images, title, price, slug } = product;

	const [imageDisplay, setImageDisplay] = useState(images[0]);

	return (
		<div>
			<Link href={`/product/${slug}`}>
				<Image
					src={`/products/${imageDisplay}`}
					alt={title}
					width={500}
					height={500}
					className="w-full object-cover rounded-md"
					onMouseEnter={() => setImageDisplay(images[1])}
					onMouseLeave={() => setImageDisplay(images[0])}
				/>
			</Link>

			<div className="p-4">
				<Link className="hover:text-blue-700" href={`/product/${slug}`}>
					<p>{title}</p>
				</Link>
				<div className="font-bold text-sm">${price}</div>
			</div>
		</div>
	);
};
