'use client'
import { logoutAccount } from '@/lib/actions/user.actions'
import { getLoggedInUser } from '@/lib/appwrite'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({user}:FooterProps) => {
    const router = useRouter()

    const handleLogout = async () => {
        const logoutUser = await logoutAccount()
        if(logoutUser)  router.push('/sign_in')
    }
   
    
  return (
    <footer className='footer flex flex-row justify-between'>
        <div className="container md:hidden ">
            <div className="footer_name text-black-2 font-bold">{user?.name}</div>
            <div className="footer_email text-black-2 font-semibold">{user?.email}</div>
        </div>
        <div className="footer_image" onClick={handleLogout}>
        <Image src={'/icons/logout.svg'} height={40} width={40} alt='logout'></Image>
        </div>
      
    </footer>
  )
}

export default Footer