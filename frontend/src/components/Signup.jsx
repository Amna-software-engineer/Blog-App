import React, { useState } from 'react'
import { useCreateUserMutation } from '../services/InjectetdAuthApi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [email, setEamil] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setConfirmpassword] = useState('')
  const [response, setResponse] = useState()
  const navigate = useNavigate()
  const [CreateUser, { isLoading, isError, error }] = useCreateUserMutation() //return array having function nd one obj with filed isloading,isError,isSucces etc
  // console.log('useCreateUserMutation', useCreateUserMutation())

  const handleSubmit = async e => {
    e.preventDefault() //prevent pag reload while submitng a form

    const user = { firstName, lastName, email, password, confirmPassword }

    try {
      const ApiResponse = await CreateUser(user).unwrap() //unwrap() show only success or error
      console.log('Success:', ApiResponse.msg)
      toast.success(ApiResponse.msg)
      navigate('/login')
    } catch (error) {
      console.log('Error from API:', error)
      setResponse(error)
      // navigate('/Signup')
    }
  }
  return (
    <div
      className='w-full h-screen flex items-center justify-center gap-4 
      bg-light-bg dark:bg-dark-bg 
      text-light-txt dark:text-dark-txt'
    >
      <div className='flex flex-col items-center justify-center bg-light-card-bg dark:bg-dark-card-bg text-light-txt dark:text-dark-txt rounded-lg max-w-md w-full py-8 pb-4 border-2 border-light-border dark:border-dark-border shadow-md'>
        <h1 className='text-2xl font-bold text-light-txt dark:text-dark-txt'>
          Create Account
        </h1>

        <form
          className='flex flex-col items-center justify-center gap-4 px-8 py-4 w-full'
          onSubmit={handleSubmit}
        >
          <ul className='w-full list-disc ps-5'>
            {response &&
              response?.data?.errs?.map((err, index) => (
                <li key={index} className='text-red-500 text-sm'>
                  {err}
                </li>
              ))}
          </ul>
          <input
            type='text'
            name='firstName'
            placeholder='Enter your first name'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
            onChange={e => setFirstname(e.target.value)}
          />
          <input
            type='text'
            name='lastName'
            placeholder='Enter your last name'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
            onChange={e => setLastname(e.target.value)}
          />
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
            onChange={e => setEamil(e.target.value)}
          />
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
            className='mt-6 w-full px-4 py-2 rounded-md font-bold cursor-pointer bg-light-btn-bg dark:bg-dark-btn-bg text-light-btn-txt dark:text-dark-btn-txt hover:opacity-90 transition'
          >
            {' '}
            Signup{' '}
          </button>
          <Link to='/login' className='mt-3 font-semibold'>
            Already have account? <span className='underline'>Login</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Signup
