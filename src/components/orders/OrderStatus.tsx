import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
	isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
	return (
		<div
			className={clsx(
				"rounded-lg p-2 w-full text-white flex items-center gap-2 mb-4 ",
				{
					"bg-green-700": isPaid,
					"bg-red-400": !isPaid,
				}
			)}
		>
			<IoCardOutline size={25} />
			<span className="text-sm font-semibold">{isPaid ? "" : "No"} Pagada</span>
		</div>
	);
};
