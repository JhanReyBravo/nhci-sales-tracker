import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SalesEntryPage from './pages/SalesEntryPage'
import HistoryPage from './pages/HistoryPage'
import ProductsPage from './pages/ProductsPage'
import UsersPage from './pages/UsersPage'
import CustomerEntryPage from './pages/CustomerEntryPage'
import AgentExpensePage from './pages/AgentExpensePage'
import AgentsPage from './pages/AgentsPage'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/entry" element={<SalesEntryPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/customer-entry" element={<CustomerEntryPage />} />
            <Route path="/agent-expenses" element={<AgentExpensePage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
