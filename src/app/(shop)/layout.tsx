import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className=" min-h-screen flex flex-col ">
      <TopMenu />
      <Sidebar />
      <div className=" sm:px-10 flex-grow">{children}</div>
      <Footer />
    </div>
  );
}