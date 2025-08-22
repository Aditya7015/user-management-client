import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management Dashboard</h1>
        <div className="flex items-center gap-3">
          {user ? <span className="text-sm">Hi, {user.name} • {user.role}</span> : null}
          {user ? (
            <button className="btn" onClick={() => { localStorage.clear(); navigate('/login'); }}>Logout</button>
          ) : null}
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <Outlet />
      </div>
    </div>
  )
}
