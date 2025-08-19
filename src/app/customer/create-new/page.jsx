"use client"
import Link from 'next/link';
import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function NewCustomer() {

  const getData = () => {
    console.log("Create Button Clicked");
  }

  return (
    <>
      <div className='flex'>
        <div className="w-full md:w-64">
          <Sidebar />
        </div>
        <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
          <div className="flex flex-row align-middle">
            <h1 className='text-2xl mb-4'>Add New Customer</h1>
            {/* <Link href="/estimate/create-new" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>New +</Link> */}
          </div>
  
            {/* <table className='min-w-full border border-collapse border-blue-400 text-lg mt-8'>
              <thead className='bg-blue-950'>
                <tr>
                  <th className='border-2 border-blue-400 px-4 py-2 w-[10%]'>#</th>
                  <th className='border-2 border-blue-400 px-4 py-2 w-[15%]'>Date</th>
                  <th className='border-2 border-blue-400 px-4 py-2 w-[35%]'>Customer</th>
                  <th className='border-2 border-blue-400 px-4 py-2 w-[20%]'>Value</th>
                  <th className='border-2 border-blue-400 px-4 py-2 w-[20%]'>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border-2 border-blue-400 px-4 py-2 w-[10%]'>#</td>
                  <td className='border-2 border-blue-400 px-4 py-2 w-[15%]'>Date</td>
                  <td className='border-2 border-blue-400 px-4 py-2 w-[35%]'>Customer</td>
                  <td className='border-2 border-blue-400 px-4 py-2 w-[20%]'>Value</td>
                  <td className='border-2 border-blue-400 px-4 py-2 w-[20%]'>Status</td>
                </tr>
              </tbody>
            </table> */}
          <div className="grid grid-cols-2 gap-8 w-[50%] mt-5">
              <div>
                <label className="input">
                  <span className="label">Name</span>
                  <input tabIndex={0} type="text" placeholder="Customer" required/>
                </label>
              </div>
              
              <div>
                <label className="input">
                  <span className="label">Display Name</span>
                  <input type="text" placeholder="Display Name" required />
                </label>
              </div>
              
              <div>
                <label className="input">
                  <span className="label">Contact No.</span>
                  <input type="text" placeholder="XXXXX-XXXXX" required />
                </label>
              </div>
              
              <div>
                <label className="input validator">
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input type="email" placeholder="mail@email.com" required />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>
              </div>

              <div>
                <label className="input">
                  <span className="label">GSTIN</span>
                  <input type="text" placeholder="99ABCDE9999F1ZX" />
                </label>
              </div>

              <div></div>

              <div>
                <button className='btn btn-wide btn-outline btn-success' onClick={getData}>Create</button>
                <button className='btn btn-ouline ms-4'>Cancel</button>
              </div>



              {/* This is main body of the input form */}
          </div>
            
        </div>
      </div>
    </>
  )
}
