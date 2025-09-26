import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import Footer from '../user/Footer'
import { RiPieChart2Fill } from 'react-icons/ri'
import { BiSolidCommentDetail } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa6'
import { FaFileAlt, FaArrowRight, FaUser } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
const AdminLayout = () => {
  const navigate = useNavigate()

  const Links = [
    { txt: 'Dashboard', url: '/admin/dashboard', icon: <RiPieChart2Fill /> },
    // { txt: 'Profile', url: '/admin/profile', icon: <FaUser /> },
    { txt: 'Comments', url: '/admin/comments', icon: <BiSolidCommentDetail /> },
    { txt: 'Users', url: '/admin/users', icon: <FaUsers /> },
    { txt: 'Blogs', url: '/admin/blogs', icon: <FaFileAlt /> }
  ]
 const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div className='h-full'>
      <AdminNavbar />
      {/* admin side menu */}
      <div className='flex h-full '>
        <div className=' w-[200px] bg-light-bg dark:bg-dark-bg text-light-txt dark:text-dark-txt border-r border-light-border dark:border-dark-border '>
          <ul className='p-2 text-md flex flex-col gap-6 pt-4 '>{/* ye div apnay parent ki hieht q nhi lay raha */}
            {Links.map((link, i) => (
              <li key={i}>
                <NavLink
                  to={link.url}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-light-card-bg dark:bg-dark-card-bg flex gap-2 items-center  py-1 ps-2 cursor-pointer rounded-md border border-light-border dark:border-dark-border'
                      : 'flex gap-2 items-center bg-light-bg dark:bg-dark-bg  py-1 ps-2 cursor-pointer rounded-md border border-light-bg dark:border-dark-bg '
                  }
                >
                  {link.icon} <span>{link.txt}</span>
                </NavLink>
              </li>
            ))}

            <li
              className='flex gap-2 items-center cursor-pointer'
              onClick={handleLogout}
            >
              <FaArrowRight /> <span>Logout</span>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>

      {/* <Footer/> */}
    </div>
  )
}

export default AdminLayout
