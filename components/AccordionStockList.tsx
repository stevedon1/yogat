"use client"
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { stockList } from '@/constants';

interface AccordionStockListProps {
  setSelectedItems: (items: string[]) => void;
}

export default function AccordionStockList({ setSelectedItems }: AccordionStockListProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [accordionValue, setAccordionValue] = useState<string>('item-1');

  const handleCheckboxChange = (stock: string) => {
    setCheckedItems(prev =>
      prev.includes(stock) ? prev.filter(item => item !== stock) : [...prev, stock]
    );
  };

  const handleListSelectedItems = () => {
    setSelectedItems(checkedItems);
    setAccordionValue(""); // Collapse the accordion
  };

  return (
    <div className="w-full">
      <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-indigo-500 font-semibold">
            What did you Restock today?
          </AccordionTrigger>
          <AccordionContent>
            <ul className="mt-2 space-y-2">
              {stockList.map(stock => {
                const isChecked = checkedItems.includes(stock);
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
            <button
              onClick={handleListSelectedItems}
              className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-md font-semibold"
            >
              List Selected Items
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
