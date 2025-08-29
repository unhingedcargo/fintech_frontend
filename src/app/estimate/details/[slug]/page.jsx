"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function EstimateDetails({ params }) {
    const { slug } = useParams(params)
  return (
    <div>
      Estimate Details { slug } 
    </div>
  )
}
