import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { Analytics } from "@vercel/analytics/react"
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import AddContent from './popup/AddContent'
import ChatBot from './popup/ChatBot'

const Layout = () => {
  const { openAddContent } = useSelector((state: RootState) => state.service);
  return (
    <div className='flex w-full min-h-screen bg-slate-300'>
      <ChatBot />
      <Sidebar />
      <div className='max-sm:w-full w-[75%] max-sm:pb-15'>
        <Outlet />
        <Analytics />
      </div>
      {openAddContent && <AddContent />}
    </div>
  )
}

export default Layout
