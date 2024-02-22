"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product } from "@/interfaces/product.interface";
import { Size } from "@/seed/seed";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
	product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const  {addProductToCart } = useCartStore()

	const [size, setSize] = useState<Size | undefined>();
	const [quantity, setQuantity] = useState(1);

	const [posted, setPosted] = useState(false);

	const addToCart = () => {
		setPosted(true);
		if (!size) return;

    
    const productInCart : CartProduct = {
      id: product.id,
      images: product.images[0],
      quantity,
      price: product.price,
      size,
      slug: product.slug,
      title: product.title
    } 

    addProductToCart(productInCart)

    setPosted(false)
    setQuantity(1)
    setSize(undefined)
	};

	return (
		<>
			{posted && !size && (
				<p className="text-rose-500 font-bold my-2 text-sm">
					Debes de seleccionar una Talla*
				</p>
			)}
			<SizeSelector
				availibleSizes={product.sizes}
				sizeSelected={size}
				onSizeChanged={setSize}
			/>

			<div className="mt-8"></div>

			<QuantitySelector
				quantity={quantity}
				onQuantityChange={(val) => setQuantity((old) => old + val)}
			/>

			<button onClick={addToCart} className="btn-primary mt-6">
				Agregar al carrito
			</button>
		</>
	);
};
