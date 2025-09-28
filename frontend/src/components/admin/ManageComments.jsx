import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDeleteCommentMutation, useGetAllCommentsQuery } from '../../services/InjectedAdminApi'
import { toast } from 'react-toastify'
import TimeAgo from './TimeAgo'
import { format } from 'date-fns'

const ManageComments = () => {
  // const { comments } = useSelector(state => state.admin)
  let accessToken = localStorage.getItem('accessToken') && localStorage.getItem('accessToken');
  
  // console.log('comments from ManageComments ', comments)
  const {data: comments,refetch} = useGetAllCommentsQuery(accessToken);
  const [deleteComment] = useDeleteCommentMutation();
 
  const HandleDelete = async (commentId) => {
    try {
      console.log("accessToken from ManageComments ",accessToken);
        const apiResponse = await deleteComment({ commentId, accessToken }).unwrap();
        console.log("ApiResponse ",apiResponse);
        // if (apiResponse.ok) {
          toast.success(apiResponse?.msg||'Comment deleted successfully');
          refetch()
        // }
        
        // Optionally refresh the comments list
    } catch (error) {
        console.error('Delete error:', error);
        toast.error(error?.data?.errs?.[0] || 'Failed to delete comment');
    }
  }
  return (
    <div className='w-full h-screen bg-light-card-bg dark:bg-dark-card-bg text-light-txt dark:text-dark-txt p-4'>
      <table className='w-full border border-collapse border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg px-12 py-8 rounded-lg'>
        <thead>
          <tr className='bg-light-btn-bg dark:bg-dark-btn-bg'>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Published Date
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Comment Body
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Blog title
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              UserName
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {comments &&
            comments.map((com, i) => (
              <tr key={i}>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                   {format(com?.createdAt,"MMM dd yyyy")}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  {com?.content}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  {com?.blogId?.title}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  {com?.userId?.firstName}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center text-red-600 font-semibold '>
                  <button
                    className='cursor-pointer'
                    onClick={(e) => HandleDelete(com?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageComments
