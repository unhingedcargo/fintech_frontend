"use client"
import Sidebar from '@/components/Sidebar';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdOutlineCreate, MdCheck } from "react-icons/md";

export default function CustomerDetails(params) {
	const [customer, setCustomer] = useState([]);
  const [showAlert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);
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
    setLoader(true);
		const fetchContact = async () => {
			try {
				const res = await fetch(URI);
				if(!res.ok){
					throw new Error ("Failed to fetch");
				}
				setCustomer(await res.json());
        setLoader(false);
			}catch(err) {
				console.log(err);
			}
		}
		fetchContact();
	},[])

  const handleChange = (id, field, value) => {
    setCustomer((prev) => 
      prev.map((row) =>
        row.id === id ?{...row, [field]: value} : row
    ))
  }
    
  const updateData = async () => {
    customer.map((row) => console.log("PREVIOUS DATA : ", row))

    console.log("DATA IS SENDING FOR UPDATE");

    const CREATE_CUSTOMER_URI = `https://fintech-backend-08wx.onrender.com/api/contact/update/${slug}`
    fetch(CREATE_CUSTOMER_URI, {
      method: 'PATCH',
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
      // window.location.reload()
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

          {showAlert &&
            <div role="alert" className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Your purchase has been confirmed!</span>
            </div>
          } 

            {customer.map((row, index) => 
            <div className="card card-border bg-base-100 w-[80%]" key={index}>
              <div className="card-body">
                <div className='flex flex-row justify-between'>
                  <h2 className="card-title mb-5 text-4xl">{row.display_name}</h2>
                  <h2 className="card-title mb-5 text-2xl ">{row.acc_type}</h2>                  
                </div>
                
                <label className="input mt-5 w-[50%]">
                  <span className="label">Company Name</span>
                  <input type="text" value={row.company_name} hidden={isCompany} readOnly={isCompany} 
                  onChange={(e) => handleChange(row.id, "company_name", e.target.value)}
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
                  <input type="text" value={row.name} hidden={isName} readOnly={isName} 
                  onChange={(e) => handleChange(row.id, "name", e.target.value)}
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
                  <input type="text" value={row.display_name} hidden={isDisplay} readOnly={isDisplay} 
                  onChange={(e) => handleChange(row.id, "display_name", e.target.value)}
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
                  <input type="text" value={row.contact} hidden={isContact} readOnly={isContact} 
                  onChange={(e) => handleChange(row.id, "contact", e.target.value)}
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
                  <input type="text" value={row.alt_contact} hidden={isAltContact} readOnly={isAltContact} 
                  onChange={(e) => handleChange(row.id, "alt_contact", e.target.value)}
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
                  <input type="text" value={row.email} hidden={isEmail} readOnly={isEmail} 
                  onChange={(e) => handleChange(row.id, "email", e.target.value)}
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
                  <input type="text" value={row.gstin} hidden={isGST} readOnly={isGST} 
                  onChange={(e) => handleChange(row.id, "gstin", e.target.value)}
                  onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setGST(!isGST)}} />
                  <label className="w-full" hidden={!isGST}>{row.gstin}</label>
                  <span className="label cursor-pointer text-white hover:text-amber-400"
                  onClick={() => setGST(!isGST)}
                  >
                    {isGST?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
                    </span>
                </label>                
              
                <div className="card-actions justify-start mt-6 ms-auto me-[50%]">
                <button className="btn btn-primary" onClick={updateData}>Update</button>
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




