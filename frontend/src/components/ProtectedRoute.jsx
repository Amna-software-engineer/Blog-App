import React from 'react'
import { useState } from 'react'
import { checktokenExpiry } from '../utils/auth'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useRefreshTokenMutation } from '../services/InjectetdAuthApi'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

const ProtectedRoute = ({ children }) => {
  const [isValid, setisValid] = useState(null)
  const [refreshToken, { isLoading, isError, error }] =
    useRefreshTokenMutation()

  useEffect(() => {
    const varify = async () => {
      setisValid(null);
      const isExpired = checktokenExpiry() //return true if accesstoken exired
      console.log('isExpired ', isExpired)

      if (isExpired===true) { //if accesstoken expired then set new accesstoken
        console.log('isExpired inside token seeting block', isExpired)
        const refreshtoken =
          localStorage.getItem('refreshToken') &&
          localStorage.getItem('refreshToken')

        const decoded = jwtDecode(refreshtoken)
        const currentTime = Date.now() / 1000
        if (currentTime < decoded.exp) {
          //cheking if refresh token is not expired

          try {
            console.log('refreshtoken', refreshtoken)
            const response = await refreshToken(refreshtoken).unwrap()
            localStorage.setItem('accessToken', response.accessToken)
            console.log('Api Resonse ', response.msg)
            setisValid(true)
          } catch (error) {
            console.log("Error from Api: ",error);
            
            toast.error(error?.data?.errs)
          }
        } else {//refreshtoken expired
          setisValid(false)
          console.log('isExpired inside refreshtoken expired  block', isExpired)
        }
      } else if (isExpired === '404') { //if token doesnot exist
        setisValid(false);
        console.log( 'isExpired inside if token doesnot exist block', isValid )

      } else {//if accesstoken not expired
        setisValid(true)
        console.log( 'isExpired inside if accesstoken not expired block', isValid )
      }
    }
    varify()
  }, [])
  if (isValid === null) return <Spinner/>
  
  return isValid ? children : <Navigate to='/login' />
}

export default ProtectedRoute
