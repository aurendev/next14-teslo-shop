'use server'

import prisma from "@/lib/prisma"



export const setTransactionId = async (orderId: string, transactionId: string) =>{

  try {
    const order = await prisma.order.update({where:{id: orderId}, data:{
      transactionId
    }});

    if(!order) throw Error('No se encontro la orden')

    return{
      ok: true
    }



  } catch (error) {
    

    console.log('error ::' ,{error})

    return {
      ok:false,
      message: error
    }
  }





} 