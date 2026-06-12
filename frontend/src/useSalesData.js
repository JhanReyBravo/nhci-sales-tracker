import { useState, useEffect } from 'react'

const STORAGE_KEY = 'sales_dashboard_data'

export function useSalesData() {
  const [sales, setSales] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales))
  }, [sales])

  function addSale(date, amount, label = '') {
    setSales(prev => {
      const existing = prev.findIndex(s => s.date === date)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { date, amount: parseFloat(amount), label }
        return updated.sort((a, b) => a.date.localeCompare(b.date))
      }
      return [...prev, { date, amount: parseFloat(amount), label }].sort((a, b) =>
        a.date.localeCompare(b.date)
      )
    })
  }

  function deleteSale(date) {
    setSales(prev => prev.filter(s => s.date !== date))
  }

  return { sales, addSale, deleteSale }
}
