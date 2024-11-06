"use client"
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { stockList } from '@/constants';

export default function AccordionStockList() {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

  const handleCheckboxChange = (stock: string) => {
    setSelectedStocks(prev =>
      prev.includes(stock) ? prev.filter(item => item !== stock) : [...prev, stock]
    );
  };

  return (
    <div className="w-4/5 mx-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-indigo-500 font-semibold">
            Which Stocks are you restocking today?
          </AccordionTrigger>
          <AccordionContent>
            <ul className="mt-2 space-y-2">
              {stockList.map(stock => {
                const isChecked = selectedStocks.includes(stock);
                return (
                  <li
                    key={stock}
                    onClick={() => handleCheckboxChange(stock)}
                    className={`flex justify-between items-center p-2 cursor-pointer border-b border-gray-200 rounded-lg transition-colors 
                      ${isChecked ? 'bg-indigo-500 text-white' : 'text-gray-800 hover:bg-indigo-100'}`}
                  >
                    <span>{stock}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(stock)}
                      className="form-checkbox text-indigo-500"
                      onClick={(e) => e.stopPropagation()} // Prevents checkbox click from triggering the list item click
                    />
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
