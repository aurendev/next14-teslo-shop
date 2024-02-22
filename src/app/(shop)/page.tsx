export const revalidate = 60 // 60 segs

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { Pagination, ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props{
  searchParams: {
    page?: string;   
  }
}

export default async function HomePage({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const {products, currentPage,totalPages}  = await getPaginatedProductsWithImages({page})

  if(products.length === 0) redirect('/')

  return (
    <div>
      <Title title="Tienda" subTitle="Todos los productos" />

      <ProductsGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
}