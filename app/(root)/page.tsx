import Image from "next/image";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import Transactions from "@/components/transaction";
import { useEffect } from "react";
export default async  function Home({searchParams : { id, page }}:SearchParamProps) {
  
const loggedInUser = await getLoggedInUser()

const pageNumber = Number(page) || 1

  const accounts = loggedInUser?.$id &&  await getAccounts({userId : loggedInUser.$id})
  // console.log('this is accounts',accounts)

  if(!accounts) return;
  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId
  
const account = await getAccount({appwriteItemId})
console.log('this is account', account)

  return (
    <section className="home flex flex-row ">
      <div className="home-content w-2/3">
        <header className="home-header">
         <HeaderBox
         type="greeting"
         title="Welcome"
         subtext="Mange you account and finances effciecently with Bankoo"
         user={loggedInUser?.firstName}
         
         ></HeaderBox>
         <TotalBalanceBox 
         accounts={accounts?.data}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}
          

         ></TotalBalanceBox>
         <Transactions
          accounts = {accounts?.data}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={pageNumber}
         ></Transactions>
        </header>
      </div>
      <RightSideBar
     banks={accounts?.data?.slice(0,2)}
     transactions={accounts?.transactions}
    user={loggedInUser}
     ></RightSideBar>
    </section>
  )
}
