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
import BlogDetail from './components/BlogDetail.jsx'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useState } from 'react'


const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <BrowserRouter>
    <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
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
              <Home searchQuery={searchQuery} />
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
              <Blogs  searchQuery={searchQuery}/>
             </ProtectedRoute>
          }
        />
        <Route
          path='/blog-detail/:id'
          element={
             <ProtectedRoute>
              <BlogDetail />
             </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
