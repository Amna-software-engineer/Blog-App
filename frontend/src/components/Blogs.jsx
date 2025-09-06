import React from 'react'
import Spinner from './Spinner'
import Navbar from './Navbar'
import BlogCard from './BlogCard'
import { useSelector } from 'react-redux'

const Blogs = ({  searchQuery }) => {
  const { blogs } = useSelector(state => state.app)

  return (
    <div className=' h-full bg-light-card-bg dark:bg-dark-card-bg'>
      <div className='container mx-auto  text-light-txt  dark:text-dark-txt px-8 py-8'>
        <h1 className='font-bold text-3xl dark:text-dark-txt text-light-txt mb-6 text-center'>
          Our Blogs
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {blogs &&
            blogs.filter(blog=> blog.title.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((blog,index) => (
              <BlogCard
                blog={blog}
                className={
                  ' flex-col bg-light-bg dark:bg-dark-bg text-light-txt dark:text-dark-txt'
                }
                lineClamp='line-clamp-4'
                 key={index}
              />
            ))}
        </div>
      </div>
    </div>
  )
}                                     
export default Blogs
