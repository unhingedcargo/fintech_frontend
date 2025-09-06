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
    "unit": "",
    "hsn_code": "",
    "tax_preference": "",
    "taxrates": null,
    "purchase_rate": null,
    "sales_rate": null
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
    const slug = Date.now().toString();
    console.log(slug);
  }
  
  const handleTaxRate = (e) => {
    setItem((prev) => ({...prev, "taxrates" : parseFloat(e.target.value)}));
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
          </div>

          {showAlert &&
            <div role="alert" className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Contact Created Successfully!</span>
            </div>
          } 
            <div className="grid grid-cols-12 gap-8 mt-5 items-center">

              <div className="col-span-2">
                  <span>Item Type</span>
                </div>  
              <div className='col-span-4 gap-4'>
                <input className="join-item btn rounded-full me-4 px-8" type="radio" name="options" aria-label="Goods" value="Goods"
                onChange={handleItemType} />
                <input className="join-item btn rounded-full me-4 px-8" type="radio" name="options" aria-label="Service" value="Service"
                onChange={handleItemType} />
              </div>
              <div className="col-span-4"></div>
              <div className="col-span-2">{item.type && `[ ${item.type} ]`}</div>
              
              <div className="col-span-2">
                  <span>Name</span>
                </div>  
              <div className='col-span-6'>
                <input type="text" placeholder="Product Name" className="input w-full rounded-full px-6"
                onChange={(e) => setItem((prev) => ({...prev, "item":e.target.value}))} />
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-2">{item.item && `[ ${item.item} ]`}</div>
              
              <div className="col-span-2">
                  <span>Item Code</span>
                </div>  
              <div className='col-span-6'>
                <input type="text" placeholder="Code that specify the product" className="input w-full rounded-full px-6"
                onChange={(e) => setItem((prev) => ({...prev, "code":e.target.value}))} />
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-2">{item.code && `[ ${item.code} ]`}</div>
              
              <div className="col-span-2">
                  <span>HSN Code</span>
                </div>  
              <div className='col-span-4'>
                <input type="text" placeholder="Code that specify the product" className="input w-full rounded-full px-6"
                onChange={(e) => setItem((prev) => ({...prev, "hsn_code":e.target.value}))} />
              </div>
              <div className="col-span-4"></div>
              <div className="col-span-2">{item.hsn_code && `[ ${item.hsn_code} ]`}</div>
              
              <div className="col-span-2">
                  <span>Units</span>
                </div>  
              <div className='col-span-4'>
                <div className="join items-center gap-4">
                  <input className="join-item btn rounded-full px-6" type="radio" name="options" value="nos" aria-label="nos" 
                  onChange={handleUnitType}/>
                  <input className="join-item btn rounded-full px-6" type="radio" name="options" value="pcs" aria-label="pcs" 
                  onChange={handleUnitType}/>
                  <input className="join-item btn rounded-full px-6" type="radio" name="options" value="set" aria-label="set" 
                  onChange={handleUnitType}/>
                </div>
              </div>
              <div className="col-span-4"></div>
              <div className="col-span-2">{item.unit && `[ ${item.unit} ]`}</div>
                


                {/* <div className='col-span-2'>
                  <label className="input w-full">
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
                    onChange={(e) => setItem((prev) => ({...prev, "hsn_code":e.target.value}))} />
                  </label>
                </div> */}

              {/* <div className='col-span-2'>
                <form className="filter items-center gap-2">
                  <span>Units</span>
                  <input className="btn btn-square" type="reset" value="×"/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Nos" value={"nos"} onClick={handleUnitType}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Set" value={"set"} onClick={handleUnitType}/>
                  <input className="btn" type="radio" name="frameworks" aria-label="Pcs" value={"pcs"} onClick={handleUnitType}/>
                  </form>
                <div className="join items-center gap-4">
                  <span className='me-5'>Units</span>
                  <input className="join-item btn" type="radio" name="options" aria-label="Radio 1" />
                  <input className="join-item btn" type="radio" name="options" aria-label="Radio 2" />
                  <input className="join-item btn" type="radio" name="options" aria-label="Radio 3" />
                </div>
              </div> */}

              <div className="col-span-2">
                  <span>Taxable?</span>
                </div>  
              <div className='col-span-5'>
                <div className="join items-center gap-4">
                  <input className="join-item btn rounded-full px-6" type="radio" name="options" value="Taxable" aria-label="Taxable" 
                  onChange={handleIsTaxable} />
                  <input className="join-item btn rounded-full px-6" type="radio" name="options" value="Non-Taxable" aria-label="Non-Taxable" 
                  onChange={handleIsTaxable} />
                  <input className="join-item btn rounded-full px-6" type="radio" name="options" value="Non-GST Supply" aria-label="Non-GST Supply" 
                  onChange={handleIsTaxable} />
                </div>
              </div>
              <div className="col-span-3"></div>
              <div className="col-span-2">{item.tax_preference && `[ ${item.tax_preference} ]`}</div>

              <div className="col-span-2">
                  <span>Tax Rate</span>
                </div>  
              <div className='col-span-4'>
                <select defaultValue="Pick a color" className="select rounded-full px-6" onChange={handleTaxRate}>
                  <option disabled={true}>Tax Rate Slab</option>
                  <option value={0}>GST0-[0%]</option>
                  <option value={5}>GST5-[5%]</option>
                  <option value={12}>GST12-[12%]</option>
                  <option value={18}>GST18-[18%]</option>
                  <option value={28}>GST28-[28%]</option>
                </select>
              </div>
              <div className="col-span-4"></div>
              <div className="col-span-2">{item.taxrates && `[ ${item.taxrates}% ]`}</div>

              <div className="col-span-2">
                  <span>Purchase Rate</span>
                </div>  
              <div className='col-span-4'>
                <input type="text" className="input w-full rounded-full px-6"
                onChange={(e) => setItem((prev) => ({...prev, "purchase_rate":Number(e.target.value)}))} />
              </div>
              <div className="col-span-4"></div>
              <div className="col-span-2">{item.purchase_rate && `[ ${item.purchase_rate} ]`}</div>

              <div className="col-span-2">
                  <span>Sales Rate</span>
                </div>  
              <div className='col-span-4'>
                <input type="text" className="input w-full rounded-full px-6"
                onChange={(e) => setItem((prev) => ({...prev, "sales_rate":Number(e.target.value)}))} />
              </div>
              <div className="col-span-4"></div>
              <div className="col-span-2">{item.sales_rate && `[ ${item.sales_rate} ]`}</div>

                
              <div className='col-span-12'>
                <button className='btn btn-wide' onClick={saveCustomer}>Create</button>
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
