import Link from 'next/link'

// Function to fetch data from your API
async function fetchRecordById(_id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const response = await fetch(`${baseUrl}/api/dailyRecord/${_id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch the record");
  }

  const result = await response.json();
  return result.data; // Assuming the API response structure
}

export default async function page({ params }) {
  const { _id } = params
  let record;
  try {
    record = await fetchRecordById(_id); // Fetch record by ID
    console.log(record)
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center text-red-600 p-4">
        <h1 className="text-2xl font-bold">Error fetching record</h1>
        <Link
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition mt-4 inline-block"
          href="/daily-records"
        >
          Back
        </Link>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold">Record not found!</h1>
        <Link
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition mt-4 inline-block"
          href="/daily-records"
        >
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className='flex justify-between p-4'>
        <h1 className="text-3xl font-semibold">Daily Record</h1>
        <Link 
          className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition'
          href="/daily-records">
          Back
        </Link>
      </div>

      <div className="mt-6">
        <div className="mb-4">
          <p className="text-xl font-bold mb-2">Stock Items</p>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {record.stockItems.map((item) => (
                <tr key={item._id}>
                  <td className="border-b px-4 py-2">{item.name}</td>
                  <td className="border-b px-4 py-2">{item.amount} Ksh</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <p className="text-xl font-bold mb-2">Other Expenses</p>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(record.otherExpenses).map(([name, amount]) => (
                <tr key={name}>
                  <td className="border-b px-4 py-2">{name}</td>
                  <td className="border-b px-4 py-2">{amount} Ksh</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 border-t-2 border-gray-300 bg-gray-50">
           <p className="text-2xl font-semibold text-gray-800">
              Grand Total: <span className="text-xl text-indigo-600">{record.grandTotal} Ksh</span>
           </p>
       </div>

      </div>
    </div>
  )
}
