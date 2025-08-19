import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import React from 'react'


export default function Customer() {
  return (
    <>
    <div className='flex'>
      <div className="w-full md:w-64">
        <Sidebar />
      </div>
      <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
        <div className="flex flex-row align-middle">
          <h1 className='text-2xl mb-4'>Customer</h1>
          <Link href="/customer/create-new" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>New +</Link>
        </div>

          <table className='min-w-full border border-collapse border-blue-400 text-lg mt-8'>
            <thead className='bg-blue-950'>
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
              <tr>
                <td className='border-2 border-blue-400 px-4 py-4 w-[5%] text-center'>123</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[20%]'>Date</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[25%]'>Date</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[20%] text-center'>Customer</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[15%] text-center'>Value</td>
                <td className='border-2 border-blue-400 px-4 py-4 w-[15%] text-end'>Status</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
    </>
  )
}
