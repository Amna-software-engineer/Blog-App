import React from 'react'

const Spinner = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='h-5 w-5 rounded-full border-b-2 border-black animate-spin'></div>
    </div>
  )
}

export default Spinner