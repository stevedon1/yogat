"use client"
import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { formatDate } from '../utils/index';

interface Debtor {
  name: string;
  amountOwed: number;
  debtDate: string;
  isPaidOff: boolean;
}

export default function Debtors() {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  // Add or update a debtor's debt
  const addOrUpdateDebtor = () => {
    if (name && amount > 0) {
      const existingDebtor = debtors.find(debtor => debtor.name === name);
      if (existingDebtor) {
        const updatedDebtors = debtors.map(debtor =>
          debtor.name === name
            ? {
                ...debtor,
                amountOwed: debtor.isPaidOff ? amount : debtor.amountOwed + amount,
                debtDate: new Date().toISOString(),
                isPaidOff: false,
              }
            : debtor
        );
        setDebtors(updatedDebtors);
      } else {
        // Add a new debtor
        const newDebtor = {
          name,
          amountOwed: amount,
          debtDate: new Date().toISOString(),
          isPaidOff: false,
        };
        setDebtors([...debtors, newDebtor]);
      }
      setName('');
      setAmount(0);
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Mark a debtor as paid off
  const clearDebt = (debtorName: string) => {
    const updatedDebtors = debtors.map(debtor =>
      debtor.name === debtorName
        ? { ...debtor, isPaidOff: true }
        : debtor
    );
    setDebtors(updatedDebtors);
  };

  // Calculate total amount owed (excluding paid debts)
  const totalAmount = debtors.reduce(
    (total, debtor) => (!debtor.isPaidOff ? total + debtor.amountOwed : total),
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Who has your Debt?</h2>
      
      {/* Input fields for debtor's name and amount */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Debtor Name"
          className="p-2 border rounded-md w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount Owed"
          className="p-2 border rounded-md w-full mb-2"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button
          onClick={addOrUpdateDebtor}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
        >
          Add/Update Debtor
        </button>
      </div>

      {/* Displaying the list of debtors */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Debtors List:</h3>
        <ul>
          {debtors.map((debtor, index) => (
            <li key={index} className="flex justify-between py-2 items-center">
              <div className={`flex-grow ${debtor.isPaidOff ? "line-through text-gray-500" : ""}`}>
                <span>{debtor.name}</span>
                <span className="ml-4">{debtor.amountOwed} Ksh</span>
                <span className="ml-4">{formatDate(debtor.debtDate)}</span>
              </div>
              <div className="flex items-center space-x-4">
                {/* Icon to mark debt as paid */}
                {!debtor.isPaidOff && (
                  <FaCheckCircle
                    onClick={() => clearDebt(debtor.name)}
                    className="text-green-600 hover:text-green-800 cursor-pointer"
                    size={20}
                    aria-label="Mark as Paid"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Display total amount */}
      <div className="font-bold">
        <h3>Total Amount Owed: {totalAmount} Ksh</h3>
      </div>
    </div>
  );
}
