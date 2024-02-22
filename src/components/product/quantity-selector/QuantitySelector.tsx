"use client";
import clsx from "clsx";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
	quantity: number;
	removeLabel?: boolean;
  onQuantityChange: (val : number)=> void;
}
export const QuantitySelector = ({ quantity, removeLabel = false,onQuantityChange }: Props) => {
	

	const changeQuantity = (val: number) => {
    if(quantity + val <=0) return
		onQuantityChange(val)
	};

	return (
		<div>
			{!removeLabel && <p className="font-bold text-sm">Cantidad</p>}

			<div className="mt-4 flex items-center gap-2">
				<button
					onClick={() => changeQuantity(-1)}
					disabled={quantity === 1}
					className={"disabled:text-gray-300 disabled:cursor-not-allowed"}
				>
					<IoRemoveCircleOutline size={30} />
				</button>
				<div className="px-6 py-1 bg-stone-200 rounded-sm">{quantity}</div>
				<button
					onClick={() => changeQuantity(1)}
					disabled={quantity === 5}
					className={"disabled:text-gray-300 disabled:cursor-not-allowed"}
				>
					<IoAddCircleOutline size={30} />
				</button>
			</div>
		</div>
	);
};
