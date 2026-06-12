import { useEffect, useState } from 'react'
import api from '../api'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', category: '', description: '' })
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    const { data } = await api.get('/products')
    setProducts(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/products/${editing}`, form)
      } else {
        await api.post('/products', form)
      }
      setForm({ name: '', category: '', description: '' })
      setEditing(null)
      fetchProducts()
    } catch (err) {
      setError(err.response?.data?.message || Object.values(err.response?.data?.errors || {})[0]?.[0] || 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  function startEdit(p) {
    setEditing(p.id)
    setForm({ name: p.name, category: p.category || '', description: p.description || '' })
  }

  async function toggleActive(p) {
    await api.put(`/products/${p.id}`, { is_active: !p.is_active })
    fetchProducts()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product? All its sales entries will also be deleted.')) return
    await api.delete(`/products/${id}`)
    fetchProducts()
  }

  return (
    <div className="page">
      <div className="page-header"><h1 className="page-title">Products</h1></div>

      <div className="two-col">
        <div className="form-card">
          <h2 className="form-title">{editing ? '✏️ Edit Product' : '➕ Add Product'}</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label>Product Name</label>
              <input type="text" placeholder="e.g. Tanduay Rum" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="field">
              <label>Category <span className="optional">(optional)</span></label>
              <input type="text" placeholder="e.g. Spirits, Beer, Wine" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            </div>
            <div className="field">
              <label>Description <span className="optional">(optional)</span></label>
              <input type="text" placeholder="Short description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            {error && <p className="error">{error}</p>}
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="btn-submit" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Add Product'}</button>
              {editing && <button type="button" className="btn-cancel" onClick={() => { setEditing(null); setForm({ name: '', category: '', description: '' }); setError('') }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="table-card">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Name</th><th>Category</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {products.length === 0 && <tr><td colSpan={4} className="muted" style={{ textAlign: 'center', padding: 24 }}>No products yet.</td></tr>}
                {products.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.name}</strong>{p.description && <div className="muted" style={{ fontSize: '0.8rem' }}>{p.description}</div>}</td>
                    <td className="muted">{p.category || '—'}</td>
                    <td>
                      <span className={`badge ${p.is_active ? 'badge-active' : 'badge-inactive'}`}>
                        {p.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-edit" onClick={() => startEdit(p)}>Edit</button>
                        <button className="btn-toggle" onClick={() => toggleActive(p)}>{p.is_active ? 'Disable' : 'Enable'}</button>
                        <button className="btn-delete" onClick={() => handleDelete(p.id)}>✕</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
