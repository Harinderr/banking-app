import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className=" min-h-screen w-full grid grid-cols-2 max-xl:grid-cols-1 bg-slate-900">
   {children}
   <div className="img h-full w-full flex justify-end items-center max-xl:hidden relative">
    <Image className="rounded-lg object-contain" alt="auth-img" src={'/icons/Designer.png'} fill ></Image>
   </div>
   </main>
  );
}
