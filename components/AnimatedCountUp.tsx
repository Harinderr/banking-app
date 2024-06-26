'use client'
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCountUp = ( {val} : {val : number}) => {
  return (
    <div className='text-white'>
    $<CountUp 
    
    end={val}
    decimals={2}
    />
    </div>
  )
}

export default AnimatedCountUp