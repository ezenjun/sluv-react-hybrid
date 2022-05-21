import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Search from '../pages/search'

export default function Pages() {
  return (
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/search' element={<Search/>} />
    </Routes>
  )
}
