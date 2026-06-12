import { useRef, useState } from 'react'
import api from '../api'

export default function CsvImportModal({ onClose, onSuccess }) {
  const inputRef = useRef()
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleFile(f) {
    if (!f) return
    if (!f.name.match(/^\d{2}-\d{2}-\d{2}\.csv$/i)) {
      setError('Filename must be in MM-DD-YY.csv format (e.g. 06-03-26.csv).')
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
      const { data } = await api.post('/import-csv', form, {
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
          <h2 className="modal-title">📂 Import CSV Sales</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {!result ? (
          <>
            <p className="modal-hint">
              File must be named <code>MM-DD-YY.csv</code> — the date is read from the filename automatically.
            </p>

            <div
              className={`drop-zone ${dragging ? 'drop-zone-active' : ''} ${file ? 'drop-zone-ready' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files[0])}
              />
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
                  <div className="drop-zone-sub">e.g. 06-03-26.csv</div>
                </div>
              )}
            </div>

            {error && <p className="error" style={{ marginTop: 12 }}>⚠ {error}</p>}

            <div className="modal-actions">
              <button className="btn-cancel" onClick={onClose}>Cancel</button>
              <button
                className="btn-submit"
                disabled={!file || loading}
                onClick={handleImport}
              >
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
                <div className="import-result-date">{result.sale_date}</div>
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
                <span className="import-stat-val">{result.skipped?.length ?? 0}</span>
                <span className="import-stat-label">Skipped</span>
              </div>
              <div className="import-stat">
                <span className="import-stat-val">₱{Number(result.grand_total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className="import-stat-label">Grand Total</span>
              </div>
            </div>

            <div className="import-table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Category</th><th style={{ textAlign: 'right' }}>Amount</th></tr>
                </thead>
                <tbody>
                  {result.results.map(r => (
                    <tr key={r.category}>
                      <td>{r.category}</td>
                      <td className="amount-cell" style={{ textAlign: 'right' }}>
                        ₱{Number(r.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {result.skipped?.length > 0 && (
              <div className="import-skipped">
                <div className="import-skipped-title">⚠ Unmatched products ({result.skipped.length})</div>
                {result.skipped.map((s, i) => <div key={i} className="import-skipped-item">{s}</div>)}
              </div>
            )}

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => { reset(); onClose() }}>Close</button>
              <button className="btn-submit" onClick={() => { reset() }}>Import Another</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
