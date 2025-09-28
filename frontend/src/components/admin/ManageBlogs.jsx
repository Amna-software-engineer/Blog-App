import React from 'react'
import { useSelector } from 'react-redux'
import { useDeleteBlogMutation, useGetBlogsQuery } from '../../services/InjectedAdminApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ManageBlogs = () => {
 const accessToken = localStorage.getItem('accessToken');
  const {data:blogs}= useGetBlogsQuery(accessToken);
console.log("blogs ",blogs);

  const [deleteBlog]= useDeleteBlogMutation();

   const HandleDelete = async (blogId) => {
      try {
        // console.log('accessToken from ManageComments ', accessToken, '  ', userId)
        const apiResponse = await deleteBlog({ blogId, accessToken }).unwrap()
        console.log('ApiResponse ', apiResponse)
        toast.success(apiResponse?.msg || 'User deleted successfully')
        
      } catch (error) {
        console.error('Delete error:', error)
        toast.error(error?.data?.errs?.[0] || 'Failed to delete Blog')
      }
    }

  return (
    <div className='w-full h-screen bg-light-card-bg dark:bg-dark-card-bg text-light-txt dark:text-dark-txt p-4'>
      <div className='w-full flex justify-end'>
      <Link to="/admin/blogs/create-blog" className='bg-light-btn-bg dark:bg-dark-btn-bg py-2 px-4 rounded-sm cursor-pointer mb-2'>Add Blog</Link>

      </div>
      <table className='w-full border border-collapse border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg px-12 py-8 rounded-lg'>
        <thead>
          <tr className='bg-light-btn-bg dark:bg-dark-btn-bg '>
            <th className='border border-light-border dark:border-dark-border p-2 '>
              Updated Date
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Blog Image
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Blog Title
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Likes
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>              
              Edit
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs &&
            blogs.map((blog, i) => (
              <tr key={i}>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  {format(blog?.updatedAt,"MMM dd yyyy")}
                </td>
                <td className='border border-light-border dark:border-dark-border text-center py-2'>
                  <img
                    src={`http://localhost:3000/${blog?.image}`}
                    alt=''
                    className='h-10 w-20 hover:scale-110  mx-auto '
                  />
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  {blog?.title}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  {blog?.Likes?.length}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center text-green-600 font-semibold'>
                  <Link to={`/admin/blogs/edit-blog/${blog?._id}` }className='cursor-pointer'>Edit</Link>
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center text-red-600 font-semibold '>
                  <button className='cursor-pointer' onClick={()=>HandleDelete(blog?._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageBlogs
