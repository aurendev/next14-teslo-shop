"use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationCircle } from "react-icons/io5";

export const FormLogin = () => {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);

	return (
		<form action={dispatch} className="flex flex-col">
			<label htmlFor="email">Correo electrónico</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-5"
				type="email"
				name="email"
			/>

			<label htmlFor="email">Contraseña</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-5"
				type="password"
				name="password"
			/>

			<div className="mb-4 flex items-center gap-4">
				{errorMessage && (
					<>
						<IoInformationCircle className="h-5 w-5 text-red-500" />
						<p className="text-sm text-red-500">{errorMessage}</p>
					</>
				)}
			</div>

			<LoginButton />

			{/* divisor l ine */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500"></div>
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500"></div>
			</div>

			<Link href="/auth/new-account" className="btn-secondary text-center">
				Crear una nueva cuenta
			</Link>
		</form>
	);
};

function LoginButton() {
	const { pending } = useFormStatus();

	return (
		<button
			aria-disabled={pending}
			type="submit"
			className={clsx("btn-primary", {
				"bg-gray-300 hover:bg-gray-300  cursor-not-allowed": pending,
			})}
		>
			Ingresar
		</button>
	);
}
