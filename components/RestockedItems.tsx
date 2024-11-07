"use client"
import React, { useState } from 'react';

interface RestockedItemsProps {
  selectedItems: string[];
}

export default function RestockedItems({ selectedItems }: RestockedItemsProps) {
  const [itemsWithAmount, setItemsWithAmount] = useState<{ [key: string]: number }>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleAmountChange = (item: string, amount: number) => {
    setItemsWithAmount(prev => ({
      ...prev,
      [item]: amount,
    }));
  };

  const handleRemoveItem = (item: string) => {
    setItemsWithAmount(prev => {
      const updatedItems = { ...prev };
      delete updatedItems[item];
      return updatedItems;
    });
  };

  const handleCalculateTotal = () => {
    const total = Object.values(itemsWithAmount).reduce((sum, amount) => sum + amount, 0);
    setTotalAmount(total);
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-gray-800">Restocked Items</h3>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Item</th>
            <th className="px-4 py-2 text-left">Amount Spent</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map(item => (
            <tr key={item}>
              <td className="px-4 py-2">{item}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={itemsWithAmount[item] || ''}
                  onChange={(e) => handleAmountChange(item, parseFloat(e.target.value))}
                  className="border px-2 py-1 rounded-md w-full sm:w-24" // Responsive width, reduces on small devices
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={handleCalculateTotal}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md"
        >
          Calculate Total
        </button>
      </div>
      {totalAmount > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h4 className="text-lg font-semibold">Total Amount Spent:</h4>
          <p className="text-2xl font-bold text-indigo-500">KSh {totalAmount}</p>
        </div>
      )}
    </div>
  );
}
