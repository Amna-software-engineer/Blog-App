import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Spinner from './Spinner'

const ProtectedRoute = ({ children, requireAdmin }) => {
  const [isValid, setIsValid] = useState(null)
  const accessToken = localStorage.getItem('accessToken')

  const verify = () => {
    if (!accessToken) {
      setIsValid(false) // token doesnot exist
      return
    }

      const decoded = jwtDecode(accessToken)
    
      // token valid
      if (requireAdmin) {
        setIsValid(decoded?.isAdmin === true)
      } else {
        setIsValid(true)
      }
   
  }

  useEffect(() => {
    console.log('ProtectedRoute Called')
    verify()
  }, [accessToken, requireAdmin])

  if (isValid === null) return <Spinner />

  return isValid ? children : <Navigate to='/login' />
}

export default ProtectedRoute
