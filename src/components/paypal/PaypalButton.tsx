'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData} from "@paypal/paypal-js"
import { Skeleton } from "..";
import { paypalCheckPayment, setTransactionId } from "@/actions";



interface Props{
  orderId: string;
  amount: number;
}


export const PaypalButton = ({amount,orderId} :Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100) / 100)


  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> =>  {
    
    const transactionId = await actions.order.create({
      purchase_units:[
        {
          invoice_id: orderId,
          amount:{
            value: roundedAmount.toString()
          }
        }
      ]
    })

    const res = await setTransactionId(orderId, transactionId)

    if(!res.ok) throw Error('No se pudo actualizarla orden')

    console.log('orden actualizada')

    return  transactionId
  }

  const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {

    console.log('Approve!!')
    
    const details = await actions.order?.capture();
    if ( !details ) return;

    await paypalCheckPayment( details.id );

  }



  return (
    <>{
      isPending? 
        <div className="flex flex-col gap-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      :<div className="relative z-0">
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </div>
    }
      
    </>
  )
}
