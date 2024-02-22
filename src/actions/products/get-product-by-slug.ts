"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
	try {
		const product = await prisma.product.findFirst({
			where: { slug },
			include: {
				ProductImage: {
					select: { url: true, id: true },
				},
			},
		});

    if(!product) return null 

    return {
      ...product,
      images: product.ProductImage.map((img) => img.url),
    }

	} catch (error) {
		console.log();
		throw Error(`'Error al buscar un producto por Slug' ${error}`);
	}
};
