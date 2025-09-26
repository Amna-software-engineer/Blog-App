
import { Link } from 'react-router-dom'

const BlogCard = ({ className, lineClamp, blog }) => {
  return (
    <div
      className={`border-2 dark:border-dark-border border-light-border rounded-md  flex gap-4 p-6 my-4 ${className} overflow-hidden shadow-lg hover:shadow-xl`}
    >
      <img
        src={blog.image}
        className='w-full aspect-[16/9] object-cover rounded-md'
      />
      {/* content */}
      <div className='flex flex-col px-2 gap-3 pt-2'>
        <h1 className='font-bold text-md line-clamp-1'>{blog?.title}</h1>
        <p
          className={`${lineClamp} text-sm text-light-muted dark:text-dark-muted`}
        >
          {blog?.description}
        </p>
        <Link
          to={`/blog-detail/${blog._id}`}
          className='px-4 py-2 border-2 border-light-border dark:border-dark-border 
               bg-light-btn-bg dark:bg-dark-btn-bg 
               text-light-btn-txt dark:text-dark-btn-txt 
               hover:bg-transparent hover:text-light-btn-bg 
               dark:hover:bg-transparent dark:hover:text-dark-btn-bg 
               transition-colors cursor-pointer rounded-md w-[150px] text-center'
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
