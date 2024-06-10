'use client'
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCountUp = ( {val} : {val : number}) => {
  return (
    <>
    $<CountUp 
    end={val}
    decimals={2}
    />
    </>
  )
}

export default AnimatedCountUp