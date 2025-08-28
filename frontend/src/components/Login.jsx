import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserLoginMutation } from '../services/InjectetdAuthApi'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEamil] = useState('')
  const [password, setpassword] = useState('')
  const [response, setResponse] = useState()
  const navigate = useNavigate()
  const [UserLogin, { isLoading, isError, error }] = useUserLoginMutation();
  
  const handleSubmit = async( e) => {
    e.preventDefault()
    const userData = { email, password }
    try {
      const ApiResponse = await UserLogin(userData).unwrap() //unwrap() show only success or error
      console.log('Success:', ApiResponse)//accessToken, refreshToken
      localStorage.setItem("accessToken",ApiResponse.accessToken)
      localStorage.setItem("refreshToken",ApiResponse.refreshToken)
      toast.success(ApiResponse.msg)
      navigate('/')
    } catch (error) {
      console.log('Error from API:', error)
      setResponse(error)
      // navigate('/login')
    }
  }
  return (
    <div className='w-full h-screen bg-light-bg text-light-txt dark:bg-dark-bg dark:text-dark-txt flex items-center justify-center'>
      <div className='max-w-md w-full bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-md border-2 border-light-border dark:border-dark-border flex flex-col items-center justify-center py-8'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <form
          className='w-full flex flex-col items-center justify-center gap-4 px-8 py-4 g'
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
            type='email'
            name='email'
            placeholder='Enter your email'
            className='mt-4 py-2 rounded-md w-full bg-light-card-bg dark:bg-dark-card-bg border-2 border-light-border dark:border-dark-border focus:outline-0 ps-4'
            onChange={e => setEamil(e.target.value)}
          />
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            className='py-2 rounded-md w-full bg-light-card-bg dark:bg-dark-card-bg border-2 border-light-border dark:border-dark-border focus:outline-0 ps-4'
            onChange={e => setpassword(e.target.value)}
          />
          <button
            type='submit'
            className='py-2 rounded-md w-full dark:bg-dark-btn-bg bg-light-btn-bg border-2 dark:border-light-border border-dark-border focus:outline-0 ps-4 text-light-btn-txt dark:text-dark-btn-txt font-bold hover:opacity-90 transition cursor-pointer mt-6'
          >
            Login
          </button>
          <Link to='/signup' className='mt-3 font-semibold'>
            Don't have account?<span className='underline'> Signup</span>
          </Link>
          <Link to='/forget-password' className='font-semibold'>
            {' '}
            Forget Password?
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
