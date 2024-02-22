'use client'

import { ProductsInCart } from "@/components"
import { useCartStore } from "@/store";



export const Items = () => {

  const productsIncart = useCartStore((state) => state.cart);



  return (
    <ProductsInCart  products={productsIncart} /> 
  )
}
