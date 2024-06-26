'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const RightSideBar = ({ transactions, banks, user }:RightSidebarProps) => {
  const primary = banks[0]
  const secondary = banks[1]
  const [bank1Index, setBank1Index] = useState(10)
  const [bank2Index, setBank2Index] = useState(0)

  const handleClick = (bank:string) => {
    if (bank !== 'bank-1' && bank1Index === 10) {
      setBank1Index(0)
      setBank2Index(10)
    } else {
      setBank1Index(10)
      setBank2Index(0)
    }
  }

  return (
    <aside className='right-sidebar w-[550px] h-screen shadow-lg'>
      <section>
        <div className="relative">
          <div className="h-40 w-full bg-gradient-to-tr from-blue-300 via-blue-100 to-blue-300">
          </div>
          <div className="absolute -top-10 left-5 profile rounded-full h-20 w-20  bg-bankGradient flex justify-center items-center">
          <p className="text-4xl font-bold text-white "> {user?.firstName.slice(0, 1).toUpperCase()}</p> 
          </div>
          <div className="user_details ml-5">
            <h3 className='font-bold'>{user?.firstName}</h3>
            <p className='text-sm'>{user?.email}</p>
          </div>
          <div className="flex flex-row justify-between px-8 py-6">
            <span className='w-fit font-bold'>Your Banks : {banks.length}</span>
            <Link href='/' className='w-fit text-sm'>Add Bank</Link>
          </div>
        </div>

        <div className="left-8 relative">
          <div
            onClick={() => handleClick('bank-1')}
            id='bank-1'
            className={`z-${bank1Index} absolute left-0 top-0 flex flex-col justify-between p-2 bg-bankGradient w-64 h-36 rounded-md`}
            style={{ zIndex: bank1Index, position: 'absolute' }}
          >
            <div className="user_name text-white text-sm">{primary.name}</div>
            <div className="card_dt font-bold text-sm text-white tracking-wider">
              <div className="user-info flex justify-between p-2 font-thin tracking-widest">
                <span>{user?.firstName}</span>
                <span>/5/2016</span>
              </div>
              <div className="card_number flex flex-row justify-between">
                <span className='p-2'>1212 1212 1212 </span>
                <Image src={'./icons/visa.svg'} alt='visa card' width={30} height={30}></Image>
              </div>
            </div>
          </div>
          <div
            onClick={() => handleClick('bank-2')}
            id='bank-2'
            className={`z-${bank2Index} absolute flex flex-col justify-between p-2 left-8 top-8 bg-slate-700 w-64 h-36 rounded-md`}
            style={{ zIndex: bank2Index, position: 'absolute' }}
          >
            <div className="user_name text-white text-sm">{secondary.name}</div>
            <div className="card_dt font-bold text-sm text-white tracking-wider">
              <div className="user-info flex justify-between p-2 font-thin tracking-widest">
                <span>{user?.firstName}</span>
                <span>/5/2016</span>
              </div>
              <div className="card_number flex flex-row justify-between">
                <span className='p-2'>1212 1212 1212 </span>
                <Image src={'./icons/mastercard.svg'} alt='visa card' width={30} height={30}></Image>
              </div>
            </div>
          </div>
        </div>
      </section>
    </aside>
  )
}

export default RightSideBar
