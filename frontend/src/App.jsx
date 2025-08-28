import './app.css'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Blogs from './components/Blogs.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import ForgotPassword from './components/ForgetPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public Routes */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        {/*private routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/about'
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path='/blogs'
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
