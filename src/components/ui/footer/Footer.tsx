import Link from "next/link";

export const Footer = () => {
	return (
		<div className="w-full flex justify-center my-4 ">
			<div className="text-xs flex items-center">
				<p className="font-semibold">Teslo </p> |
				<p>
					shop © 2024 <Link href={"/"}>Privacidad & Legal</Link>{" "}
					<Link href={"/"}>Ubicaciones</Link>
				</p>
			</div>
		</div>
	);
};
