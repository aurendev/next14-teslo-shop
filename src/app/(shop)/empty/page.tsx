import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="flex items-center gap-4">
        <IoCartOutline size={80} />
        <div>
          <p className="font-bold">Tu carrito esta vacio</p>
          <Link className="text-3xl text-blue-500 font-semibold" href={'/'}>Regresar</Link>
        </div>
      </div>
    </div>
  );
}