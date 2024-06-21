import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentForm'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const PaymentTransfer =  async ({searchParams : {id , page}}:SearchParamProps) => {
  const loggedInUser = await getLoggedInUser()

const pageNumber = Number(page) || 1

  const accounts = loggedInUser?.$id &&  await getAccounts({userId : loggedInUser.$id})
  // console.log('this is accounts',accounts)

  if(!accounts) return;
  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId
  
const account = await getAccount({appwriteItemId})
  return (
    <div className='p-6'>
      
      <HeaderBox
      title='Payment Transfer'
      subtext='Pay anyone at any time with Bankoo'
      ></HeaderBox>
       


<PaymentTransferForm 
accounts={accounts?.data}
></PaymentTransferForm>
      
    </div>
  )
}

export default PaymentTransfer