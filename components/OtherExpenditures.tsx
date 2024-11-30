import React, { useState } from "react";

interface OtherExpendituresProps {
  setExpendituresTotal: React.Dispatch<React.SetStateAction<number>>;
  setOtherExpenses: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export default function OtherExpenditures({
  setExpendituresTotal,
  setOtherExpenses,
}: OtherExpendituresProps) {
  const [otherExpenses, setLocalOtherExpenses] = useState<Record<string, number>>({});
  const [expenseName, setExpenseName] = useState<string>("");

  const handleExpenseAmountChange = (name: string, amount: number) => {
    setLocalOtherExpenses((prev) => ({
      ...prev,
      [name]: amount,
    }));
  };

  const addExpense = () => {
    if (expenseName.trim() === "") {
      alert("Please enter an expense name.");
      return;
    }
    setLocalOtherExpenses((prev) => ({
      ...prev,
      [expenseName]: 0,
    }));
    setExpenseName(""); // Clear the input after adding
  };

  const calculateOtherExpendituresTotal = () => {
    const total = Object.values(otherExpenses).reduce((acc, curr) => acc + curr, 0);
    console.log("Calculated Other Expenditures Total:", total);
    setExpendituresTotal(total); // Update the parent state
    setOtherExpenses(otherExpenses); // Pass other expenses back to parent
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">Other Expenditures</h3>
      <div className="space-y-4">
        <input
          type="text"
          className="p-2 border rounded-md w-full"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <button
          onClick={addExpense}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Add Expense
        </button>
        {Object.keys(otherExpenses).map((expense, index) => (
          <div key={index} className="flex justify-between items-center">
            <label className="text-lg">{expense}</label>
            <input
              type="number"
              className="p-2 border rounded-md"
              value={otherExpenses[expense] || 0}
              onChange={(e) =>
                handleExpenseAmountChange(expense, parseFloat(e.target.value))
              }
            />
          </div>
        ))}
      </div>
      <button
        onClick={calculateOtherExpendituresTotal}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
      >
        Calculate Other Expenditures Total
      </button>
    </div>
  );
}
