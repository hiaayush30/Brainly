import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { Analytics } from "@vercel/analytics/react"
const Layout = () => {
  return (
    <div className='flex w-full min-h-screen bg-slate-300'>
      <Sidebar/>
      <div className='max-sm:w-full w-[75%] max-sm:pb-15'>
         <Outlet/>
         <Analytics/>
      </div>
    </div>
  )
}

export default Layout
