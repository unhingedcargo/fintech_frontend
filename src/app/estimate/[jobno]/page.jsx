"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


export default function EstimateDetails({params}) {
    const {jobno} = useParams(params);
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/api/estimate/${jobno}`); 
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        const json = await res.json();
        setJobData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (jobno) fetchData();
  }, [jobno]);

if (loading) return <p>Loading...</p>;
if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <>
      <div className='pt-20'>
        <h1>Job Number {jobno}</h1>

        <p>{jobData.orders.map(item => (
          <tr key={item.id}>
            {item.item_no} <br/>
            {item.item}<br/>
            {item.desc}<br/>
            {item.qty}<br/>
            {item.rate}<br/>
            {item.amount}<br/><br/><br/>
          </tr>
        ))}</p>
        {/* <div className='mt-10 pt-10'>
          <h1>Estimate Details for Job No: {jobno}</h1>
          <pre>{JSON.stringify(jobData, null, 4)}</pre>
        </div> */}
      </div>
    </>
  )
}
