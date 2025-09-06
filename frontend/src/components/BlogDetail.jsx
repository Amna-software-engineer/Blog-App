import { AiFillLike, AiOutlineLike } from 'react-icons/ai' //filed
import {
  FaCommentAlt,
  FaRegCommentAlt,
  FaShareAlt,
  FaRegHeart,
  FaHeart
} from 'react-icons/fa'
import { GoBookmarkFill, GoBookmark } from 'react-icons/go' //filled
import { IoPaperPlane } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  useAddCommentMutation,
  useGetCommentsQuery
} from '../services/InjectedBlogApi'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const BlogDetail = () => {
  const { id: blogId } = useParams()
  const { blogs } = useSelector(state => state.app)
  const blog = blogs.filter(blog => blog._id === blogId)
  //geting user id
  const accessToken = localStorage.getItem('accessToken')
  const decoded = jwtDecode(accessToken)
  const userId = decoded.id
  const createdAt = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const [commentBody, setCommentBody] = useState('')
  const [activeReplyId, setActiveReplyId] = useState(null)
  const [AddComment, { isLoading, isError, error }] = useAddCommentMutation()
  const { data: Comments, isLoading: comentLoading, isError: commentisError, error: commentError, refetch } = useGetCommentsQuery(blogId)
  console.log('allacoments ', Comments)


  // will handle comment submission
  const handleSubmit = async (e, commentId) => {
    e.preventDefault()
    try {
      console.log(blogId, userId, createdAt, commentBody)
      let commentData = { blogId, userId, createdAt, commentBody }
      const apiResponse = await AddComment(commentData,blogId).unwrap()
      console.log('commentData ', commentData)
      console.log('apiResponse ', apiResponse)
      toast.success(apiResponse.msg);
      setCommentBody('');
      refetch();
    } catch (error) {
      console.log('Error from API:', error)
      toast.error(error.message || error.data.errs[0] || 'Failed to add comment')
    }
  }

  return (
    <div className='w-full h-full bg-light-card-bg text-light-txt dark:bg-dark-card-bg'>
      <div className=' dark:text-dark-txt px-10 py-8 max-w-[80%] mx-auto'>
        <h1 className='font-bold text-3xl '>{blog[0]?.title}</h1>
        <p className='flex justify-between mx-auto text-light-muted dark:text-dark-muted my-3 text-sm'>
          <span> Auther: Amna Haq</span>
          <span>Published on 1 september, 2026</span>
        </p>
        <img
          src={blog[0]?.image}
          // src='/web development.jpg'
          alt='web development.jpg'
          className='rounded-md mx-auto'
        />
        {/* content */}
        <div className='flex flex-col px-2 space-y-4 pt-4'>
          <p className='text-lg text-light-txt dark:text-dark-txt'>
            {blog[0]?.description}
          </p>
          {/* tags */}
          <hr className='text-light-border dark:text-dark-border' />
          <div className='flex justify-between'>
            {/* like and comments  */}
            <div className='flex items-center gap-6'>
              {/*likes on post*/}
              <span className='flex items-center gap-1 cursor-pointer'>
                <FaRegHeart /> {blog[0]?.Likes}
              </span>
              {/*comments on post*/}
              <span className='flex items-center gap-1 cursor-pointer'>
                <FaRegCommentAlt /> {Comments &&  Comments.length}
              </span>
            </div>
            {/* save and share */}
            <div className='flex justify-between gap-6'>
              <GoBookmarkFill />
              <FaShareAlt />
            </div>
          </div>
          <hr className='text-light-border dark:text-dark-border' />
          {/* comments section */}
          <div>
            {/*parent*/}
            <div>
              {/* place user profile and user name here*/}
              <form
                onSubmit={(e) => handleSubmit(e)}
                className='w-full flex gap-2'
              >
                <textarea
                  name='comment'
                  className='w-full p-2 bg-light-bg dark:bg-dark-bg focus:border focus:border-light-btn-bg focus:dark:border-dark-btn-bg focus:outline-0 rounded-sm'
                  placeholder='Leave a comment'
                  onChange={e => setCommentBody(e.target.value)}
                ></textarea>
                <button type='submit'>
                  <IoPaperPlane className='bg-light-btn-bg dark:bg-dark-btn-bg p-2 block text-light-btn-txt dark:text-dark-btn-txt  text-4xl rounded-md cursor-pointer' />
                </button>
              </form>
            </div>
            <div className='w-full bg-light-bg dark:bg-dark-bg mt-4 rounded-sm ps-2'>
              {/* single comment */}
              {Comments &&
                Comments.map((com, i) => (
                   <div
                    className='w-full flex gap-4 items-center py-4 my-4 p-2 '
                    key={i}
                  >
                    <span className='font-semibold p-2  bg-light-card-bg dark:bg-dark-card-bg rounded-full h-10 w-10 flex items-center justify-center'>
                      {com?.userId.firstName.slice(0, 1)}
                    </span>
                    <div className='w-full space-y-2'>
                      <p>
                        <span className='font-semibold'>
                          {com?.userId.firstName}
                        </span>
                        <small className='text-light-muted dark:text-dark-muted ms-2'>
                          {com?.CreatedAt &&
                            new Date(com.CreatedAt).toLocaleDateString(
                              'en-US',
                              { year: 'numeric', month: 'long', day: 'numeric' }
                            )}
                        </small>
                      </p>
                      <p>{com?.comment}</p>
                      <div className='flex gap-2 text-sm'>
                        <span className='flex items-center gap-1 cursor-pointer'>
                          <FaRegHeart /> 0
                        </span>
                        <button className='cursor-pointer' onClick={()=>setActiveReplyId(activeReplyId ===com?._id ? null: com?._id)}>
                          Reply
                        </button>
                      </div>
                    {/* reply on coment */}
                    {activeReplyId ===com?._id  &&  <form
                
                className='w-full flex gap-2'
              >
                <textarea
                  name='comment'
                  className='w-full p-2 bg-light-card-bg dark:bg-dark-card-bg focus:border focus:border-light-btn-bg focus:dark:border-dark-btn-bg focus:outline-0 rounded-sm'
                  placeholder='Leave a comment'
                  onChange={e => setCommentBody(e.target.value)}
                ></textarea>
                <button type='submit'>
                  <IoPaperPlane className='bg-light-btn-bg dark:bg-dark-btn-bg p-2 block text-light-btn-txt dark:text-dark-btn-txt  text-4xl rounded-md cursor-pointer' />
                </button>
              </form>}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
