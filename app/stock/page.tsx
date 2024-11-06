import AccordionStockList from '@/components/AccordionStockList'
import RestockedItems from '@/components/RestockedItems'
import React from 'react'

export default function Stock() {
  return (
    <div>
      <AccordionStockList/>
      <RestockedItems/>
    </div>
  )
}
