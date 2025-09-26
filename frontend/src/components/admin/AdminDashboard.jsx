import { jwtDecode } from 'jwt-decode'
import React, { useEffect } from 'react'
import { FaUsers, FaFileAlt, FaPlus, FaUser } from 'react-icons/fa'
import { FaArrowUp } from 'react-icons/fa6'
import { BiSolidCommentDetail, BiCommentDots } from 'react-icons/bi'
import { useGetSummeryQuery } from '../../services/InjectedAdminApi'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  let accessToken = localStorage.getItem('accessToken')
  let userName = ''

  useEffect(() => {
    accessToken = localStorage.getItem('accessToken')
  }, [accessToken])

  if (accessToken) {
    const decoded = jwtDecode(accessToken)
    userName = decoded?.firstName
  }

  const { data } = useGetSummeryQuery(accessToken)
  console.log('data ', data)

  return (
    <div className='w-full h-screen p-6 bg-light-card-bg dark:bg-dark-card-bg text-light-txt dark:text-dark-txt'>
      {/* Top welcome heading and quick action btns */}
      <div className='flex justify-between items-center my-2'>
        <h2 className='text-3xl font-bold mb-6'>
          Welcome Back, {userName || 'Admin'}
        </h2>
        <div className='flex items-center gap-2'>
          <Link
            to='/admin/blogs/create-blog'
            className='bg-light-btn-bg dark:bg-dark-btn-bg py-2 px-4 rounded-sm cursor-pointer flex items-center justify-center gap-2'
          >
            <FaPlus /> Add Blog
          </Link>

          <Link
            to='/admin/users'
            className='bg-light-btn-bg dark:bg-dark-btn-bg py-2 px-4 rounded-md cursor-pointer flex items-center justify-center gap-2 shadow-sm'
          >
            <FaUser />
            Manage Users
          </Link>
          <Link
            to='/admin/comments'
            className='bg-light-btn-bg dark:bg-dark-btn-bg py-2 px-4 rounded-md cursor-pointer flex items-center justify-center gap-2 shadow-sm'
          >
            <BiCommentDots />
            Manage Comments
          </Link>
        </div>
      </div>

      {/* Cards Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12'>
        {/* total users card */}
        <div className='bg-light-bg dark:bg-dark-bg p-6 rounded-xl border shadow-md flex justify-between items-center'>
          <div className='flex flex-col gap-1 text-2xl'>
            <span className='text-lg text-light-muted dark:text-dark-muted'>
              Total Users
            </span>
            <span className='font-bold'>{data?.userCount || 0}</span>
            <span className='flex items-center gap-1 text-sm text-green-600'>
              <FaArrowUp /> Active now
            </span>
          </div>
          <div className='bg-green-100 dark:bg-green-900 p-4 rounded-full'>
            <FaUsers className='text-3xl text-green-600 dark:text-green-300' />
          </div>
        </div>

        {/* total comments card */}
        <div className='bg-light-bg dark:bg-dark-bg p-6 rounded-xl border shadow-md flex justify-between items-center'>
          <div className='flex flex-col gap-1 text-2xl'>
            <span className='text-lg text-light-muted dark:text-dark-muted'>
              Total Comments
            </span>
            <span className='font-bold'>{data?.commentCount || 0}</span>
            <span className='text-sm text-blue-500'>Engagement growing</span>
          </div>
          <div className='bg-blue-100 dark:bg-blue-900 p-4 rounded-full'>
            <BiSolidCommentDetail className='text-3xl text-blue-600 dark:text-blue-300' />
          </div>
        </div>

        {/* total blogs card */}
        <div className='bg-light-bg dark:bg-dark-bg p-6 rounded-xl border shadow-md flex justify-between items-center'>
          <div className='flex flex-col gap-1 text-2xl'>
            <span className='text-lg text-light-muted dark:text-dark-muted'>
              Total Blogs
            </span>
            <span className='font-bold'>{data?.blogCount || 0}</span>
            <span className='text-sm text-purple-500'>Content library</span>
          </div>
          <div className='bg-purple-100 dark:bg-purple-900 p-4 rounded-full'>
            <FaFileAlt className='text-3xl text-purple-600 dark:text-purple-300' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
