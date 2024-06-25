'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {  Heading1, Loader2 } from 'lucide-react'
import PlaidLink from '@/components/PlaidLInk'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authformSchema } from '@/lib/utils'
import FormInput from '@/components/FormInput'
import Image from 'next/image'
import { signUp, singIn } from '@/lib/actions/user.actions'
import { getLoggedInUser } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import { userContext } from '@/provider/userContextProvider'

const AuthForm  =  ({type}:{type : string}) => {
  
  const [isLoading, setIsLoading] = useState(false)
  
   const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  

  

  const formSchema = authformSchema(type)
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    firstName : "",
    lastName : "",
    address1 : "",
    state : "",
    postalCode: "",
    dateOfBirth : "",
    ssn : "",
    email : "",
    password : ""
  },
})

// 2. Define a submit handler.
async function onSubmit(data: z.infer<typeof formSchema>) {
 try {
  setIsLoading(true)
    if(type === 'signup') {
const userData  = {
  firstName : data.firstName!,
  lastName : data.lastName!,
  address1 : data.address1!,
  city : data.city!,
  state : data.state!,
  postalCode : data.postalCode!,
  dateOfBirth : data.dateOfBirth!,
  ssn : data.ssn!,
  email : data.email!,
  password : data.password!

}

     const newUser =   await signUp(userData)
   setUser(newUser)
       
    }
    else {
   const user =   await   singIn(data)
   setUser(user)
   router.push('/')
    }
    
 } catch (error) {
    console.log(error, 'submission error')
 } finally {
    console.log('submission ended')
    setIsLoading(false)
 }
  
 
  
}




  return (
    <section className=' shadow-lg h-screen '>
      <div className="left w-full p-8    h-screen flex overflow-y-scroll flex-col justify-center ">
      { (!user ) ? ( 
        <div className="formWrapper  w-3/5 h-full mx-auto ">
      <Link href='/' className='flex flex-row items-center justify-center gap-2'>
    
    {/* <Image src={'/icons/logo.svg'} height={50} width={50} alt='no image'></Image> */}
   <h1 className='text-2xl font-bold'>Bankoo</h1>
  
    </Link>
    <h1 className='text-xl font-bold my-6'>{ type === 'signin' ? 'SIGN IN' : 'SIGN UP'}</h1>



      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {
    type === 'signup' ?  (
         <>
         <div className='grid grid-cols-2 gap-4'>
         <FormInput control={form.control} name={'firstName'} placeholder={'Enter your first Name'} label={'First Name'}></FormInput>
         <FormInput control={form.control} name={'lastName'} placeholder={'Enter your Last Name'} label={'Last Name'}></FormInput>
         </div>
   
   <FormInput control={form.control} name={'address1'} placeholder={'Enter your Address'} label={'Address'}></FormInput>
   <FormInput control={form.control} name={'city'} placeholder={'Enter your city'} label={'City'}></FormInput>
   <div className='grid grid-cols-2 gap-4'>
     <FormInput  control={form.control} name={'state'} placeholder={'Enter your state'} label={'State'}></FormInput>
     <FormInput  control={form.control} name={'postalCode'} placeholder={'Enter your postal code'} label={'Postal code'}></FormInput>
     <FormInput  control={form.control} name={'dateOfBirth'} placeholder={'Enter your date of birth'} label={'Date of birth'}></FormInput>
     <FormInput  control={form.control} name={'ssn'} placeholder={'Enter your SSN'} label={'SSN'}></FormInput>
   </div>
    
     <FormInput control={form.control} name={'email'} placeholder={'Enter your email'} label={'Email'}></FormInput>
     <FormInput control={form.control} name={'password'} placeholder={'Enter your Password'} label={'Password'}></FormInput>

    </>) : (
        <>
         <FormInput control={form.control} name={'email'} placeholder={'Enter your Email'} label={'Email'}></FormInput>
 <FormInput control={form.control} name={'password'} placeholder={'Enter your Password'} label={'Password'}></FormInput>
   
        </>
 )
       }

   
   <div className="button_container  flex flex-col gap-1">

        <Button className='bg-bankGradient text-white' type="submit" disabled={isLoading}>
          {
            isLoading && (
              <Loader2 className='animate-spin mx-2'></Loader2>
            )
          }
      
          Submit</Button>
   </div>
      </form>
    </Form>
    <p className='text-14 text-center my-6'>{
      type === 'signin' ? 'Dont have an account' :  'Log in to your account' 
    }
    &nbsp;
    {
        <Link  className='text-bankGradient' href={type === 'signin' ? '/sign_up' : '/sign_in'}>{
       type === 'signin' ? 'signUp' : 'signIn'

    }
            </Link>
    }
    </p>
    </div>
   ) : (
   type != 'signin' && ( <>
     <h1>link account</h1>
     <div>
    <PlaidLink user={user} variant = 'primary'></PlaidLink>
  </div>
      </>)
    ) } 
    </div>
    </section>
  )
}

export default AuthForm