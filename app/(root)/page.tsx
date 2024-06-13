import Image from "next/image";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSideBar";
import { getLoggedInUser } from "@/lib/appwrite";
export default async  function Home() {
  
const loggedInUser = await getLoggedInUser()
console.log(loggedInUser)
  const userdetails = {
    firstName : 'Shyam',
    email : 'Shyma34@gmail.com'
  }
  return (
    <section className="home flex flex-row ">
      <div className="home-content w-2/3">
        <header className="home-header">
         <HeaderBox
         type="greeting"
         title="Welcome"
         subtext="Mange you account and finances effciecently with Bankoo"
         user={loggedInUser?.name}
         
         ></HeaderBox>
         <TotalBalanceBox 
         accounts={[]}
          totalBanks={1}
          totalCurrentBalance={5098}
          

         ></TotalBalanceBox>
        </header>
      </div>
      <RightSideBar
     banks={[]}
     transactions={[]}
    user={loggedInUser}
     ></RightSideBar>
    </section>
  )
}
