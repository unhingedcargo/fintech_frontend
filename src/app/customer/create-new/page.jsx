"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

export default function NewCustomer() {
  const firstFocus = useRef(null);
  const router = useRouter();
  const [gstStatus, setGSTStatus] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const [customer, setCustomer] = useState({
    "acc_type" : "Sales",
    "type_of_contact" : "Customer",
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
    const newValue = e.target.checked;
    setGSTStatus(newValue);
    setCustomer((prev) => ({...prev, "taxable":newValue}));
    !newValue ? setCustomer((prev) => ({...prev, "gstin":""})) : null
  }

  const updateCustomer = (e) => {
    // console.log(customer);
    setCustomer((prev) => ({...prev, [e.target.name]:e.target.value}))
  }

  const saveCustomer = () => {
    setLoader(true);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
    const CREATE_CUSTOMER_URI = `${BASE_URL}/contact/create`;
    // const CREATE_CUSTOMER_URI = "http://localhost:8000/api/contact/create"
    fetch(CREATE_CUSTOMER_URI, {
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
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      router.push(`/customer?message=${encodeURIComponent(customer.display_name)} Created Successfully!!`); 
    })
    .catch(error => {
      console.log(error);
    })
    .finally (() => {
      setLoader(false);
    });
  }



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
        <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
          <div className="flex flex-row align-middle">
            <h1 className='text-2xl mb-4'>Add New Customer</h1>
            {/* <Link href="/estimate/create-new" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>New +</Link> */}
          </div>

          {showAlert &&
            <div role="alert" className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Contact Created Successfully!</span>
            </div>
          } 


            <div className="grid grid-cols-12 gap-8 mt-5 items-center p-5">

              <div className="col-span-2">
                  Company Name
                </div>  
              <div className='col-span-6'>
                <input type="text" placeholder="Company Name" ref={firstFocus}
                className="input w-full rounded-full px-6" 
                maxLength={100} name='company_name'
                onChange={updateCustomer} />
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-2">{}</div>

              <div className="col-span-2">
                  Contact Name
                </div>  
              <div className='col-span-6'>
                <input type="text" placeholder="Name" className="input w-full rounded-full px-6"
                maxLength={50} name='name'
                onChange={updateCustomer} />
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-2">{}</div>

              <div className="col-span-2">
                  Display Name
                </div>  
              <div className='col-span-6'>
                <input type="text" placeholder="Display Name" className="input w-full rounded-full px-6"
                maxLength={100} name='display_name'
                onChange={updateCustomer} />
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-2">{}</div>

              <div className="col-span-2">
                  Primary Contact
                </div>  
              <div className='col-span-2'>
                <input type="text" placeholder="+91 XXXXX XXXXX" className="input w-full rounded-full px-6"
                maxLength={15} name='contact'
                onChange={updateCustomer} />
              </div>
              <div className="col-span-6"></div>
              <div className="col-span-2">{}</div>

              <div className="col-span-2">
                  Alternate Contact
                </div>  
              <div className='col-span-2'>
                <input type="text" placeholder="+91 XXXXX XXXXX" className="input w-full rounded-full px-6"
                maxLength={15} name='alt_contact'
                onChange={updateCustomer} />
              </div>
              <div className="col-span-6"></div>
              <div className="col-span-2">{}</div>

              <div className="col-span-2">
                  Email Address
                </div>  
              <div className='col-span-6'>
                <input type="email" placeholder="Email Address" className="input validator w-full rounded-full px-6"
                maxLength={100} name='email'
                onChange={updateCustomer} />
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-2">{}</div>
              
              <div className="col-span-2">
                  <span>GST Registration</span>
                </div>  
              <div className='col-span-2 gap-4 items-center'>
                <span className='label'>
                  <label className="swap pe-2">
                    <input type="checkbox" onChange={(handleGSTStatus)}/>
                    <div className="swap-on bg-green-400 rounded-lg text-black font-bold py-2 px-4">GST Registered</div>
                    <div className="swap-off bg-red-600 rounded-lg text-white font-medium py-2 px-4">Not Registered</div>
                  </label>
                </span>
              </div>
              {gstStatus && 
                <>
                <div className="col-span-3">
                  <input type="text" placeholder="Enter GST Number" className="input w-full rounded-full px-6"
                  maxLength={15} name='gstin'
                onChange={updateCustomer} />
                </div>
                <div className="col-span-5"></div>
                </>  
                }
              {!gstStatus && 
                <>
                <div className="col-span-5">
                  <span>Click if you have gst registered business</span>
                </div>
                <div className="col-span-3"></div>
                </>  
                }

              <div className="col-span-2">
                  Opening Balance
                </div>  
              <div className='col-span-2'>
                <input type="text" className="input w-full rounded-full px-6" defaultValue={0}
                maxLength={5} name='opening_balance'
                onChange={updateCustomer} />
              </div>
              <div className="col-span-6"></div>
              <div className="col-span-2">{}</div>

              <div className='col-span-4 mt-8'>
                <button className='btn btn-wide btn-outline btn-success' onClick={saveCustomer}>Create</button>
                <button className='btn btn-ouline ms-8' onClick={()=>{window.location.reload()}}>Cancel</button>
                {/* <button className='btn btn-ouline ms-4' onClick={()=>{console.log(customer)}}>Show</button> */}
              </div>
                

            </div>
            
        </div>
      </div>
    </>
  )
}
