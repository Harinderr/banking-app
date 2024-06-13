import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className=" min-h-screen w-full grid grid-cols-2">
   {children}
   <div className="img h-full w-full flex justify-end items-center">
    <Image alt="auth-img" src={'/icons/auth-image.svg'} height={400} width={400}></Image>
   </div>
   </main>
  );
}
