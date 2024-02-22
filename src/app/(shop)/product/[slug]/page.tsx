export const revalidate = 604800; // 7 dias

import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import {
	InStockLabel,
	ProductMobileSliderShow,
	ProductSliderShow,
	QuantitySelector,
	SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import clsx from "clsx";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const slug = params.slug;

	// fetch data
	const product = await getProductBySlug(slug);

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || []

	return {
		title: product?.title ?? "Producto no encontrado",
		description: product?.description ?? "",
		openGraph: {
			title: product?.title ?? "Producto no encontrado",
			description: product?.description ?? "",
			// images: [], // https://misitioweb.com/products/image.png
			images: [`/products/${product?.images[1]}`],
		},
	};
}

export default async function ProductBySlugPage({ params }: Props) {
	const product = await getProductBySlug(params.slug);

	if (!product) notFound();

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{/* Carousel */}
			<div className="col-span-1 md:col-span-2 ">
				<ProductSliderShow
					className="hidden md:block"
					images={product.images}
					title={product.title}
				/>
				<ProductMobileSliderShow
					className="md:hidden"
					images={product.images}
					title={product.title}
				/>
			</div>

			{/* Detalles */}
			<div className="px-4 md:p-0">
				<InStockLabel slug={product.slug} />
				<h1 className={clsx([titleFont.className, "font-bold"])}>
					{product.title}
				</h1>
				<p className="mb-8">
					<b>$</b>
					{product.price}
				</p>

				<AddToCart product={product} />

				<div className="mt-4">
					<small className="font-bold capitalize">description</small>
					<p className="text-sm">{product.description}</p>
				</div>
			</div>
		</div>
	);
}
