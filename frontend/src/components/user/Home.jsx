import Navbar from './Navbar.jsx'
import Hero from './Hero.jsx'
import BlogCard from './BlogCard.jsx'
import { Link } from 'react-router-dom'
import SlickSlider from './SlickSlider.jsx'
import { saveBlogstoStore } from '../../services/UserSlice.js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetBlogsQuery } from '../../services/InjectedBlogApi.js'

const Home = ({ searchQuery }) => {
  const dispatch = useDispatch()
  let { data: blogsList, isLoading, isError, error } = useGetBlogsQuery();
  const tagList = [
    'Web Development',
    'Artificial intelligence (AI)',
    'MERN stack'
  ]
  const [seledtedTag, setSeledtedTag] = useState(null)
  useEffect(() => {
    if(blogsList){
      dispatch(saveBlogstoStore(blogsList))
      localStorage.setItem('blogs', JSON.stringify(blogsList))
    }
  }, [blogsList])
  const filteredBlog = seledtedTag
    ? blogsList.filter(
        blog =>
          blog?.description
            .toLowerCase()
            .includes(seledtedTag?.toLowerCase()) ||
          blog?.title.toLowerCase().includes(seledtedTag?.toLowerCase())
      )
    : blogsList

  return (
    <div>
      <Hero />
      {/* recent blog section */}
      <div className='w-full h-full bg-light-bg text-light-txt dark:bg-dark-bg'>
        <div className=' dark:text-dark-txt px-10 py-8 container mx-auto'>
          <h1 className='font-bold text-3xl dark:text-dark-txt text-light-txt mb-6 text-center'>
            Recent Blogs
          </h1>
          {/* tags section */}
            <div className=' w-full bg-light-card-bg dark:bg-dark-card-bg rounded-md mt-4 p-2'>
              {tagList.map((tag, i) => (
                <div
                  className='bg-light-bg dark:bg-dark-bg rounded-2xl border dark:border-dark-border border-light-border text-light-muted dark:text-dark-muted px-2 py-1 cursor-pointer m-1 inline-block'
                  onClick={() => setSeledtedTag(tag)}
                  key={i}
                >
                  {tag}
                </div>
              ))}
              <div
                  className='bg-light-btn-bg dark:bg-dark-btn-bg text-light-btn-txt dark:text-dark-btn-txt rounded-2xl border dark:border-dark-border border-light-border  px-2 py-1 cursor-pointer m-1 inline-block'
                  onClick={() => setSeledtedTag(null)}
                 
                >
                 Clear
                </div>
            </div>
          <div className='flex flex-col md:flex-row gap-8'>
            <div>
              {filteredBlog &&
                filteredBlog
                  .filter(blog =>
                    blog?.title
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((blog, index) => (
                    
                      <BlogCard
                        blog={blog}
                        className={
                          'sm:max-w-4xl sm:h-[200px] bg-light-card-bg dark:bg-dark-card-bg flex-col sm:flex-row'
                        }
                        lineClamp='line-clamp-2'
                        key={index}
                      />
                    ))}
                   { filteredBlog?.length>0 && <Link to='/blogs' className='block px-4 py-2 mx-auto border-2 border-light-border dark:border-dark-border bg-light-btn-bg dark:bg-dark-btn-bg text-light-btn-txt dark:text-dark-btn-txt transition-colors cursor-pointer rounded-md w-[200px] text-center' > Read More </Link>
                   }
                  
            </div>
            
          </div>
        </div>
      </div>
      {/* popular blogs */}
      <div className='w-full h-full bg-light-card-bg text-light-txt dark:bg-dark-card-bg dark:text-dark-card-txt px-8 py-8'>
        <h1 className='font-bold text-3xl dark:text-dark-txt text-light-txt my-6 text-center'>
          Popular Blogs
        </h1>
        <SlickSlider slidesToShow={3} slidesToScroll={3} className=''>
          {blogsList &&
            blogsList.map((blog, index) => (
              <BlogCard
                blog={blog}
                className={
                  ' flex-col bg-light-bg dark:bg-dark-bg text-light-txt dark:text-dark-txt w-[300px] mx-auto'
                }
                lineClamp='line-clamp-2'
                key={index}
              />
            ))}
        </SlickSlider>
      </div>
    </div>
  )
}

export default Home
