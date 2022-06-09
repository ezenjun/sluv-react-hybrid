import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import KakaoRedirectHandler from '../pages/login/KakaoRedirectHandler'
import My from '../pages/my'
import NickName from '../pages/nickname'
import Scrap from '../pages/scrap'
import Search from '../pages/search'
import SelectCeleb from '../pages/selectCeleb'
import SignUp from '../pages/signup'
import WebViewCheck from '../WebViewCheck';

export default function Pages() {
  return (
    <Routes>
      <Route path='/' element={<WebViewCheck/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path="/auth/kakao-login" element={<KakaoRedirectHandler/>} />
      <Route path="/signup" element={<SignUp/>}>
        <Route path='/signup/select' element={<SelectCeleb/>} />
        <Route path='/signup/nickname' element={<NickName />} />
      </Route>
      <Route path='/home' element={<Home/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/scrap' element={<Scrap/>} />
      <Route path='/my' element={<My/>} />
    </Routes>
  )
}
