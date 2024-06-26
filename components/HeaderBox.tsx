import React from 'react'

const HeaderBox = ({type,title,user,subtext}:HeaderBoxProps) => {
  return (
    <div className="header-box">
        <h1 className="header-box-title text-white">
           <span className='text-white'> {title}</span> 
            {type == 'greeting' && (
            <span className='text-bankGradient'>&nbsp;{`${user}`}</span>
            )}
        </h1>
        <p className="header-box-subtext text-slate-100">{subtext}</p>
    </div>
  )
}

export default HeaderBox