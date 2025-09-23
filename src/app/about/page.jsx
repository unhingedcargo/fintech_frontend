"use client";
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function AboutPage() {
  const [companyData, setCompanyData] = useState({
      "name": "PRINT PLUS",
      "address" : "#37, Sri Shakthi, 2nd Main Road, Sri Rama Layout, JP Nagar 7th Phase, Bengaluru - 560078",
      "contact" : "+91 99450 71790",
      "gstin" : "29DIMPP3034G1Z0",
      "logo" : "/PrintPlus LOGO PNG.png"
    });
  const [jobData, setJobData] = useState({
    "customer": "customer",
    "contact" : "contact",
    "gstin" : "",
    "isIGST" : false,
    "jobno" : "jobno",
    "jobDate" : "jobDate",
    "paymentMode" : "paymentMode",
    "orderValue" : "orderValue",
    "advance" : "advance"
  });
  const [orderData, setOrderData] = useState([]);
  
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
    doc.addImage(`${companyData.logo}`, "PNG", 13,13,24,24,"Company LOGO");
    doc.setFont("medium", "normal");
    doc.setFontSize(12);
    doc.text(`${companyData.name}`, 45, 16);
    
    doc.setFont("regular", "normal");
    doc.setFontSize(10);
    doc.text(
      `${companyData.address}\nContact : ${companyData.contact}\nGSTIN : ${companyData.gstin}`, 
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
            <div className="col-span-2 w-full h-40">
              <div className="grid grid-cols-20 border-b-2 border-black">

                <div className='col-span-4 p-4 items-center align-middle text-center'>
                  <img src="/PrintPlus LOGO PNG.png" alt="Company LOGO" />
                </div>
                
                <div className='col-span-9 px-3 py-1'>
                  <h1 className='text-2xl font-bold text-blue-500'>{companyData.name}</h1>
                  <p className='text-md font-normal text-gray-600'>{companyData.address}</p>
                  <p className='text-md font-normal text-gray-600'>Contact: {companyData.contact}</p>
                  <p className='text-md font-normal text-gray-600'>GSTIN: {companyData.gstin}</p>
                </div>
                
                <div className='col-span-7 p-4 flex items-end justify-end'>
                  <h1 className='text-3xl font-normal text-blue-500'>ESTIMATE</h1>

                </div>
              </div>

            </div>



            <div className="col-span-2 border-b-2 border-black">
              <div className="flex divide-x-2 divide-black">
                <div className='w-full my-1'>
                  <h1 className="text-lg ms-2 text-blue-950">
                    Bill To : {jobData.customer}
                  </h1>
                  <h1 className="text-lg ms-2 text-blue-950">
                    {jobData.gstin || ""}
                  </h1>
                </div>
                <div className='w-full my-1'>
                  <h1 className="text-lg ms-2 text-blue-950">
                    No. : {jobData.jobno}
                  </h1>
                  <h1 className="text-lg ms-2 text-blue-950">
                    Date : {jobData.jobDate}
                  </h1>
                </div>              
              </div>

            </div>

            <div className='col-span-2 bg-gray-200 text-neutral-950 h-6 text-center font-semibold'>Item Details</div>

            <div className='col-span-2 text-black'>
              <table className='border border-collapse w-full'>
                <thead>
                  <tr>
                    <th className='border-2 border-black text-black text-sm font-medium align-bottom' rowSpan={2}>#</th>
                    <th className='border-2 border-black text-black text-sm font-medium align-bottom text-start ps-2' rowSpan={2}>Items & particulars</th>
                    <th className='border-2 border-black text-black text-sm font-medium align-bottom' rowSpan={2}>Qty</th>
                    <th className='border-2 border-black text-black text-sm font-medium align-bottom' rowSpan={2}>Rate</th>
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
                    { 
                    !jobData.isIGST && (
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

