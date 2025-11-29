"use client";
import { useSearchParams } from "next/navigation";
import Sidebar from '@/components/Sidebar';
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import main from "../../../public/json/main.json";

export default function AboutPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

  const logo = "/PrintPlus LOGO PNG.png";

  const searchParam = useSearchParams();
  const slug = searchParam.get("slug");

  const [jobData, setJobData] = useState([]);
  const [customerData, setCustomerData] = useState();
  const [isIGST, setIsIGST] = useState(false);

  useEffect(() => {
    if(!slug) return;

    async function fetchData() {
      try {
        const res = await fetch(`${BASE_URL}/estimate/${slug}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setJobData(json);
        // console.log(json);
      } catch (err) {
        console.log(err);
      } finally {
        
      }
    }
    // if (slug) 
    fetchData();
  },[]);

 useEffect(()=>{
  console.log("THIS IS JOB DATA", jobData);
  if(!jobData.cust_id) return;
  async function fetchData() {
      try {
        const res = await fetch(`${BASE_URL}/contact/${jobData.cust_id}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setCustomerData(json);
        // console.log(json);
      } catch (err) {
        console.log(err);
      } finally {
        
      }
    }
    // if (slug) 
    fetchData();
 },[jobData]);

 useEffect(()=>{
  if(!customerData) return;
  console.log("Customer Data", customerData);
  (main.company.gstin.slice(0,2)!==customerData[0].gstin.slice(0,2))?setIsIGST(True):null;

 },[customerData]);

  const dateFormat = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }
  
  const createPDF = () => {
    // const img = "/PrintPlus LOGO PNG.png";
    const doc = new jsPDF("portrait", "mm");
    console.log(doc.getPageInfo);
    doc.addFont("/fonts/Poppins-Regular.ttf", "regular", 'normal');
    doc.addFont("/fonts/Poppins-Bold.ttf", "bold", 'normal');
    doc.addFont("/fonts/Poppins-Medium.ttf", "medium", 'normal');
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);
    doc.line(10, 40, 200, 40);
    
    // HEADER

    doc.addImage(`${logo}`, "PNG", 13,13,24,24,"Company LOGO");
    doc.setFont("medium", "normal");
    doc.setFontSize(12);
    doc.text(`${main.company.name}`, 45, 16);
    
    doc.setFont("regular", "normal");
    doc.setFontSize(10);
    doc.text(
      `${main.company.address}\nContact : ${main.company.contact}\nGSTIN : ${main.company.gstin}`, 
      45, 21, {maxWidth: 70, align:"left"}
    );
    
    doc.setFontSize(22);
    doc.setTextColor(15,98,172);
    doc.text("ESTIMATE", 198, 38, {align:'right'});
    
    // Customer Details
    doc.setFontSize(11);
    doc.setTextColor("black");
    // doc.line(10, 60, 200, 60);
    // doc.line(10, 50, 200, 50);
    // doc.text(`Bill To : ${jobData.customer}`, 12, 47, {align:"left", maxWidth:90});
    
    const cust_text = `Bill To : Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix Majestic Infomatrix \nContact No. : ${jobData.contact}`;
    const cust_text_h = doc.getTextDimensions(cust_text,{maxWidth:80}).h + 2;
    console.log(cust_text_h, typeof(parseInt(cust_text_h)));
    
    // doc.setLineHeightFactor(1.5);
    doc.text(cust_text, 13, 47, {align:"left", maxWidth:90});
    doc.text(`Bill No. : ${jobData.jobno}\nDate : ${jobData.jobDate}`, 107, 47, {align:"left", maxWidth:90});
    doc.line(10, 49+cust_text_h, 200, 49+cust_text_h);
    doc.line(105, 40, 105, 48+cust_text_h);
    // doc.text(`Bill No. : `, 107, 47, {align:"left", maxWidth:80});
    // doc.text(`Contact No. : ${jobData.contact}`, 12, 56, {align:"left", maxWidth:90});
    // doc.text(`Date : ${jobData.jobDate}`, 107, 56, {align:"left", maxWidth:80});

    





    // Order Details




    // Footer


    doc.text("this is a new pdf", 105, 148, {align:"center"});
    // doc.save(`${jobData.jobno}.pdf`);
    doc.output("pdfobjectnewwindow");
    
  }


  return (
    <>
    <div className='flex'>
      <div className="w-full md:w-64">
        <Sidebar />
      </div>
      <div className='flex-1 mx-8 my-5 pt-20'>

      <div className="flex flex-col justify-center items-center">
        
        {/* top bar for the buttons */}
        <div className="bg-white shadow-blue-950 shadow-2xl w-[210mm] h-25 rounded-2xl"> 

        </div>

        <div className='bg-white shadow-2xl p-10 mt-10 w-[210mm] rounded-2xl'>  {/* This can be our id for the pdf */}


          <div className="grid grid-cols-2 border-2 border-blue-900">
            {/* Header */}
            <div className="col-span-2 w-full">
              <div className="grid grid-cols-20 border-b-1 border-gray-600">

                <div className='col-span-4 p-4 items-center align-middle text-center'>
                  <img src={logo} alt="Company LOGO" />
                </div>
                
                <div className='col-span-9 px-3 py-1'>
                  <h1 className='text-2xl font-bold text-blue-500'>{main.company.business_name.toUpperCase()}</h1>
                  <p className='text-sm font-normal text-gray-600'>{main.company.address1}, {main.company.address2}, {main.company.city} - {main.company.pin}</p>
                  <p className='text-sm font-normal text-gray-600'>Contact: {main.company.contact}, {main.company.alt_contact}</p>
                  {main.company.gst_redg &&
                  <p className='text-sm font-normal text-gray-600'>GSTIN: {main.company.gstin} {isIGST&&<p>STATE</p>}</p>
                  }
                </div>
                
                <div className='col-span-7 p-2 flex items-end justify-end'>
                  <h1 className='text-3xl font-normal text-blue-500'>ESTIMATE</h1>

                </div>
              </div>

            </div>



            <div className="col-span-2 border-b-2 border-gray-600">
              <div className="grid grid-cols-2 divide-x-1 divide-black items-start">
                <div className='p-2'>
                  <p className="text-md ms-2 text-blue-950 m-0">
                    Bill To : {jobData.customer}
                  </p>
                  <p className="text-md ms-2 text-blue-950 m-0">
                    {customerData ?  `GSTIN : ${customerData[0].gstin}` : `Contact : ${jobData.contact}`}
                  </p>
                </div>
                <div className='p-2'>
                  <p className="text-md ms-2 text-blue-950 m-0">
                    No. : {jobData.jobno}
                  </p>
                  <p className="text-md ms-2 text-blue-950 m-0">
                    Date : {dateFormat(jobData.job_date)}
                  </p>
                </div>              
              </div>

            </div>

            <div className='col-span-2 bg-gray-200 text-neutral-950 h-6 text-center '>Item Details</div>

            <div className='col-span-2 text-black'>
              <table className='border border-collapse w-full'>
                <thead>
                  <tr>
                    <th className='border-1 border-black text-black text-sm font-medium align-bottom' rowSpan={2}>#</th>
                    <th className='border-1 border-black text-black text-sm font-medium align-bottom text-start ps-2' rowSpan={2}>Items & particulars</th>
                    <th className='border-1 border-black text-black text-sm font-medium align-bottom' rowSpan={2}>Qty</th>
                    <th className='border-1 border-black text-black text-sm font-medium align-bottom' rowSpan={2}>Rate</th>
                    {
                      !jobData.isIGST && (
                        <>
                          <th className='border-2 border-black text-black text-sm font-medium' colSpan={2}>CGST</th>
                          <th className='border-2 border-black text-black text-sm font-medium' colSpan={2}>SGST</th>
                        </>
                      )
                    }{
                      jobData.isIGST &&
                      (<th className='border-2 border-black text-black text-sm font-medium' colSpan={2}>IGST</th>)
                    }
                    <th className='border-2 border-black text-black text-sm font-medium align-bottom' rowSpan={2}>Amount</th>
                  </tr>
                  
                  <tr>
                    {!jobData.isIGST && (
                      <>
                        <th className="border-2 border-black text-black font-normal text-sm px-2">%</th>
                        <th className="border-2 border-black text-black font-normal text-sm px-2">Amt</th>
                        <th className="border-2 border-black text-black font-normal text-sm px-2">%</th>
                        <th className="border-2 border-black text-black font-normal text-sm px-2">Amt</th>
                      </>
                    )}
                    { jobData.isIGST && (
                      <>
                        <th className="border-2 border-black text-black font-normal text-sm px-2">%</th>
                        <th className="border-2 border-black text-black font-normal text-sm px-2">Amt</th>
                      </>
                    )}

                  </tr>

                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>

              </table>

            </div>


          


          </div>
        </div>

      </div>

        {/* this is about page

        <button className="btn btn-primary" onClick={createPDF}>create pdf</button> */}

      </div>

    </div>
    </>
  )
}

