"use client";

import { getStockCountBySlug } from "@/actions/products/get-stock-count-by-slug";
import { titleFont } from "@/config/fonts";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
	slug: string;
}

export const InStockLabel = ({ slug }: Props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [stock, setStock] = useState(0);

	useEffect(() => {
    const getStockCount = async () => {
      const count = await getStockCountBySlug(slug);
      setIsLoading(false);
      setStock(count ?? 0);
    };
		getStockCount();
	}, [slug]);

	

	return (
		<>
			{isLoading ? (
				<h1 className="animate-pulse  bg-gray-300 rounded w-4/12">&nbsp;</h1>
			) : (
				<h1 className={clsx([titleFont.className, "font-bold"])}>
					Stock : {stock}
				</h1>
			)}
		</>
	);
};
