'use server'

import prisma from "@/lib/prisma"


export const  getPaginated = async () => {


  try {
    const users = await prisma.user.findMany()

    return {
      ok:true,
      users
    }

  } catch (error) {
    console.log(error)

    return {
      ok:false,
      message: 'no se pudo obtener los usuarios'
    }
  }

}