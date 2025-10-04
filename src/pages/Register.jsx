
import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const onChange = e => setForm({...form, [e.target.name]: e.target.value})

  const submit = async e => {
    e.preventDefault()
    try {
      await api.post('/register', form)
      setForm({name:'', email:'', password:''})
      // store success message temporarily
      localStorage.setItem('logoutMessage', 'Registered successfully. Please login.')
      // redirect to login page
      navigate('/login')
    } catch(err) {
      setMsg(err?.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="auth-page">
      <div className="card p-4 form-center">
        <h3 className="mb-3 text-center">Register</h3>
        {msg && <div className="alert alert-danger">{msg}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input name="name" value={form.name} onChange={onChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  )
}




// import React, { useState } from 'react'
// import api from '../api'
// import { useNavigate } from 'react-router-dom'

// export default function Register() {
//   const [form, setForm] = useState({ name:'', email:'', password:'' })
//   const [msg, setMsg] = useState('')
//   const navigate = useNavigate()

//   const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

//   const submit = async e => {
//     e.preventDefault()
//     try {
//       await api.post('/register', form)
//       setForm({ name:'', email:'', password:'' })
//       localStorage.setItem('logoutMessage', 'Registered successfully. Please login.')
//       navigate('/login')
//     } catch(err) {
//       setMsg(err?.response?.data?.message || 'Register failed')
//     }
//   }

//   return (
//     <div className="auth-page">
//       <div className="card p-4 form-center">
//         <h3 className="mb-3 text-center">Register</h3>
//         {msg && <div className="alert alert-danger">{msg}</div>}
//         <form onSubmit={submit}>
//           <div className="mb-3">
//             <label className="form-label">Name</label>
//             <input name="name" value={form.name} onChange={onChange} className="form-control" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input type="email" name="email" value={form.email} onChange={onChange} className="form-control" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input type="password" name="password" value={form.password} onChange={onChange} className="form-control" required />
//           </div>
//           <button type="submit" className="btn btn-primary w-100">Register</button>
//         </form>

//         <p className="text-center mt-3">
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </div>
//     </div>
//   )
// }




