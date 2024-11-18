"use client";
import React, { useState, useEffect } from "react";

interface Expenditure {
  name: string;
  amount: number;
}

interface OtherExpendituresProps {
  setExpendituresTotal: (total: number) => void; // Prop to pass total to parent
}

export default function OtherExpenditures({ setExpendituresTotal }: OtherExpendituresProps) {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([{ name: "", amount: 0 }]);
  const [totalExpenditure, setTotalExpenditure] = useState<number>(0);

  // Automatically recalculate total when expenditures change
  useEffect(() => {
    const total = expenditures.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    setTotalExpenditure(total);
    setExpendituresTotal(total); // Pass the total to the parent component
  }, [expenditures, setExpendituresTotal]);

  const handleInputChange = (index: number, field: keyof Expenditure, value: string | number) => {
    const updatedExpenditures = [...expenditures];
    updatedExpenditures[index] = { ...updatedExpenditures[index], [field]: value };
    setExpenditures(updatedExpenditures);
  };

  const handleAddExpenditure = () => {
    setExpenditures([...expenditures, { name: "", amount: 0 }]);
  };

  const handleRemoveExpenditure = (index: number) => {
    const updated = expenditures.filter((_, i) => i !== index);
    setExpenditures(updated);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800">Where else do you spend your money?</h3>
      <div className="mt-4">
        {expenditures.map((expenditure, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="text"
              placeholder="e.g., Lunch"
              value={expenditure.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="border px-2 py-1 rounded-md mr-2 w-1/3"
            />
            <input
              type="number"
              placeholder="Amount"
              value={expenditure.amount || ""}
              onChange={(e) => handleInputChange(index, "amount", parseFloat(e.target.value) || 0)}
              className="border px-2 py-1 rounded-md mr-2 w-1/3"
            />
            {expenditures.length > 1 && (
              <button
                onClick={() => handleRemoveExpenditure(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={handleAddExpenditure}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md"
        >
          Add Expense
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
