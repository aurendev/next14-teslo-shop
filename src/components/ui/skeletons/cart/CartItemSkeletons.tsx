

import { Skeleton} from '@/components/index'



export const CartItemSkeletons = () => {
  return (
    <div className="flex gap-4 mb-4">
      <Skeleton className='w-[100px] h-[100px]' />

      <div className='w-full flex flex-col gap-2'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  )
}
