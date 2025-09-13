"use client"

import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'


function CustomerComponent() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message")
  const [alert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);


  // const message = searchParams.get('message');

  // const CUSTOMER_URI = "http://localhost:8000/api/customer/all";
  const CUSTOMER_URI = "https://fintech-backend-08wx.onrender.com/api/customer/all"

  useEffect(() => {
    if(message) {
      setAlert(true);
    }
    setTimeout(() => {
      router.replace("/customer")
      setAlert(false);
    }, 3000);
  },[message])


  useEffect(() => {
    setLoader(true)    ;
    const fetchCustomers = async () => {
      try{
        const res = await fetch(CUSTOMER_URI);
        if(!res.ok) {
          throw new Error("Failed to fetch")
        };
        const data = await res.json();
        setCustomers(data);
        console.log(data);
      } catch(err){
        console.log(err);
      } finally {
        setLoader(false);        
      }
    };
    fetchCustomers();
  },[])




  return (
    <>
    <div className='flex'>
      <div className="w-full sm:w-[12%]">
        <Sidebar />
      </div>
      <div className='flex-1 ms-5 me-8 my-5 overflow-auto pt-20'>

        <div className='w-[80%] mb-5'>
              {alert &&
              <div role="alert" className="alert alert-success alert-soft">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='text-lg'>{message}</span>
              </div>
              } 
            </div>
        
        <div className="flex flex-row align-middle">

          <h1 className='text-2xl mb-4'>All Customers{loader && (<span className="loading loading-spinner loading-xl ms-4"></span>)}</h1>
          <Link href="/customer/create-new" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>New +</Link>
        </div>

          <table className='min-w-full border border-collapse border-blue-400 text-lg mt-8'>
            <thead className='dark:bg-blue-950'>
              <tr>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[5%]'>#</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[25%]'>Customer</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[25%]'>Company Name</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[10%]'>Contact</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[10%]'>Alternate Contact</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[15%]'>GSTIN</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[10%]'>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((row, index) => (
                <tr key={index+1} className='cursor-pointer' onClick={() => (router.push(`customer/${row.cust_id}`))}>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[5%] text-center'>{index+1}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[25%]'>{row.display_name}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[25%]'>{row.company_name}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[10%] text-center'>{row.contact}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[10%] text-center'>{row.alt_contact}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[15%] text-center'>{row.gstin}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[10%] text-end'>{row.closing_balance}</td>
              </tr>
              ))}
            </tbody>
          </table>    
      </div>
    </div>
    </>
  )
}

export default function Customers() {
  return (
  <Suspense fallback={<div>Loading...</div>}>
    <CustomerComponent />
  </Suspense>
  )
}
