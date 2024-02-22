"use client";

import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login, registerUser } from "@/actions";
import { useState } from "react";

// type FormType = {
// 	user: string;
// 	email: string;
// 	password: string;
// };

export const RegisterForm = () => {
	const [errorMessage, setErrorMessage] = useState("");

	const formSchema = z.object({
		user: z
			.string({ required_error: "Este campo es requerido" })
			.min(3)
			.max(20),
		email: z
			.string({ required_error: "Este campo es requerido" })
			.email("Debe ser un email valido"),
		password: z
			.string({ required_error: "Este campo es requerido" })
			.min(6, "debe tener al menos  3 caracteres"),
	});

	type FormSchemaData = z.infer<typeof formSchema>;

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormSchemaData>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormSchemaData> = async (data) => {
		setErrorMessage("");

		const { email, password, user } = data;
		console.log({ email });
		const res = await registerUser(user,email, password);

		if (res.ok) {
			console.log(res.user);

			await login(email.toLowerCase(), password);

      window.location.replace('/')
			return;
		}

		setErrorMessage(res.message!);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
			<label htmlFor="email">Usuario</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-2"
				type="text"
				{...register("user")}
			/>
			{errors.user && (
				<p className="text-rose-500 font-semibold mb-2">
					{errors.user.message}
				</p>
			)}

			<label htmlFor="email">Correo electrónico</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-2"
				type="email"
				{...register("email")}
			/>

			{errors.email && (
				<p className="text-rose-500 font-semibold mb-2">
					{errors.email.message}
				</p>
			)}

			<label htmlFor="email">Contraseña</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-2"
				type="password"
				{...register("password")}
			/>

			{errors.password && (
				<p className="text-rose-500 font-semibold mb-2">
					{errors.password.message}
				</p>
			)}

			{errorMessage.length > 0 && (
				<p className="text-rose-500 font-semibold mb-2">{errorMessage}</p>
			)}

			<button type="submit" className="btn-primary mt-4">
				Crear Cuenta
			</button>

			{/* divisor l ine */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500"></div>
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500"></div>
			</div>

			<Link href="/auth/login" className="btn-secondary text-center">
				Ingresar
			</Link>
		</form>
	);
};
