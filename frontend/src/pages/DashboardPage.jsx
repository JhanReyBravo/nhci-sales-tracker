import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import dayjs from 'dayjs'
import api from '../api'
import { useAuth } from '../AuthContext'
import CsvImportModal from '../components/CsvImportModal'

const VIEWS = [
  { key: '7',  label: 'Last 7 Days' },
  { key: '30', label: 'Last 30 Days' },
  { key: '90', label: 'Last 90 Days' },
]

const CHART_TYPES = [
  { key: 'line',   label: 'Line',   icon: '📈' },
  { key: 'area',   label: 'Area',   icon: '🌊' },
  { key: 'column', label: 'Column', icon: '📊' },
  { key: 'bar',    label: 'Bar',    icon: '🔀' },
  { key: 'mixed',  label: 'Mixed',  icon: '🔗' },
]

const COMMON = {
  xaxisStyle: { colors: '#94a3b8' },
  yaxisStyle: { colors: '#94a3b8' },
  gridColor:  '#1e293b',
  tooltip:    { theme: 'dark', y: { formatter: v => '₱' + Number(v).toLocaleString() } },
  fmt:        v => '₱' + Number(v).toLocaleString(),
}

export default function DashboardPage() {
  const { isAdmin } = useAuth()
  const [entries, setEntries]               = useState([])
  const [categories, setCategories]         = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [view, setView]                     = useState('30')
  const [chartType, setChartType]           = useState('area')
  const [loading, setLoading]               = useState(true)
  const [showImport, setShowImport]         = useState(false)

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data))
  }, [])

  useEffect(() => { fetchEntries() }, [view, selectedCategory])

  async function fetchEntries() {
    setLoading(true)
    const from = dayjs().subtract(parseInt(view), 'day').format('YYYY-MM-DD')
    const to   = dayjs().format('YYYY-MM-DD')
    const params = { from, to }
    if (selectedCategory !== 'all') params.category = selectedCategory
    const { data } = await api.get('/sales', { params })
    setEntries(data)
    setLoading(false)
  }

  // Daily totals — sorted ascending
  const byDate = {}
  entries.forEach(e => {
    byDate[e.sale_date] = (byDate[e.sale_date] || 0) + parseFloat(e.total_amount)
  })
  const sortedDates = Object.keys(byDate).sort((a, b) => a.localeCompare(b))
  const dates   = sortedDates.map(d => dayjs(d).format('MMM D'))
  const amounts = sortedDates.map(d => byDate[d])

  // Stats
  const total  = amounts.reduce((a, b) => a + b, 0)
  const avg    = amounts.length ? total / amounts.length : 0
  const max    = amounts.length ? Math.max(...amounts) : 0
  const maxIdx = amounts.indexOf(max)

  // Moving average for mixed chart (3-day rolling)
  const movingAvg = amounts.map((_, i) => {
    const slice = amounts.slice(Math.max(0, i - 2), i + 1)
    return Math.round(slice.reduce((a, b) => a + b, 0) / slice.length)
  })

  // Category totals
  const byCat = {}
  entries.forEach(e => {
    byCat[e.category] = (byCat[e.category] || 0) + parseFloat(e.total_amount)
  })
  const catNames  = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a])
  const catTotals = catNames.map(c => byCat[c])

  // ── Chart configs ────────────────────────────────────────────────
  const baseXaxis = {
    categories: dates,
    labels: { style: { colors: COMMON.xaxisStyle.colors }, rotate: -30 },
    axisBorder: { show: false },
    axisTicks:  { show: false },
  }
  const baseYaxis = {
    labels: { style: { colors: COMMON.yaxisStyle.colors }, formatter: COMMON.fmt },
  }
  const baseGrid    = { borderColor: COMMON.gridColor, strokeDashArray: 4 }
  const baseTooltip = COMMON.tooltip

  function getTrendChart() {
    if (chartType === 'line') {
      return {
        options: {
          chart: { type: 'line', toolbar: { show: true }, zoom: { enabled: true }, animations: { speed: 400 } },
          colors: ['#6366f1'],
          stroke: { curve: 'smooth', width: 3 },
          dataLabels: { enabled: false },
          markers: { size: 5, colors: ['#6366f1'], strokeColors: '#fff', strokeWidth: 2 },
          xaxis: baseXaxis, yaxis: baseYaxis, grid: baseGrid, tooltip: baseTooltip,
        },
        series: [{ name: 'Sales', data: amounts }],
        type: 'line',
      }
    }

    if (chartType === 'area') {
      return {
        options: {
          chart: { type: 'area', toolbar: { show: true }, zoom: { enabled: true }, animations: { speed: 400 } },
          colors: ['#6366f1'],
          fill: { type: 'gradient', gradient: { opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 100] } },
          stroke: { curve: 'smooth', width: 3 },
          dataLabels: { enabled: false },
          markers: { size: 4, colors: ['#6366f1'], strokeColors: '#fff', strokeWidth: 2 },
          xaxis: baseXaxis, yaxis: baseYaxis, grid: baseGrid, tooltip: baseTooltip,
        },
        series: [{ name: 'Sales', data: amounts }],
        type: 'area',
      }
    }

    if (chartType === 'column') {
      return {
        options: {
          chart: { type: 'bar', toolbar: { show: true }, animations: { speed: 400 } },
          colors: ['#6366f1'],
          plotOptions: { bar: { borderRadius: 5, columnWidth: '55%' } },
          dataLabels: { enabled: false },
          xaxis: baseXaxis, yaxis: baseYaxis, grid: baseGrid, tooltip: baseTooltip,
        },
        series: [{ name: 'Sales', data: amounts }],
        type: 'bar',
      }
    }

    if (chartType === 'bar') {
      return {
        options: {
          chart: { type: 'bar', toolbar: { show: true }, animations: { speed: 400 } },
          colors: ['#818cf8'],
          plotOptions: { bar: { borderRadius: 5, horizontal: true } },
          dataLabels: { enabled: false },
          xaxis: {
            categories: dates,
            labels: { style: { colors: '#94a3b8' }, formatter: COMMON.fmt },
          },
          yaxis: { labels: { style: { colors: '#e2e8f0', fontSize: '12px' } } },
          grid: baseGrid,
          tooltip: baseTooltip,
        },
        series: [{ name: 'Sales', data: amounts }],
        type: 'bar',
      }
    }

    // mixed — column (daily sales) + line (3-day moving avg)
    if (chartType === 'mixed') {
      return {
        options: {
          chart: {
            type: 'line',
            toolbar: { show: true },
            zoom: { enabled: true },
            animations: { speed: 400 },
          },
          colors: ['#6366f1', '#f59e0b'],
          stroke: { width: [0, 3], curve: 'smooth' },
          plotOptions: { bar: { borderRadius: 5, columnWidth: '55%' } },
          dataLabels: { enabled: false },
          legend: {
            labels: { colors: '#94a3b8' },
            position: 'top',
          },
          markers: { size: [0, 4] },
          xaxis: baseXaxis,
          yaxis: baseYaxis,
          grid: baseGrid,
          tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: { formatter: v => '₱' + Number(v).toLocaleString() },
          },
        },
        series: [
          { name: 'Daily Sales', type: 'column', data: amounts },
          { name: '3-Day Avg',   type: 'line',   data: movingAvg },
        ],
        type: 'line',
      }
    }
  }

  const trendChart = getTrendChart()

  const catBarOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    colors: ['#818cf8'],
    plotOptions: { bar: { borderRadius: 6, horizontal: true, distributed: true } },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: catNames,
      labels: { style: { colors: '#94a3b8' }, formatter: COMMON.fmt },
    },
    yaxis: { labels: { style: { colors: '#e2e8f0', fontSize: '12px' } } },
    grid: baseGrid,
    tooltip: baseTooltip,
  }

  return (
    <>
      {showImport && (
        <CsvImportModal
          onClose={() => setShowImport(false)}
          onSuccess={() => { setShowImport(false); fetchEntries() }}
        />
      )}

      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {isAdmin && (
              <button className="btn-import" onClick={() => setShowImport(true)}>
                📂 Import CSV
              </button>
            )}
            <div className="view-tabs">
              {VIEWS.map(v => (
                <button key={v.key} className={`tab ${view === v.key ? 'tab-active' : ''}`} onClick={() => setView(v.key)}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters row */}
        <div className="filter-row" style={{ marginBottom: 20, gap: 12 }}>
          <select className="select" style={{ maxWidth: 260 }} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat">
            <span className="stat-label">Total Sales</span>
            <span className="stat-value">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Daily Average</span>
            <span className="stat-value">₱{avg.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Best Day</span>
            <span className="stat-value">{dates[maxIdx] ? `${dates[maxIdx]} — ₱${max.toLocaleString()}` : '—'}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Entries</span>
            <span className="stat-value">{entries.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="page-loading">Loading...</div>
        ) : dates.length === 0 ? (
          <div className="chart-empty">
            <p>No sales data for this period.</p>
            <p className="chart-empty-sub">Add entries using Sales Entry.</p>
          </div>
        ) : (
          <>
            {/* Trend chart card with type selector */}
            <div className="chart-card">
              <div className="chart-card-header">
                <h2 className="chart-title">Daily Sales Trend</h2>
                <div className="chart-type-tabs">
                  {CHART_TYPES.map(ct => (
                    <button
                      key={ct.key}
                      className={`chart-type-btn ${chartType === ct.key ? 'chart-type-active' : ''}`}
                      onClick={() => setChartType(ct.key)}
                      title={ct.label}
                    >
                      <span className="chart-type-icon">{ct.icon}</span>
                      <span className="chart-type-label">{ct.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <ReactApexChart
                key={chartType}
                options={trendChart.options}
                series={trendChart.series}
                type={trendChart.type}
                height={320}
              />
            </div>

            {/* Category breakdown */}
            {catNames.length > 1 && (
              <div className="chart-card" style={{ marginTop: 20 }}>
                <h2 className="chart-title">Sales by Category</h2>
                <ReactApexChart
                  options={catBarOptions}
                  series={[{ name: 'Total', data: catTotals }]}
                  type="bar"
                  height={Math.max(250, catNames.length * 40)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
