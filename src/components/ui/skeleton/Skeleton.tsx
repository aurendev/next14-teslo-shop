import clsx from "clsx";
import { HTMLAttributes } from "react";

interface Props {
	className?: string;
}

export const Skeleton = ({ className }: Props) => {
	return (
		<div
			className={clsx(["w-full  h-6 bg-gray-300 animate-pulse rounded-md ", className])}
		></div>
	);
};
