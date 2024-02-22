import { titleFont } from "@/config/fonts";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const PageNotFound = () => {
	return (
		<div className=" flex flex-col-reverse md:flex-row items-center w-full min-h-screen justify-center">
			<div>
				<h1 className={clsx([titleFont.className, "text-9xl"])}>404</h1>
				<p className="font-bold">Whoops! Lo sentimos mucho.</p>
				<Link href={"/"}>Puedes regresar al Inicio</Link>
			</div>

			<Image
				src={"/imgs/starman_750x750.png"}
				alt="starman"
				width={500}
				height={500}
			/>
		</div>
	);
};
