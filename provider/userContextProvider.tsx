'use client'
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "react";

export const userContext = createContext<User| null>(null)

 export function UserContextProvider({children}:{children : ReactNode}) {
  
   const [user, setUser] = useState<User | null>(null)
    

   const getUser = useCallback(async ()=> {
    const LoggedInUser = await getLoggedInUser()
   
    setUser(LoggedInUser)
   },[])

    useEffect(()=> {
       getUser()
    },[getUser])
 
    return (
        <userContext.Provider value = {user}>
            {children}
        </userContext.Provider>
    )
}