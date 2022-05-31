import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import KakaoRedirectHandler from '../pages/login/KakaoRedirectHandler'
import My from '../pages/my'
import Scrap from '../pages/scrap'
import Search from '../pages/search'

export default function Pages() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/scrap' element={<Scrap/>} />
      <Route path='/my' element={<My/>} />
      <Route path="/auth/kakao/callback" element={<KakaoRedirectHandler/>} />
    </Routes>
  )
}
