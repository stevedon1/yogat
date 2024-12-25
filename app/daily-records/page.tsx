import Link from 'next/link'
import React from 'react'
import { formatDateLong } from '@/utils'

export default function page() {
    const data = [
        {
            "_id": "674ae8d89388e6b0241797",
            "date": "2024-11-30T10:28:40.393+00:00",
            "stockItems": [
              {
                "name": "250 ML Tumblers",
                "amount": 100,
                "_id": "674ae8d89388e6b0241797e9"
              },
              {
                "name": "Lids 500 ML",
                "amount": 80,
                "_id": "674ae8d89388e6b0241797ea"
              }
            ],
            "otherExpenses": {
              "lunch": 50
            },
            "stockTotal": 180,
            "otherExpensesTotal": 50,
            "grandTotal": 230,
            "__v": 0
          },
          {
            "_id": "674ae8d89388e6b0241797e8",
            "date": "2024-11-30T10:28:40.393+00:00",
            "stockItems": [
              {
                "name": "250 ML Tumblers",
                "amount": 100,
                "_id": "674ae8d89388e6b0241797e9"
              },
              {
                "name": "Lids 500 ML",
                "amount": 80,
                "_id": "674ae8d89388e6b0241797ea"
              }
            ],
            "otherExpenses": {
              "lunch": 50
            },
            "stockTotal": 180,
            "otherExpensesTotal": 50,
            "grandTotal": 230,
            "__v": 0
          }
    ]
      
  return (
    <div className='w-full'>
      <h1 className='font-bold mt-2 mb-2 text-center text-xl'>Your <span className='text-xl text-indigo-500'>Daily</span> Records</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

  {data && data.map((stock) => (
    <Link
      href="/"
      key={stock._id}
      className="w-full h-32 bg-gray-200 px-4 rounded-lg shadow-md mx-auto mb-2 shadow-indigo-500/50"
    >
      <h1 className="text-lg font-semibold text-gray-800 mb-2">
        {formatDateLong(new Date(stock.date))}
      </h1>
      <p className="text-gray-600">
        <span className="font-medium">Amount for stock:</span> {stock.stockTotal} Ksh
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Other Expenses:</span> {stock.otherExpensesTotal} Ksh
      </p>
      <p className="text-gray-900 font-bold mt-2">
        <span className="font-medium">Total:</span> {stock.grandTotal} Ksh
      </p>
    </Link>
  ))}
</div>

    </div>
  )
}
