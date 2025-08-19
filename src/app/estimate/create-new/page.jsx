"use client"
import Link from 'next/link';
import React, {useState} from 'react';
import Sidebar from '@/components/Sidebar';
import { MdKeyboardBackspace } from "react-icons/md";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function CreateEstimate() {

  const [selectDate, setDate] = useState(new Date());

  const addRow = () => {
    let table = document.getElementById('item-table');
    const lastRow = table.querySelector('tbody tr:last-child');
    const newRow = document.createElement('tr');

    newRow.innerHTML = lastRow.innerHTML;

    table.querySelector('tbody').appendChild(newRow);

    console.log(newRow.innerHTML)
}

  // const deleteRow = () => {

  // }



  return (
    <>
      <div className='flex'>
        <div className="w-full md:w-64">
          <Sidebar />
        </div>
        <div className='flex-1 mx-8 my-5 overflow-auto pt-20'>
          <div className="flex flex-row align-middle">
            <h1 className='text-2xl mb-4'>New Estimate</h1>
            <Link href="/estimate" className='bg-blue-600 hover:bg-blue-300 text-white text-xl ms-auto me-0 rounded-md py-2 px-6'>
            <MdKeyboardBackspace fontSize={24} color="white"/></Link>
          </div>
          {/* Card starts from here */}
          <div className="card w-full px-15 pt-5 mt-5 bg-base-100 card-md shadow-sm">
            <div className="card-body w-[70%]">
              {/* grid starts */}
              <div className="grid grid-cols-12 gap-6">
                <div className='col-span-6'>
                  <label className="input w-[90%]">
                    <span className="label">Customer Name</span>
                    <input type="text" placeholder="Cash Sale" />
                  </label>
                </div>
                {/* <div className='col-span-6'></div> */}
                <div className='col-span-6'>
                  <label className="input w-[90%]">
                    <span className="label">Contact No.</span>
                    <input type="text" placeholder="XXXXXX-XXXXXX" maxLength={15}/>
                  </label>
                </div>

                <div className="col-span-4 mt-5">
                  <label className="input w-[90%]">
                    <span className="label">Estimate Number</span>
                    <input type="text" maxLength={5}/>
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
                <div className="col-span-12 mt-8" id='item-table'>
                  <h3 className='text-lg text-center border-t-2 border-b-2 py-2'>Item Table</h3>

                  <table className="min-w-full border border-collapse border-blue-400 text-lg mt-4">
                    <thead className='bg-blue-950'>
                      <tr className='text-base'>
                        {/* <th className='border-2 border-blue-400 px-4 py-3 font-normal w-[02%]'>#</th> */}
                        <th className='border-2 border-blue-400 px-4 py-3 font-normal text-start w-[40%]'>Particulars & Details</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-normal text-end w-[10%]'>Qty</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-normal text-end w-[10%]'>Rate</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-normal text-center w-[15%]'>Tax</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-normal text-end w-[20%]'>Amount</th>
                        <th className='border-2 border-blue-400 px-4 py-3 font-normal text-end w-[5%]'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='text-base' id='item-row'>
                        {/* <td className='border-2 border-blue-400 px-4 py-4'>1</td> */}
                        <td className='border-2 border-blue-400 px-4 py-4'>
                          <input type="text" className='input border-2 border-gray-600 h-8 rounded-md w-full' list='products' />
                          <datalist id='products'>
                            <option value="Visiting Cards"></option>
                            <option value="Bill Book"></option>
                            <option value="Flyers"></option>
                          </datalist>
                          <textarea className='border-2 border-gray-600 rounded-md mt-3 w-full' rows={2} name="" id=""></textarea>
                        </td>

                        <td className='border-2 border-blue-400 px-4 py-4 align-top'>
                          <input type="text" className='border-2 border-gray-600 h-10 pe-2 rounded-md w-full mb-5 text-right' />
                          <p className='text-right'>nos</p>
                        </td>

                        <td className='border-2 border-blue-400 px-4 py-4 align-top'>
                          <input type="text" className='border-2 border-gray-600 h-10 pe-2 rounded-md w-full mb-5 text-right' />
                        </td>

                        <td className='border-2 border-blue-400 px-4 py-4 align-top'>
                          <select defaultValue="Select Tax" className="select h-10 mb-5">
                            <option disabled={true}>Select Tax</option>
                            <option>Non-Taxable</option>
                            <option>GST0</option>
                            <option>GST5</option>
                            <option>GST12</option>
                            <option>GST18</option>
                            <option>GST28</option>
                          </select>
                        <p className='text-right'>selected tax</p>
                        </td>

                        <td className='border-2 border-blue-400 px-4 py-4 align-top'>
                        <input type="text" className='border-2 border-gray-600 h-10 pe-2 rounded-md w-full mb-5 text-right' defaultValue="0.00" readOnly/>
                        </td>

                        <td className='align-top pt-3'>
                          <button className="btn btn-ghost" onClick={addRow}>X</button>
                          <button className="btn btn-ghost">:</button>
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div> {/* table ends here */}
              
              </div> {/* grid ends here */}
              
              <div className="justify-start card-actions mt-5">
                <button className="btn btn-primary" onClick={addRow}>Add Row</button>
              </div>

            <div className="grid grid-cols-12 gap-6">

              <div className="col-span-7"></div>
              <div className="col-span-5 bg-gray-700 text-white rounded-xl p-3">
                <div className="grid grid-cols-2">
                <div className='text-start text-xl font-medium ps-4 py-2'>Sub Total</div>
                <div className='text-right text-lg pe-4 py-2'>46546546546</div>
                <div className='text-start text-xl font-medium ps-4 py-2'>Discount</div>
                <div className='text-right text-lg pe-4 py-2'>46546546546</div>
                <div className='text-start text-lg font-medium ps-4 py-2'>CGST</div>
                <div className='text-right text-lg pe-4 py-2'>46546546546</div>
                <div className='text-start text-lg font-medium ps-4 py-2'>SGST</div>
                <div className='text-right text-lg pe-4 py-2'>46546546546</div>
                <div className='text-start text-xl font-medium ps-4 py-2'>Total</div>
                <div className='text-right text-lg pe-4 py-2'>46546546546</div>
                <div className='text-start text-xl font-medium ps-4 py-2'>Advance</div>
                <div className='text-right text-lg pe-4 py-2'>46546546546</div>

                </div>
              </div>
              <div className="col-span-6"></div>
              <div className="col-span-6"></div>
              <div className="col-span-6"></div>

            </div>
            </div> {/* Card body div ends here */}
          </div> {/* Card div ends here */}


        {/* body div ends */}
        </div> 
        {/* main div ends */}
    </div>
    </>
  )
}
