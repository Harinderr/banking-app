
// import BankTransactionTab from "./BankTransactionTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleTransaction from "./SingleTransaction";




const Transactions = ({
  accounts,
  appwriteItemId,
  page,
  transactions,
}: RecentTransactionsProps) => {
 
  return (
    <section>
      <h1 className="text-xl font-bold">Recent Transactions</h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          {accounts.map((account : Account) => {
           
            return (
             
              <TabsTrigger key={account.id} value={`${account.appwriteItemId}`}   >
                {account.name}
              </TabsTrigger>
             
          
            );
          })}
              </TabsList>
              {accounts.map((account : Account) => (
          <TabsContent key={account.id} value={`${account.appwriteItemId}`}>
            <SingleTransaction transactions={transactions} page={page} />
          </TabsContent>
        ))}
       
      </Tabs>
     
    </section>
  );
};

export default Transactions;
