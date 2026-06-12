import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import api from '../api'

export default function SalesEntryPage() {
  const [categories, setCategories] = useState([])
  const [rows, setRows] = useState([{ category: '', total_amount: '', notes: '' }])
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data))
  }, [])

  function updateRow(i, field, value) {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r))
  }

  function addRow() {
    setRows(prev => [...prev, { category: '', total_amount: '', notes: '' }])
  }

  function removeRow(i) {
    setRows(prev => prev.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    const valid = rows.filter(r => r.category && r.total_amount)
    if (!valid.length) return setError('Please fill in at least one category and amount.')

    const dupes = valid.map(r => r.category).filter((c, i, arr) => arr.indexOf(c) !== i)
    if (dupes.length) return setError(`Duplicate category in this batch: ${dupes[0]}`)

    setSaving(true)
    try {
      await Promise.all(
        valid.map(r => api.post('/sales', {
          category: r.category,
          sale_date: date,
          total_amount: r.total_amount,
          notes: r.notes,
        }))
      )
      setSuccess(`${valid.length} entr${valid.length > 1 ? 'ies' : 'y'} saved for ${dayjs(date).format('MMMM D, YYYY')}.`)
      setRows([{ category: '', total_amount: '', notes: '' }])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save entries.')
    } finally {
      setSaving(false)
    }
  }

  const usedCategories = rows.map(r => r.category).filter(Boolean)

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Sales Entry</h1>
      </div>

      <div className="entry-card">
        <form onSubmit={handleSubmit}>
          <div className="field" style={{ maxWidth: 240, marginBottom: 24 }}>
            <label>Sales Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              max={dayjs().format('YYYY-MM-DD')}
            />
          </div>

          <div className="entry-table">
            <div className="entry-header">
              <span>Category</span>
              <span>Total Sales (₱)</span>
              <span>Notes (optional)</span>
              <span></span>
            </div>

            {rows.map((row, i) => (
              <div key={i} className="entry-row">
                <select
                  className="select"
                  value={row.category}
                  onChange={e => updateRow(i, 'category', e.target.value)}
                >
                  <option value="">Select category...</option>
                  {categories.map(c => (
                    <option
                      key={c}
                      value={c}
                      disabled={usedCategories.includes(c) && row.category !== c}
                    >
                      {c}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="input"
                  placeholder="0.00"
                  value={row.total_amount}
                  onChange={e => updateRow(i, 'total_amount', e.target.value)}
                  min="0"
                  step="0.01"
                />

                <input
                  type="text"
                  className="input"
                  placeholder="Optional note..."
                  value={row.notes}
                  onChange={e => updateRow(i, 'notes', e.target.value)}
                />

                <button
                  type="button"
                  className="btn-icon-delete"
                  onClick={() => removeRow(i)}
                  disabled={rows.length === 1}
                >✕</button>
              </div>
            ))}
          </div>

          <button type="button" className="btn-add-row" onClick={addRow}>
            + Add another category
          </button>

          {error && <p className="error" style={{ marginTop: 16 }}>{error}</p>}
          {success && <p className="success" style={{ marginTop: 16 }}>✓ {success}</p>}

          <div style={{ marginTop: 24 }}>
            <button type="submit" className="btn-submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Sales Entries'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
