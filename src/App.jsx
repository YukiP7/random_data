import React from "react"
import { BrowserRouter as Router , Route , Routes } from "react-router-dom"
import Random_user from './components/Random_user'
import Random_joke from './components/Random_joke' 
import CatList from './components/Cat-Listing/CatList'


function App() {
  return (
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Random_user/>}/>
            <Route path="/random-user" element = {<Random_user/>}/>
            <Route path="/random-joke" element={<Random_joke/>}/>
            <Route path="/cats-listing" element={<CatList/>}/>
          </Routes>
        </div>
      </Router>
  )
}

export default App
