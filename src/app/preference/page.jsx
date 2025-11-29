"use client"
import Sidebar from '@/components/Sidebar';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';

export default function preference() {
    const [loader, setLoader] = useState(false);



  return (
    <>
        {loader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}
      <div className='flex'>
        <div className="w-full md:w-64">
          <Sidebar />
        </div>
        <main className='flex-1 mx-8 my-5 overflow-auto pt-20'>
          <div className="flex flex-row items-center">
            <h1 className='text-2xl mb-4'>Preference</h1>
            <Link href="/" className='bg-blue-600 hover:bg-blue-300 text-white text-md ms-auto me-0 rounded-md py-2 px-6'>
            Home
            </Link>
          </div>
          {/* Card starts from here */}
          <div className="card w-full px-15 pt-5 mt-5 bg-base-100 card-md shadow-sm">
            <div className="card-body w-full">
             
            </div> {/* Card body div ends here */}
          </div> {/* Card div ends here */}


        {/* body div ends */}
        </main> 
        {/* main div ends */}
    </div>
    </>
  )
}
