'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { formUrlQuery } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

const BankDropdown = ({
    accounts,
    setValue,
    otherStyles}:BankDropdownProps) => {
        const router  = useRouter()
        const searchParams = useSearchParams()
        const defaultAccount = accounts[0]
        const handleChange = (id:string) => {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "id",
                value: id,
              });
              router.push(newUrl, { scroll: false });
        if(id) {
            setValue('senderBank',id)
        }

        }
  return (
    <div>BankDropdown

<Select defaultValue={defaultAccount.id} onValueChange={(val) => handleChange(val)}>
  <SelectTrigger className="w-[180px] bg-slate-800 ">
    <SelectValue className="text-white" placeholder="Select Bank" />
  </SelectTrigger>
  <SelectContent className="bg-slate-800 text-white">
    {
        accounts.map(val => {
            return (
                <SelectItem key={val.id} value={val.appwriteItemId} className="hover:bg-blue-500 hover:text-white">{val.name}</SelectItem>
            )
        })
    }

  </SelectContent>
</Select>
    </div>
  )
}

export default BankDropdown