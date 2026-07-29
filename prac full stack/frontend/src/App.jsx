import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'  // ← Changed: Router → Routes
import Create from './pages/Create'
import Feed from './pages/Feed'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>  {/* ← Changed: Router → Routes */}
          <Route path='/' element={<Create />} />
          <Route path='/feed' element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App