'use server'

import prisma from "@/lib/prisma"



export const getOrderById = async (orderId: string) => {


  try {
    const order = await prisma.order.findUnique({
      where: {id: orderId},
      include:{
        OrderAddress: {
          include:{
            country:true
          }
        },
        OrderItem: {
          include:{product:{
            include:{ProductImage:true}
          }}
        }
      }
    })

    if(!order) throw Error('order id NO encontrado ')

    return {
      ok: true,
      order
    }

  } catch (error) {
    return {
      ok: false,
      message: `${orderId} no encontrada`
    }
  }



}