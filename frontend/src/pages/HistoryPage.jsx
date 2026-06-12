import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import api from '../api'

export default function HistoryPage() {
  const [entries, setEntries] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState({ category: '', from: '', to: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data))
    fetchEntries()
  }, [])

  async function fetchEntries() {
    setLoading(true)
    const params = {}
    if (filter.category) params.category = filter.category
    if (filter.from) params.from = filter.from
    if (filter.to) params.to = filter.to
    const { data } = await api.get('/sales', { params })
    setEntries(data)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this entry?')) return
    await api.delete(`/sales/${id}`)
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const total = entries.reduce((sum, e) => sum + parseFloat(e.total_amount), 0)

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Sales History</h1>
      </div>

      <div className="filter-card">
        <div className="filter-row">
          <div className="field">
            <label>Category</label>
            <select className="select" value={filter.category} onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label>From</label>
            <input type="date" className="input" value={filter.from} onChange={e => setFilter(f => ({ ...f, from: e.target.value }))} />
          </div>
          <div className="field">
            <label>To</label>
            <input type="date" className="input" value={filter.to} onChange={e => setFilter(f => ({ ...f, to: e.target.value }))} />
          </div>
          <button className="btn-submit" style={{ alignSelf: 'flex-end' }} onClick={fetchEntries}>Filter</button>
        </div>
      </div>

      {loading ? <div className="page-loading">Loading...</div> : (
        <div className="table-card">
          <div className="table-summary">
            Showing <strong>{entries.length}</strong> entries — Total: <strong>₱{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Notes</th>
                  <th>Entered By</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 && (
                  <tr><td colSpan={6} className="muted" style={{ textAlign: 'center', padding: 32 }}>No entries found.</td></tr>
                )}
                {entries.map(e => (
                  <tr key={e.id}>
                    <td>{dayjs(e.sale_date).format('MMM D, YYYY')}</td>
                    <td><strong>{e.category}</strong></td>
                    <td className="amount-cell">₱{parseFloat(e.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="note-cell">{e.notes || <span className="muted">—</span>}</td>
                    <td className="muted">{e.user?.name}</td>
                    <td><button className="btn-delete" onClick={() => handleDelete(e.id)}>✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
