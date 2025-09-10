"use client"
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Items() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message")
  const [alert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);

  // const ITEM_URI = "https://fintech-backend-08wx.onrender.com/api/item/all"
  const ITEM_URI = "http://localhost:8000/api/item/all";

  useEffect(() => {
    if(message) {
      setAlert(true);
    }
    setTimeout(() => {
      router.replace("/item")
      setAlert(false);
    }, 3000);
  },[message])

  useEffect(() => {
    setLoader(true);
    const fetchItems = async () => {
      try {
        const res = await fetch(ITEM_URI);
        if(!res.ok) {
          throw new Error("Failed to fetch");
        }
        setItems(await res.json());
      } catch(err) {
        console.log
      } finally {
        setLoader(false);
      }
    };
    fetchItems();
  },[])

  return (
    <>
        <div className='flex'>
      <div className="w-full md:w-64">
        <Sidebar />
      </div>
      <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>

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

          <h1 className='text-2xl mb-4 me-4'>All Items{loader && (<span className="loading loading-spinner loading-xl ms-4"></span>)}</h1>
          <Link href="/item/create-new" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>New +</Link>
        </div>

          <table className='min-w-full border border-collapse border-blue-400 text-lg mt-8 table table-zebra'>
            <thead className='dark:bg-blue-950'>
              <tr>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[5%]'>#</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[35%]'>ITEM</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[20%]'>ITEM CODE</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[10%]'>HSN CODE</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[10%]'>TAX RATES</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[10%]'>PURCHASE RATE</th>
                <th className='border-2 border-blue-400 text-sm px-4 py-3 w-[10%]'>SALES RATE</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, index) => (
                <tr key={index+1} className='cursor-pointer' onClick={() => (router.push(`item/${row.item_id}`))}>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[5%] text-center'>{index+1}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[35%]'>{row.item}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[20%]'>{row.code}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[10%] text-center'>{row.hsn_code}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[10%] text-center'>{row.taxrates}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[10%] text-center'>{row.purchase_rate}</td>
                <td className='border-r-2 border-blue-400 font-normal text-sm px-4 py-3 w-[10%] text-center'>{row.sales_rate}</td>
              </tr>
              ))}
            </tbody>
          </table>    
      </div>
    </div>
    </>
  )
}
