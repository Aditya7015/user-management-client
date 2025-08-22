import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Login() {
  const [email, setEmail] = useState('owner@synomtech.in')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      if (data.user.role === 'owner') navigate('/owner')
      else if (data.user.role === 'manager') navigate('/manager')
      else navigate('/worker')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn border-black w-full" type="submit">Sign In</button>
          <p className="text-xs text-gray-500">Default owner: owner@synomtech.in / 123456</p>
        </form>
      </div>
    </div>
  )
}
