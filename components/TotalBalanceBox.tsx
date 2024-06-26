
import React from 'react'
import AnimatedCountUp from './AnimatedCountUp'
import RoundChart from './RoundChart'

const TotalBalanceBox = ({
    accounts = [] ,
    totalBanks,
    totalCurrentBalance
}:TotlaBalanceBoxProps) => {
    
  return (
    <section className="total-balance">
        <div className="total-balance-chart">
        <RoundChart accounts={accounts}/>
        </div>
        <div className='flex flex-col gap-6'>
            <h2 className='header-2' >
            Bank Accounts : {totalBanks}

            </h2>
            <div className='flex flex-col gap-2'>
        <p className='total-balance-label'>Total Account Balance </p>
        <div className='total-balance-amount flex-center gap-2'>
       <AnimatedCountUp val={totalCurrentBalance} />
              </div>
            </div>
        </div>
    </section>
  )
}

export default TotalBalanceBox