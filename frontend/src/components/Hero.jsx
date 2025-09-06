import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className=' h-full md:h-[60%] bg-light-card-bg text-light-txt dark:bg-dark-card-bg dark:text-dark-txt px-10 py-6'>
      <div className='w-full h-full flex justify-center px-4 gap-8 container mx-auto'>
        {/* left text*/}
        <div className='max-w-2xl mt-32 space-y-8'>
          <h1 className='font-bold text-6xl'>
            Master the Future of Web Development
          </h1>
          <p className='text-dark-muted text-xl'>
            Level up your coding journey with hands-on tutorials, best
            practices, and deep dives into web development. Perfect for
            beginners and pros alike.
          </p>
          <div className='flex items-center'>
            <Link
              to='/blogs'
              className='px-4 py-2 border-2 border-light-border dark:border-dark-border 
               bg-light-btn-bg dark:bg-dark-btn-bg 
               text-light-btn-txt dark:text-dark-btn-txt 
               hover:bg-transparent hover:text-light-btn-bg 
               dark:hover:bg-transparent dark:hover:text-dark-btn-bg 
               transition-colors cursor-pointer rounded-md'
            >
              Get Started
            </Link>
            <Link
              to='/about'
              className='px-4 py-2 border-2 border-light-border dark:border-dark-border 
               bg-transparent text-light-btn-bg dark:text-dark-btn-bg 
               hover:bg-light-btn-bg hover:text-light-btn-txt 
               dark:hover:bg-dark-btn-bg dark:hover:text-dark-btn-txt 
               transition-colors cursor-pointer rounded-md ms-2'
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* right img */}
        <div>
          <img
            src='./hero img.png'
            alt=''
            className='hidden md:block w-full max-w-lg object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
