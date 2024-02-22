"use client";

import {
	IoCloseOutline,
	IoEnterOutline,
	IoExitOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
} from "react-icons/io5";
import { SidebarItem } from "./SidebarItem";
import clsx from "clsx";
import { useSidebarStore } from "@/store/ui/sidebar/sidebarStore";
import { logout } from "@/actions";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
	const isOpenMenu = useSidebarStore((state) => state.isSidemenuOpen);
	const { closeSideMenu } = useSidebarStore((state) => state);

	const { data: session } = useSession();

	const isAuth = !!session?.user;

	const isAdmin = session?.user.role === "admin";

	return (
		<div>
			{/* Background  */}
			{isOpenMenu && (
				<div
					onClick={() => closeSideMenu()}
					className="w-screen h-screen bg-gray-900/30 fixed top-0 left-0 backdrop-blur-sm z-10"
				></div>
			)}

			<nav
				className={clsx([
					{ "translate-x-full": !isOpenMenu },
					"fixed top-0 right-0 bg-white z-20 w-[300px] h-screen shadow-lg shadow-stone-600 p-4 transition-all",
				])}
			>
				<div className="w-full">
					<div className="w-full  flex justify-end">
						<IoCloseOutline
							onClick={() => closeSideMenu()}
							size={30}
							className="cursor-pointer"
						/>
					</div>

					<div className="relative mt-2 mb-4">
						<IoSearchOutline
							size={15}
							className="absolute left-1 top-[50%] transform translate-y-[-50%] "
						/>
						<input
							type="text"
							placeholder="Buscar"
							className="focus:outline-none border-b-2 focus:border-blue-300 text-sm bg-slate-50 pl-6 w-full py-2"
						/>
					</div>

					{isAuth ? (
						<>
							<SidebarItem
								title="perfil"
								icon={<IoPersonOutline size={20} />}
								path="/profile"
							/>
							<SidebarItem
								title="Ordenes"
								icon={<IoTicketOutline size={20} />}
								path="/orders"
							/>
							<div
								className="flex items-center gap-2 my-4 p-2 cursor-pointer  hover:bg-gray-100 rounded-md transition-all"
								onClick={() => logout()}
							>
								<IoExitOutline size={20} />
								<p className="capitalize">salir</p>
							</div>
						</>
					) : (
						<SidebarItem
							title="Ingresar"
							icon={<IoEnterOutline size={20} />}
							path="/auth/login"
						/>
					)}

					{isAdmin && (
						<>
							<div className="w-full h-px bg-gray-200 rounded-full"></div>
							<SidebarItem
								title="productos"
								icon={<IoShirtOutline size={20} />}
								path="/admin/products"
							/>
							<SidebarItem
								title="Ordenes"
								icon={<IoTicketOutline size={20} />}
								path="/admin/orders"
							/>
							<SidebarItem
								title="usuarios"
								icon={<IoPeopleOutline size={20} />}
								path="/admin/users"
							/>
						</>
					)}
				</div>
			</nav>
		</div>
	);
};
