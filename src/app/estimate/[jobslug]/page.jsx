// "use client"
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react'


// export default function EstimateDetails({params}) {
//     const {jobno} = useParams(params);
//     const [jobData, setJobData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch(`http://localhost:8000/api/estimate/${jobno}`); 
//         if (!res.ok) {
//           throw new Error(`Error ${res.status}`);
//         }
//         const json = await res.json();
//         setJobData(json);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (jobno) fetchData();
//   }, [jobno]);

// if (loading) return <p>Loading...</p>;
// if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

//   return (
//     <>
//       <div className='pt-20'>
//         <h1>Job Number {jobData.jobno}</h1>

//         <p>{jobData.orders.map(item => (
//           <tr key={item.id}>
//             {item.item_no} <br/>
//             {item.item}<br/>
//             {item.desc}<br/>
//             {item.qty}<br/>
//             {item.rate}<br/>
//             {item.amount}<br/><br/><br/>
//           </tr>
//         ))}</p>
//         {/* <div className='mt-10 pt-10'>
//           <h1>Estimate Details for Job No: {jobno}</h1>
//           <pre>{JSON.stringify(jobData, null, 4)}</pre>
//         </div> */}
//       </div>
//     </>
//   )
// }


"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function EstimateDetails({ params }) {
  const { jobslug } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log("HI",jobslug);
      try {
        const res = await fetch(`http://localhost:8000/api/estimate/${jobslug}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setJobData(json);
        console.log(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    // if (slug) 
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!jobData) return null;

  return (
    <div className="flex justify-center py-20 px-10">
      <div
        id="estimate-pdf"
        className="bg-white shadow-lg p-10 w-[210mm] min-h-[297mm] border border-gray-300"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">Estimate</h1>
          <p className="text-sm text-blue-900">Date: {jobData.job_date}</p>
        </div>

        {/* Customer & Job Info */}
        <div className="mb-6">
          <p><span className="font-semibold">Job No:</span> {jobData.jobno}</p>
          <p><span className="font-semibold">Customer ID:</span> {jobData.cust_id}</p>
          <p><span className="font-semibold">Slug:</span> {jobData.slug}</p>
        </div>

        {/* Orders Table */}
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2">#</th>
              <th className="border border-gray-400 p-2">Item</th>
              <th className="border border-gray-400 p-2">Description</th>
              <th className="border border-gray-400 p-2">Qty</th>
              <th className="border border-gray-400 p-2">Rate</th>
              <th className="border border-gray-400 p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {jobData.orders.map((item, idx) => (
              <tr key={idx}>
                <td className="border border-gray-400 p-2 text-center">{item.item_no}</td>
                <td className="border border-gray-400 p-2">{item.item}</td>
                <td className="border border-gray-400 p-2">{item.desc}</td>
                <td className="border border-gray-400 p-2 text-right">{item.qty}</td>
                <td className="border border-gray-400 p-2 text-right">{item.rate}</td>
                <td className="border border-gray-400 p-2 text-right">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-6 flex justify-end">
          <div className="w-1/3 text-sm">
            <p className="flex justify-between">
              <span>Taxable Amount:</span>
              <span>{jobData.taxable_amount}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax:</span>
              <span>{jobData.tax_amount}</span>
            </p>
            <p className="flex justify-between">
              <span>Discount:</span>
              <span>{jobData.discount}</span>
            </p>
            <p className="flex justify-between font-bold border-t mt-2 pt-2">
              <span>Grand Total:</span>
              <span>{jobData.grandtotal}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-gray-500">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
}
