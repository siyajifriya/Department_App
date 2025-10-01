// import axios from 'axios'

// const BASE = 'https://employee-react.onrender.com/emp'

// const instance = axios.create({
//   baseURL: BASE,
// })

// instance.interceptors.request.use(config => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     // Some backends (including this one) expect the raw token instead of 'Bearer <token>' in Authorization
//     const raw = token.startsWith('Bearer ') ? token.slice(7) : token
//     config.headers.Authorization = raw
//     config.headers.authorization = raw
//     config.headers['x-access-token'] = raw
//   }
//   return config
// })

// export default instance

import axios from 'axios'

const BASE = 'https://employee-react.onrender.com/emp'

const instance = axios.create({
  baseURL: BASE,
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    const raw = token.startsWith('Bearer ') ? token.slice(7) : token
    config.headers.Authorization = raw
    config.headers.authorization = raw
    config.headers['x-access-token'] = raw
  }
  return config
})

export default instance
