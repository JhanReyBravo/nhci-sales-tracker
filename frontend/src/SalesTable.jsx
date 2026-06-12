import dayjs from 'dayjs'

export default function SalesTable({ sales, onDelete }) {
  if (!sales.length) return null

  const sorted = [...sales].reverse()

  return (
    <div className="table-card">
      <h2 className="form-title">Sales History</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Note</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(s => (
              <tr key={s.date}>
                <td>{dayjs(s.date).format('MMM D, YYYY')}</td>
                <td className="note-cell">{s.label || <span className="muted">—</span>}</td>
                <td className="amount-cell">₱{s.amount.toLocaleString()}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(s.date)}
                    title="Delete entry"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
