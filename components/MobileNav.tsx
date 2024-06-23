 'use client'
 import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import PlaidLink from './PlaidLInk'
import { useContext } from 'react'
import { userContext } from '@/provider/userContextProvider'
 
 const MobileNav = () => {
    const pathname = usePathname()
    const user = useContext(userContext)
   return (
   <section className="mobile_nav flex flex-row justify-between p-6 md:hidden">
    <Link href='/'>
    
    <Image src={'/icons/logo.svg'} height={50} width={50} alt='no image'></Image>
    </Link>
   

    <Sheet>
  <SheetTrigger>
  <Image src={'/icons/hamburger.svg'} height={50} width={50} alt='no image'></Image>
  
  </SheetTrigger>
  <SheetContent className='bg-white py-16' side={'left'}>
  <nav className='flex flex-col gap-4 bg-white'>
         
            {
                sidebarLinks.map((val) => {
                    const isActive:boolean = (pathname === val.route) || val.route.startsWith(`${val.route}/`)
                  
                 return ( 
                    <SheetClose asChild key={val.route}>
                    <Link
                   href={val.route}
                   key={val.label}
                   className={cn('sidebar-link  flex flex-row p-4 justify-start',{'bg-bankGradient': isActive})}
                   >
                    <div className="size-6 relative">
                    <Image src={val.imgURL} alt='no img' fill 
                    className={cn({'brightness-[3] invert-0' : isActive})}
                    ></Image>
                    {/* <p className='text-slate-900 text-sm'>{val.label}</p> */}
                    </div>
                   <p className={cn({'text-white': isActive})}>{val.label}</p>
                   </Link>
                   </SheetClose>
                    )
                })
            }
            <PlaidLink user={user} variant='ghost'></PlaidLink>
        </nav>
  </SheetContent>
</Sheet>
   </section>
   )
 }
 
 export default MobileNav