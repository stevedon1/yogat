"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { formatDate } from "../utils/index";

interface Debtor {
  name: string;
  amountOwed: number;
  debtDate: string;
  isPaidOff: boolean;
}

export default function Debtors() {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  // Fetch all debtors
  const fetchDebtors = async () => {
    try {
      const response = await fetch("/api/debtors");
      const result = await response.json();
      if (result.success) {
        setDebtors(result.data);
      }
    } catch (error) {
      console.error("Error fetching debtors:", error);
    }
  };

  useEffect(() => {
    fetchDebtors();
  }, []);

  // Add or update a debtor
  const addOrUpdateDebtor = async () => {
    if (!name || amount <= 0) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/debtors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          amountOwed: amount,
        }),
      });

      const result = await response.json();
      if (result.success) {
        fetchDebtors(); // Refresh the list
        setName("");
        setAmount(0);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding/updating debtor:", error);
    }
  };

  // Mark a debtor as paid off
  const clearDebt = async (debtorName: string) => {
    try {
      const response = await fetch("/api/debtors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: debtorName }),
      });

      const result = await response.json();
      if (result.success) {
        fetchDebtors(); // Refresh the list
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error clearing debt:", error);
    }
  };

  // Total amount owed
  const totalAmount = debtors.reduce(
    (total, debtor) => (!debtor.isPaidOff ? total + debtor.amountOwed : total),
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Who has your Debt?</h2>
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
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Debtors List:</h3>
        <ul>
          {debtors.map((debtor, index) => (
            <li key={index} className="flex justify-between py-2 items-center">
              <div
                className={`flex-grow ${
                  debtor.isPaidOff ? "line-through text-gray-500" : ""
                }`}
              >
                <span>{debtor.name}</span>
                <span className="ml-4">{debtor.amountOwed} Ksh</span>
                <span className="ml-4">{formatDate(debtor.debtDate)}</span>
              </div>
              <div className="flex items-center space-x-4">
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
      <div className="font-bold">
        <h3>Total Amount Owed: {totalAmount} Ksh</h3>
      </div>
    </div>
  );
}
