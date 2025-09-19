"use client";
import Sidebar from '@/components/Sidebar';
import jsPDF from 'jspdf';
import React, { useState } from 'react';

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
    const doc = new jsPDF("portrait", "mm");
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
    
    const cust_text = `Bill To : Majestic Infomatrix \nContact No. : ${jobData.contact}`;
    const cust_text_h = doc.getTextDimensions(cust_text,{maxWidth:90}).h + 2;
    console.log(cust_text_h, typeof(parseInt(cust_text_h)));
    
    doc.setLineHeightFactor(2);
    doc.text(`Bill To : Majestic Infomatrix\nContact No. : ${jobData.contact}`, 13, 47, {align:"left", maxWidth:90});
    doc.text(`Bill No. : ${jobData.jobno}\nDate : ${jobData.jobDate}`, 107, 47, {align:"left", maxWidth:90});
    doc.line(10, 48+cust_text_h, 200, 48+cust_text_h);
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
        this is about page

        <button className="btn btn-primary" onClick={createPDF}>create pdf</button>

      </div>

    </div>
    </>
  )
}

