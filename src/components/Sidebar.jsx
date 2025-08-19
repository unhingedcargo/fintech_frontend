"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaLandmark, FaRupeeSign } from "react-icons/fa";
import { MdProductionQuantityLimits } from 'react-icons/md';

export default function Sidebar() {
  const [isSales, setIsSales] = useState(false);
  const [isPurchase, setIsPurchase] = useState(false);
  
  return (
    <>
    <div className="flex pt-20">
      {/* Sidebar */}
      <div
        // Conditional class based on isOpen 
        // state to control width and visibility
        className={`bg-gray-900 text-white 
                    fixed w-[12%] h-screen transition-all overflow-y-auto
                    duration-300 z-10`}>
        {/* Sidebar content */}
        <div className="flex flex-col items-start ps-5">
          <div className="flex flex-row gap-6 mt-4 py-2">
            <FaHome fontSize={20} /> <Link href="/" className="text-lg text-white hover:text-amber-400 transition delay-50 duration-300">Home</Link>
          </div>

          <div className="flex flex-row gap-6 mt-4 py-2">
            <MdProductionQuantityLimits fontSize={20} className='' /> <Link href="/" className="text-lg text-white hover:text-amber-400 transition delay-50 duration-300">Items</Link>
          </div>

          <div className="flex flex-row gap-6 mt-4 py-2">
            <FaLandmark fontSize={20}/>
            <button className="text-lg text-white hover:text-amber-400 transition delay-50 duration-300"
            onClick={() => {setIsSales(!isSales); isPurchase?setIsPurchase(!isPurchase):setIsPurchase(isPurchase)}}>Sales</button>
          </div>
            <div className={`flex flex-col text-start me-auto
              ${!isSales?'hidden':'block'}
              `}>
            <Link href='/customer' className='my-2 mt-3 hover:text-amber-400'>Customers</Link>
            <Link href='/estimate' className='my-2 mt-3 hover:text-amber-400'>Estimate</Link>
            <Link href='/' className='my-2 mt-3 hover:text-amber-400'>Sales Order</Link>
              
            </div>
          
          <div className="flex flex-row gap-6 mt-4 py-2">
            <FaRupeeSign fontSize={20}/>
            <button className="text-lg text-white hover:text-amber-400 transition delay-50 duration-300"
            onClick={() => {setIsPurchase(!isPurchase); isSales?setIsSales(!isSales):setIsPurchase(isSales)}}>Purchase</button>
          </div>
            <div className={`flex flex-col text-start me-auto
              ${!isPurchase?'hidden':'block'}
              `}>
            <Link href='/estimate' className='my-2 mt-3 hover:text-amber-400'>Vendors</Link>
            <Link href='/' className='my-2 hover:text-amber-400'>Purchase Bill</Link>
              
            </div>
          
          {/* Add more sidebar items here */}
        </div>
      </div>
    </div>
  
    </>
  )
}
