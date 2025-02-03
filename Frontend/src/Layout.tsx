import { Outlet } from 'react-router-dom'
import Card from './components/Home/Card'
import Header from './components/Home/Header'
import Sidebar from './components/Sidebar'

const Layout = () => {
  return (
    <div className='flex w-screen min-h-screen bg-slate-300'>
      <Sidebar/>
      <div className='max-sm:w-full w-[75%]'>
         <Outlet/>
      </div>
    </div>
  )
}

export default Layout
