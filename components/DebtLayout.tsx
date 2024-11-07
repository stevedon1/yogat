import Link from 'next/link';
import React from 'react';

export default function DebtLayout() {
  return (
    <header className="bg-white shadow-md relative mt-1 z-10">
      <div className="container mx-auto p-4">
        <nav className="flex justify-around ">
          <Link href="/debts/debtors" className="text-indigo-600 font-semibold px-4 rounded hover:bg-indigo-100 transition-colors duration-200">
            Debtors
          </Link>
          <Link href="/debts/creditors" className="text-indigo-600 font-semibold px-4 rounded hover:bg-indigo-100 transition-colors duration-200">
            Creditors
          </Link>
        </nav>
      </div>
    </header>
  );
}
