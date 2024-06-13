import React from 'react'
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
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authformSchema } from '@/lib/utils'
 const formSchema = authformSchema('signup')
  interface FormInputProps {
    control : Control<z.infer<typeof formSchema>> 
    name : FieldPath<z.infer<typeof formSchema>>,
    label : string,
    placeholder : string,
  }
const FormInput = ({name, label, placeholder,control }:FormInputProps) => {
  return (
    <div>
         <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-14 font-semibold'>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} className='text-10 outline-solid bg-slate-100 m-0' type={`${name=== 'password' ? 'password': 'text'}`} {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
  )
}

export default FormInput