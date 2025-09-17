"use client";
import Sidebar from '@/components/Sidebar';
import jsPDF from 'jspdf';
import React, { useState } from 'react';

export default function AboutPage() {
  const [fileName, setFileName] = useState('test.pdf');
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
    "gstin" : "gsting",
    "jobno" : "jobno",
    "jobDate" : "jobDate",
    "paymentMode" : "paymentMode",
    "orderValue" : "orderValue",
    "advance" : "advance"
  });
  const [orderData, setOrderData] = useState([]);
  
  const createPDF = () => {
    // const img = "/PrintPlus LOGO PNG.png";
    const data = new jsPDF();
    data.addFont("/fonts/Poppins-Regular.ttf", "regular", 'normal');
    data.addFont("/fonts/Poppins-Bold.ttf", "bold", 'normal');
    data.addFont("/fonts/Poppins-Medium.ttf", "medium", 'normal');
    data.rect(10, 10, 190, 277);
    data.line(10, 40, 200, 40);

    // HEADER
    data.addImage(`${companyData.logo}`, "PNG", 13,13,24,24,"Company LOGO");
    data.setFont("medium", "normal");
    data.setFontSize(12);
    data.text(`${companyData.name}`, 45, 16);
    
    data.setFont("regular", "normal");
    data.setFontSize(10);
    data.text(
      `${companyData.address}\nContact : ${companyData.contact}\nGSTIN : ${companyData.gstin}`, 
      45, 21, {maxWidth: 70}
    );

    data.setFontSize(22);
    data.setTextColor(15,98,172);
    data.text("ESTIMATE", 198, 38, {align:'right'});

    // Customer Details




    // Order Details




    // Footer


    data.text("this is a new pdf", 50, 50);
    data.save(`${jobData.jobno}.pdf`);
    
  }

  return (
    <>
    <div className='flex'>
      <div className="w-full md:w-64">
        <Sidebar />
      </div>
      <div className='flex-1 mx-8 my-5 pt-20'>
        this is about page

        <button className="btn btn-primary" onClick={createPDF}>create pdf</button>

      </div>

    </div>
    </>
  )
}

