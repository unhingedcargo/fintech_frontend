"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

export default function CreateItem() {
  const firstFocus = useRef(null);
  const router = useRouter();
  const [gstStatus, setGSTStatus] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const [item, setItem] = useState({
    "type": "",
    "code": "",
    "item": "",
    "unit": "nos",
    "hsn_code": "",
    "tax_preference": "",
    "taxrates": 0.0,
    "purchase_rate": 0.0,
    "sales_rate": 0.0
  });

  useEffect(() => {
    if(firstFocus.current) {
      firstFocus.current.focus();
    }
  },[])

  const handleItemType = (e) => {
    setItem((prev) => ({...prev, "type" : e.target.value}));
  }
  
  const handleUnitType = (e) => {
    setItem((prev) => ({...prev, "unit" : e.target.value}));
  }
  
  const handleIsTaxable = (e) => {
    setItem((prev) => ({...prev, "tax_preference" : e.target.value}));
  }
  
  const showData = () => {
    
    console.log(item);
  }
  
  const handleTaxRate = (e) => {
    setItem((prev) => ({...prev, "taxrates" : parseFloat(e.target.value)}));
  }

  const handleGSTInput = (e) => {
    setItem((prev) => ({...prev, "gstin":e.target.value}))
  }





  const saveCustomer = () => {
    setLoader(true);
    // const CREATE_ITEM_URI = "https://fintech-backend-08wx.onrender.com/api/item/create"
    const CREATE_ITEM_URI = "http://localhost:8000/api/item/create"
    fetch(CREATE_ITEM_URI, {
      method: 'POST',
      body: JSON.stringify(item),
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
      router.push(`/item?message=${encodeURIComponent(item.item)} Created Successfully!!`); 
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

            <h1 className='text-2xl mb-4'>New Item</h1>
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
            <div className="grid grid-cols-2 gap-8 mt-5">
                
              <div className='col-span-2'>
                <form className="filter items-center gap-2">
                  <span>Item Type</span>
                  <input className="btn btn-square" type="reset" value="×"/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Goods" value={"Goods"} onClick={handleItemType} ref={firstFocus}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Service" value={"Service"} onClick={handleItemType}/>
                </form>
              </div>
                
                <div className='col-span-2'>
                  <label className="input w-[50%]">
                    <span className="label">Name</span>
                    <input tabIndex={0} type="text" placeholder="Product Name"
                    onChange={(e) => setItem((prev) => ({...prev, "item":e.target.value}))}/>
                  </label>
                </div>
                
                <div className='col-span-2'>
                  <label className="input w-[50%]">
                    <span className="label">Item Code</span>
                    <input type="text" placeholder="Code that specify the product" 
                    onChange={(e) => setItem((prev) => ({...prev, "code":e.target.value}))}/>
                  </label>
                </div>
               
                <div className='col-span-2'>
                  <label className="input w-[50%]">
                    <span className="label">HSN Code</span>
                    <input type="text" 
                    onChange={(e) => setItem((prev) => ({...prev, "hsn_code":e.target.value}))}/>
                  </label>
                </div>

              <div className='col-span-2'>
                <form className="filter items-center gap-2">
                  <span>Units</span>
                  <input className="btn btn-square" type="reset" value="×"/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Nos" value={"nos"} onClick={handleUnitType}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Set" value={"set"} onClick={handleUnitType}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Pcs" value={"pcs"} onClick={handleUnitType}/>
                </form>
              </div>
              
              <div className='col-span-2'>
                <form className="filter items-center gap-2">
                  <span>Is Item Taxable?</span>
                  <input className="btn btn-square" type="reset" value="×"/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Taxable" value={"Taxable"} onClick={handleIsTaxable}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Non-Taxable" value={"Non-Taxable"} onClick={handleIsTaxable}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Non-GST Supply" value={"Non-GST Supply"} onClick={handleIsTaxable}/>
                </form>
              </div>
              
              <div className='col-span-2'>
                <form className="filter items-center gap-2">
                  <span>Tax Rate Slab</span>
                  <input className="btn btn-square" type="reset" value="×"/>
                  <input className="btn" type="radio" name="frameworks" aria-label="GST0-[0%]" value={0} onClick={handleTaxRate}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="GST5-[5%]" value={5} onClick={handleTaxRate}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="GST12-[12%]" value={12} onClick={handleTaxRate}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="GST18-[18%]" value={18} onClick={handleTaxRate}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="GST28-[28%]" value={28} onClick={handleTaxRate}/>
                </form>
              </div>
              
              <div className='col-span-2'>
                  <label className="input w-[50%]">
                    <span className="label">Purchase Rate</span>
                    <input tabIndex={0} type="text"
                    onChange={(e) => setItem((prev) => ({...prev, "purchase_rate":parseFloat(e.target.value)}))}/>
                  </label>
                </div>              

              <div className='col-span-2'>
                  <label className="input w-[50%]">
                    <span className="label">Sales Rate</span>
                    <input tabIndex={0} type="text"
                    onChange={(e) => setItem((prev) => ({...prev, "sales_rate":parseFloat(e.target.value)}))}/>
                  </label>
                </div>              
                

                
              <div>
                <button className='btn btn-wide btn-outline btn-success' onClick={saveCustomer}>Create</button>
                <button className='btn btn-ouline ms-4' onClick={()=>{window.location.reload()}}>Cancel</button>
                <button className='btn btn-ouline ms-4' onClick={showData}>showItem</button>
              </div>



                {/* This is main body of the input form */}
            </div>
            
        </div>
      </div>
    </>
  )
}
