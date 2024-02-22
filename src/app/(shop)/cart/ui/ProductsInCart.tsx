"use client";

import { CartItemSkeletons, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
	const productsIncart = useCartStore((state) => state.cart);

  const [loading, setLoading] = useState(true)

  const {updateProductQuantity, removeProduct } = useCartStore()

  useEffect(() => {
    setLoading(false)
  }, [])
  

	return (
		<>
    {
      loading ? (
        <div className="w-full">
          {[1,2,3,4].map(item => (
            <CartItemSkeletons key={item} />
          ))}
        </div>
      )
      :
      (
        <>
          {productsIncart.map((product) => (
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
							<Link className="hover:underline" href={`/product/${product.slug}`}>
								{product.size}-{product.title}
							</Link>
							<span>${product.price}</span>
						</div>
						<QuantitySelector
							removeLabel
							quantity={product.quantity}
							onQuantityChange={(val) => updateProductQuantity(product,val) }
						/>
						<button onClick={()=> removeProduct(product)} className="underline text-sm">Remover</button>
					</div>
				</div>
			))}
        </>
      )
    }
			
		</>
	);
};
