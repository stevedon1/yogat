import React, { useState } from "react";

interface RestockedItemsProps {
  selectedItems: string[];
  setRestockedTotal: React.Dispatch<React.SetStateAction<number>>;
  setStockAmounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export default function RestockedItems({
  selectedItems,
  setRestockedTotal,
  setStockAmounts,
}: RestockedItemsProps) {
  const [stockAmounts, setLocalStockAmounts] = useState<Record<string, number>>({});

  const handleAmountChange = (item: string, amount: number) => {
    setLocalStockAmounts((prev) => ({
      ...prev,
      [item]: amount,
    }));
  };

  const calculateRestockedTotal = () => {
    const total = Object.values(stockAmounts).reduce((acc, curr) => acc + curr, 0);
    console.log("Calculated Restocked Total:", total);
    setRestockedTotal(total); // Update the parent state
    setStockAmounts(stockAmounts); // Pass stock amounts back to parent
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">Restocked Items</h3>
      <div className="space-y-4">
        {selectedItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <label className="text-lg">{item}</label>
            <input
              type="number"
              className="p-2 border rounded-md"
              placeholder="Enter amount"
              value={stockAmounts[item] || 0}
              onChange={(e) => handleAmountChange(item, parseFloat(e.target.value))}
            />
          </div>
        ))}
      </div>
      <button
        onClick={calculateRestockedTotal}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
      >
        Calculate Restocked Total
      </button>
    </div>
  );
}
