import { useEffect, useState } from 'react'
import api from '../api'
import { useAuth } from '../AuthContext'

export default function UsersPage() {
  const { user: me } = useAuth()
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'staff' })
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    const { data } = await api.get('/users')
    setUsers(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = { ...form }
      if (editing && !payload.password) delete payload.password
      if (editing) {
        await api.put(`/users/${editing}`, payload)
      } else {
        await api.post('/users', payload)
      }
      setForm({ name: '', email: '', password: '', role: 'staff' })
      setEditing(null)
      fetchUsers()
    } catch (err) {
      const errors = err.response?.data?.errors
      setError(errors ? Object.values(errors)[0][0] : err.response?.data?.message || 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  function startEdit(u) {
    setEditing(u.id)
    setForm({ name: u.name, email: u.email, password: '', role: u.role })
  }

  async function toggleActive(u) {
    await api.put(`/users/${u.id}`, { is_active: !u.is_active })
    fetchUsers()
  }

  async function handleDelete(u) {
    if (u.id === me.id) return alert("You can't delete your own account.")
    if (!confirm(`Delete user ${u.name}?`)) return
    await api.delete(`/users/${u.id}`)
    fetchUsers()
  }

  return (
    <div className="page">
      <div className="page-header"><h1 className="page-title">Users</h1></div>

      <div className="two-col">
        <div className="form-card">
          <h2 className="form-title">{editing ? '✏️ Edit User' : '➕ Add User'}</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label>Full Name</label>
              <input type="text" placeholder="Juan dela Cruz" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="juan@nhci.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="field">
              <label>Password {editing && <span className="optional">(leave blank to keep current)</span>}</label>
              <input type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} {...(!editing && { required: true })} />
            </div>
            <div className="field">
              <label>Role</label>
              <select className="select" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && <p className="error">{error}</p>}
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="btn-submit" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update User' : 'Create User'}</button>
              {editing && <button type="button" className="btn-cancel" onClick={() => { setEditing(null); setForm({ name: '', email: '', password: '', role: 'staff' }); setError('') }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="table-card">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong>{u.id === me.id && <span className="badge badge-active" style={{ marginLeft: 6 }}>You</span>}</td>
                    <td className="muted">{u.email}</td>
                    <td><span className={`badge ${u.role === 'admin' ? 'badge-admin' : 'badge-staff'}`}>{u.role}</span></td>
                    <td><span className={`badge ${u.is_active ? 'badge-active' : 'badge-inactive'}`}>{u.is_active ? 'Active' : 'Inactive'}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-edit" onClick={() => startEdit(u)}>Edit</button>
                        {u.id !== me.id && <button className="btn-toggle" onClick={() => toggleActive(u)}>{u.is_active ? 'Disable' : 'Enable'}</button>}
                        {u.id !== me.id && <button className="btn-delete" onClick={() => handleDelete(u)}>✕</button>}
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
