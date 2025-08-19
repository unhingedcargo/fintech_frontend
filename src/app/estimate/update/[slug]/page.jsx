import React from 'react'

export default function UpdateEstimate({params}) {
    const {slug} = React.use(params)
  return (
    <div>
      This will be used for Updating Estimate {slug}
    </div>
  )
}
