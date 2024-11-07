import React, { useState } from 'react';

interface Expenditure {
  name: string;
  amount: number;
}

export default function OtherExpenditures() {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([{ name: "", amount: 0 }]);
  const [totalExpenditure, setTotalExpenditure] = useState<number>(0);

  const handleInputChange = (index: number, field: keyof Expenditure, value: string | number) => {
    const updatedExpenditures = [...expenditures];
    updatedExpenditures[index] = { ...updatedExpenditures[index], [field]: value };
    setExpenditures(updatedExpenditures);
  };

  const handleAddExpenditure = () => {
    setExpenditures([...expenditures, { name: "", amount: 0 }]);
  };

  const handleCalculateTotal = () => {
    const total = expenditures.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    setTotalExpenditure(total);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800">Where else do you spend your money?</h3>
      <div className="mt-4">
        {expenditures.map((expenditure, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="text"
              placeholder="eg.Lunch"
              value={expenditure.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="border px-2 py-1 rounded-md mr-2 w-1/3"
            />
            <input
              type="number"
              placeholder="Amount"
              value={expenditure.amount || ""}
              onChange={(e) => handleInputChange(index, "amount", parseFloat(e.target.value))}
              className="border px-2 py-1 rounded-md mr-2 w-1/3"
            />
            {expenditures.length > 1 && (
              <button
                onClick={() => {
                  const updated = expenditures.filter((_, i) => i !== index);
                  setExpenditures(updated);
                }}
                className="text-red-500"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handleAddExpenditure}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md"
        >
          Add Expense
        </button>
        <button
          onClick={handleCalculateTotal}
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          + Total Expenditure
        </button>
      </div>

      {totalExpenditure > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h4 className="text-lg font-semibold">Total Spent:</h4>
          <p className="text-2xl font-bold text-indigo-500">KSh {totalExpenditure}</p>
        </div>
      )}
    </div>
  );
}
