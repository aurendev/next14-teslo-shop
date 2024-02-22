"use server";

import { ValidGenders } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface PaginationOption {
  page?: number;
  take?: number;
  gender?: ValidGenders;
}

export const getPaginatedProductsWithImages = async ({page =1,take =12, gender}:PaginationOption) => {
	try {

    if(isNaN(Number(page)) || page <1 ) page = 1

		const products = await prisma.product.findMany({
      take: take,
      skip: (page -1) * take ,
			include: {
				ProductImage: {
					take: 2,
					select: {
						url: true,
					},
				},
			},
      where:{
        gender: gender
      }
		});

    const totalCount = await prisma.product.count({
      where:{
        gender: gender
      }
    })

    const totalPages = Math.ceil(totalCount/take)


		return {
      currentPage: page,
      totalPages ,
			products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((img) => img.url),
      })),
		};
	} catch (error) {
    throw Error(`hubo un error ${error}`)
  }
};
