import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className="flex h-screen w-full">
     <Sidebar></Sidebar>
    <div className=" flex flex-col w-full ">
    <MobileNav></MobileNav>
  {children}
    </div>
   </main>
  );
}
