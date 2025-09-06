import React from 'react'

const Spinner = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='h-18 w-18 rounded-full border-3 border-b-dark-bg border-transparent animate-spin'></div>
    </div>
  )
}

export default Spinner;