import { useState } from 'react'
import dayjs from 'dayjs'

export default function SalesForm({ onAdd, existingSales }) {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [amount, setAmount] = useState('')
  const [label, setLabel] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!date) return setError('Please select a date.')
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0)
      return setError('Please enter a valid amount.')
    setError('')
    onAdd(date, amount, label)
    setAmount('')
    setLabel('')
  }

  const isEdit = existingSales.some(s => s.date === date)

  return (
    <div className="form-card">
      <h2 className="form-title">
        {isEdit ? '✏️ Edit Sales Entry' : '➕ Add Daily Sales'}
      </h2>
      {isEdit && (
        <p className="edit-notice">A record for this date already exists — submitting will overwrite it.</p>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            max={dayjs().format('YYYY-MM-DD')}
          />
        </div>
        <div className="field">
          <label>Total Sales (₱)</label>
          <input
            type="number"
            placeholder="e.g. 15000"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
        <div className="field">
          <label>Note <span className="optional">(optional)</span></label>
          <input
            type="text"
            placeholder="e.g. Payday sale, holiday promo"
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-submit">
          {isEdit ? 'Update Entry' : 'Save Entry'}
        </button>
      </form>
    </div>
  )
}
