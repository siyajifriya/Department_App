import React, { useEffect, useState } from 'react'
import api from '../api'
import { useParams, useNavigate } from 'react-router-dom'

export default function DepartmentDetail(){
  const { id } = useParams()
  const [dept, setDept] = useState(null)
  const nav = useNavigate()

  useEffect(()=>{ fetchDept() }, [id])

  async function fetchDept(){
    try{
      const res = await api.get(`/department/${id}`)
      setDept(res.data || res.data.data)
    }catch(err){
      if(err.response?.status === 401) { localStorage.clear(); nav('/login') }
      console.error(err)
    }
  }

  if(!dept) return <div className="card p-4">Loading...</div>

  return (
    <div className="card p-4">
      <h3>{dept.dept_name || dept.name}</h3>
      <p>{dept.description}</p>
      <button className="btn btn-secondary" onClick={()=>nav('/departments')}>Back</button>
    </div>
  )
}

