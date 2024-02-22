import { useSidebarStore } from "@/store";
import Link from "next/link";

interface Props {
	title: string;
	icon: React.ReactNode;
	path: string;
}

export const SidebarItem = ({ icon, path, title }: Props) => {

  const {closeSideMenu}= useSidebarStore()

	return (
		<Link
      onClick={closeSideMenu}
			href={path}
			className="flex items-center gap-2 my-4 p-2  hover:bg-gray-100 rounded-md transition-all"
		>
			{icon} <p className="capitalize text-sm">{title}</p>
		</Link>
	);
};
