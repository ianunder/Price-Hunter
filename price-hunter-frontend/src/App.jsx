import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'
import SearchResults from './components/SearchResults';
import ProductPage from './components/ProductPage'


const App = () => {



  return (
    <div>
       
        <Routes>

                <Route path="/" element={<HomePage/>}/>
                <Route path="/search/:searchTerm" element={<SearchResults/>}/>
                <Route path="/product/:ean" element={<ProductPage/>}/>
                <Route path="*" element={<HomePage />} />
                
        </Routes>
        
    </div>
  )
}

export default App