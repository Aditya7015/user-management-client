import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import OwnerDashboard from './pages/OwnerDashboard.jsx'
import ManagerDashboard from './pages/ManagerDashboard.jsx'
import WorkerDashboard from './pages/WorkerDashboard.jsx'

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="owner" element={<OwnerDashboard />} />
        <Route path="manager" element={<ManagerDashboard />} />
        <Route path="worker" element={<WorkerDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(<Root />)
