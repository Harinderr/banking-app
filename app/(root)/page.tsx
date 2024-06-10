import Image from "next/image";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSideBar";
export default function Home() {
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
         user={userdetails.username}
         
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
    user={userdetails}
     ></RightSideBar>
    </section>
  )
}
