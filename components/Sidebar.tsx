'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {sidebarLinks} from '../constants/index'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Sidebar = () => {
    const pathname = usePathname()
    console.log(pathname)
  return (
    <section className="sidebar">
        <nav className='flex flex-col gap-4'>
            <Link
            href={'/'}
            className='mb-12 cursor-pointer flex flex-row items-center gap-2'
            >
                <Image src={'/icons/logo.svg'}
                width={30}
                height={30}
                alt='no image'
                className='size-[24px] max-xl:size-14'
                />
                <h1 className='sidebar-logo'>Bankoo</h1>
            </Link>
            {
                sidebarLinks.map((val) => {
                    const isActive = (pathname === val.route) || val.route.startsWith(`${val.route}/`)
                  console.log(isActive)
                 return (  <Link
                   href={val.route}
                   key={val.label}
                   className={cn('sidebar-link',{'bg-bankGradient': isActive})}
                   >
                    <div className="size-6 relative">
                    <Image src={val.imgURL} alt='no img' fill 
                    className={cn({'brightness-[3] invert-0' : isActive})}
                    ></Image>
                    {/* <p className='text-slate-900 text-sm'>{val.label}</p> */}
                    </div>
                   <p className={cn('sidebar-label',{'!text-white': isActive})}>{val.label}</p>
                   </Link>
                    )
                })
            }
        </nav>
    </section>
  )
}

export default Sidebar
