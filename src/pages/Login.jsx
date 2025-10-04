

// import React, { useState, useEffect } from 'react'
// import api from '../api'

// export default function Login() {
//   const [form, setForm] = useState({ email: '', password: '' })
//   const [msg, setMsg] = useState('')

//   useEffect(() => {
//     // check for logout or registration success message
//     const message = localStorage.getItem('logoutMessage')
//     if (message) {
//       setMsg(message)
//       localStorage.removeItem('logoutMessage')
//     }
//   }, [])

//   const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

//   const submit = async e => {
//     e.preventDefault()
//     if (!form.email || !form.password) {
//       setMsg('Please enter email and password')
//       return
//     }
//     try {
//       const res = await api.post('/login', form)
//       const token = res.data?.token || res.data?.data?.token || res.data?.accessToken || res.data?.data?.accessToken
//       if (!token) throw new Error('No token returned')
//       localStorage.setItem('token', token)
//       window.location.href = '/departments'
//     } catch (err) {
//       const status = err?.response?.status
//       const data = err?.response?.data
//       setMsg(data?.message || `Login failed${status ? ` (status ${status})` : ''}`)
//     }
//   }

//   return (
//     <div className="auth-page">
//       <div className="card p-4 form-center">
//         <h3 className="mb-3 text-center">Login</h3>
//         {msg && <div className="alert alert-success">{msg}</div>}
//         <form onSubmit={submit}>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input type="email" name="email" value={form.email} onChange={onChange} className="form-control" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input type="password" name="password" value={form.password} onChange={onChange} className="form-control" required />
//           </div>
//           <button type="submit" className="btn btn-primary w-100">Login</button>
//         </form>
//       </div>
//     </div>
//   )
// }




import React, { useState, useEffect } from 'react'
import api from '../api'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    // check for logout or registration success message
    const message = localStorage.getItem('logoutMessage')
    if (message) {
      setMsg(message)
      localStorage.removeItem('logoutMessage')
    }
  }, [])

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setMsg('Please enter email and password')
      return
    }
    try {
      const res = await api.post('/login', form)
      const token = res.data?.token || res.data?.data?.token || res.data?.accessToken || res.data?.data?.accessToken
      if (!token) throw new Error('No token returned')
      localStorage.setItem('token', token)
      window.location.href = '/departments'
    } catch (err) {
      const status = err?.response?.status
      const data = err?.response?.data
      setMsg(data?.message || `Login failed${status ? ` (status ${status})` : ''}`)
    }
  }

  return (
    <div className="auth-page">
      <div className="card p-4 form-center">
        <h3 className="mb-3 text-center">Login</h3>
        {msg && <div className="alert alert-success">{msg}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {/* Link to Register */}
        <p className="text-center mt-3">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  )
}




