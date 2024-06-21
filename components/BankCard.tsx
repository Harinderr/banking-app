'use client'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { AccountType } from 'plaid'



const BankCard = ({account, user}:BankCardProps) => {
    const router = useRouter()
    
    const handleBank =  () => {
            router.push(`/transaction-history?id=${account?.appwriteItemId}`)
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(account.sharableId)
            .then(() => {
                alert('ID copied to clipboard!')
            })
            .catch(err => {
                console.error('Failed to copy text: ', err)
            })
    }
  
  return (
   
  <div className="card_wrapper w-64 h-36 ">
            <div onClick={() => handleBank()} className="flex hover:scale-[1.05] flex-col justify-between p-2 w-full bg-bankGradient  rounded-md ">
            <div className="user_name text-white text-sm">{account.name}</div>
            <span className='text-white font-semibold'>{'$'+account.currentBalance}</span>
            <div className="card_dt font-bold  text-sm text-white tracking-wider">
                <div className="user-info flex justify-between p-2 font-thin tracking-widest">
                    <span>{user}</span>
                    <span>/5/2016</span>
                </div>
                <div className="card_number flex flex-row justify-between">
               <span className='p-2'>**** **** {account.mask}  </span> 
                <Image src={'./icons/visa.svg'} alt='visa card' width={30} height={30}></Image>
                </div>
                    
                </div>
            </div>
     <p onClick={() => handleCopy()} className='text-sm overflow-hidden p-2'>{account.sharableId}</p>

            </div>
 
  )
}

export default BankCard