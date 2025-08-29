"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function NewCustomer() {
  const firstFocus = useRef(null);
  const [gstStatus, setGSTStatus] = useState(false);
  const [customer, setCustomer] = useState({
    "acc_type" : "Purchase",
    "type_of_contact" : "Vendor",
    "company_name" : "",
    "name" : "",
    "display_name" : "",
    "contact" : "",
    "alt_contact" : "",
    "email" : "",
    "taxable" : false,
    "gstin" : "",
    "opening_balance" : 0.0
  });

  useEffect(() => {
    if(firstFocus.current) {
      firstFocus.current.focus();
    }
  },[])

  const handleGSTStatus = (e) => {
    let gstValue = document.getElementById("gstInput");
    setGSTStatus(e.target.checked);
    setCustomer((prev) => ({...prev, "taxable" : e.target.checked}))
    e.target.checked?setCustomer((prev) => ({...prev, "gstin":gstValue.value})):setCustomer((prev) => ({...prev, "gstin":""}))
  }

  const handleGSTInput = (e) => {
    setCustomer((prev) => ({...prev, "gstin":e.target.value}))
  }

  const saveCustomer = () => {
    console.log(customer);
    // const URI = "http://localhost:8000/api/contact/create"
    const URI = "https://fintech-backend-08wx.onrender.com/api/contact/create"
    fetch(URI, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers:{
        "content-type" : "application/json; charset=UTF-8" 
      }
    })
    .then(response => {
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log("Data Submitted Successfully!!")
      window.location.reload()
    })
    .catch(error => {
      console.log(error);
    })
  }



  return (
    <>
      <div className='flex'>
        <div className="w-full md:w-64">
          <Sidebar />
        </div>
        <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
          <div className="flex flex-row align-middle">
            <h1 className='text-2xl mb-4'>Add New Vendor</h1>
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
          
            <div className="grid grid-cols-2 gap-8 mt-5">
                <div className='col-span-2'>
                  <label className="input w-[50%]">
                    <span className="label">Company Name</span>
                    <input tabIndex={0} type="text" placeholder="Comapany Name" ref={firstFocus}
                    onChange={(e) => setCustomer((prev) => ({...prev, "company_name":e.target.value}))}/>
                  </label>
                </div>
                
                <div className='col-span-2'>
                  <label className="input w-[50%]">
                    <span className="label">Name</span>
                    <input tabIndex={0} type="text" placeholder="Customer"
                    onChange={(e) => setCustomer((prev) => ({...prev, "name":e.target.value}))}/>
                  </label>
                </div>
                
                <div className='col-span-2'>
                  <label className="input w-[50%]">
                    <span className="label">Display Name</span>
                    <input type="text" placeholder="Display Name" 
                    onChange={(e) => setCustomer((prev) => ({...prev, "display_name":e.target.value}))}/>
                  </label>
                </div>
                
                <div>
                  <label className="input w-[50%]">
                    <span className="label">Contact No.</span>
                    <input type="text" placeholder="XXXXX-XXXXX" 
                    onChange={(e) => setCustomer((prev) => ({...prev, "contact":e.target.value}))}/>
                  </label>
                </div>
                <div>
                  <label className="input w-[60%]">
                    <span className="label">Alternate Contact No.</span>
                    <input type="text" placeholder="XXXXX-XXXXX" 
                    onChange={(e) => setCustomer((prev) => ({...prev, "alt_contact":e.target.value}))}/>
                  </label>
                </div>
                
                <div className='col-span-2'>
                  <label className="input validator w-[50%]">
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
                    <input type="email" placeholder="mail@email.com" 
                    onChange={(e) => setCustomer((prev) => ({...prev, "email":e.target.value}))}/>
                  </label>
                  <div className="validator-hint hidden">Enter valid email address</div>
                </div>
                
                <div className='col-span-2 -mb-7'>
                  <p className='text-sm'>*Check to enable GST Status (Registered or Not Registered)</p>
                </div>

                <div>
                  <label className="input w-[60%]">
                    {/* <span className="label">GSTIN</span> */}
                    <span className='label'>
                      <label className="swap pe-2">
                        <input type="checkbox" checked={gstStatus} onChange={handleGSTStatus}/>
                        <div className="swap-on bg-green-400 rounded-lg text-black font-bold py-2 px-4">GST Registered</div>
                        <div className="swap-off bg-red-600 rounded-lg text-white font-medium py-2 px-4">Not Registered</div>
                      </label>
                    </span>
                    <input type="text" placeholder="99ABCDE9999F1ZX" id='gstInput' disabled={!gstStatus} onChange={handleGSTInput} onFocus={handleGSTInput} onBlur={handleGSTInput}/>
                  </label>
                </div>

                <div></div>
                {/* <div></div> */}

                <div className='col-span-2'>
                  <label className="input w-[30%]">
                    <span className="label">Opening Balance</span>
                    <input type="text" defaultValue={0.00} 
                    onChange={(e) => setCustomer((prev) => ({...prev, "opening_balance":e.target.value}))}/>
                  </label>
                </div>

                <div>
                  <button className='btn btn-wide btn-outline btn-success' onClick={saveCustomer}>Create</button>
                  <button className='btn btn-ouline ms-4' onClick={()=>{window.location.reload()}}>Cancel</button>
                </div>



                {/* This is main body of the input form */}
            </div>
            
        </div>
      </div>
    </>
  )
}
