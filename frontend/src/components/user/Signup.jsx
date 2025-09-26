import React, { useState } from 'react'
import { useCreateUserMutation } from '../../services/InjectetdAuthApi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    userType: '',
    adminKey:''
  })
  const [response, setResponse] = useState()
  const [isAdminSigunp, setIsAdminSigunp] = useState(false)
  const navigate = useNavigate()
  const [CreateUser, { isLoading, isError, error }] = useCreateUserMutation() //return array having function nd one obj with filed isloading,isError,isSucces etc
  // console.log('useCreateUserMutation', useCreateUserMutation())

  const handleSubmit = async e => {
    e.preventDefault() //prevent pag reload while submitng a form
    try {
      console.log("formData ",formData);
      const ApiResponse = await CreateUser(formData).unwrap() //unwrap() show only success or error
      console.log('Success:', ApiResponse.msg)
      toast.success(ApiResponse.msg)
      navigate('/login')
    } catch (error) {
      console.log('Error from API:', error)
      setResponse(error)
      // navigate('/Signup')
    }
  }

  const handleChange=(e)=>{
    const{name,value}=e.target;
    console.log("e.atrget".at,e.target)
    
    setFormData({
      ...formData,
      [name]:value
    })
    if (name==="userType") {
      setIsAdminSigunp(value === "admin")//true if value is admin else false
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
          Create Account {isAdminSigunp && 'for Admin'}
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
          <div className='flex items-center justify-start gap-4 w-full'>
            <label htmlFor='Admin' className='flex items-center justify-start gap-2'>
               <input type='radio' value="admin" name='userType' id='admin' checked={formData.userType==="admin"}  onChange={handleChange}/> <span>Admin</span>
            </label>
            <label htmlFor='user'  className='flex items-center justify-start gap-2'>
               <input type='radio' value="user" name='userType' id='user' checked={formData.userType==="user"}  //will check only if formData.userType is "user" and uncheck admin btn 
               onChange={handleChange}/> <span>Normal User</span>
            </label>
          </div>
          {isAdminSigunp && (<input type='text' name='adminKey' placeholder='Enter Admin Secret Key' className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2' onChange={handleChange}/>)}
          <input
            type='text'
            name='firstName'
            placeholder='Enter your first name'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
            onChange={handleChange}
          />
          <input
            type='text'
            name='lastName'
            placeholder='Enter your last name'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
          onChange={handleChange}
          />
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
         onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
          onChange={handleChange}
          />
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            className='border-2 border-light-border dark:border-dark-border bg-light-card-bg dark:bg-dark-card-bg focus:outline-0 w-full rounded-md py-2 ps-2'
          onChange={handleChange}
          />

          <button
            type='submit'
            className='mt-6 w-full px-4 py-2 rounded-md font-bold cursor-pointer bg-light-btn-bg dark:bg-dark-btn-bg text-light-btn-txt dark:text-dark-btn-txt hover:opacity-90 transition'
          >
            Signup
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
