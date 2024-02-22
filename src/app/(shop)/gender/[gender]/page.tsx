export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { Pagination, ProductsGrid, Title } from "@/components";
import { Category, initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
	params: {
		gender?: Category;
	};
	searchParams: {
		page?: string;
	};
}

export default async function GenderPage ({ params, searchParams }: Props) {
	const { gender } = params;

	const page = searchParams.page ? parseInt(searchParams.page) : 1;

	// if (type === "kid") notFound();

	const labels: Record<Category, string> = {
		men: "para hombres",
		women: "para mujeres",
		kid: "para kid",
		unisex: "para Todos",
	};

	const { products, totalPages } = await getPaginatedProductsWithImages({
		gender,
		page,
	});

	return (
		<div>
			<Title
				title={`Articulos  ${(labels as any)[gender!]}`}
				subTitle={"Todos los productos"}
			/>

			<ProductsGrid products={products} />

			<Pagination totalPages={totalPages} />
		</div>
	);
}
