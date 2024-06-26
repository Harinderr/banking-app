 'use client'
 import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { RxHamburgerMenu } from "react-icons/rx";
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
import Footer from './Footer'
 
 const MobileNav = () => {
    const pathname = usePathname()
    const user = useContext(userContext)
   return (
   <section className="mobile_nav bg-slate-800 text-white flex flex-row justify-between p-4 md:hidden">
    <Link href='/'>
    
    <h1 className=' text-4xl font-semibold text-white max-xl:text-xl '>Bankoo</h1>
    </Link>
   

    <Sheet>
  <SheetTrigger>
  <RxHamburgerMenu className='text-4xl' />
  
  </SheetTrigger>
  <SheetContent className='bg-slate-800 py-16' side={'left'}>
  <nav className='flex flex-col gap-4 bg-slate-800'>
         
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
         
            <PlaidLink user={user} variant='ghost' ></PlaidLink>
            <Footer user={user}></Footer>
            
        </nav>
  </SheetContent>
</Sheet>
   </section>
   )
 }
 
 export default MobileNav