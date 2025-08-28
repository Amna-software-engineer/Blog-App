import { useNavigate } from 'react-router-dom'
import { checktokenExpiry } from '../utils/auth.js'
import Navbar from './Navbar.jsx'
const Home = () => {
 
  return (
    <>
      <Navbar />
      <h1>Welcome to home page</h1>
    </>
  )
}

export default Home
