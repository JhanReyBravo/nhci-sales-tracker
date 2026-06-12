import { useRef, useState } from 'react'
import api from '../api'

export default function CustomerCsvImportModal({ onClose, onSuccess }) {
  const inputRef = useRef()
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleFile(f) {
    if (!f) return
    if (!f.name.match(/\.csv$/i)) {
      setError('Please select a CSV file.')
      setFile(null)
      return
    }
    setError('')
    setFile(f)
    setResult(null)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  async function handleImport() {
    if (!file) return
    setLoading(true)
    setError('')
    setResult(null)
    const form = new FormData()
    form.append('file', file)
    try {
      const { data } = await api.post('/import-customer-csv', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult(data)
      onSuccess?.()
    } catch (err) {
      setError(err.response?.data?.message || 'Import failed.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setFile(null)
    setResult(null)
    setError('')
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">📂 Import Customer Sales CSV</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {!result ? (
          <>
            <p className="modal-hint">
              CSV must have columns: <code>DR. No.</code>, <code>Inv No.</code>, <code>Date</code>, <code>Customer</code>, <code>Amount</code>.<br />
              Same customer on the same date will be summed. New customers are created automatically.
            </p>

            <div
              className={`drop-zone ${dragging ? 'drop-zone-active' : ''} ${file ? 'drop-zone-ready' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
            >
              <input ref={inputRef} type="file" accept=".csv" style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files[0])} />
              {file ? (
                <div className="drop-zone-file">
                  <span className="drop-zone-icon">📄</span>
                  <div>
                    <div className="drop-zone-name">{file.name}</div>
                    <div className="drop-zone-size">{(file.size / 1024).toFixed(1)} KB</div>
                  </div>
                  <button className="drop-zone-clear" onClick={e => { e.stopPropagation(); reset() }}>✕</button>
                </div>
              ) : (
                <div className="drop-zone-empty">
                  <span className="drop-zone-icon">📁</span>
                  <div className="drop-zone-label">Drop CSV here or click to browse</div>
                  <div className="drop-zone-sub">e.g. customer-sales.csv</div>
                </div>
              )}
            </div>

            {error && <p className="error" style={{ marginTop: 12 }}>⚠ {error}</p>}

            <div className="modal-actions">
              <button className="btn-cancel" onClick={onClose}>Cancel</button>
              <button className="btn-submit" disabled={!file || loading} onClick={handleImport}>
                {loading ? 'Importing...' : 'Import Sales'}
              </button>
            </div>
          </>
        ) : (
          <div className="import-result">
            <div className="import-result-header">
              <span className="import-result-check">✓</span>
              <div>
                <div className="import-result-title">Import Complete</div>
                <div className="import-result-date">{result.results?.[0]?.sale_date}</div>
              </div>
            </div>

            <div className="import-stats">
              <div className="import-stat">
                <span className="import-stat-val">{result.inserted}</span>
                <span className="import-stat-label">New</span>
              </div>
              <div className="import-stat">
                <span className="import-stat-val">{result.updated}</span>
                <span className="import-stat-label">Updated</span>
              </div>
              <div className="import-stat">
                <span className="import-stat-val">₱{Number(result.grand_total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className="import-stat-label">Grand Total</span>
              </div>
            </div>

            <div className="import-table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((r, i) => (
                    <tr key={i}>
                      <td>{r.customer}</td>
                      <td>{r.sale_date}</td>
                      <td style={{ textAlign: 'right' }}>₱{Number(r.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => { reset(); onClose() }}>Close</button>
              <button className="btn-submit" onClick={reset}>Import Another</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
