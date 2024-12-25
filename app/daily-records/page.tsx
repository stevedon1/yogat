"use client"
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { formatDateLong } from '@/utils'
import { FaPlus } from 'react-icons/fa';

export default function page() {
    const [data, setData] = useState([])
    useEffect(()=>{
        const fetchDailyRecords = async () => {
            try {
              const response = await fetch("/api/dailyRecord");
              if (!response.ok) {
                throw new Error("Failed to fetch daily records");
              }
              const result = await response.json();
              const sortedRecords = result.data.sort(
                (a: { date: string | number | Date; }, b: { date: string | number | Date; }) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              setData(sortedRecords); // Assuming `data` contains the fetched records
            } catch (error: any) {
              console.log(error.message);
             } 
            //  finally {
            //   setLoading(false);
            // }
          };
          fetchDailyRecords()
    },[])
      
  return (
    <div className='w-full'>
      <div className="flex justify-between items-center mx-6 mt-4 mb-4">
  <h1 className="font-bold font-sans text-xl bg-indigo-100 px-4 rounded-md">
    Your <span className="text-xl text-indigo-600">Daily</span> Records
  </h1>
  <Link
    href="/stock"
    className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700"
  >
    <FaPlus className="text-white text-lg" />
    <p>Add Stock</p>
  </Link>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">


  {data && data.map((stock) => (
    <Link
      href="/"
      key={stock._id}
      className="w-full h-32 font-sans bg-gray-200 px-4 rounded-lg shadow-md mx-auto mb-2 shadow-indigo-500/50"
    >
      <h1 className="text-sm font-semibold text-gray-600 mb-2">
        {formatDateLong(new Date(stock.date))}
      </h1>
      <p className="text-gray-900">
        <span className="font-medium">Amount for stock:</span> {stock.stockTotal} Ksh
      </p>
      <p className="text-gray-800">
        <span className="font-medium">Other Expenses:</span> {stock.otherExpensesTotal} Ksh
      </p>
      <p className="text-gray-900 font-bold mt-2">
        <span className="font-bold">Total:</span> {stock.grandTotal} Ksh
      </p>
    </Link>
  ))}
        {data.length === 0 && (
  <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
    <p className="text-red-600 text-lg font-semibold mb-2">
      You have no recorded stock!
    </p>
    <p className="text-gray-600 text-sm mb-4">
      Click below to record your stocks.
    </p>
    <Link 
      href="/stock" 
      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
    >
      Record Stocks
    </Link>
  </div>
)}
</div>

    </div>
  )
}
