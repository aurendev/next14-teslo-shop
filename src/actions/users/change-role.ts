"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeRole = async (userId: string, role: "user" | "admin") => {
	try {
		const user = await prisma.user.update({
			where: { id: userId },
			data: {
				role,

			},
		});

    revalidatePath('/admin/users')
    return {
      ok: true
    }

	} catch (error) {

    console.log(error)
    return {
      ok: false,
      message : 'No se pudo actualizar el role'
    }
  }
};
