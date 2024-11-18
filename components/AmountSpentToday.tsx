"use client";
import React from "react";

// Utility to format the date
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface AmountSpentTodayProps {
  restockedTotal: number;
  otherExpendituresTotal: number;
}

export default function AmountSpentToday({
  restockedTotal,
  otherExpendituresTotal,
}: AmountSpentTodayProps) {
  const totalSpent = restockedTotal + otherExpendituresTotal; // Calculate the total spent today
  const today = new Date(); // Current date

  return (
    <div className="mt-6 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold text-center mb-6">
        Money spent on <span className="text-indigo-600">{formatDate(today)}</span>
      </h2>
      <table className="w-full table-auto border-collapse bg-white rounded-md shadow-md">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-right">Amount (Ksh)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2">Amount spent on Stock</td>
            <td className="px-4 py-2 text-right text-green-600">{restockedTotal}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Amount spent on Other Expenses</td>
            <td className="px-4 py-2 text-right text-red-600">{otherExpendituresTotal}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold">Total Spent</td>
            <td className="px-4 py-2 text-right font-bold text-indigo-600 text-lg">
              {totalSpent}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
