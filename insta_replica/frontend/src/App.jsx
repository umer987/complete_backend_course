import React from 'react'
import {BrowserRouter as Router ,Routes , Route} from "react-router-dom"
import Create_post from './pages/Create_post'
import Feed from './pages/Feed'
function App() {
  return (
    <div>
      <Router>
      <Routes>
      <Route path='/' element={<Create_post/>} />
      <Route path='/feed' element={<Feed/>} />

      </Routes>
      </Router>
    </div>
  )
}

export default App
