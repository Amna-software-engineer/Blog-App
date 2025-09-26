import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const UserLayout = ({searchQuery,setSearchQuery}) => {
  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <Outlet/> 
      <Footer/>
    </>
  )
}

export default UserLayout