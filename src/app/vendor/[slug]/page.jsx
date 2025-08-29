"use client"
import Sidebar from '@/components/Sidebar';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdOutlineCreate, MdCheck } from "react-icons/md";

export default function CustomerDetails(params) {
  const [customer, setCustomer] = useState([]);
  const [isToggled, setToggled] = useState(true);
  const [isCompany, setCompany] = useState(true);
  const [isName, setName] = useState(true);
  const [isDisplay, setDisplay] = useState(true);
  const [isContact, setContact] = useState(true);
  const [isAltContact, setAltContact] = useState(true);
  const [isEmail, setEmail] = useState(true);
  const [isGST, setGST] = useState(true);
  const {slug} = useParams();

  useEffect(() => {
      const URI = `https://fintech-backend-08wx.onrender.com/api/contact/${slug}`;
      // const URI = `http://localhost:8000/api/contact/${slug}`;
      const fetchContact = async () => {
          try {
              const res = await fetch(URI);
              if(!res.ok){
                  throw new Error ("Failed to fetch");
              }
              setCustomer(await res.json());
          }catch(err) {
              console.log(err);
          }
      }
      fetchContact();
  },[])
    

  const itemBlurred = (e) => {
    e.target.nextSibling.innerText = e.target.value;
    toggleSwitch()
  }

  return (
    <>
      <div className='flex'>
                <div className="w-full md:w-64">
                    <Sidebar />
                </div>
                <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
                    <div className="flex flex-row align-middle">

            {customer.map((row) => 
            <div className="card card-border bg-base-100 w-[80%]" key={row.id}>
              <div className="card-body">
                <div className='flex flex-row justify-between'>
                  <h2 className="card-title mb-5 text-4xl">{row.display_name}</h2>
                  <h2 className="card-title mb-5 text-2xl ">{row.acc_type}</h2>                  
                </div>
                
                <label className="input mt-5 w-[50%]">
                  <span className="label">Company Name</span>
                  <input type="text" defaultValue={row.company_name} hidden={isCompany} readOnly={isCompany} 
                  onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setCompany(!isCompany)}} />
                  <label className="w-full" hidden={!isCompany}>{row.company_name}</label>
                  <span className="label cursor-pointer text-white hover:text-amber-400"
                  onClick={() => setCompany(!isCompany)}
                  >
                    {isCompany?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
                    </span>
                </label>
                
                <label className="input mt-5 w-[50%]">
                  <span className="label">Contact Name</span>
                  <input type="text" defaultValue={row.name} hidden={isName} readOnly={isName} 
                  onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setName(!isName)}} />
                  <label className="w-full" hidden={!isName}>{row.name}</label>
                  <span className="label cursor-pointer text-white hover:text-amber-400"
                  onClick={() => setName(!isName)}
                  >
                    {isName?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
                    </span>
                </label>
                
                <label className="input mt-5 w-[50%]">
                  <span className="label">Display Name</span>
                  <input type="text" defaultValue={row.display_name} hidden={isDisplay} readOnly={isDisplay} 
                  onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setDisplay(!isDisplay)}} />
                  <label className="w-full" hidden={!isDisplay}>{row.display_name}</label>
                  <span className="label cursor-pointer text-white hover:text-amber-400"
                  onClick={() => setDisplay(!isDisplay)}
                  >
                    {isDisplay?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
                    </span>
                </label>
                
                <label className="input mt-5 w-[50%]">
                  <span className="label">Primary Contact</span>
                  <input type="text" defaultValue={row.contact} hidden={isContact} readOnly={isContact} 
                  onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setContact(!isContact)}} />
                  <label className="w-full" hidden={!isContact}>{row.contact}</label>
                  <span className="label cursor-pointer text-white hover:text-amber-400"
                  onClick={() => setContact(!isContact)}
                  >
                    {isContact?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
                    </span>
                </label>
                
                <label className="input mt-5 w-[50%]">
                  <span className="label">Alternate Contact</span>
                  <input type="text" defaultValue={row.alt_contact} hidden={isAltContact} readOnly={isAltContact} 
                  onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setAltContact(!isAltContact)}} />
                  <label className="w-full" hidden={!isAltContact}>{row.alt_contact}</label>
                  <span className="label cursor-pointer text-white hover:text-amber-400"
                  onClick={() => setAltContact(!isAltContact)}
                  >
                    {isAltContact?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
                    </span>
                </label>
                
                <label className="input mt-5 w-[50%]">
                  <span className="label">E Mail Address</span>
                  <input type="text" defaultValue={row.email} hidden={isEmail} readOnly={isEmail} 
                  onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setEmail(!isEmail)}} />
                  <label className="w-full" hidden={!isEmail}>{row.email}</label>
                  <span className="label cursor-pointer text-white hover:text-amber-400"
                  onClick={() => setEmail(!isEmail)}
                  >
                    {isEmail?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
                    </span>
                </label>
                
                <label className="input mt-5 w-[50%]">
                  <span className="label">GST Number</span>
                  <input type="text" defaultValue={row.gstin} hidden={isGST} readOnly={isGST} 
                  onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setGST(!isGST)}} />
                  <label className="w-full" hidden={!isGST}>{row.gstin}</label>
                  <span className="label cursor-pointer text-white hover:text-amber-400"
                  onClick={() => setGST(!isGST)}
                  >
                    {isGST?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
                    </span>
                </label>
                
              
                <div className="card-actions justify-start mt-6 ms-auto me-[50%]">
                <button className="btn btn-primary">Update</button>
                <button className="btn btn-soft">Reset</button>
                </div>
              </div>
            </div>
                      )}
          </div>
                    


                </div>
            </div>
    </>
  )
}
