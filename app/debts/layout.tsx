import DebtLayout from '@/components/DebtLayout'
import React from 'react'

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <DebtLayout/>
        {children}
    </div>
  )
}
