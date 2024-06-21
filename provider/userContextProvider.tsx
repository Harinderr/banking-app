'use client'
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "react";

export const userContext = createContext<User | null>(null)

 export function UserContextProvider({children}:{children : ReactNode}) {
   const [id, setId] = useState<User | null>(null)
    

   const getUser = useCallback(async ()=> {
    const LoggedInUser = await getLoggedInUser()
    setId(LoggedInUser.$id)
   },[])

    useEffect(()=> {
       getUser()
    },[getUser])
 
    return (
        <userContext.Provider value = {id}>
            {children}
        </userContext.Provider>
    )
}