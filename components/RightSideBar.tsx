import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RightSideBar = ({ transactions, banks,user}: RightSidebarProps) => {
  return (
    <aside className='right-sidebar w-[550px] h-screen shadow-lg'>
        <section>
            <div className=" relative">
                <div className=" h-40 w-full bg-gradient-to-tr from-blue-300 via-blue-100 to-blue-300 ">

                </div>
                <div className="aboslute -top-10 left-5 text-xl font-bold profile rounded-full h-20 w-20 text-white bg-bankGradient flex justify-self-center items-center ">H</div>
                <div className="user_details ml-5">
                    <h3 className='font-bold'>{user?.firstName}</h3>
                    <p className='text-sm'>{user?.email}</p>
                </div>
                <div className="flex flex-row justify-between px-8 py-6">
                    <span className='w-fit font-bold' >My Banks</span>
                    <Link href='/' className='w-fit text-sm'>Add Bank</Link>
                </div>
            </div>

            <div className=" left-8 relative">
                <div className="absolute z-10 left-0 top-0 flex flex-col justify-between p-2  bg-bankGradient w-64 h-36  rounded-md ">
                <div className="user_name text-white text-sm">HDFC BANK</div>
                <div className="card_dt font-bold  text-sm text-white tracking-wider">
                    <div className="user-info flex justify-between p-2 font-thin tracking-widest">
                        <span>{user?.firstName}</span>
                        <span>/5/2016</span>
                    </div>
                    <div className="card_number flex flex-row justify-between">
                   <span className='p-2'>1212 1212 1212  </span> 
                    <Image src={'./icons/visa.svg'} alt='visa card' width={30} height={30}></Image>
                    </div>
                        
                    </div>
                </div>
                <div className="absolute z-0 flex flex-col justify-between p-2 left-8 top-8 bg-slate-700 w-64 h-36  rounded-md ">
                <div className="user_name text-white text-sm">ICICI BANK</div>
                <div className="card_dt font-bold  text-sm text-white tracking-wider">
                    <div className="user-info flex justify-between p-2 font-thin tracking-widest">
                        <span>{user?.firstName}</span>
                        <span>/5/2016</span>
                    </div>
                    <div className="card_number flex flex-row justify-between">
                  <span className='p-2'> 1212 1212 1212  </span>  
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