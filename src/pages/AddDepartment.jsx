
import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function AddDepartment() {
  const [form, setForm] = useState({ dept_name: '', description: '' })
  const [msg, setMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  // Handle input change
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  // Submit form
  const submit = async e => {
    e.preventDefault()
    if (submitting) return

    if (!form.dept_name) {
      setMsg('Department name is required')
      return
    }

    setSubmitting(true)
    setMsg('') // clear previous messages

    try {
      const res = await api.post('/add-department', form)
      // success: clear form
      setForm({ dept_name: '', description: '' })
      setMsg('Department added successfully')
      setTimeout(() => setMsg(''), 2500)
      // optionally, redirect to departments list
      // navigate('/departments')
    } catch (err) {
      const status = err?.response?.status
      const data = err?.response?.data
      setMsg(data?.message || `Add failed${status ? ` (status ${status})` : ''}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="add-dept-page">
      <div className="add-dept-side" aria-hidden="true"></div>
      <div className="add-dept-form">
        <div className="card p-4">
          <h3 className="mb-3">Add Department</h3>
          {msg && <div className={`alert ${msg.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{msg}</div>}

          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Department Name</label>
              <input
                name="dept_name"
                value={form.dept_name}
                onChange={onChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                className="form-control"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn btn-primary w-100">
              {submitting ? 'Adding...' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}



