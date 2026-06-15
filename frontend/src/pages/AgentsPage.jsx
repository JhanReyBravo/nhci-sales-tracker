import { useEffect, useState } from 'react'
import api from '../api'

const EMPTY = { name: '', area: '', base_allowance: '' }

export default function AgentsPage() {
  const [agents, setAgents]   = useState([])
  const [form, setForm]       = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => { fetchAgents() }, [])

  async function fetchAgents() {
    const { data } = await api.get('/sales-agents')
    setAgents(data)
    setLoading(false)
  }

  function startEdit(agent) {
    setEditing(agent.id)
    setForm({ name: agent.name, area: agent.area || '', base_allowance: agent.base_allowance })
    setError('')
  }

  function cancelEdit() {
    setEditing(null)
    setForm(EMPTY)
    setError('')
  }

  async function handleSave() {
    setError('')
    if (!form.name.trim()) return setError('Agent name is required.')
    try {
      if (editing) {
        const { data } = await api.put(`/sales-agents/${editing}`, form)
        setAgents(a => a.map(x => x.id === editing ? data : x))
      } else {
        const { data } = await api.post('/sales-agents', form)
        setAgents(a => [...a, data])
      }
      cancelEdit()
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed.')
    }
  }

  async function toggleActive(agent) {
    const { data } = await api.put(`/sales-agents/${agent.id}`, { ...agent, is_active: !agent.is_active })
    setAgents(a => a.map(x => x.id === agent.id ? data : x))
  }

  async function handleDelete(id) {
    if (!confirm('Delete this agent? All their expense records will also be deleted.')) return
    await api.delete(`/sales-agents/${id}`)
    setAgents(a => a.filter(x => x.id !== id))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Sales Agents</h1>
      </div>

      {/* Add / Edit form */}
      <div className="filter-card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8', marginBottom: 14 }}>
          {editing ? 'Edit Agent' : 'Add New Agent'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr', gap: 10, marginBottom: 10 }}>
          <input className="input" placeholder="Agent name *" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input className="input" placeholder="Area / Route" value={form.area}
            onChange={e => setForm(f => ({ ...f, area: e.target.value }))} />
          <input className="input" type="number" min="0" step="0.01" placeholder="Base allowance (₱)"
            value={form.base_allowance} onChange={e => setForm(f => ({ ...f, base_allowance: e.target.value }))} />
        </div>
        {error && <p className="error" style={{ marginBottom: 10 }}>⚠ {error}</p>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-submit" onClick={handleSave}>{editing ? 'Update' : 'Add Agent'}</button>
          {editing && <button className="btn-cancel" onClick={cancelEdit}>Cancel</button>}
        </div>
      </div>

      {/* Agents table */}
      <div className="table-card">
        {loading ? <div className="page-loading">Loading...</div> : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Area / Route</th>
                <th>Base Allowance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#475569' }}>No agents yet.</td></tr>
              )}
              {agents.map(a => (
                <tr key={a.id} style={{ opacity: a.is_active ? 1 : 0.5 }}>
                  <td style={{ fontWeight: 600 }}>{a.name}</td>
                  <td>{a.area || '—'}</td>
                  <td>₱{Number(a.base_allowance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className={`badge ${a.is_active ? 'badge-active' : 'badge-inactive'}`}>
                      {a.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-sm" onClick={() => startEdit(a)}>Edit</button>
                      <button className="btn-sm btn-sm-warn" onClick={() => toggleActive(a)}>
                        {a.is_active ? 'Disable' : 'Enable'}
                      </button>
                      <button className="btn-sm btn-sm-danger" onClick={() => handleDelete(a.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
