"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
	try {
		return await prisma.userAddress.findUnique({ where: { userId } });
	} catch (error) {
		console.log({ error });
		throw Error("hubo un error");

		return null;
	}
};
