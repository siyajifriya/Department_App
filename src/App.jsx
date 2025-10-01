// import React from 'react'
// import { Routes, Route, Link, Navigate } from 'react-router-dom'
// import Register from './pages/Register'
// import Login from './pages/Login'
// import Departments from './pages/Departments'
// import AddDepartment from './pages/AddDepartment'
// import DepartmentDetail from './pages/DepartmentDetail'

// function App() {
//   const token = localStorage.getItem('token')

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//         <div className="container">
//           <Link className="navbar-brand" to="/">Employee App</Link>
//           <div className="collapse navbar-collapse">
//             <ul className="navbar-nav ms-auto">
//               {!token ? (
//                 <>
//                   <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
//                   <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
//                 </>
//               ) : (
//                 <>
//                   <li className="nav-item"><Link className="nav-link" to="/departments">Departments</Link></li>
//                   <li className="nav-item"><a className="nav-link" href="#" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>Logout</a></li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="container mt-4">
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/departments" element={token ? <Departments /> : <Navigate to="/login" />} />
//           <Route path="/add-department" element={token ? <AddDepartment /> : <Navigate to="/login" />} />
//           <Route path="/department/:id" element={token ? <DepartmentDetail /> : <Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </div>
//   )
// }

// export default App



import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Departments from './pages/Departments'
import AddDepartment from './pages/AddDepartment'
import DepartmentDetail from './pages/DepartmentDetail'

function App() {
  const token = localStorage.getItem('token')

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">Employee App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {!token ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                </>
              ) : (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/departments">Departments</Link></li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"
                      onClick={() => {
                        localStorage.clear();
                        localStorage.setItem('logoutMessage', 'You have been logged out successfully');
                        window.location.href = '/login';
                      }}
                    >Logout</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/departments" element={token ? <Departments /> : <Navigate to="/login" />} />
          <Route path="/add-department" element={token ? <AddDepartment /> : <Navigate to="/login" />} />
          <Route path="/department/:id" element={token ? <DepartmentDetail /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

