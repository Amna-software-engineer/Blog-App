import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa6'
import {
  useDeleteUserMutation,
  useGetUserQuery
} from '../../services/InjectedAdminApi'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const ManageUser = () => {
  const accessToken = localStorage.getItem('accessToken')
  let userName = ''
  if (accessToken) {
    const decoded = jwtDecode(accessToken)
    userName = decoded?.firstName
  }
  const { data: users } = useGetUserQuery(accessToken)
  const [deleteUser] = useDeleteUserMutation(accessToken)
  console.log('users from ManageUser ', users);

  const HandleDelete = async userId => {
    try {
      // console.log('accessToken from ManageComments ', accessToken, '  ', userId)
      const apiResponse = await deleteUser({ userId, accessToken }).unwrap()
      console.log('ApiResponse ', apiResponse)
      // if (apiResponse.ok) {
      toast.success(apiResponse?.msg || 'User deleted successfully')
      // refetch();
      // }

      // Optionally refresh the comments list
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(error?.data?.errs?.[0] || 'Failed to delete user')
    }
  }
  return (
    <div className='w-full h-screen bg-light-card-bg dark:bg-dark-card-bg text-light-txt dark:text-dark-txt p-4'>
      <table className='w-full border border-collapse border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg px-12 py-8 rounded-lg'>
        <thead>
          <tr className='bg-light-btn-bg dark:bg-dark-btn-bg '>
            <th className='border border-light-border dark:border-dark-border p-2 '>
              Created Date
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Profile
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              UserName
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Email
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Admin
            </th>
            <th className='border border-light-border dark:border-dark-border p-2'>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr key={i}>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  {format(user?.createdAt, 'MMM dd yyyy')}

                  {/* {format(user?.createdAt,"MMM dd yyyy")} */}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  <span className='rounded-full h-8 w-8 flex items-center justify-center dark:bg-dark-btn-bg bg-light-btn-bg transition-colors hover:dark:text-dark-btn-txt hover:text-light-btn-txt text-[20px] mx-auto'>
                    {user?.firstName?.slice(0, 1).toLocaleUpperCase()}
                  </span>
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  {user?.firstName}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center'>
                  {user?.email}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2   font-bold text-xl'>
                  {user?.isAdmin ? (
                    <FaCheck className='mx-auto text-green-600' />
                  ) : (
                    <RxCross2 className='mx-auto text-red-600' />
                  )}
                </td>
                <td className='border border-light-border dark:border-dark-border p-2 text-center text-red-600 font-semibold '>
                  <button
                    className='cursor-pointer'
                    onClick={() => HandleDelete(user?._id)}
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

export default ManageUser
