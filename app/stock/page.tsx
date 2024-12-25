"use client";
import React, { useState } from "react";
import AccordionStockList from "@/components/AccordionStockList";
import AmountSpentToday from "@/components/AmountSpentToday";
import OtherExpenditures from "@/components/OtherExpenditures";
import RestockedItems from "@/components/RestockedItems";
import { useRouter } from "next/navigation";

export default function Stock() {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [restockedTotal, setRestockedTotal] = useState<number>(0);
  const [otherExpendituresTotal, setOtherExpendituresTotal] = useState<number>(0);
  const [stockAmounts, setStockAmounts] = useState<Record<string, number>>({});
  const [otherExpenses, setOtherExpenses] = useState<Record<string, number>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Function to save the daily record
  const saveDailyRecord = async () => {
    // Validation: Ensure there is data to save
    if (
      restockedTotal === 0 &&
       selectedItems.length === 0 
      // otherExpendituresTotal === 0
    ) {
      alert("Cannot save empty data. Please enter valid amounts.");
      return;
    }

    setIsSaving(true);

    const data = {
      date: new Date(),
      stockItems: selectedItems.map((item) => ({
        name: item,
        amount: stockAmounts[item],
      })),
      otherExpenses,
      stockTotal: restockedTotal,
      otherExpensesTotal: otherExpendituresTotal,
      grandTotal: restockedTotal + otherExpendituresTotal,
    };

    try {
      const response = await fetch("/api/dailyRecord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        alert("Record saved successfully!");
        // Reset state to clear totals and avoid resaving
        setSelectedItems([]);
        setRestockedTotal(0);
        setOtherExpendituresTotal(0);
        setStockAmounts({});
        setOtherExpenses({});
        router.push("/daily-records")
      } else {
        alert("Failed to save record.");
      }
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Error saving record.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-2xl my-4">Stock Management</h1>
      <div className="w-4/5 mx-auto">
        <AccordionStockList setSelectedItems={setSelectedItems} />
        <RestockedItems
          selectedItems={selectedItems}
          setRestockedTotal={setRestockedTotal}
          setStockAmounts={setStockAmounts}
        />
        <OtherExpenditures
          setExpendituresTotal={setOtherExpendituresTotal}
          setOtherExpenses={setOtherExpenses}
        />
        <AmountSpentToday
          restockedTotal={restockedTotal}
          otherExpendituresTotal={otherExpendituresTotal}
        />
        <div className="flex justify-center mt-6">
          <button
            onClick={saveDailyRecord}
            className={`px-4 py-2 rounded-md ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white"
            }`}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Daily Record"}
          </button>
        </div>
      </div>
    </div>
  );
}
