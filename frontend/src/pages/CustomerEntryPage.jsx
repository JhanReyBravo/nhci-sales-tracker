import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import api from '../api'

export default function CustomerEntryPage() {
  const [customers, setCustomers] = useState([])
  const [date, setDate]           = useState(dayjs().format('YYYY-MM-DD'))
  const [rows, setRows]           = useState([{ customer_id: '', total_amount: '', dr_number: '', inv_number: '', notes: '' }])
  const [saving, setSaving]       = useState(false)
  const [success, setSuccess]     = useState('')
  const [error, setError]         = useState('')

  useEffect(() => {
    api.get('/customers').then(({ data }) => setCustomers(data.filter(c => c.is_active)))
  }, [])

  function addRow() {
    setRows(r => [...r, { customer_id: '', total_amount: '', dr_number: '', inv_number: '', notes: '' }])
  }

  function removeRow(i) {
    setRows(r => r.filter((_, idx) => idx !== i))
  }

  function updateRow(i, field, value) {
    setRows(r => r.map((row, idx) => idx === i ? { ...row, [field]: value } : row))
  }

  async function handleSave() {
    setError('')
    setSuccess('')

    // Validate
    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].customer_id) return setError(`Row ${i + 1}: please select a customer.`)
      if (!rows[i].total_amount || isNaN(rows[i].total_amount)) return setError(`Row ${i + 1}: enter a valid amount.`)
    }

    // Check duplicate customers in batch
    const ids = rows.map(r => r.customer_id)
    if (new Set(ids).size !== ids.length) return setError('Duplicate customer in the same batch.')

    setSaving(true)
    try {
      await Promise.all(rows.map(row =>
        api.post('/customer-sales', { ...row, sale_date: date })
      ))
      setSuccess(`${rows.length} entr${rows.length > 1 ? 'ies' : 'y'} saved for ${dayjs(date).format('MMM D, YYYY')}.`)
      setRows([{ customer_id: '', total_amount: '', dr_number: '', inv_number: '', notes: '' }])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save entries.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Customer Sales Entry</h1>
      </div>

      <div className="filter-card" style={{ marginBottom: 20 }}>
        <label className="form-label">Sale Date</label>
        <input type="date" className="input" style={{ maxWidth: 200 }}
          value={date} onChange={e => setDate(e.target.value)} />
      </div>

      <div className="table-card">
        {/* Header */}
        <div className="cust-entry-header">
          <span>Customer</span>
          <span>DR No.</span>
          <span>Inv No.</span>
          <span>Amount (₱)</span>
          <span>Notes</span>
          <span></span>
        </div>

        {rows.map((row, i) => (
          <div className="cust-entry-row" key={i}>
            <select className="select" value={row.customer_id}
              onChange={e => updateRow(i, 'customer_id', e.target.value)}>
              <option value="">Select customer...</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input className="input" placeholder="DR No." value={row.dr_number}
              onChange={e => updateRow(i, 'dr_number', e.target.value)} />
            <input className="input" placeholder="Inv No." value={row.inv_number}
              onChange={e => updateRow(i, 'inv_number', e.target.value)} />
            <input className="input" type="number" min="0" step="0.01" placeholder="0.00"
              value={row.total_amount} onChange={e => updateRow(i, 'total_amount', e.target.value)} />
            <input className="input" placeholder="Notes (optional)" value={row.notes}
              onChange={e => updateRow(i, 'notes', e.target.value)} />
            <button className="btn-remove" onClick={() => removeRow(i)}
              disabled={rows.length === 1}>✕</button>
          </div>
        ))}

        <div style={{ marginTop: 12 }}>
          <button className="btn-add-row" onClick={addRow}>+ Add Row</button>
        </div>
      </div>

      {error   && <p className="error"   style={{ marginTop: 12 }}>⚠ {error}</p>}
      {success && <p className="success" style={{ marginTop: 12 }}>✓ {success}</p>}

      <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
        <button className="btn-submit" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Entries'}
        </button>
      </div>
    </div>
  )
}
