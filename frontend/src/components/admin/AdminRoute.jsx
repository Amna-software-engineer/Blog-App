import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import Spinner from '../user/Spinner'

const AdminRoute = ({ children,setIsAuthorized,isAuthorized }) => {
  // const [isAuthorized, setIsAuthorized] = useState(null);
        const accessToken = localStorage.getItem('accessToken')

 useEffect(() => {
    const checkAdminStatus = () => {
      if (!accessToken) {
        setIsAuthorized(false)
        return
      }
      try {
        const decoded = jwtDecode(accessToken)
        setIsAuthorized(decoded?.isAdmin === true);

      } catch (error) {
        console.error("Access token error:", error)
        setIsAuthorized(false)
      }
    }
    checkAdminStatus()
  }, [accessToken])


  console.log("isAuthorized ",isAuthorized);
  
  if ( isAuthorized === null) return <Spinner />;

  return isAuthorized ? children : <Navigate to='/login' />
}

export default AdminRoute
