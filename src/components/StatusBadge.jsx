import React from 'react'
export default function StatusBadge({ status }) {
  const map = {
    'pending': 'bg-red-100 text-red-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    'completed': 'bg-green-100 text-green-700',
  }
  return <span className={`badge ${map[status] || ''}`}>{status}</span>
}
