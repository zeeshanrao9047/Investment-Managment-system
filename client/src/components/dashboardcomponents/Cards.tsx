import React from 'react'
import { IoInformationCircleOutline } from "react-icons/io5";
interface Cardprops{
    title: string;
    price: number;
}
export default function cards({title , price}: Cardprops) {
  return (
    <>
     <div className='p-6  rounded-md border-2 shadow-lg'>
        <h3 className='text-lg capitalize font-medium flex items-center gap-x-1 mb-4'>{title} <span><IoInformationCircleOutline/></span></h3>
        <h2 className='text-[#3b60e6] font-medium text-[28px] '><span>$</span>{price}</h2>
    </div> 
    </>
  )
}
