import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import api from '../api'

export default function AgentExpensePage() {
  const [agents, setAgents]   = useState([])
  const [date, setDate]       = useState(dayjs().format('YYYY-MM-DD'))
  const [rows, setRows]       = useState([{ sales_agent_id: '', allowance_amount: '', area_covered: '', transport_type: 'service', fuel_liters: '', notes: '' }])
  const [saving, setSaving]   = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError]     = useState('')

  useEffect(() => {
    api.get('/sales-agents').then(({ data }) => setAgents(data.filter(a => a.is_active)))
  }, [])

  function addRow() {
    setRows(r => [...r, { sales_agent_id: '', allowance_amount: '', area_covered: '', transport_type: 'service', fuel_liters: '', notes: '' }])
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

    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].sales_agent_id) return setError(`Row ${i + 1}: please select an agent.`)
      if (!rows[i].allowance_amount || isNaN(rows[i].allowance_amount)) return setError(`Row ${i + 1}: enter a valid allowance amount.`)
    }

    // Check duplicate agent+area combo in same batch
    const keys = rows.map(r => `${r.sales_agent_id}|${r.area_covered}`)
    if (new Set(keys).size !== keys.length) return setError('Duplicate agent + area combination in the same batch.')

    setSaving(true)
    try {
      await Promise.all(rows.map(row =>
        api.post('/agent-expenses', { ...row, expense_date: date })
      ))
      setSuccess(`${rows.length} entr${rows.length > 1 ? 'ies' : 'y'} saved for ${dayjs(date).format('MMM D, YYYY')}.`)
      setRows([{ sales_agent_id: '', allowance_amount: '', area_covered: '', fuel_liters: '', notes: '' }])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save entries.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Agent Expense Entry</h1>
      </div>

      <div className="filter-card" style={{ marginBottom: 20 }}>
        <label className="form-label">Date</label>
        <input type="date" className="input" style={{ maxWidth: 200 }}
          value={date} onChange={e => setDate(e.target.value)} />
      </div>

      <div className="table-card">
        <div className="expense-entry-header">
          <span>Agent</span>
          <span>Area Covered</span>
          <span>Transport</span>
          <span>Allowance (₱)</span>
          <span>Fuel (L)</span>
          <span>Notes</span>
          <span></span>
        </div>

        {rows.map((row, i) => (
          <div className="expense-entry-row" key={i}>
            <select className="select" value={row.sales_agent_id}
              onChange={e => updateRow(i, 'sales_agent_id', e.target.value)}>
              <option value="">Select agent...</option>
              {agents.map(a => (
                <option key={a.id} value={a.id}>{a.name}{a.area ? ` — ${a.area}` : ''}</option>
              ))}
            </select>
            <input className="input" placeholder="Area covered"
              value={row.area_covered} onChange={e => updateRow(i, 'area_covered', e.target.value)} />
            <select className="select" value={row.transport_type}
              onChange={e => updateRow(i, 'transport_type', e.target.value)}>
              <option value="service">🚗 With Service</option>
              <option value="commute">🚌 Commute</option>
            </select>
            <input className="input" type="number" min="0" step="0.01" placeholder="0.00"
              value={row.allowance_amount} onChange={e => updateRow(i, 'allowance_amount', e.target.value)} />
            <input className="input" type="number" min="0" step="0.01" placeholder="0.00"
              value={row.fuel_liters} onChange={e => updateRow(i, 'fuel_liters', e.target.value)} />
            <input className="input" placeholder="Notes"
              value={row.notes} onChange={e => updateRow(i, 'notes', e.target.value)} />
            <button className="btn-remove" onClick={() => removeRow(i)} disabled={rows.length === 1}>✕</button>
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
