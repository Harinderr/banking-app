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
      <div className=" sidebar-label  flex gap-2 flex-row">
      <div className="w-10 h-10  bg-green-500 text-white font-bold flex justify-center items-center rounded-full">
      {user?.firstName.slice(0,1).toUpperCase()}
      </div>
        <div>
            <div className=" text-white font-bold">{user?.firstName}</div>
            <div className=" text-white font-semibold">{user?.email}</div>
        </div>
        </div>
        <div className="footer_image" onClick={handleLogout}>
        <Image src={'/icons/logout.svg'} height={30} width={30} alt='logout'></Image>
        </div>
      
    </footer>
  )
}

export default Footer