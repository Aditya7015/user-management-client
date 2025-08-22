import React, { useEffect, useState } from 'react'
import api from '../api'
import StatusBadge from '../components/StatusBadge'

const requireRole = (role) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return user && user.role === role
}

export default function ManagerDashboard() {
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '' })
  const [workers, setWorkers] = useState([])
  const [tasks, setTasks] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!requireRole('manager')) window.location.href = '/login'
    loadWorkers()
    loadTasks()
  }, [])

  const loadWorkers = async () => {
    try {
      // Owner-only endpoint lists all; for quick demo, allow manager to fetch workers via tasks? 
      // We'll fetch via a tiny workaround: owner route won't work; so instead we store workers from a dedicated endpoint is overkill.
      // For simplicity in demo, assume you already created workers and know their emails/ids from DB.
      // Minimal approach: fetch tasks, extract assignedTo to show names; or better, add a tiny helper endpoint.
    } catch {}
  }

  const loadTasks = async () => {
    try {
      const { data } = await api.get('/api/tasks')
      setTasks(data)
    } catch {}
  }

  const onCreate = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const { data } = await api.post('/api/tasks', form)
      setMsg('Task assigned')
      setForm({ title: '', description: '', assignedTo: '' })
      loadTasks()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to assign task')
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">Assign Task</h2>
        <form onSubmit={onCreate} className="space-y-3">
          <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <textarea className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <input className="input" placeholder="Worker UserId (paste _id)" value={form.assignedTo} onChange={e=>setForm({...form, assignedTo:e.target.value})} />
          <button className="btn border-black">Create Task</button>
          <p className="text-xs text-gray-500">Tip: Owner can copy a worker's _id from Users list.</p>
          {msg && <p className="text-sm">{msg}</p>}
        </form>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">All Tasks</h2>
        <div className="space-y-3">
          {tasks.map(t => (
            <div key={t._id} className="border rounded-xl p-3">
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-600">{t.description}</div>
              <div className="text-sm mt-1">Assigned: {t.assignedTo?.name} ({t.assignedTo?.email})</div>
              <div className="mt-1"><StatusBadge status={t.status} /></div>
              <div className="text-xs text-gray-500 mt-1">Note: {t.lastUpdateNote || '-'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
