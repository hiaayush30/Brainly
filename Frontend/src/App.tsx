import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import ErrorPage from './pages/ErrorPage'
import AllNotes from './pages/protected/AllNotes'
import Tweets from './pages/protected/Tweets'
import Videos from './pages/protected/Videos'
import Links from './pages/protected/Links'
import Documents from './pages/protected/Documents'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useEffect } from 'react'
import Landing from './pages/Landing'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { addMeInfo } from './redux/features/service/serviceSlice'
import Collections from './pages/protected/Collections'
import Folder from './pages/protected/Folder'
import AddToCollection from './pages/protected/AddToCollection'
import {ToastContainer} from 'react-toastify'

const App = () => {
  const { me } = useSelector((state: RootState) => state.service)
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      const url = import.meta.env.VITE_BE_DOMAIN + "me";
      try {
        const response = await axios.get(url, {
          headers: {
            'authorization': token
          },
          withCredentials: true
        });
        dispatch(addMeInfo(response.data.user.username))
      } catch (error) {
        console.log("Auth check failed:", error);
      }
    };
    checkAuth();
  }, [dispatch]);
  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        {me ? <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<AllNotes />} />
            <Route path='tweets' element={<Tweets />} />
            <Route path='videos' element={<Videos />} />
            <Route path='links' element={<Links />} />
            <Route path='documents' element={<Documents />} />
            <Route path='collections' element={<Collections />} />
            <Route path='collections/:collectionId' element={<Folder />} />
            <Route path='add/:contentId' element={<AddToCollection />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes> : <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Landing />} />
        </Routes>}
      </BrowserRouter>
    </>
  )
}

export default App
