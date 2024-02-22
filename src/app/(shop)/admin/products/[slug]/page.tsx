import { Title } from "@/components";
import { ProductForm } from "../ui/ProductForm";
import { getCategories, getProductBySlug } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
	params: {
		slug: string;
	};
}

export default async function PrductBySlugPage({ params }: Props) {
	const { slug } = params;

	const title = slug === "new" ? "Nuevo Producto" : "Editar Producto";

	const [product, categories] = await Promise.all([
		getProductBySlug(slug),
		getCategories(),
	]);

	if (!product && slug !== 'new') redirect("/admin/products");

	return (
		<div>
			<Title title={title} />
			<ProductForm product={product ?? {}} categories={categories} />
		</div>
	);
}
