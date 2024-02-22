"use client";

import { createOrUpdateProduct, deleteProductImage } from "@/actions";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Product,
	ProductCategort,
	ProductImage,
	ValidGenders,
	ValidSizes,
} from "@/interfaces";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoTrash } from "react-icons/io5";

interface Props {
	product: Partial<Product> & { ProductImage?: ProductImage[] };
	categories: ProductCategort[];
}

const sizes: ValidSizes[] = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormValues {
	description: string;
	// images: string[];
	inStock: number;
	price: number;
	sizes: ValidSizes[];
	slug: string;
	tags: string;
	title: string;
	gender: ValidGenders;
	categoryId: string;
	images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
	const {
		handleSubmit,
		register,
		formState: { isValid },
		getValues,
		setValue,
		watch,
	} = useForm<FormValues>({
		defaultValues: {
			...product,
			tags: product.tags?.join(", "),
			images: undefined,
		},
	});

	watch("sizes");

	const router = useRouter();

  const [isSubminting, setIsSubminting] = useState(false)

	const onchangedSizes = (size: ValidSizes) => {
		const sizesCurrent = new Set(getValues("sizes"));

		sizesCurrent.has(size) ? sizesCurrent.delete(size) : sizesCurrent.add(size);

		setValue("sizes", Array.from(sizesCurrent));
	};

	const onSubmit = async (data: FormValues) => {

    setIsSubminting(true)
		const formData = new FormData();

		const { images, ...productToSave } = data;

		if (product.id) {
			formData.append("id", product.id ?? "");
		}

		formData.append("title", productToSave.title);
		formData.append("slug", productToSave.slug);
		formData.append("description", productToSave.description);
		formData.append("price", productToSave.price.toString());
		formData.append("inStock", productToSave.inStock.toString());
		formData.append("sizes", productToSave.sizes.toString());
		formData.append("tags", productToSave.tags);
		formData.append("categoryId", productToSave.categoryId);
		formData.append("gender", productToSave.gender);

		if (images) {
			for (let i = 0; i < images.length; i++) {
				formData.append("images", images[i]);
			}
		}

		const { ok, product: productUpdated } = await createOrUpdateProduct(
			formData
		);

    setIsSubminting(false)

		if (!ok) {
			alert("No se pudo actualizar el producto ");
			return;
		}

		router.replace(`/admin/products/${productUpdated!.slug}`);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
			>
				{/* Textos */}
				<div className="w-full">
					<div className="flex flex-col mb-2">
						<span>Título</span>
						<input
							type="text"
							className="p-2 border rounded-md bg-gray-200"
							{...register("title", { required: true })}
						/>
					</div>
					<div className="flex flex-col mb-2">
						<span>Slug</span>
						<input
							type="text"
							className="p-2 border rounded-md bg-gray-200"
							{...register("slug", { required: true })}
						/>
					</div>
					<div className="flex flex-col mb-2">
						<span>Descripción</span>
						<textarea
							rows={5}
							className="p-2 border rounded-md bg-gray-200"
							{...register("description", { required: true })}
						></textarea>
					</div>
					<div className="flex flex-col mb-2">
						<span>Price</span>
						<input
							type="number"
							className="p-2 border rounded-md bg-gray-200"
							{...register("price", { required: true, min: 0 })}
						/>
					</div>
					<div className="flex flex-col mb-2">
						<span>Tags</span>
						<input
							type="text"
							className="p-2 border rounded-md bg-gray-200"
							{...register("tags", { required: true })}
						/>
					</div>
					<div className="flex flex-col mb-2">
						<span>Gender</span>
						<select
							className="p-2 border rounded-md bg-gray-200"
							{...register("gender", { required: true })}
						>
							<option value="">[Seleccione]</option>
							<option value="men">Men</option>
							<option value="women">Women</option>
							<option value="kid">Kid</option>
							<option value="unisex">Unisex</option>
						</select>
					</div>
					<div className="flex flex-col mb-2">
						<span>Categoria</span>
						<select
							className="p-2 border rounded-md bg-gray-200"
							{...register("categoryId", { required: true })}
						>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<button className="btn-primary w-full">Guardar</button>
				</div>
				{/* Selector de tallas y fotos */}
				<div className="w-full">
					{/* As checkboxes */}
					<div className="flex flex-col">
						<div className="flex flex-col mb-2">
							<span>Inventario</span>
							<input
								type="number"
								className="p-2 border rounded-md bg-gray-200"
								{...register("inStock", { required: true, min: 0 })}
							/>
						</div>
						<span>Tallas</span>
						<div className="flex flex-wrap">
							{sizes.map((size) => (
								// bg-blue-500 text-white <--- si está seleccionado
								<div
									key={size}
									onClick={() => onchangedSizes(size)}
									className={clsx(
										"flex  items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer ",
										{
											"bg-blue-500 text-white":
												getValues("sizes")?.includes(size),
										}
									)}
								>
									<span>{size}</span>
								</div>
							))}
						</div>
						<div className="flex flex-col mb-2">
							<span>Fotos</span>
							<input
								type="file"
								{...register("images")}
								multiple
								className="p-2 border rounded-md bg-gray-200"
								accept="image/png, image/jpeg, image/avif"
							/>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
							{product.ProductImage?.map((image) => (
								<div className="relative h-[160px] overflow-hidden" key={image.id}>
									<button
										type="button"
										onClick={() => {
											console.log(image.id);
                      deleteProductImage(image.id, image.url)
										}}
										className="rounded-full btn-danger absolute right-0 !p-2"
									>
										<IoTrash />
									</button>
									<Image
										alt={product.title ?? "new"}
										src={image.url}
										width={160}
										height={160}
										className="rounded object-cover w-full h-full"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</form>
			<Dialog modal={true} open={isSubminting}>
				<DialogOverlay />
			</Dialog>
		</>
	);
};
