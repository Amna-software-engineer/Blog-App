import React, { useEffect, useState } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { IoSearch } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { FiAlignJustify } from 'react-icons/fi'
import { checktokenExpiry } from '../utils/auth'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState( () => localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark' )
  const [isActive, setisActive] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const toggleTheme = () => {
    if (darkTheme) {
      document.getElementById('root').classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDarkTheme(false)
    } else {
      document.getElementById('root').classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDarkTheme(true)
    } //for the first time when there is no theme in local storage it doesn't work
  }
useEffect(() => {
    const isExpired= checktokenExpiry();
    isExpired ? setisLoggedIn(false) : setisLoggedIn(true);
}, [])

  useEffect(() => {
    if (darkTheme) {
      document.getElementById('root').classList.add('dark')
    } else {
      document.getElementById('root').classList.remove('dark')
    }
  }, [darkTheme])


  const handleLogout= () => {
    localStorage.removeItem("accessToken");
    toast.success("Logout Successfully")
    console.log(localStorage.getItem("accessToken"));
     navigate("/login");

  }

  return (
    <div
      className='flex items-center   
      bg-light-bg dark:bg-dark-bg 
      text-light-txt dark:text-dark-txt 
       text-md lg:text-lg px-6 py-4 md:px-8
      border-b border-light-border dark:border-dark-border shadow-sm relative'
    >
      {/* Logo + Search */}
      <div className='flex items-center gap-6'>
        <span className='font-bold text-xl text-light-accent dark:text-dark-btn-bg'>
          BlogNest
        </span>

        <div className='relative hidden sm:flex items-center'>
          <input
            type='search'
            placeholder='Search...'
            className='px-3 py-1 rounded-md 
              bg-light-card-bg dark:bg-dark-card-bg 
              border border-light-border dark:border-dark-border 
              text-light-txt dark:text-dark-txt 
              focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-btn-bg 
              outline-none'
          />
          <IoSearch className='absolute right-2 text-light-muted dark:text-dark-muted' />
        </div>
      </div>

      {/* Links */}
      <ul className='hidden md:flex ms-auto items-center gap-8 font-medium'>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/blogs'>All Blogs</a>
        </li>
        <li>
          <a href='/about'>About</a>
        </li>

        {/* Signup */}
        {
          isLoggedIn ? (  <li>
          <button onClick={handleLogout}>Logout</button>
        </li>):(<><li>
          <button onClick={() => navigate('/signup')}>Signup</button>
        </li>
        <li>
          <button onClick={() => navigate('/login')}>Login</button>
        </li></>)
        }
        
        {/* Theme Toggle */}
        <li>
          <button
            className='p-2 rounded-md 
              bg-light-card-bg dark:bg-dark-card-bg 
              border border-light-border dark:border-dark-border 
              text-light-txt dark:text-dark-txt 
              hover:shadow'
            onClick={toggleTheme}
          >
            {darkTheme ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </li>
      </ul>
      {/* for mobile */}

      {/* Theme Toggle */}
      <button
        className='p-2 ms-auto md:hidden rounded-md 
              bg-light-card-bg dark:bg-dark-card-bg 
              border border-light-border dark:border-dark-border 
              text-light-txt dark:text-dark-txt 
              hover:shadow'
        onClick={toggleTheme}
      >
        {darkTheme ? <MdLightMode /> : <MdDarkMode />}
      </button>
      <button>
        <FiAlignJustify
          className='md:hidden text-2xl ms-2'
          onClick={() => setisActive(true)}
        />
      </button>
      {isActive && (
        <ul className='md:hidden flex flex-col gap-8 font-medium absolute top-[70px] left-0 ps-5 bg-light-bg dark:bg-dark-bg w-full'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/blogs'>All Blogs</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          {/* Signup */}
          <li>
            <button onClick={() => navigate('/signup')}> Signup </button>
          </li>
          <li>
            <button onClick={() => navigate('/login')}> Login </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Navbar
