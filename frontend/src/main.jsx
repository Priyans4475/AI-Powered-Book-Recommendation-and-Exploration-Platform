import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home.jsx"
import Recommend from "./pages/Recommend.jsx"
import Details from "./pages/Details.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  </BrowserRouter>
)
