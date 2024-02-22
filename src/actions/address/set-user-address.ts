"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
	try {

    const updatedAddress = await createOrUpdateAddress(address, userId)

    return updatedAddress

	} catch (error) {
		console.log({ error });
		throw Error("NO se pudo guardar los datos de la direccion del Usuario");
	}
};

export const deleteAddres = async (userId: string) => {

  try {
    
    const address = await prisma.userAddress.findUnique({
      where:{ userId}
    })

    if(!address) return {
      ok: false,
      message: 'No se encontro la direccion'
    }

    await prisma.userAddress.delete({where: {userId}})

    return {
      ok: true,
      message: 'success'
    }

  } catch (error) {
    console.log({ error });
		throw Error("NO se pudo guardar los datos de la direccion del Usuario");
  }
}

const createOrUpdateAddress = async (address: Address, userId: string) => {
	try {
		const userAddress = await prisma.userAddress.findUnique({
			where: { userId },
		});

		const { country, ...restAddress } = address;

    

		if (!userAddress) {
			const newAddress = await prisma.userAddress.create({
				data: {
					...restAddress,
					countryId: country,
					userId,
				},
			});

			return newAddress;
		}

		const updatedAddress = await prisma.userAddress.update({
			where: { id: userAddress.id },
			data: {
				...restAddress,
				countryId: country,
			},
		});

    return updatedAddress;

	} catch (error) {
		console.log({ error });
		throw Error("NO se pudo guardar los datos de la direccion del Usuario");
	}
};
