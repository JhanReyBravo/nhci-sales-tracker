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
  const [tab, setTab]                       = useState('product') // 'product' | 'customer' | 'expenses'
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

  // Expenses state
  const [expEntries, setExpEntries]         = useState([])
  const [agents, setAgents]                 = useState([])
  const [selectedAgent, setSelectedAgent]   = useState('all')
  const [loadingExp, setLoadingExp]         = useState(true)

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data))
    api.get('/customers').then(({ data }) => setCustomers(data))
    api.get('/sales-agents').then(({ data }) => setAgents(data))
  }, [])

  useEffect(() => {
    if (tab === 'product') fetchProductEntries()
    else if (tab === 'customer') fetchCustomerEntries()
    else fetchExpenseEntries()
  }, [view, selectedCategory, selectedCustomer, selectedAgent, tab])

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

  async function fetchExpenseEntries() {
    setLoadingExp(true)
    const from = dayjs().subtract(parseInt(view), 'day').format('YYYY-MM-DD')
    const to   = dayjs().format('YYYY-MM-DD')
    const params = { from, to }
    if (selectedAgent !== 'all') params.sales_agent_id = selectedAgent
    const { data } = await api.get('/agent-expenses', { params })
    setExpEntries(data)
    setLoadingExp(false)
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
  const catNames  = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a]).slice(0, 10)
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
  const custNames  = Object.keys(byCustName).sort((a, b) => byCustName[b] - byCustName[a]).slice(0, 10)
  const custTotals = custNames.map(c => byCustName[c])

  // ── Expense computed ─────────────────────────────────────────
  const byExpDate = {}
  const byExpDateFuel = {}
  expEntries.forEach(e => {
    byExpDate[e.expense_date]     = (byExpDate[e.expense_date] || 0) + parseFloat(e.allowance_amount)
    byExpDateFuel[e.expense_date] = (byExpDateFuel[e.expense_date] || 0) + parseFloat(e.fuel_liters || 0)
  })
  const expSortedDates  = Object.keys(byExpDate).sort((a, b) => a.localeCompare(b))
  const expDates        = expSortedDates.map(d => dayjs(d).format('MMM D'))
  const expAmounts      = expSortedDates.map(d => byExpDate[d])
  const expFuelAmounts  = expSortedDates.map(d => byExpDateFuel[d])
  const expTotal        = expAmounts.reduce((a, b) => a + b, 0)
  const expTotalFuel    = expFuelAmounts.reduce((a, b) => a + b, 0)
  const expAvg          = expAmounts.length ? expTotal / expAmounts.length : 0
  const expMax          = expAmounts.length ? Math.max(...expAmounts) : 0
  const expMaxIdx       = expAmounts.indexOf(expMax)

  const byAgentName = {}
  const byAgentFuel = {}
  expEntries.forEach(e => {
    const name = e.agent?.name || 'Unknown'
    byAgentName[name] = (byAgentName[name] || 0) + parseFloat(e.allowance_amount)
    byAgentFuel[name] = (byAgentFuel[name] || 0) + parseFloat(e.fuel_liters || 0)
  })
  const agentNames    = Object.keys(byAgentName).sort((a, b) => byAgentName[b] - byAgentName[a]).slice(0, 10)
  const agentAllowances = agentNames.map(n => byAgentName[n])
  const agentFuels      = agentNames.map(n => parseFloat(byAgentFuel[n].toFixed(2)))

  const expAllowanceBarOptions = {
    chart: { type: 'bar', toolbar: { show: false } }, colors: ['#f59e0b'],
    plotOptions: { bar: { borderRadius: 6, horizontal: true, distributed: true } },
    dataLabels: { enabled: false }, legend: { show: false },
    xaxis: { categories: agentNames, labels: { style: { colors: '#94a3b8' }, formatter: FMT } },
    yaxis: { labels: { style: { colors: '#e2e8f0', fontSize: '12px' } } }, ...BASE,
  }

  const expFuelBarOptions = {
    chart: { type: 'bar', toolbar: { show: false } }, colors: ['#06b6d4'],
    plotOptions: { bar: { borderRadius: 6, horizontal: true, distributed: true } },
    dataLabels: { enabled: false }, legend: { show: false },
    xaxis: { categories: agentNames, labels: { style: { colors: '#94a3b8' }, formatter: v => v + ' L' } },
    yaxis: { labels: { style: { colors: '#e2e8f0', fontSize: '12px' } } },
    grid: { borderColor: '#1e293b', strokeDashArray: 4 },
    tooltip: { theme: 'dark', y: { formatter: v => v + ' liters' } },
  }

  const expTrendOptions = {
    chart: { type: 'line', toolbar: { show: true }, zoom: { enabled: true } },
    colors: ['#f59e0b', '#06b6d4'],
    stroke: { width: [0, 3], curve: 'smooth' },
    plotOptions: { bar: { borderRadius: 5, columnWidth: '55%' } },
    dataLabels: { enabled: false },
    legend: { labels: { colors: '#94a3b8' }, position: 'top' },
    markers: { size: [0, 4] },
    xaxis: { categories: expDates, labels: { style: { colors: '#94a3b8' }, rotate: -30 }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: [
      { labels: { style: { colors: '#94a3b8' }, formatter: FMT } },
      { opposite: true, labels: { style: { colors: '#06b6d4' }, formatter: v => v + ' L' } },
    ],
    grid: { borderColor: '#1e293b', strokeDashArray: 4 },
    tooltip: { theme: 'dark', shared: true, intersect: false },
  }

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

  const isProduct   = tab === 'product'
  const isCustomer  = tab === 'customer'
  const isExpenses  = tab === 'expenses'
  const loading     = isProduct ? loadingProduct : isCustomer ? loadingCustomer : loadingExp
  const showDates   = isProduct ? dates : isCustomer ? custDates : expDates
  const showTotal   = isProduct ? total : isCustomer ? custTotal : expTotal
  const showAvg     = isProduct ? avg   : isCustomer ? custAvg   : expAvg
  const showMax     = isProduct ? max   : isCustomer ? custMax   : expMax
  const showMaxIdx  = isProduct ? maxIdx : isCustomer ? custMaxIdx : expMaxIdx
  const showChart   = isProduct ? trendChart : custTrendChart

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
          <button className={`dashboard-tab ${isProduct  ? 'dashboard-tab-active' : ''}`} onClick={() => setTab('product')}>
            📦 Sales per Product
          </button>
          <button className={`dashboard-tab ${isCustomer ? 'dashboard-tab-active' : ''}`} onClick={() => setTab('customer')}>
            👤 Sales per Customer
          </button>
          <button className={`dashboard-tab ${isExpenses ? 'dashboard-tab-active' : ''}`} onClick={() => setTab('expenses')}>
            🚗 Agent Expenses
          </button>
        </div>

        {/* Filter row */}
        <div className="filter-row" style={{ marginBottom: 20 }}>
          {isProduct && (
            <select className="select" style={{ maxWidth: 260 }}
              value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          {isCustomer && (
            <select className="select" style={{ maxWidth: 260 }}
              value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)}>
              <option value="all">All Customers</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          )}
          {isExpenses && (
            <select className="select" style={{ maxWidth: 260 }}
              value={selectedAgent} onChange={e => setSelectedAgent(e.target.value)}>
              <option value="all">All Agents</option>
              {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          )}
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat">
            <span className="stat-label">{isExpenses ? 'Total Allowance' : 'Total Sales'}</span>
            <span className="stat-value">₱{showTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="stat">
            <span className="stat-label">{isExpenses ? 'Daily Average' : 'Daily Average'}</span>
            <span className="stat-value">₱{showAvg.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="stat">
            <span className="stat-label">{isExpenses ? 'Total Fuel' : 'Best Day'}</span>
            <span className="stat-value">
              {isExpenses
                ? `${expTotalFuel.toLocaleString(undefined, { minimumFractionDigits: 2 })} L`
                : showDates[showMaxIdx] ? `${showDates[showMaxIdx]} — ₱${showMax.toLocaleString()}` : '—'}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Entries</span>
            <span className="stat-value">{isProduct ? entries.length : isCustomer ? custEntries.length : expEntries.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="page-loading">Loading...</div>
        ) : showDates.length === 0 ? (
          <div className="chart-empty">
            <p>No data for this period.</p>
            <p className="chart-empty-sub">
              {isProduct ? 'Add entries using Sales Entry.' : isCustomer ? 'Import a CSV or add customer entries.' : 'Add agent expenses using Agent Expense Entry.'}
            </p>
          </div>
        ) : isExpenses ? (
          <>
            {/* Expense trend — allowance (column) + fuel (line) */}
            <div className="chart-card">
              <h2 className="chart-title">Daily Allowance & Fuel Consumption</h2>
              <ReactApexChart key="exp-trend"
                options={expTrendOptions}
                series={[
                  { name: 'Allowance', type: 'column', data: expAmounts },
                  { name: 'Fuel (L)',  type: 'line',   data: expFuelAmounts },
                ]}
                type="line" height={320} />
            </div>

            {agentNames.length > 0 && (
              <>
                <div className="chart-card" style={{ marginTop: 20 }}>
                  <h2 className="chart-title">Top 10 Agents by Allowance</h2>
                  <ReactApexChart options={expAllowanceBarOptions}
                    series={[{ name: 'Allowance', data: agentAllowances }]}
                    type="bar" height={400} />
                </div>
                <div className="chart-card" style={{ marginTop: 20 }}>
                  <h2 className="chart-title">Top 10 Agents by Fuel Consumption</h2>
                  <ReactApexChart options={expFuelBarOptions}
                    series={[{ name: 'Fuel (L)', data: agentFuels }]}
                    type="bar" height={400} />
                </div>
              </>
            )}
          </>
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

            {isProduct && catNames.length > 1 && (
              <div className="chart-card" style={{ marginTop: 20 }}>
                <h2 className="chart-title">Top 10 Categories by Sales</h2>
                <ReactApexChart options={catBarOptions}
                  series={[{ name: 'Total', data: catTotals }]}
                  type="bar" height={400} />
              </div>
            )}

            {isCustomer && custNames.length > 1 && (
              <div className="chart-card" style={{ marginTop: 20 }}>
                <h2 className="chart-title">Top 10 Customers by Sales</h2>
                <ReactApexChart options={custBarOptions}
                  series={[{ name: 'Total', data: custTotals }]}
                  type="bar" height={400} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
