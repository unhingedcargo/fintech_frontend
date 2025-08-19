import React from 'react'

export default function EstimateDetails({ params }) {
    const { slug } = React.use(params)
  return (
    <div>
      Estimate Details { slug } 
    </div>
  )
}
