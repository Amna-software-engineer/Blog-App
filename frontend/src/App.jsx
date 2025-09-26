import './app.css'
import Home from './components/user/Home.jsx'
import About from './components/user/About.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Blogs from './components/user/Blogs.jsx'
import Signup from './components/user/Signup.jsx'
import Login from './components/user/Login.jsx'
import ForgotPassword from './components/user/ForgetPassword.jsx'
import ResetPassword from './components/user/ResetPassword.jsx'
import ProtectedRoute from './components/user/ProtectedRoute.jsx'
import BlogDetail from './components/user/BlogDetail.jsx'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState } from 'react'
import AdminRoute from './components/admin/AdminRoute.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'
import UserLayout from './components/user/UserLayout.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import ManageUser from './components/admin/ManageUser.jsx'
import ManageBlogs from './components/admin/ManageBlogs.jsx'
import AdminProfile from './components/admin/AdminProfile.jsx'
import ManageComments from './components/admin/ManageComments.jsx'
import CreateBlog from './components/admin/CreateBlog.jsx'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(null);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* public Routes */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        {/*private routes */}
        <Route element={<UserLayout setSearchQuery={setSearchQuery} searchQuery={searchQuery} />}>
        <Route
          path='/'
          element={
            <ProtectedRoute  requireAdmin={false}>
              <Home searchQuery={searchQuery} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/about'
          element={
            <ProtectedRoute requireAdmin={false}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path='/blogs'
          element={
            <ProtectedRoute requireAdmin={false}>
              <Blogs searchQuery={searchQuery} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/blog-detail/:id'
          element={
            <ProtectedRoute requireAdmin={false}>
              <BlogDetail />
            </ProtectedRoute>
          }
        />
        </Route>
        {/* admin routes */}
        <Route element={<AdminLayout/>}>
        <Route
          path='/admin/dashboard'
          element={
            <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/users'
          element={
            <ProtectedRoute requireAdmin={true}>
                <ManageUser />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/comments'
          element={
            <ProtectedRoute requireAdmin={true}>
                <ManageComments />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/blogs'
          element={
            <ProtectedRoute requireAdmin={true}>
                <ManageBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/blogs/create-blog'
          element={
            <ProtectedRoute requireAdmin={true} >
                <CreateBlog isEditing={false}/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/profile'
          element={
            <ProtectedRoute requireAdmin={true}>
                <AdminProfile />
            </ProtectedRoute>
          }
        /></Route>
        <Route element={<AdminLayout/>}>
        <Route
          path='/admin/blogs/edit-blog/:blogId'
          element={
            <ProtectedRoute requireAdmin={true} >
                <CreateBlog isEditing={true}/>
            </ProtectedRoute>
          }
        />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
