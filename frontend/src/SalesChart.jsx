import ReactApexChart from 'react-apexcharts'
import dayjs from 'dayjs'

export default function SalesChart({ sales, view }) {
  const filtered = sales.filter(s => {
    if (view === 'week') {
      return dayjs(s.date).isAfter(dayjs().subtract(7, 'day').subtract(1, 'day'))
    }
    if (view === 'month') {
      return dayjs(s.date).isAfter(dayjs().subtract(30, 'day').subtract(1, 'day'))
    }
    return true
  })

  const categories = filtered.map(s => dayjs(s.date).format('MMM D'))
  const data = filtered.map(s => s.amount)
  const total = data.reduce((a, b) => a + b, 0)
  const avg = data.length ? (total / data.length).toFixed(2) : 0
  const max = data.length ? Math.max(...data) : 0
  const maxDay = data.length ? filtered[data.indexOf(max)] : null

  const options = {
    chart: {
      type: 'area',
      toolbar: { show: true },
      zoom: { enabled: true },
      animations: { enabled: true, speed: 500 },
    },
    colors: ['#6366f1'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#94a3b8', fontSize: '12px' },
        formatter: val => '₱' + val.toLocaleString(),
      },
    },
    grid: { borderColor: '#1e293b', strokeDashArray: 4 },
    tooltip: {
      theme: 'dark',
      y: { formatter: val => '₱' + val.toLocaleString() },
      x: {
        formatter: (val, { dataPointIndex }) => {
          const entry = filtered[dataPointIndex]
          return entry
            ? `${dayjs(entry.date).format('MMMM D, YYYY')}${entry.label ? ' — ' + entry.label : ''}`
            : val
        },
      },
    },
    markers: { size: 4, colors: ['#6366f1'], strokeColors: '#fff', strokeWidth: 2 },
  }

  const series = [{ name: 'Sales', data }]

  if (!filtered.length) {
    return (
      <div className="chart-empty">
        <p>No sales data for this period.</p>
        <p className="chart-empty-sub">Add entries using the form on the left.</p>
      </div>
    )
  }

  return (
    <div className="chart-card">
      <div className="stats-row">
        <div className="stat">
          <span className="stat-label">Total</span>
          <span className="stat-value">₱{total.toLocaleString()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Daily Avg</span>
          <span className="stat-value">₱{parseFloat(avg).toLocaleString()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Best Day</span>
          <span className="stat-value">
            {maxDay ? `₱${max.toLocaleString()} (${dayjs(maxDay.date).format('MMM D')})` : '—'}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Entries</span>
          <span className="stat-value">{data.length}</span>
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="area" height={320} />
    </div>
  )
}
