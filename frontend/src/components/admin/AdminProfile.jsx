import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AdminProfile = () => {
    const accessToken = localStorage.getItem('accessToken')
    let userName = '';
    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      userName = decoded?.firstName
      console.log('decoded in navbar', decoded)
    }
  return (
  <div className='w-full h-screen bg-light-card-bg dark:bg-dark-card-bg text-light-txt dark:text-dark-txt p-4'> 
       <div className='flex gap-12 bg-light-bg dark:bg-dark-bg px-12 py-8 border border-light-border dark:border-dark-border rounded-lg' >
        <div className='flex flex-col gap-6 items-center'>
          <span className='rounded-full h-38 w-38 flex items-center justify-center dark:bg-dark-btn-bg bg-light-btn-bg transition-colors hover:dark:text-dark-btn-txt hover:text-light-btn-txt text-7xl'>
            {userName?.slice(0, 1).toLocaleUpperCase()}
          </span>
          <h1 className='font-semibold'>MERN Stack developer </h1>
          <span className='flex gap-4 text-xl'>
           <Link to="https://www.facebook.com/" target='_blank' className='hover:dark:text-dark-btn-bg hover:text-light-btn-bg transition-colors'><FaFacebook /></Link> 
           <Link to="https://www.linkedin.com" target='_blank' className='hover:dark:text-dark-btn-bg hover:text-light-btn-bg transition-colors'><FaLinkedin /></Link> 
           <Link to="https://github.com" target='_blank' className='hover:dark:text-dark-btn-bg hover:text-light-btn-bg transition-colors'> <FaGithub /></Link> 
          </span>
        </div>
        <div className='space-y-4'>
          <h2 className='text-4xl font-semibold'>Welcome {userName}!</h2>
          <p><span className='font-bold'>Email:</span> amnahaqamna83@gmailo.com</p>
          <div>
          <h2 className='font-bold'>About Me</h2>
          <p className='border-2 border-light-border dark:border-dark-border rounded-xl p-4 max-w-3xl mt-2'>
            Hi, I’m Amna! I’m a student learning full stack web development and
            I enjoy building projects that bring ideas to life. I love exploring
            new technologies, solving problems through code, and sharing my
            learning journey. When I’m not coding, you’ll probably find me
            reading novels, watching movies, or brainstorming my next project
            idea.
          </p>
          </div>
          <button className='bg-light-btn-bg dark:bg-dark-btn-bg py-2 px-4 rounded-sm cursor-pointer'>Edit Profile</button>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile