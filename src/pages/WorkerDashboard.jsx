import React, { useEffect, useState } from 'react'
import api from '../api'
import StatusBadge from '../components/StatusBadge'

const requireRole = (role) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return user && user.role === role
}

export default function WorkerDashboard() {
  const [tasks, setTasks] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!requireRole('worker')) window.location.href = '/login'
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const { data } = await api.get('/api/tasks/my')
      setTasks(data)
    } catch {}
  }

  const updateTask = async (id, status) => {
    setMsg('')
    try {
      await api.put(`/api/tasks/${id}`, { status })
      setMsg('Task updated')
      loadTasks()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to update')
    }
  }

  return (
    <div className="space-y-3">
      {msg && <p className="text-sm">{msg}</p>}
      {tasks.map(t => (
        <div key={t._id} className="card">
          <div className="font-medium">{t.title}</div>
          <div className="text-sm text-gray-600">{t.description}</div>
          <div className="mt-1"><StatusBadge status={t.status} /></div>
          <div className="flex gap-2 mt-2">
            <button className="btn border-black" onClick={() => updateTask(t._id, 'in-progress')}>Mark In-Progress</button>
            <button className="btn border-black" onClick={() => updateTask(t._id, 'completed')}>Mark Completed</button>
          </div>
        </div>
      ))}
      {tasks.length === 0 && <div className="card">No tasks yet.</div>}
    </div>
  )
}
