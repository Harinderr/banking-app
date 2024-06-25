"use client";
// import BankTransactionTab from "./BankTransactionTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleTransaction from "./SingleTransaction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Transactions = ({
  accounts,
  appwriteItemId,
  page,
  transactions = [],
}: RecentTransactionsProps) => {
  const router = useRouter();
  const [active, setActive] = useState(false)
  const handleAccount = (id: string) => {
    router.push(`/?id=${id}`);
  };
  
 

  return (
    <section>
      <h1 className="text-xl font-bold">Recent Transactions</h1>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList>
          {accounts.map((account: Account) => {
            return (
              <TabsTrigger
                className={account.appwriteItemId == appwriteItemId ? 'border-b-4 border-blue-500' : ''} 
                key={account.id}
                value={`${account.appwriteItemId}`}
                onClick={() =>
                  handleAccount(account?.appwriteItemId || appwriteItemId)
                }
              >
                {account.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {accounts.map((account: Account) => {
          return (
            <TabsContent key={account.id} value={`${account.appwriteItemId}`}>
              <SingleTransaction transactions={transactions} page={page} />
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
};

export default Transactions;
