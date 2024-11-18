"use client";
import AccordionStockList from "@/components/AccordionStockList";
import AmountSpentToday from "@/components/AmountSpentToday";
import OtherExpenditures from "@/components/OtherExpenditures";
import RestockedItems from "@/components/RestockedItems";
import React, { useState } from "react";

export default function Stock() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [restockedTotal, setRestockedTotal] = useState<number>(0); // Total from RestockedItems
  const [otherExpendituresTotal, setOtherExpendituresTotal] = useState<number>(0); // Total from OtherExpenditures

  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-2xl my-4">Stock Management</h1>
      <div className="w-4/5 mx-auto">
        <AccordionStockList setSelectedItems={setSelectedItems} />
        <RestockedItems
          selectedItems={selectedItems}
          setRestockedTotal={setRestockedTotal} // Pass callback to set total
        />
        <OtherExpenditures
          setExpendituresTotal={setOtherExpendituresTotal} // Pass callback to set total
        />
        <AmountSpentToday
          restockedTotal={restockedTotal}
          otherExpendituresTotal={otherExpendituresTotal}
        />
      </div>
    </div>
  );
}
