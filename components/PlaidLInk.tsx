'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'
import { userContext } from '@/provider/userContextProvider'
import { useRouter } from 'next/navigation'

interface PlaidLinkProps {
  user: any; // Replace 'any' with the appropriate type for user
  variant?: 'primary' | 'ghost';
  
}

const PlaidLink: React.FC<PlaidLinkProps> = ({ user, variant }) => {
  const [token, setToken] = useState<string | null>(null)
  const router= useRouter()

  const handleSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    if (!public_token || !user) return;
    const data = await exchangePublicToken({
      publicToken : public_token,
      user
    })
    router.push('/')

  }, [user])

  const config: PlaidLinkOptions = {
    token: token ?? '', // Ensure token is a non-null string
    onSuccess: handleSuccess
  }

  const { open, ready } = usePlaidLink(config)

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user)
      setToken(data?.linkToken ?? null)
    }
    getLinkToken()
  }, [user])

  return (
   <>
      {variant === 'primary' ? (
        <Button className='bg-bankGradient' onClick={() => open()} disabled={!ready}>
          Connect Bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button className='sidebar-link flex gap-2' onClick={() => open()} disabled={!ready}>
              <Image
                src={'/icons/connect-bank.svg'}
                height={24}
                width={24}
                alt='connect image'
                ></Image>
           
           <p className='text-lg'>Connect Bank</p> 
          
        </Button>
      ) : (
        <Button className='sidebar-link' onClick={() => open()} disabled={!ready}>
           
                    <div className="size-6 relative">
                    <Image src={'/icons/connect-bank.svg'} alt='no img' fill ></Image>
                    
                    </div>
                   <p className={'sidebar-label'}>Connect Bank</p>
                  
    
    </Button>
  )

}
</> )}
export default PlaidLink
