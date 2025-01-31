import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Layout'
import ErrorPage from './pages/ErrorPage'
import AllNotes from './pages/AllNotes'
import Tweets from './pages/Tweets'
import Videos from './pages/Videos'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<AllNotes />} />
          <Route path='tweets' element={<Tweets />} />
          <Route path='videos' element={<Videos />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
