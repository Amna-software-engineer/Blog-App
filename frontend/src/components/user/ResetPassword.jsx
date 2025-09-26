import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useResetPasswordMutation } from '../../services/InjectetdAuthApi'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [password, setpassword] = useState('')
  const [confirmPassword, setConfirmpassword] = useState('')
  const [response, setResponse] = useState()
  const navigate = useNavigate()
  const { id, token } = useParams();
  

  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation()
  const handleSubmit = async e => {
    e.preventDefault()
    const userData = { password, confirmPassword }
    try {
        console.log(id,token);

      const ApiResponse = await resetPassword({userData, id, token}).unwrap() //unwrap() show only success or error
      console.log('Success:', ApiResponse.msg);
       toast.success(ApiResponse.msg)
      navigate('/login')
    } catch (error) {
      console.log('Error from API:', error)
      setResponse(error)
      // navigate(/reset-password/:id/:token)
    }
  }
  return (
    <div className='w-full h-screen bg-light-bg text-light-txt dark:bg-dark-bg dark:text-dark-txt flex items-center justify-center'>
      <div className='max-w-md w-full bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-md border-2 border-light-border dark:border-dark-border flex flex-col items-center justify-center py-8'>
        <form
          className='w-full flex flex-col items-center justify-center gap-4 px-8 py-4 g'
          onSubmit={handleSubmit}
        >
          <h1 className='text-2xl font-bold'>Update your password</h1>

          <ul className='w-full list-disc ps-5'>
            {response &&
              response.data.errs.map((err, index) => (
                <li key={index} className='text-red-500 text-sm'>
                  {err}
                </li>
              ))}
          </ul>
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
            onChange={e => setpassword(e.target.value)}
          />
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
            onChange={e => setConfirmpassword(e.target.value)}
          />
          <button
            type='submit'
            className='py-2 rounded-md w-full dark:bg-dark-btn-bg bg-light-btn-bg border-2 dark:border-light-border border-dark-border focus:outline-0 ps-4 text-light-btn-txt dark:text-dark-btn-txt font-bold hover:opacity-90 transition cursor-pointer mt-6'
          >
            Update Password
          </button>
          <Link to='/forget-password' className='font-semibold underline'>
            Go back
          </Link>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
