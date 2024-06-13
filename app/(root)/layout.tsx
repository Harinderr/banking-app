import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser()
  if(!user) redirect('/sign_in')
  return (
   <main className="flex h-screen w-full">
     <Sidebar user={user}></Sidebar>
    <div className=" flex flex-col w-full ">
    <MobileNav></MobileNav>
  {children}
    </div>
   </main>
  );
}
