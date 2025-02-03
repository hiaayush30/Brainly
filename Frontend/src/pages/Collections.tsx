import React from 'react'
import AddFolder from '../components/icons/AddFolder'

const Collections = () => {
  return (
    <div className='w-full min-h-screen'>
      <h1 className='text-center text-2xl m-5 font-semibold'
      >Your Collections</h1>
      <p className='text-center'
      >Now you can create collections of related docs, tweets, links etc for better accessibility</p>
      <div className='grid md:grid:cols-2 grid-cols-1 lg:grid-cols-3 gap-5 '>
           <div className='hover:cursor-pointer rounded-md m-5 min-h-48 flex flex-col justify-center items-center'>
              <AddFolder color='none' height={80} width={50} className='hover:scale-110'/> 
              <div className=''>Add new Collection</div>
           </div>
      </div>
    </div>
  )
}

export default Collections