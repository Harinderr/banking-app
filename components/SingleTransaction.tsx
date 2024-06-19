'use client'
import { useRouter } from "next/navigation"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"
import { transactionCategoryStyles } from "@/constants"

// const CategoryHighlight = ({children}) => {
//   const {
//     borderColor,
// backgroundColor,
// textColor,
// chipBackgroundColor,
//    } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] ||
//    transactionCategoryStyles.default
// return (
//   <div className="box">
//     <div className="dot "></div>
//     <p>{children}</p>
//   </div>
// )
// }

const SingleTransaction = ({transactions,page}:TransactionHistoryTableProps) => {
  const router = useRouter()
  const handleNext = (pgNo:number) => {
    let transactionLength = transactions.length
    let nextPage =  pgNo*5 < transactionLength && pgNo + 1 
   router.push(`/?page=${nextPage}`)

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
 
  
  
  let max = page * 5
  let min = max - 5

const LimitedTransactions = transactions.slice(min,max)
console.log(transactions[0])
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
                 
                    <TableRow key={val.id} className={` rounded-lg mb-1 ${val.amount < 0 ? 'bg-[#f8f0f0]' : 'bg-[#edf4e9]'}`}>
                    <TableCell className="font-medium">{removeSpecialCharacters(val.name)}</TableCell>
                    <TableCell className={`font-semiBold ${val.amount < 0 ? 'text-red-600': 'text-green-600'}`}>{'$' + Number(val.amount)}</TableCell>
                    <TableCell >{status}</TableCell>
                    <TableCell className="text-center">{val.date}</TableCell>
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