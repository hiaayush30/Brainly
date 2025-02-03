import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate=useNavigate();
  return (
    <div className='bg-slate-200 min-h-screen '>
      <h1 className='text-4xl'
      >Brainly</h1>
      <button className='bg-blue-600 rounded-md p-1 m-2' onClick={()=>navigate('/signup')}>Signup</button>
      <button className='bg-blue-600 rounded-md p-1 m-2' onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}

export default Landing
