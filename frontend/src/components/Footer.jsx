import { FaGithub,FaTwitter  } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='px-8 flex flex-col justify-center items-center gap-4 md:gap-0 md:flex-row  md:justify-between dark:bg-dark-bg bg-light-bg py-4 dark:text-dark-txt text-light-txt text-lg'>
      <p><span className='dark:text-dark-btn-bg text-light-btn-bg font-bold'>BlogNest</span> &copy; 2025 All rights reserved</p>
        <ul className='flex  items-center gap-8 font-medium'>
        <li>
          <Link to='/' className='hover:dark:text-dark-btn-bg hover:text-light-btn-bg transition-colors'>Home</Link>
        </li>
        <li>
          <Link to='/blogs' className='hover:dark:text-dark-btn-bg hover:text-light-btn-bg transition-colors'>All Blogs</Link>
        </li>
        <li>
          <Link to='/about' className='hover:dark:text-dark-btn-bg hover:text-light-btn-bg transition-colors'>About</Link>
        </li>
        </ul>
        <div className="flex gap-4 items-center">
          <FaGithub className="hover:dark:text-dark-btn-bg hover:text-light-btn-bg transition-colors cursor-pointer"/> <FaTwitter className="hover:dark:text-dark-btn-bg hover:text-light-btn-bg transition-colors cursor-pointer"/> 
        </div>
    </div>
  )
}

export default Footer