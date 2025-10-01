
import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link, useNavigate } from 'react-router-dom'

export default function Departments() {
  const [departments, setDepartments] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)
  const [total, setTotal] = useState(0)
  const nav = useNavigate()

  useEffect(() => { fetchList() }, [page, query])

  async function fetchList() {
    try {
      const res = await api.get('/departments')
      let data = res.data || []
      if (!Array.isArray(data)) data = res.data.data || []
      if (query) data = data.filter(d => d.dept_name.toLowerCase().includes(query.toLowerCase()))
      setTotal(data.length)
      const start = (page - 1) * perPage
      setDepartments(data.slice(start, start + perPage))
    } catch (err) {
      if (err.response?.status === 401) { localStorage.clear(); nav('/login') }
      console.error(err)
    }
  }

  async function del(id) {
    if (!confirm('Delete this department?')) return
    try {
      await api.delete(`/delete-department/${id}`)
      fetchList()
    } catch (err) {
      alert('Delete failed')
    }
  }

  return (
    <div className="departments-page">
      <div className="departments-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-white">Departments</h4>
          <div>
            <Link className="btn btn-success btn-sm" to="/add-department">Add Department</Link>
          </div>
        </div>

        <div className="departments-instructions mb-3">
          <div className="card p-3 mb-3">
            <h5>Instructions</h5>
            <ul>
              <li>Use the search box to filter departments by name.</li>
              <li>Click Add Department to create a new department (requires login).</li>
            </ul>
          </div>
        </div>

        <div className="mb-3 d-flex">
          <input
            className="form-control me-2"
            placeholder="Search by name"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-light btn-sm" onClick={() => { setPage(1); fetchList() }}>Search</button>
        </div>

        <div className="departments-grid">
          {departments.length === 0 ? (
            <div className="text-muted">No departments found. Use the search or add a department.</div>
          ) : (
            <div className="row gx-3 gy-3">
              {departments.map(d => (
                <div className="col-sm-6 col-md-4" key={d._id || d.id}>
                  <div className="dept-tile card p-3 h-100 position-relative">
                    
                    {/* Buttons at top-right */}
                    <div className="position-absolute top-2 end-2 d-flex gap-1">
                      <button
                        className="btn btn-outline-primary btn-xs"
                        onClick={() => nav(`/edit-department/${d._id || d.id}`)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-outline-danger btn-xs"
                        onClick={() => del(d._id || d.id)}
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Department Info */}
                    <div className="d-flex align-items-start">
                      <div className="avatar bg-primary rounded-circle me-3">
                        {(d.dept_name || 'D').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{d.dept_name}</h6>
                        <p className="small text-muted mb-2">{d.description || 'No description'}</p>
                        <span className="badge bg-info text-dark">Members: {d.members || '—'}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
