"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import { pages } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
	totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Si el usuario no  manda caracter en el parametro  'page'
	if (isNaN(Number(searchParams.get("page")))) redirect(pathname);

	const currentPage =
		(Number(searchParams.get("page")) === 0
			? 1
			: Number(searchParams.get("page"))) ?? 1;

	const allPages = generatePaginationNumbers(currentPage, totalPages);

	const createPageUrl = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);

		console.log("CurrentPage ", currentPage);

		if (pageNumber === "...") {
			return `${pathname}?${params.toString()}`;
		}

		if (+pageNumber <= 0) {
			return `${pathname}`;
		}

		if (+pageNumber > totalPages) {
			return `${pathname}?${params.toString()}`;
		}

		params.set("page", pageNumber.toString());

		return `${pathname}?${params.toString()}`;
	};

	return (
		<div className="flex justify-center mt-12">
			<nav aria-label="Page navigation example">
				<ul className="flex list-style-none">
					<li className="page-item">
						{currentPage <= 1 ? (
							<div className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 cursor-not-allowed  text-gray-400  focus:shadow-none rounded ">
								<IoChevronBackOutline size={20} />
							</div>
						) : (
							<Link
								className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none rounded"
								href={createPageUrl(currentPage - 1)}
								aria-disabled="true"
							>
								<IoChevronBackOutline size={20} />
							</Link>
						)}
					</li>

					{allPages.map((page) => (
						<li key={`${page} ${Date.now()}`} className="page-item">
							<Link
								className={clsx(
									"page-link relative block py-1.5 px-3 border-0  outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none rounded",
									{
										"bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md":
											page === currentPage,
									}
								)}
								href={createPageUrl(page)}
							>
								{page}
							</Link>
						</li>
					))}

					<li className="page-item">
						{currentPage + 1 > totalPages ? (
							<div className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 cursor-not-allowed  text-gray-400  focus:shadow-none rounded ">
								<IoChevronForwardOutline size={20} />
							</div>
						) : (
							<Link
								className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 text-gray-800  focus:shadow-none rounded "
								href={createPageUrl(currentPage + 1)}
							>
								<IoChevronForwardOutline size={20} />
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
};
