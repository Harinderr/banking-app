import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>

        <Loader2 className='animate-spin mx-2 ' size={70}></Loader2>

    </div>
  )
}

export default Loading