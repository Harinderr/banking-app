import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

interface MyBanksProps {
  accounts: Account[];
  loggedIn: User;
}

const MyBanks: React.FC<MyBanksProps> = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })
 return (
    <section className='flex bg-slate-900 '>
      <div className="my-banks ">
        <HeaderBox 
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && accounts?.data?.map((a: Account) => (
              <BankCard 
                key={a.id}
                account={a}
                user={loggedIn?.firstName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}




export default MyBanks