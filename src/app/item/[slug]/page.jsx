"use client"
import Sidebar from '@/components/Sidebar';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdOutlineCreate, MdCheck } from "react-icons/md";


export default function ItemDetails() {
	const router = useRouter();
  const [showAlert, setAlert] = useState({show:false, type:"success", message:""});
  const [loader, setLoader] = useState(false);
	const [item, setItem] = useState([]);
	const{slug} = useParams();
	const [isItem, setIsItem] = useState(true);
	const [isCode, setIsCode] = useState(true);
	const [isHSN, setIsHSN] = useState(true);
	const [isPurchase, setIsPurchase] = useState(true);
	const [isSales, setIsSales] = useState(true);

	useEffect(() => {
		const ITEM_URI = `https://fintech-backend-08wx/api/item/${slug}`;
		// if (!slug) return;

		// const ITEM_URI = `http://localhost:8000/api/item/${slug}`;
		setLoader(true);
		const fetchItems = async () => {
			try {
				const res = await fetch(ITEM_URI);
				if(!res.ok) {
					throw new Error("Failed to fetch");
				}
				const data = await res.json();
				setItem(data);
			} catch(err) {
				console.log(err);
				setAlert({show:true, type:"error", message:`Something went wrong!`});
        setTimeout(() => {
          setAlert({show:false, type:"success", message:""});
        }, 3000);
			} finally {
				setLoader(false);
			}
		}
		fetchItems();
	},[])


	const handleChange = (id, field, value) => {
    setItem((prev) => 
      prev.map((row) =>
        row.id === id ?{...row, [field]: value} : row
    ))
  }

	const showData = () => {
		// console.log(item[0]);
		item.map((row) => {console.log(row) });
	}


	const updateData = async () => {
		const ITEM_UPDATE_URI = `https://fintech-backend-08wx.onrender.com/api/item/update/${slug}`;
		// const ITEM_UPDATE_URI = `http://localhost:8000/api/item/update/${slug}`;
		setLoader(true)
		try {
			const res = await fetch(ITEM_UPDATE_URI, {
				method: "PATCH",
				body : JSON.stringify(item[0]),
				headers : {
					"Content-Type" : "application/json; charset=UTF-8",
				}
			});

			if(!res.ok) {
				throw new Error("Failed to fetch!")
			}
			const data = await res.json();
			router.push(`/item?message=${data.item} Updated Successfully..!!`)
		} catch(err) {
			console.log(err);
			setAlert({show:true, type:"error", message:`Something went wrong!!`});
      setTimeout(() => {
        setAlert({show:false, type:"success", message:""});
      }, 3000);
		} finally {
			setLoader(false);
		}
	}

	const deleteData = async () => {
		setLoader(true);
		// const ITEM_DELETE_URI = `https://fintech-backend-08wx.onrender.com/api/item/delete/${slug}`
		const ITEM_DELETE_URI = `http://localhost:8000/api/item/delete/${slug}`
		const deleteName = item[0].item;
		try {
			const res = await fetch(ITEM_DELETE_URI, {
				method: "DELETE",
				headers:{
          "Content-Type" : "application/json; charset=UTF-8",
        },
			})

			if(!res.ok) {
				throw new Error("Failed to fetch!")
			}
			router.push(`/item?message=${deleteName} Deleted Successfully`); 
		} catch(err) {
			console.log("DELETE ERROR! :", error.message, error);
			router.push(`/item?message=Something Went Wrong!`);
		} finally {
			setLoader(false);
		}
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

				<div className='w-[80%] mb-5'>
					{showAlert.show &&
						<div role="alert" className="alert alert-success">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span className='text-lg'>{showAlert.message}</span>
						</div>
					} 
				</div>

				<div className="flex flex-row align-middle">
				{item.map((row, index) => 
					<div className="card card-border bg-base-100 w-[80%]" key={index}>
						<div className="card-body">
							<div className='flex flex-row justify-between'>
								<h2 className="card-title mb-5 text-4xl">{row.item}</h2>
								<h2 className="card-title mb-5 text-2xl ">{row.code}</h2>
							</div>
							
							<label className="input mt-5 w-[50%]">
								<span className="label">Item Name</span>
								<input type="text" value={row.item} hidden={isItem} readOnly={isItem} 
								onChange={(e) => handleChange(row.id, "item", e.target.value)}
								onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setIsItem(!isItem)}} />
								<label className="w-full" hidden={!isItem}>{row.item}</label>
								<span className="label cursor-pointer text-white hover:text-amber-400"
								onClick={() => setIsItem(!isItem)}
								>
									{isItem?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
									</span>
							</label>
							
							<label className="input mt-5 w-[50%]">
								<span className="label">Item Code</span>
								<input type="text" value={row.code} hidden={isCode} readOnly={isCode} 
								onChange={(e) => handleChange(row.id, "code", e.target.value)}
								onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setIsCode(!isCode)}} />
								<label className="w-full" hidden={!isCode}>{row.code}</label>
								<span className="label cursor-pointer text-white hover:text-amber-400"
								onClick={() => setIsCode(!isCode)}
								>
									{isCode?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
									</span>
							</label>
							
							<label className="input mt-5 w-[50%]">
								<span className="label">HSN CODE</span>
								<input type="text" value={row.hsn_code} hidden={isHSN} readOnly={isHSN} 
								onChange={(e) => handleChange(row.id, "hsn_code", e.target.value)}
								onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setIsHSN(!isHSN)}} />
								<label className="w-full" hidden={!isHSN}>{row.hsn_code}</label>
								<span className="label cursor-pointer text-white hover:text-amber-400"
								onClick={() => setIsHSN(!isHSN)}
								>
									{isHSN?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
									</span>
							</label>
							
							<label className="input mt-5 w-[50%]">
								<span className="label">Purchase Rate</span>
								<input type="text" value={row.purchase_rate} hidden={isPurchase} readOnly={isPurchase} 
								onChange={(e) => handleChange(row.id, "purchase_rate", e.target.value)}
								onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setIsPurchase(!isPurchase)}} />
								<label className="w-full" hidden={!isPurchase}>{row.purchase_rate}</label>
								<span className="label cursor-pointer text-white hover:text-amber-400"
								onClick={() => setIsPurchase(!isPurchase)}
								>
									{isPurchase?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
									</span>
							</label>
							
							<label className="input mt-5 w-[50%]">
								<span className="label">Sales Rate</span>
								<input type="text" value={row.sales_rate} hidden={isSales} readOnly={isSales} 
								onChange={(e) => handleChange(row.id, "sales_rate", e.target.value)}
								onBlur={(e) => {e.target.nextSibling.innerText = e.target.value; setIsSales(!isSales)}} />
								<label className="w-full" hidden={!isSales}>{row.sales_rate}</label>
								<span className="label cursor-pointer text-white hover:text-amber-400"
								onClick={() => setIsSales(!isSales)}
								>
									{isSales?<MdOutlineCreate fontSize={20} />:<MdCheck fontSize={20} />}
									</span>
							</label>
							


							<div className="card-actions justify-start mt-6 ms-auto me-[50%]">
							<button className="btn btn-primary" onClick={updateData}>Update</button>
							{/* Open the modal using document.getElementById('ID').showModal() method */}
							<button className="btn btn-error" onClick={()=>document.getElementById('my_modal_1').showModal()}>Delete</button>
							<dialog id="my_modal_1" className="modal">
								<div className="modal-box">
									<h3 className="font-bold text-lg">Confirm Deletion! <br/><span className='text-white pt-3 mt-4'>{row.item}</span></h3>
									<p className="py-4">Do you want to delete?</p>
									<div className="modal-action">
										<form method="dialog">
											{/* if there is a button in form, it will close the modal */}
											<button className="btn btn-error" onClick={() => deleteData()}>Confirm Delete</button>
											<button className="btn">Cancel</button>
										</form>
									</div>
								</div>
							</dialog>
							<button className="btn btn-soft" onClick={() => router.push("/item")}>Back</button>
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
