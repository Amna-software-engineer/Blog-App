import React from 'react'

const About = () => {
  return (
    <div className='w-full min-h-screen bg-light-card-bg dark:bg-dark-card-bg text-light-muted  px-4 md:px-8 py-12 dark:text-dark-muted'>
      <div className='w-full max-w-4xl mx-auto'>
        <h1 className='font-bold text-3xl dark:text-dark-btn-bg text-light-btn-bg text-center'>
          About BlogNest
        </h1>
        <p className='text-lg text-center my-4'>
          Empowering developers with practical knowledge, deep dives, and a
          supportive learning community.
        </p>
        <div className='flex justify-center items-center gap-20'>
          <div>
            <h1 className='font-bold text-3xl dark:text-dark-btn-bg text-light-btn-bg mb-4'>
              Our Mission
            </h1>
            <p className='md:max-w-[500px] text-lg'>
              BlogNest is buld for surious minds who want to madia nork
              developmed through terll world ssomples, clean design, and hands
              arl tuturials. Whe live you're just teeiting out or retming your
              skills. we're nere to guide you every step of the way.
            </p>
          </div>
          <img src='./bulb.png' alt='' className='max-w-[250px] mt-12 md:block hidden' />
        </div>
       <blockquote className='border-l-2 dark:border-dark-btn-bg border-light-btn-bg text-center mt-6 text-xl'>
        “Code with clarity, design with soul—every line you write shapes someone’s experience.”
       </blockquote>

   
      </div>
    </div>
  )
}

export default About
