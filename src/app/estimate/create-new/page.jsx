"use client"
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import Sidebar from '@/components/Sidebar';
import { MdKeyboardBackspace, MdOutlineCreate } from "react-icons/md";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';


export default function CreateEstimate() {
  const [selectDate, setDate] = useState(new Date());
  const [jobno, setJobno] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({"customer":"", "mobile":""});
  const [items, setItems] = useState([]);
  const [custID, setCustID] = useState("");
  const [grandtotal, setgrandtotal] = useState();
  const [advance, setAdvance] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [alert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  
  const [orders, setOrders] = useState([
    { id: Date.now(), 
      item_id:"",
      item: "", 
      hsn_code: "",
      desc: "", 
      qty: 1, 
      unit: "nos",
      rate: 0, 
      total:0, 
      tax_rate: 0, 
      tax_amount:0, 
      amount:0 },
  ]);

  const orderTotals = orders.reduce((acc, o) => {
    const tot = Number(o.total) || 0;
    const tax = Number(o.tax_amount) || 0;
    const amt = Number(o.amount) || tot + tax;

    acc.subTotal += tot;
    acc.totalTax += tax;
    acc.grandTotal += amt;

    return acc;
  },
  {subTotal: 0, totalTax: 0, grandTotal:0}
);
  
  useEffect(() => {
    setLoader(true);
    const NEXT_JOBNO_URI = "http://localhost:8000/api/nextjobno";
    const CUSTOMER_URI = "http://localhost:8000/api/customer/all";
    const ITEM_URI = "http://localhost:8000/api/item/all";
    
    const fetchAllData = async () => {
    try {
      
      const [nextJobRes, custRes, itemRes] = await Promise.all([
        fetch(NEXT_JOBNO_URI),
        fetch(CUSTOMER_URI),
        fetch(ITEM_URI),
      ]);

      const [nextJob, custData, itemData] = await Promise.all([
        nextJobRes.json(),
        custRes.json(),
        itemRes.json(),
      ]);

      setJobno(nextJob);
      setCustomers(custData);
      setItems(itemData);
        
    } catch(err) {
      console.log("Error Fetching Data", err)
    } finally {
      setLoader(false);
    }
  }
  fetchAllData();
},[])


// Handle input changes
const handleOrderChange = (id, field, value) => {
  setOrders((prevOrders) =>
    prevOrders.map((o) => {
      if (o.id !== id) return o;

      let updated = { ...o, [field]: value };

      // If qty or rate changes, recalc amount
      // if (field === "qty" || field === "rate") {
      //   updated.total = (Number(updated.qty) * Number(updated.rate));
      // }
      // return updated;

      const qty = Number(updated.qty) || 0;
      const rate = Number(updated.rate) || 0;
      const taxRate = Number(updated.tax_rate) || 0;

      const lineTotal = qty * rate; // subtotal before tax
      const taxAmount = (lineTotal * taxRate) / 100;
      const amount = lineTotal + taxAmount;

      updated.total = lineTotal;
      updated.tax_amount = taxAmount;
      updated.amount = amount;

      return updated;

    })

  );
  
};
  // const handleOrderChange = (id, field, value) => {
  //   setOrders(
  //     orders.map((order) =>
  //       order.id === id ? { ...order, [field]: value } : order
  //     )
  //   );
  // };

  // Add new row
  const addRow = () => {
    setOrders([
      ...orders,
      { id: Date.now(), item_id:"", item: "", desc: "", qty: 1, rate: 0, total:0, tax_rate: 0, tax_amount:0, amount:0 },
    ]);
  };

   // Delete row by id
  const deleteRow = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const clearAll = () => {
    window.location.reload();
  };

  const findCustomer = (e) => {
    const name = e.target.value;
    const selectCustomer = customers.find((c) => c.display_name === name);
    if (selectCustomer) {
      setSelectedCustomer(selectCustomer);
      setNewCustomer({"customer":"", "mobile":""});
    } else {
      setSelectedCustomer(null);
      setNewCustomer(prev => ({...prev, name}))
    }
  }

  const saveEstimate = async () => {
    setLoader(true);
    const SAVE_ESTIMATE_URI = `http://localhost:8000/api/estimate/create`
    const slug = Date.now().toString() + jobno;
    const payLoad = {
      "orders" : orders.map((o, index) => ({
        "item_no" : index+1,
        "item_id" : o.item_id,
        "item" : o.item,
        "desc" : o.desc,
        "qty" : Number(o.qty),
        "rate" : Number(o.rate),
        "total" : Number(o.total),
        "tax_rate" : Number(o.tax_rate),
        "tax_amount" : Number(o.tax_amount),
        "amount" : Number(o.amount),

      })),
      "jobslug": slug,
      "jobno" : jobno,
      "job_date" : selectDate.toISOString().split("T")[0],
      "cust_id" : selectedCustomer?selectedCustomer.cust_id:0,
      "taxable_amount" : orderTotals.subTotal,
      "tax_amount" : orderTotals.totalTax,
      "discount" : Number(discount) || 0,
      "grandtotal" : Number(orderTotals.grandTotal),
      "advance" : Number(advance) || 0
    }
    console.log(payLoad);
    try{
      const res = await fetch(SAVE_ESTIMATE_URI, {
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(payLoad),
      });
      
      if(!res.ok) throw new Error("Failed to Fetch!");

      const data = await res.json();

      console.log("Estimate Saved",data);

      router.push("/estimate");

    }catch(err) {
      console.log("Fetching Error! ", err);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }finally {
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
        <main className='flex-1 mx-8 my-5 overflow-auto pt-20'>
          <div className="flex flex-row items-center">
            <h1 className='text-2xl mb-4'>New Estimate</h1>
            <Link href="/estimate" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>
            <MdKeyboardBackspace fontSize={24} color="white"/></Link>
          </div>
          {/* Card starts from here */}
          <div className="card w-full px-15 pt-5 mt-5 bg-base-100 card-md shadow-sm">
            <div className="card-body w-full">
              {/* grid starts */}
              <div className="grid grid-cols-12 gap-6">
                
                <div className='col-span-12'>
                  <label className="input w-[50%]">
                    <span className="label">Customer Name</span>
                    <input type="text" placeholder="Cash Sale" list="customerList" onChange={findCustomer} onBlur={findCustomer}/>
                    <datalist id='customerList'>
                      {customers.map((customer) => 
                        <option value={customer.display_name} key={customer.display_name}></option>
                      )}
                    </datalist>
                  </label>
                </div>
                {/* <div className='col-span-6'></div> */}
                
                {selectedCustomer && 
                  <div className="col-span-12 border-2 rounded-2xl py-4 ps-3 bg-gray-800 text-white">
                    <div className='grid grid-cols-2 gap-6 relative'>
                      <div className="absolute -top-3 right-1 cursor-pointer p-2">
                        <Link href={`/customer/${selectedCustomer.cust_id}`} className='btn bg-amber-50 rounded-lg'>
                          <MdOutlineCreate fontSize={24} color="green"/>
                        </Link>
                      </div>
                      <div>
                        Customer : <span className='font-medium text-lg text-amber-400'>{selectedCustomer.company_name}</span>
                      </div>
                      
                      <div>
                        Contact : <span className='font-medium text-lg text-amber-400'>{selectedCustomer.contact}</span>
                      </div>
                      
                      <div>
                        GSTIN : <span className='font-medium text-lg text-amber-400'>{selectedCustomer.gstin}</span>
                      </div>
                    </div>
                  </div>
                }

                {!selectedCustomer && newCustomer.name &&
                  <div className='col-span-12'>
                  <label className="input w-[50%]">
                    <span className="label">Contact Number</span>
                    <input type="text" onChange={findCustomer} maxLength={15} onBlur={findCustomer}/>
                  </label>
                </div>
                }

                <div className="col-span-4 mt-5">
                  <label className="input w-[90%]">
                    <span className="label">Estimate Number</span>
                    <input type="text" maxLength={5} value={jobno} readOnly/>
                  </label>
                </div>

                <div className="col-span-8"></div>

                <div className="col-span-4 ">
                  <label className="input w-[90%]">
                    <span className="label">Estimate Date</span>
                    {/* <input type="date" maxLength={5}/> */}
                    <DatePicker 
                    dateFormat="dd-MMM-yyyy"
                    selected={selectDate}
                    onChange={(date) => {setDate(date)}}
                    maxDate={new Date()}
                    />
                  </label>
                </div>

                <div className="col-span-8"></div>

                {/* Item Table Starts */}
                <div className="col-span-12 mt-8">
                  <h3 className='text-lg text-center border-t-2 border-b-2 py-2'>Item Table</h3>

                  <table className="min-w-full border border-collapse border-blue-400 text-lg mt-4" id='item-table'>
                    <thead className='dark:bg-blue-950'>
                      <tr className='text-base'>
                        {/* <th className='border-2 border-blue-400 px-4 py-3 font-normal w-[02%]'>#</th> */}
                        <th className='border-2 border-blue-400 px-4 py-3 font-semibold dark:font-normal text-start w-[35%]'>Particulars & Details</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-semibold dark:font-normal w-[10%]'>HSN Code</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-semibold dark:font-normal w-[10%]'>Qty</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-semibold dark:font-normal w-[10%]'>Rate</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-semibold dark:font-normal w-[15%]'>Tax</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-semibold dark:font-normal w-[15%]'>Amount</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-semibold dark:font-normal text-end w-[5%]'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                      <tr className='text-base' key={index+1}>
                        {/* <td className='border-2 border-blue-400 px-4 py-4'>1</td> */}
                        <td className='border-2 border-blue-400 px-4 py-4'>
                          <input type="text" className='input border-2 border-gray-600 h-8 rounded-md w-full' list='products'
                          value={order.item}
                          onChange={(e) => {
                            const selected = items.find((it) => it.item === e.target.value);
                            if (selected) {
                              setOrders((prevOrder) => 
                                prevOrder.map((o) =>
                                  o.id === order.id
                                  ?{...o,
                                    item_id : selected.item_id,
                                    item: selected.item,
                                    hsn_code : selected.hsn_code,
                                    qty: Number(1).toFixed(2),
                                    unit: selected.unit,
                                    rate : Number(selected.sales_rate),
                                    total: Number(selected.sales_rate),
                                    tax_rate: Number(selected.tax_rate),
                                    tax_amount: (Number(selected.sales_rate)*Number(selected.tax_rate))/100,
                                    amount: Number(selected.sales_rate) + (Number(selected.sales_rate)*Number(selected.tax_rate))/100
                                  }
                                  : o                                  
                              )
                            )
                            } else {
                              setOrders((prevOrder) =>
                                prevOrder.map((o) =>
                                  o.id === order.id ? { ...o, item: e.target.value } : o
                                ))
                            }
                            }}
                            />
                          <datalist id='products'>
                            {items.map((item) => 
                              <option value={item.item} key={item.item_id}></option>
                            )}
                          </datalist>

                          <textarea className='border-2 border-gray-600 rounded-md mt-3 w-full text-sm p-1.5' rows={2} name="" id="" 
                          onChange={(e) => handleOrderChange(order.id, "desc", e.target.value)} />

                        </td>
                            {/* HSN INPUT */}
                        <td className='border-2 border-blue-400 px-4 py-4 align-top'>
                          <input type="text" className='border-2 border-gray-600 h-10 pe-2 rounded-md w-full mb-5 text-center'
                          value={order.hsn_code || ""}
                          onChange={(e) => handleOrderChange(order.id, "hsn_code", e.target.value)}
                          />
                        </td>
                        
                          {/* Quantity Input */}
                        <td className='border-2 border-blue-400 px-4 py-4 align-top'>
                          <input type="text" className='border-2 border-gray-600 h-10 pe-2 rounded-md w-full mb-5 text-right' 
                          value={order.qty}
                          onChange={(e) => handleOrderChange(order.id, "qty", Number(e.target.value))}
                          />
                          <p className='text-right'>{order.unit}</p>
                        </td>

                        <td className='border-2 border-blue-400 px-4 py-4 align-top'>
                          <input type="text" className='border-2 border-gray-600 h-10 pe-2 rounded-md w-full mb-5 text-right' 
                          value={order.rate}
                          onChange={(e) => handleOrderChange(order.id, "rate", Number(e.target.value))}                          
                          />
                        </td>

                        <td className='border-2 border-blue-400 px-4 py-4 align-top'>
                          <select defaultValue="Select Tax" className="select h-10 mb-5"
                          onChange={(e) => {
                            handleOrderChange(order.id, "tax_rate", Number(e.target.value))
                            const newTaxAmount = Number(order.total) * Number(e.target.value) / 100;
                            handleOrderChange(order.id, "tax_amount", newTaxAmount);
                            handleOrderChange(order.id, "amount", Number(order.amount)+Number(newTaxAmount));
                          }}
                          >
                            <option disabled={true}>Select Tax</option>
                            <option value={0}>Non-Taxable</option>
                            <option value={0}>GST0</option>
                            <option value={5}>GST5</option>
                            <option value={12}>GST12</option>
                            <option value={18}>GST18</option>
                            <option value={28}>GST28</option>
                          </select>
                        <p className='text-right'>Tax : {order.tax_amount || "0"}</p>
                        </td>

                        <td className='border-2 border-blue-400 px-4 py-4 align-top'>
                        <input type="text" className='border-2 border-gray-600 h-10 pe-2 rounded-md w-full mb-5 text-right' readOnly
                        value={order.total}
                        />
                        </td>

                        <td className='align-top pt-3'>
                          <button className="btn btn-ghost" onClick={() => deleteRow(order.id)}>X</button>
                          <button className="btn btn-ghost">:</button>
                        </td>

                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div> {/* table ends here */}
              
              </div> {/* grid ends here */}
              
              <div className="justify-start card-actions mt-5">
                <button className="btn btn-primary" onClick={addRow}>Add Row</button>
                <button className="btn btn-primary" onClick={clearAll}>Clear</button>
                <button className="btn btn-primary" onClick={() => console.log(orders) }>Show Order</button>
              </div>

            <div className="grid grid-cols-12 gap-6">

              <div className="col-span-6 md:col-span-8"></div>
              <div className="col-span-6 md:col-span-4 bg-gray-700 text-white rounded-xl p-3">
                <div className="grid grid-cols-2 items-center">

                  <div className='text-start text-md font-medium ps-4 py-2'>Sub Total</div>
                  <div className='text-right text-lg pe-4 py-2'>{orderTotals.subTotal}</div>

                  <div className='text-start text-md font-medium ps-4 py-2'>Discount</div>
                  <div className='text-right text-lg pe-4 py-2'>
                    <input type="text" className='input h-8 w-25 text-right' maxLength={(orderTotals.subTotal.toString().length)}
                    onChange={(e) => {
                      setDiscount(Number(e.target.value));
                    }}
                    />
                  </div>
                  <div className='text-start text-md font-medium ps-4 py-2'>Tax Type</div>
                  <div className='text-right text-lg pe-4 py-2'>TAXABLE</div>
                  {/* TAX DETAILS if APPLICABLE */}
                  <div className='text-start text-md font-medium ps-4 py-2'>SGST</div>
                  <div className='text-right text-lg pe-4 py-2'>{orderTotals.totalTax}</div>

                  <div className='text-start text-md font-medium ps-4 py-2'>Grand Total</div>
                  <div className='text-right text-lg pe-4 py-2'>{(orderTotals.grandTotal-discount)>0 ? (orderTotals.grandTotal-discount) : 0}</div>

                  <div className='text-start text-md font-medium ps-4 py-2'>Advance</div>
                  <div className='text-right text-lg pe-4 py-2'>
                    <input type="text" className='input h-8 w-25 text-right' maxLength={(orderTotals.grandTotal.toString().length)}
                    onChange={(e) => {
                      setAdvance(Number(e.target.value));
                                            
                    }}
                    />                  
                  </div>

                  <div className='text-start text-md font-medium ps-4 py-2'>Balance</div>
                  <div className='text-right text-lg pe-4 py-2'>{(orderTotals.grandTotal-advance-discount)>0 ? (orderTotals.grandTotal-advance-discount) : 0}</div>

                </div>
              </div>
              <div className="col-span-6">
                <button className="btn btn-primary" onClick={saveEstimate}>Create</button>
              </div>
              <div className="col-span-6"></div>
              <div className="col-span-6"></div>

            </div>
            </div> {/* Card body div ends here */}
          </div> {/* Card div ends here */}


        {/* body div ends */}
        </main> 
        {/* main div ends */}
    </div>
    </>
  )
}
