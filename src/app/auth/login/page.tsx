import { titleFont } from "@/config/fonts";
import { FormLogin } from "./ui/FormLogin";

export default function LoginPage() {
	return (
		<main className="flex flex-col min-h-screen pt-32 sm:pt-52">
			<h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

			<FormLogin />
		</main>
	);
}
