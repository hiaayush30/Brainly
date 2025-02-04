import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { Analytics } from "@vercel/analytics/react"
const Layout = () => {
  return (
    <div className='flex w-screen min-h-screen bg-slate-300'>
      <Sidebar/>
      <div className='max-sm:w-full w-[75%]'>
         <Outlet/>
         <Analytics/>
      </div>
    </div>
  )
}

export default Layout
