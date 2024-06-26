'use client'
import { usePathname, useRouter } from "next/navigation"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"
import { transactionCategoryStyles } from "@/constants"
import { useContext, useEffect } from "react"
import { userContext } from "@/provider/userContextProvider"



const SingleTransaction = ({transactions,page}:TransactionHistoryTableProps) => {
   let pathname = usePathname()
   console.log(pathname)
  const router = useRouter()
  const user = useContext(userContext)
  const handleNext = (pgNo:number) => {
    let transactionLength = transactions.length
    let nextPage =  pgNo*5 < transactionLength && pgNo + 1 
  
    router.push(`${pathname}?page=${nextPage}`)

  }
  const handlePrevious = (pgNo:number) => {
    let nextPage;
     if(pgNo == 1 ){
     nextPage = 1
     }  
     else {
     nextPage =  pgNo - 1
     }

   router.push(`/?page=${nextPage}`)

  }
 
  
  
  let max = page * 8
  let min = max - 8

const LimitedTransactions = transactions.slice(min,max) 

const formatDate = (d:string) => {
  const date = new Date(d);
const formattedDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`;
return formattedDate
}


  return (
    <>
    <Table>
 
  <TableHeader>
    <TableRow>
      <TableHead className="w-[200px]">Transaction</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>status</TableHead>
      <TableHead className="text-center">Date</TableHead>
      <TableHead className="text-center">Channel</TableHead>
      <TableHead className="text-right">Category</TableHead>

    </TableRow>
  </TableHeader>

 
      
  <TableBody>
    

        {
            LimitedTransactions.map((val:Transaction)=> {
                const status =  getTransactionStatus(new Date(val.date))
             
                return (
                 
                  <TableRow key={val.id} className={`rounded-lg mb-1 opacity-90 ${val.amount < 0 ? 'bg-red-950' : 'bg-green-950'}`}>
                    <TableCell className="font-medium text-white">{removeSpecialCharacters(val.name)}</TableCell>
                    <TableCell className={`font-semiBold ${val.type == 'debit' ? 'text-red-600': 'text-green-600'}`}>{'$' + Number(val.amount)}</TableCell>
                    <TableCell >{status}</TableCell>
                    <TableCell className="text-center">{formatDate(val.date)}</TableCell>
                    <TableCell className="text-center">{val.paymentChannel}</TableCell>
                    <TableCell className="text-right">{val.category}</TableCell>
                    </TableRow>
                   
                )
              
            })
        }
     
  
    
  </TableBody>

  </Table>
  <div className="pagination flex justify-between">
  <button disabled={page == 1 && true} className="bg-bankGradient cursor-pointer p-4 text-white rounded-lg disabled:bg-blue-400 " onClick={()=>handlePrevious(page) }>Previous</button>
  <button disabled={page*5 > transactions.length && true} className="cursor-pointer bg-bankGradient p-4 text-white rounded-lg disabled:bg-blue-400" onClick={()=> handleNext(page) }>Next</button>
</div>
</>
  )
}

export default SingleTransaction