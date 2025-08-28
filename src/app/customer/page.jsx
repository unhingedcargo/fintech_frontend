"use client"
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  // const CUSTOMER_URI = "https://fintech-backend-08wx.onrender.com/api/customer/all"
  const CUSTOMER_URI = "http://localhost:8000/api/customer/all"


  useEffect(() => {
    const fetchCustomers = async () => {
      try{
        const res = await fetch(CUSTOMER_URI);
        if(!res.ok) {
          throw new Error("Failed to fetch")
        };
        setCustomers(await res.json());

      } catch(err){
        console.log(err);
      }
    };
    fetchCustomers();
  },[])




  return (
    <>
    <div className='flex'>
      <div className="w-full md:w-64">
        <Sidebar />
      </div>
      <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
        <div className="flex flex-row align-middle">
          <h1 className='text-2xl mb-4'>All Customers</h1>
          <Link href="/customer/create-new" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>New +</Link>
        </div>

          <table className='min-w-full border border-collapse border-blue-400 text-lg mt-8'>
            <thead className='dark:bg-blue-950'>
              <tr>
                <th className='border-2 border-blue-400 px-4 py-2 w-[5%]'>#</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[20%]'>Customer</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[25%]'>Company Name</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[20%]'>Contact</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[15%]'>GSTIN</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[15%]'>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((row, index) => (
                <tr key={index+1} className='cursor-pointer' onClick={() => (router.push(`customer/${row.display_name}`))}>
                <td className='border-2 border-blue-400 px-4 py-4 w-[5%] text-center'>{index+1}</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[20%]'>{row.display_name}</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[25%]'>{row.company_name}</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[20%] text-center'>{row.contact}</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[15%] text-center'>{row.gstin}</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[15%] text-end'>{row.closing_balance}</td>
              </tr>
              ))}
            </tbody>
          </table>    
      </div>
    </div>
    </>
  )
}
