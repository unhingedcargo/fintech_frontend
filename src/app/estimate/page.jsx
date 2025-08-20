"use client"
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'



export default function EstimatePage() {
  const[estimates, setEstimates] = useState([]);
  const router = useRouter();

  // useEffect(()=>{
  //   await fetch("http://localhost:8000/api/jobcard")
  //   .then((res) => res.json())
  //   .then((data) => setEstimates(data));
  // },[]);
  

  useEffect(() => {
    // fetch data inside async function
    const fetchEstimates = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/jobcard");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEstimates(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEstimates();
  }, []);

  return (
    <>
    
    <div className='flex'>
      <div className="w-full md:w-64">
        <Sidebar />
      </div>
      <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
        <div className="flex flex-row align-middle">
          <h1 className='text-2xl mb-4'>Estimate page</h1>
          <Link href="/estimate/create-new" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>New +</Link>
        </div>
          <table className='border border-collapse border-blue-400 text-base mt-8 w-[90%]'>
            <thead className='bg-blue-950'>
              <tr className=''>
                <th className='border-2 border-blue-400 font-normal px-4 py-3 w-[5%]'>#</th>
                <th className='border-2 border-blue-400 font-normal px-4 py-3 w-[15%]'>Date</th>
                <th className='border-2 border-blue-400 font-normal px-4 py-3 w-[20%]'>Customer</th>
                <th className='border-2 border-blue-400 font-normal px-4 py-3 w-[20%]'>Contact</th>
                <th className='border-2 border-blue-400 font-normal px-4 py-3 w-[10%]'>Value</th>
                <th className='border-2 border-blue-400 font-normal px-4 py-3 w-[10%]'>Outstanding</th>
                <th className='border-2 border-blue-400 font-normal px-4 py-3 w-[10%]'>Status</th>
                <th className='border-2 border-blue-400 font-normal px-4 py-3 w-[5%]'>View</th>

              </tr>
            </thead>
            <tbody>
              {estimates.map((row,index) => (
                <tr key={index+1} className='cursor-pointer' onClick={() => router.push(`/estimates/${row.jobno}`)}>
                  <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[5%]'>{index+1}</td>
                  <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[15%] text-center'>{row.job_date}</td>
                  <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[20%]'>{row.cust_id}</td>
                  <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[20%]'>{row.cust_id}</td>
                  <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[10%] text-right'>{row.grandtotal}</td>
                  <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[10%] text-right'>{row.grandtotal - row.advance}</td>
                  <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[10%] text-center'>{row.jobno}</td>
                  <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[5%] text-center'>
                    <Link href="" className='bg-gray-800 px-4 py-2 rounded-md hover:text-amber-400 hover:bg-gradient-to-b'>View</Link>
                  </td>
                </tr>
              ))}
              {/* <tr>
                <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[5%]'>#</td>
                <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[15%] text-center'>Date</td>
                <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[20%]'>Customer</td>
                <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[20%]'>Contact</td>
                <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[10%] text-right'>Value</td>
                <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[10%] text-right'>Outstanding</td>
                <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[10%] text-center'>Status</td>
                <td className='border-2 border-blue-400 font-normal px-4 py-2 w-[5%] text-center'>
                  <Link href="" className='bg-gray-800 px-4 py-2 rounded-md hover:text-amber-400 hover:bg-gradient-to-b'>View</Link>
                  </td>
              </tr> */}
            </tbody>
          </table>
      </div>
    </div>
    </>
  )
}
