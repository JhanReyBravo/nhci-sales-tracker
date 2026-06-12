import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import dayjs from 'dayjs'
import api from '../api'
import { useAuth } from '../AuthContext'
import CsvImportModal from '../components/CsvImportModal'
import CustomerCsvImportModal from '../components/CustomerCsvImportModal'

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

const FMT = v => '₱' + Number(v).toLocaleString()
const BASE = {
  grid:    { borderColor: '#1e293b', strokeDashArray: 4 },
  tooltip: { theme: 'dark', y: { formatter: FMT } },
}

export default function DashboardPage() {
  const { isAdmin } = useAuth()
  const [tab, setTab]                       = useState('product') // 'product' | 'customer'
  const [view, setView]                     = useState('30')
  const [chartType, setChartType]           = useState('area')

  // Product sales state
  const [entries, setEntries]               = useState([])
  const [categories, setCategories]         = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [showImport, setShowImport]         = useState(false)

  // Customer sales state
  const [custEntries, setCustEntries]       = useState([])
  const [customers, setCustomers]           = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState('all')
  const [loadingCustomer, setLoadingCustomer] = useState(true)
  const [showCustImport, setShowCustImport] = useState(false)

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data))
    api.get('/customers').then(({ data }) => setCustomers(data))
  }, [])

  useEffect(() => {
    if (tab === 'product') fetchProductEntries()
    else fetchCustomerEntries()
  }, [view, selectedCategory, selectedCustomer, tab])

  async function fetchProductEntries() {
    setLoadingProduct(true)
    const from = dayjs().subtract(parseInt(view), 'day').format('YYYY-MM-DD')
    const to   = dayjs().format('YYYY-MM-DD')
    const params = { from, to }
    if (selectedCategory !== 'all') params.category = selectedCategory
    const { data } = await api.get('/sales', { params })
    setEntries(data)
    setLoadingProduct(false)
  }

  async function fetchCustomerEntries() {
    setLoadingCustomer(true)
    const from = dayjs().subtract(parseInt(view), 'day').format('YYYY-MM-DD')
    const to   = dayjs().format('YYYY-MM-DD')
    const params = { from, to }
    if (selectedCustomer !== 'all') params.customer_id = selectedCustomer
    const { data } = await api.get('/customer-sales', { params })
    setCustEntries(data)
    setLoadingCustomer(false)
  }

  // ── Product sales computed ────────────────────────────────────
  const byDate = {}
  entries.forEach(e => { byDate[e.sale_date] = (byDate[e.sale_date] || 0) + parseFloat(e.total_amount) })
  const sortedDates  = Object.keys(byDate).sort((a, b) => a.localeCompare(b))
  const dates        = sortedDates.map(d => dayjs(d).format('MMM D'))
  const amounts      = sortedDates.map(d => byDate[d])
  const total        = amounts.reduce((a, b) => a + b, 0)
  const avg          = amounts.length ? total / amounts.length : 0
  const max          = amounts.length ? Math.max(...amounts) : 0
  const maxIdx       = amounts.indexOf(max)
  const movingAvg    = amounts.map((_, i) => {
    const slice = amounts.slice(Math.max(0, i - 2), i + 1)
    return Math.round(slice.reduce((a, b) => a + b, 0) / slice.length)
  })
  const byCat    = {}
  entries.forEach(e => { byCat[e.category] = (byCat[e.category] || 0) + parseFloat(e.total_amount) })
  const catNames  = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a])
  const catTotals = catNames.map(c => byCat[c])

  // ── Customer sales computed ───────────────────────────────────
  const byCustDate = {}
  custEntries.forEach(e => { byCustDate[e.sale_date] = (byCustDate[e.sale_date] || 0) + parseFloat(e.total_amount) })
  const custSortedDates = Object.keys(byCustDate).sort((a, b) => a.localeCompare(b))
  const custDates       = custSortedDates.map(d => dayjs(d).format('MMM D'))
  const custAmounts     = custSortedDates.map(d => byCustDate[d])
  const custTotal       = custAmounts.reduce((a, b) => a + b, 0)
  const custAvg         = custAmounts.length ? custTotal / custAmounts.length : 0
  const custMax         = custAmounts.length ? Math.max(...custAmounts) : 0
  const custMaxIdx      = custAmounts.indexOf(custMax)
  const custMovingAvg   = custAmounts.map((_, i) => {
    const slice = custAmounts.slice(Math.max(0, i - 2), i + 1)
    return Math.round(slice.reduce((a, b) => a + b, 0) / slice.length)
  })
  const byCustName  = {}
  custEntries.forEach(e => {
    const name = e.customer?.name || 'Unknown'
    byCustName[name] = (byCustName[name] || 0) + parseFloat(e.total_amount)
  })
  const custNames  = Object.keys(byCustName).sort((a, b) => byCustName[b] - byCustName[a])
  const custTotals = custNames.map(c => byCustName[c])

  // ── Chart builders ────────────────────────────────────────────
  function buildTrendChart(xDates, xAmounts, xMovingAvg) {
    const baseX = {
      categories: xDates,
      labels: { style: { colors: '#94a3b8' }, rotate: -30 },
      axisBorder: { show: false }, axisTicks: { show: false },
    }
    const baseY = { labels: { style: { colors: '#94a3b8' }, formatter: FMT } }

    if (chartType === 'line') return {
      options: { chart: { type: 'line', toolbar: { show: true }, zoom: { enabled: true } }, colors: ['#6366f1'],
        stroke: { curve: 'smooth', width: 3 }, dataLabels: { enabled: false },
        markers: { size: 5, colors: ['#6366f1'], strokeColors: '#fff', strokeWidth: 2 },
        xaxis: baseX, yaxis: baseY, ...BASE },
      series: [{ name: 'Sales', data: xAmounts }], type: 'line',
    }
    if (chartType === 'area') return {
      options: { chart: { type: 'area', toolbar: { show: true }, zoom: { enabled: true } }, colors: ['#6366f1'],
        fill: { type: 'gradient', gradient: { opacityFrom: 0.45, opacityTo: 0.05 } },
        stroke: { curve: 'smooth', width: 3 }, dataLabels: { enabled: false },
        markers: { size: 4, colors: ['#6366f1'], strokeColors: '#fff', strokeWidth: 2 },
        xaxis: baseX, yaxis: baseY, ...BASE },
      series: [{ name: 'Sales', data: xAmounts }], type: 'area',
    }
    if (chartType === 'column') return {
      options: { chart: { type: 'bar', toolbar: { show: true } }, colors: ['#6366f1'],
        plotOptions: { bar: { borderRadius: 5, columnWidth: '55%' } }, dataLabels: { enabled: false },
        xaxis: baseX, yaxis: baseY, ...BASE },
      series: [{ name: 'Sales', data: xAmounts }], type: 'bar',
    }
    if (chartType === 'bar') return {
      options: { chart: { type: 'bar', toolbar: { show: true } }, colors: ['#818cf8'],
        plotOptions: { bar: { borderRadius: 5, horizontal: true } }, dataLabels: { enabled: false },
        xaxis: { categories: xDates, labels: { style: { colors: '#94a3b8' }, formatter: FMT } },
        yaxis: { labels: { style: { colors: '#e2e8f0', fontSize: '12px' } } }, ...BASE },
      series: [{ name: 'Sales', data: xAmounts }], type: 'bar',
    }
    // mixed
    return {
      options: { chart: { type: 'line', toolbar: { show: true }, zoom: { enabled: true } },
        colors: ['#6366f1', '#f59e0b'],
        stroke: { width: [0, 3], curve: 'smooth' },
        plotOptions: { bar: { borderRadius: 5, columnWidth: '55%' } },
        dataLabels: { enabled: false },
        legend: { labels: { colors: '#94a3b8' }, position: 'top' },
        markers: { size: [0, 4] },
        xaxis: baseX, yaxis: baseY,
        tooltip: { theme: 'dark', shared: true, intersect: false, y: { formatter: FMT } },
        ...BASE },
      series: [
        { name: 'Daily Sales', type: 'column', data: xAmounts },
        { name: '3-Day Avg',   type: 'line',   data: xMovingAvg },
      ], type: 'line',
    }
  }

  const trendChart     = buildTrendChart(dates, amounts, movingAvg)
  const custTrendChart = buildTrendChart(custDates, custAmounts, custMovingAvg)

  const catBarOptions = {
    chart: { type: 'bar', toolbar: { show: false } }, colors: ['#818cf8'],
    plotOptions: { bar: { borderRadius: 6, horizontal: true, distributed: true } },
    dataLabels: { enabled: false }, legend: { show: false },
    xaxis: { categories: catNames, labels: { style: { colors: '#94a3b8' }, formatter: FMT } },
    yaxis: { labels: { style: { colors: '#e2e8f0', fontSize: '12px' } } }, ...BASE,
  }

  const custBarOptions = {
    chart: { type: 'bar', toolbar: { show: false } }, colors: ['#10b981'],
    plotOptions: { bar: { borderRadius: 6, horizontal: true, distributed: true } },
    dataLabels: { enabled: false }, legend: { show: false },
    xaxis: { categories: custNames, labels: { style: { colors: '#94a3b8' }, formatter: FMT } },
    yaxis: { labels: { style: { colors: '#e2e8f0', fontSize: '12px' } } }, ...BASE,
  }

  const isProduct  = tab === 'product'
  const loading    = isProduct ? loadingProduct : loadingCustomer
  const showDates  = isProduct ? dates : custDates
  const showTotal  = isProduct ? total : custTotal
  const showAvg    = isProduct ? avg : custAvg
  const showMax    = isProduct ? max : custMax
  const showMaxIdx = isProduct ? maxIdx : custMaxIdx
  const showChart  = isProduct ? trendChart : custTrendChart

  return (
    <>
      {showImport && (
        <CsvImportModal onClose={() => setShowImport(false)}
          onSuccess={() => { setShowImport(false); fetchProductEntries() }} />
      )}
      {showCustImport && (
        <CustomerCsvImportModal onClose={() => setShowCustImport(false)}
          onSuccess={() => { setShowCustImport(false); fetchCustomerEntries() }} />
      )}

      <div className="page">
        {/* Page header */}
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {isAdmin && (
              <button className="btn-import"
                onClick={() => isProduct ? setShowImport(true) : setShowCustImport(true)}>
                📂 Import CSV
              </button>
            )}
            <div className="view-tabs">
              {VIEWS.map(v => (
                <button key={v.key} className={`tab ${view === v.key ? 'tab-active' : ''}`}
                  onClick={() => setView(v.key)}>{v.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main tab navbar ── */}
        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab ${isProduct ? 'dashboard-tab-active' : ''}`}
            onClick={() => setTab('product')}
          >
            📦 Sales per Product
          </button>
          <button
            className={`dashboard-tab ${!isProduct ? 'dashboard-tab-active' : ''}`}
            onClick={() => setTab('customer')}
          >
            👤 Sales per Customer
          </button>
        </div>

        {/* Filter row */}
        <div className="filter-row" style={{ marginBottom: 20 }}>
          {isProduct ? (
            <select className="select" style={{ maxWidth: 260 }}
              value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          ) : (
            <select className="select" style={{ maxWidth: 260 }}
              value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)}>
              <option value="all">All Customers</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          )}
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat">
            <span className="stat-label">Total Sales</span>
            <span className="stat-value">₱{showTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Daily Average</span>
            <span className="stat-value">₱{showAvg.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Best Day</span>
            <span className="stat-value">
              {showDates[showMaxIdx] ? `${showDates[showMaxIdx]} — ₱${showMax.toLocaleString()}` : '—'}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Entries</span>
            <span className="stat-value">{isProduct ? entries.length : custEntries.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="page-loading">Loading...</div>
        ) : showDates.length === 0 ? (
          <div className="chart-empty">
            <p>No sales data for this period.</p>
            <p className="chart-empty-sub">
              {isProduct ? 'Add entries using Sales Entry.' : 'Import a CSV or add entries manually.'}
            </p>
          </div>
        ) : (
          <>
            {/* Trend chart */}
            <div className="chart-card">
              <div className="chart-card-header">
                <h2 className="chart-title">Daily Sales Trend</h2>
                <div className="chart-type-tabs">
                  {CHART_TYPES.map(ct => (
                    <button key={ct.key}
                      className={`chart-type-btn ${chartType === ct.key ? 'chart-type-active' : ''}`}
                      onClick={() => setChartType(ct.key)} title={ct.label}>
                      <span className="chart-type-icon">{ct.icon}</span>
                      <span className="chart-type-label">{ct.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <ReactApexChart key={chartType + tab}
                options={showChart.options} series={showChart.series}
                type={showChart.type} height={320} />
            </div>

            {/* Breakdown chart */}
            {isProduct && catNames.length > 1 && (
              <div className="chart-card" style={{ marginTop: 20 }}>
                <h2 className="chart-title">Sales by Category</h2>
                <ReactApexChart options={catBarOptions}
                  series={[{ name: 'Total', data: catTotals }]}
                  type="bar" height={Math.max(250, catNames.length * 40)} />
              </div>
            )}

            {!isProduct && custNames.length > 1 && (
              <div className="chart-card" style={{ marginTop: 20 }}>
                <h2 className="chart-title">Sales by Customer</h2>
                <ReactApexChart options={custBarOptions}
                  series={[{ name: 'Total', data: custTotals }]}
                  type="bar" height={Math.max(250, custNames.length * 40)} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
