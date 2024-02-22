"use client";

import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store";
import { useSidebarStore } from "@/store/ui/sidebar/sidebarStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
	const { openSideMenu } = useSidebarStore((state) => state);

  const [isLoading, setIsLoading] = useState(false)



	const totalProducts = useCartStore((state) => state.totalProducts());

  useEffect(() => {
    setIsLoading(true)
  }, [])
  

	return (
		<nav className="p-4 flex justify-between items-center ">
			<Link href="/">
				<div>
					<span className={`${titleFont.className} font-bold`}>Teslo </span> |{" "}
					<span>Shop</span>
				</div>
			</Link>

			<div className=" hidden sm:flex items-center gap-4">
				<Link
					className="hover:bg-slate-100 hover:rounded-md transition-all px-4"
					href="/gender/men"
				>
					Hombres
				</Link>
				<Link
					className="hover:bg-slate-100 hover:rounded-md transition-all px-4"
					href="/gender/women"
				>
					Mujeres
				</Link>
				<Link
					className="hover:bg-slate-100 hover:rounded-md transition-all px-4"
					href="/gender/kid"
				>
					Kid
				</Link>
			</div>

			<div className="flex items-center gap-2 ">
				<Link href="/search">
					<IoSearchOutline size={22} />
				</Link>

				<Link href={
          totalProducts === 0 && isLoading? '/empty' : "/cart"
        }>
					<div className="relative">
						{isLoading && totalProducts > 0 && (
							<span className="absolute rounded-full bg-blue-600 text-white h-[16px]  w-[16px] text-xs flex justify-center items-center -right-1 -top-1 ">
								{totalProducts}
							</span>
						)}
						<IoCartOutline size={22} />
					</div>
				</Link>

				<div
					onClick={() => openSideMenu()}
					className="hover:bg-slate-100 hover:rounded-md transition-all px-2 cursor-pointer"
				>
					Menu
				</div>
			</div>
		</nav>
	);
};
