"use client"
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function Vendor() {
    const [vendors, setVendors] = useState([]);
    const router = useRouter();
  
    // const VENDOR_URI = "https://fintech-backend-08wx.onrender.com/api/vendor/all"
    const VENDOR_URI = "http://localhost:8000/api/vendor/all"
  
  
    useEffect(() => {
      const fetchVendors = async () => {
        try{
          const res = await fetch(VENDOR_URI);
          if(!res.ok) {
            throw new Error("Failed to fetch")
          };
          setVendors(await res.json());
          vendors.map((row) => console.log(row))
          // console.log("ALL VENDORS", vendors)
  
        } catch(err){
          console.log(err);
        }
      };
      fetchVendors();
    },[])



  
  return (
    <>
    <div className='flex'>
      <div className="w-full md:w-64">
        <Sidebar />
      </div>
      <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
        <div className="flex flex-row align-middle">
          <h1 className='text-2xl mb-4'>All Vendors</h1>
          <Link href="/vendor/create-new" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>New +</Link>
        </div>

          <table className='min-w-full border border-collapse border-blue-400 text-lg mt-8'>
            <thead className='bg-blue-950'>
              <tr>
                <th className='border-2 border-blue-400 px-4 py-2 w-[5%]'>#</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[20%]'>Supplier</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[25%]'>Company Name</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[20%]'>Contact</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[15%]'>GSTIN</th>
                <th className='border-2 border-blue-400 px-4 py-2 w-[15%]'>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((row, index) => (
                <tr key={index+1} className='cursor-pointer' onClick={() => (router.push(`vendor/${row.display_name}`))}>
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
