import Link from 'next/link'
import React from 'react'

export default function page({ params }:{ params :{_id:string}}) {
  const {_id} = params
  return (
    
    <div>
      <div className='flex justify-between p-4 '>
        <h1></h1>
        <Link 
         className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition'
         href="/daily-records">
         Back
        </Link>
      </div>
      {_id}
    </div>
  )
}
