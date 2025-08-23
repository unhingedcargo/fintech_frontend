"use client"
import Sidebar from '@/components/Sidebar';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function CustomerDetails(params) {
	const[customer, setCustomer] = useState([]);
	const {slug} = useParams();

	useEffect(() => {
		const URI = `http://localhost:8000/api/contact/${slug}`;
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
    

  return (
    <>
      <div className='flex'>
				<div className="w-full md:w-64">
					<Sidebar />
				</div>
				<div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
					<div className="flex flex-row align-middle">
					{customer.map((row) => 
						<p>{row.company_name} <br/>
						{row.display_name} <br/>
						{row.contact} <br/>
						{row.gstin}<br/>
						{row.email}
						</p>
					)}
					</div>
					


				</div>
			</div>
    </>
  )
}
