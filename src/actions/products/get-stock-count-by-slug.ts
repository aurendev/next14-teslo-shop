'use server'

import prisma from "@/lib/prisma"


export const getStockCountBySlug =  async (slug : string) => {

  try {
    
    const product = await prisma.product.findFirst({
      where: {
        slug
      },
      select:{
        inStock : true
      }
    })

    return product?.inStock

  } catch (error) {
    console.log(error)
  }

}