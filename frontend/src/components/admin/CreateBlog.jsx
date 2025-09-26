import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateBlogMutation, useEditBlogMutation, useGetSingleBlogQuery, } from '../../services/InjectedAdminApi'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../user/Spinner'

const CreateBlog = ({ isEditing }) => {
  console.log('isEditing ', isEditing)
  const { blogId } = useParams();
  console.log('blogId from params ', blogId);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  })

  const accessToken = localStorage.getItem('accessToken')
  const [CreateBlog] = useCreateBlogMutation()
  const { data: singleBlog,isLoading } = useGetSingleBlogQuery( blogId,{skip:!isEditing} );
  const [EditBlog] =useEditBlogMutation()
  
  const navigate = useNavigate()
useEffect(() => {
  // console.log("isEditing && singleBlog ",isEditing && singleBlog);
  
  if (isEditing && singleBlog) {
    setFormData({
      title: singleBlog.blog.title || "",
      description: singleBlog.blog.description || "",
      image: singleBlog.blog.image || ""
    });
  }
   console.log("formData ",formData);

}, [isEditing, singleBlog]);

if(isLoading){
 return <Spinner/>
}
  console.log('single blog ', singleBlog);

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let ApiResponse="";
      if(isEditing){
        console.log('Form Submitted in isEditing mode', formData)
       ApiResponse = await EditBlog({
        formData,
        accessToken,blogId
      }).unwrap();
      console.log('ApiResponse from editBlog ', ApiResponse)
      }else{
        console.log('Form Submitted cretaing mode', formData)
         ApiResponse = await CreateBlog({
          formData,
          accessToken
        }).unwrap()
        console.log('ApiResponse from CreateBlog ', ApiResponse)
      }
      toast.success(ApiResponse.msg)
      navigate('/admin/blogs')
    } catch (error) {
      console.log('Error from API:', error)
      // navigate('/login')
      toast.error(error?.data?.errs?.[0] || 'Failed to Create Blog')
    }
  }
  // const handleEditSubmit = async e => {
  //   e.preventDefault()
  //   try {
      
  //     toast.success(ApiResponse.msg)
  //     navigate('/admin/blogs')
  //     console.log('ApiResponse from CreateBlog ', ApiResponse)
  //   } catch (error) {
  //     console.log('Error from API:', error)
  //     // navigate('/login')
  //     toast.error(error?.data?.errs?.[0] || 'Failed to Edit Blog')
  //   }
  // }
 console.log("formData ",formData);
 
  return (
    <div className='w-full flex items-center justify-center bg-light-card-bg dark:bg-dark-card-bg text-light-txt dark:text-dark-txt px-4'>
      <div className='w-full max-w-2xl bg-light-bg dark:bg-dark-bg rounded-xl shadow-lg border border-light-border dark:border-dark-border p-8 m-4'>
        {/* Heading */}
        <h1 className='text-3xl font-bold flex items-center justify-center mb-6'>
          {isEditing && isEditing ? 'Edit Blog' : 'Create New Blog'}
        </h1>

        <form onSubmit={(e) => handleSubmit(e)  } className='flex flex-col gap-5'>
          {/* Title */}
          <div className='flex flex-col gap-2 '>
            <label htmlFor='title' className='text-sm font-semibold'>
              Blog Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={ formData.title }
              placeholder='Enter blog title'
              className='border border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={e => handleChange(e)}
            />
          </div>

          {/* Description */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='description' className='text-sm font-semibold'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={ formData.description}
              rows='4'
              placeholder='Write your blog content...'
              className='border border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              onChange={e => handleChange(e)}
            ></textarea>
          </div>

          {/* Image */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='image' className='text-sm font-semibold'>
              Image URL
            </label>
            <input
              type='text'
              id='image'
              name='image'
              value={ formData.image}
              placeholder='Enter image link'
              className='border border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={e => handleChange(e)}
            />
          </div>

          {/* Button */}
          <button
            type='submit'
            className='mt-4 w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition'
          >
            🚀 Publish Blog
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog
