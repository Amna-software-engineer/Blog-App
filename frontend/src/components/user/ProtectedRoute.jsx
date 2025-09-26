import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useRefreshTokenMutation } from '../../services/InjectetdAuthApi'
import { checktokenExpiry } from '../../utils/auth'
import { toast } from 'react-toastify'
import Spinner from './Spinner'


const ProtectedRoute = ({ children, requireAdmin }) => {
  const [isValid, setisValid] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(null)
  const accessToken = localStorage.getItem('accessToken');
  const [refreshToken, { isLoading, isError, error }] =
    useRefreshTokenMutation()
  // console.log("setisAuthorized in ProtectedRoute ",setIsAuthorized);
const varify = async () => {
      setisValid(null);
      const isExpired = checktokenExpiry() //return true if accesstoken expired
      console.log('isExpired ', isExpired)

      if (isExpired === true) {
        //if accesstoken expired then set new accesstoken
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
            localStorage.setItem('accessToken', response.accessToken);
            const decoded = jwtDecode(response.accessToken)
            requireAdmin ? setisValid(decoded?.isAdmin === true) : setisValid(true)
            console.log('Api Response ', response.msg, response, isValid,decoded)
          } catch (error) {
            console.log('Error from Api: ', error)
            toast.error(error?.data?.errs?.map(err => err))
          }
        } else {//refreshtoken expired
          setisValid(null)
          console.log('isExpired inside refreshtoken expired  block', isExpired)
        }
      } else if (isExpired === false) {//if token doesnot exist
        setisValid(null);
        console.log('isExpired inside if token doesnot exist block', isValid)
      } else {
        //if accesstoken not expired
        const accesstoken = localStorage.getItem('accessToken')
        const decoded = jwtDecode(accesstoken)
        if (requireAdmin) {
          console.log( 'isExpired inside if accesstoken not expired block,isadmin block,decoded', isValid,decoded?.isAdmin,decoded )
          setisValid(decoded?.isAdmin === true)
        } else {
          setisValid(true)
        }
        console.log( 'isExpired inside if accesstoken not expired block', isValid )
      }
    }
  useEffect(() => {
    varify()
  }, [accessToken])

  if (isValid === null) return <Spinner />

  return isValid ? children : <Navigate to='/login' />
}

export default ProtectedRoute;          









// const ProtectedRoute = ({ children, requireAdmin = false }) => {
//   const [isValid, setIsValid] = useState(null)
//   const [refreshTokenApi] = useRefreshTokenMutation()

//   const verifyTokens = async () => {
//     setIsValid(null)

//     const isExpired = checktokenExpiry() // true = expired, false = valid, "404" = not found

//     if (isExpired === true) {
//       // access token expired → check refresh token
//       const refreshToken = localStorage.getItem('refreshToken')
//       if (!refreshToken) {
//         return setIsValid(false)
//       }

//       const decodedRefresh = jwtDecode(refreshToken)
//       const currentTime = Date.now() / 1000

//       if (currentTime < decodedRefresh.exp) {
//         // refresh token still valid
//         try {
//           const response = await refreshTokenApi(refreshToken).unwrap()
//           localStorage.setItem('accessToken', response.accessToken)
//           console.log(response?.msg)

//           const decodedAccess = jwtDecode(response.accessToken)
//           requireAdmin
//             ? setIsValid(decodedAccess?.isAdmin === true)
//             : setIsValid(true)
//           // if (requireAdmin) {
//           //   setIsValid(decodedAccess?.isAdmin === true);
//           // } else {

//           // }
//         } catch (err) {
//           toast.error(err?.data?.errs?.join(', ') || 'Session expired!')
//           setIsValid(false)
//         }
//       } else {
//         // refresh token expired too
//         setIsValid(false)
//       }
//     } else if (isExpired === '404') {
//       // no token found
//       setIsValid(false)
//     } else {
//       // access token still valid
//       const accessToken = localStorage.getItem('accessToken')
//       const decodedAccess = jwtDecode(accessToken)
//       requireAdmin
//         ? setIsValid(decodedAccess?.isAdmin === true)
//         : setIsValid(true)
//       // if (requireAdmin) {
//       //   setIsValid(decodedAccess?.isAdmin === true)
//       // } else {
//       //   setIsValid(true)
//       // }
//     }
//   }

//   useEffect(() => {
//     verifyTokens()
//   }, [])

//   if (isValid === null) return <Spinner />

//   return isValid ? children : <Navigate to='/login' />
// }

// export default ProtectedRoute
