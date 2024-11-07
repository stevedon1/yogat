"use client"
import AccordionStockList from '@/components/AccordionStockList'
import OtherExpenditures from '@/components/OtherExpenditures';
import RestockedItems from '@/components/RestockedItems'
import React, { useState } from 'react'

export default function Stock() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-2xl my-4">Stock Management</h1>
      <div className="w-4/5 mx-auto">
        <AccordionStockList setSelectedItems={setSelectedItems} />
        <RestockedItems selectedItems={selectedItems} />
        <OtherExpenditures/>
      </div>
    </div>
  );
}
