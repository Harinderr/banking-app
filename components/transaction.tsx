'use client'
// import BankTransactionTab from "./BankTransactionTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleTransaction from "./SingleTransaction";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




const Transactions =  ({
  accounts,
  appwriteItemId,
  page,
  transactions = [],
}: RecentTransactionsProps) => {
 const router = useRouter()
 const handleAccount = (id:string) => {
  router.push(`/?id=${id}`)
 }
 useEffect(()=> {
  router.push(`/?id=${appwriteItemId}`)
 },[])
  return (
    <section>
      <h1 className="text-xl font-bold">Recent Transactions</h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          {accounts.map((account : Account) => {
           
            return (
             
              <TabsTrigger key={account.id} value={`${account.appwriteItemId}`} onClick={() => handleAccount(account?.appwriteItemId)}  >
                {account.name}
              </TabsTrigger>
             
          
            );
          })}
              </TabsList>
              {accounts.map((account : Account) =>  {
       return (  <TabsContent key={account.id} value={`${account.appwriteItemId}`}>
            <SingleTransaction  transactions={transactions} page={page} />
          </TabsContent>)
              })}
       
      </Tabs>
     
    </section>
  );
};

export default Transactions;
