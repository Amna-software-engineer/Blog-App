import React, { useState } from 'react'
import { Link, useNavigate,  } from 'react-router-dom'
import { useForgetPassordMutation } from '../services/InjectetdAuthApi';
import { toast } from 'react-toastify';

const ForgotPassword = () => {  
  const [email, setEamil] = useState('')
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  const [forgetPassword,{ isLoading, isError, error }]=useForgetPassordMutation();
  const handleSubmit = async e => {
      e.preventDefault() 
      try {
        const ApiResponse = await forgetPassword({email}).unwrap();//unwrap() show only success or error
        console.log(email);
        
        console.log('Success:', ApiResponse.msg)
         toast.success(ApiResponse.msg)
        // navigate('/reset-password/:id/:token')
        
      } catch (error) {
      console.log("Error from API:", error);
      setResponse(error);
      navigate('/login')
    }
  }
  return (
    <div className='w-full h-screen bg-light-bg text-light-txt dark:bg-dark-bg dark:text-dark-txt flex items-center justify-center'>
      <div className='max-w-md w-full bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-md border-2 border-light-border dark:border-dark-border flex flex-col items-center justify-center py-8'>
    <h1 className='text-2xl font-bold'>Forgot Password</h1>
    <form className='w-full flex flex-col items-center justify-center gap-4 px-8 py-4 g' onSubmit={handleSubmit}>
        <ul className='w-full list-disc ps-5'>
            {response && response.data.errs.map((err, index) => (
              <li key={index} className='text-red-500 text-sm'>{err}</li>
            ))}
          </ul>
         <p className='dark:text-dark-txt text-light-txt ms-2'>Enter your email to recieve a password reset link.</p>
      <input type="email" name='email' placeholder='Enter your email' className=' py-2 rounded-md w-full bg-light-card-bg dark:bg-dark-card-bg border-2 border-light-border dark:border-dark-border focus:outline-0 ps-4' onChange={(e)=>setEamil(e.target.value)}/>
      <button type='submit' className='py-2 rounded-md w-full dark:bg-dark-btn-bg bg-light-btn-bg border-2 dark:border-light-border border-dark-border focus:outline-0 ps-4 text-light-btn-txt dark:text-dark-btn-txt font-bold hover:opacity-90 transition cursor-pointer mt-6'>Send Reset Link</button>
       <Link to="/signup" className='font-semibold underline'>Go back</Link>
    </form>
      </div>
    </div>
  )
}

export default ForgotPassword