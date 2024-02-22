import { Size } from "@/seed/seed";
import clsx from "clsx";

interface Props {
	sizeSelected?: Size;
	availibleSizes: Size[];
	onSizeChanged: (size: Size) => void;
}
export const SizeSelector = ({
	availibleSizes,
	sizeSelected,
	onSizeChanged,
}: Props) => {
	return (
		<div>
			<p className="font-bold text-sm mb-3">Tallas disponibles</p>

			<div className="flex gap-4 ">
				{availibleSizes.map((size) => (
					<button
						onClick={() => onSizeChanged(size)}
						key={size}
						className={clsx(
							"hover:underline tx",
							size === sizeSelected ? "underline" : "text-stone-400"
						)}
					>
						{size}
					</button>
				))}
			</div>
		</div>
	);
};
