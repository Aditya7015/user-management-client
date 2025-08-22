import React, { useEffect, useState } from 'react'
import api from '../api'

const requireRole = (role) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return user && user.role === role
}

export default function OwnerDashboard() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'manager' })
  const [users, setUsers] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!requireRole('owner')) window.location.href = '/login'
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/api/users')
      setUsers(data)
    } catch {}
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await api.post('/api/users', form)
      setMsg('Invitation sent! (mock) User created successfully.')
      setForm({ name: '', email: '', password: '', role: 'manager' })
      fetchUsers()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to create user')
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">Create User</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <input className="input" placeholder="Temp Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          <select className="input" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
            <option value="manager">Manager</option>
            <option value="worker">Worker</option>
          </select>
          <button className="btn border-black">Create & Send Invite</button>
          {msg && <p className="text-sm">{msg}</p>}
        </form>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">All Users</h2>
        <div className="space-y-2">
          {users.map(u => (
            <div key={u._id} className="flex items-center justify-between border rounded-xl p-3">
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-gray-500">{u.email}</div>
              </div>
              <div className="text-xs uppercase px-2 py-1 rounded-lg bg-gray-100">{u.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
