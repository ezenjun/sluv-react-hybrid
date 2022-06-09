import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FindEmail from '../pages/find/findemail'
import FindPassword from '../pages/find/findpassword'
import Home from '../pages/home'
import LocalLogin from '../pages/locallogin'
import Login from '../pages/login'
import KakaoRedirectHandler from '../pages/login/KakaoRedirectHandler'
import My from '../pages/my'
import NickName from '../pages/nickname'
import RequestCeleb from '../pages/request'
import Scrap from '../pages/scrap'
import Search from '../pages/search'
import SelectCeleb from '../pages/selectCeleb'
import SignUp from '../pages/signup'


export default function Pages() {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />

      <Route path="/auth/kakao-login" element={<KakaoRedirectHandler/>} />
      <Route path="/signup" element={<SignUp/>} />

      <Route path="/select/celebrity" element={<SelectCeleb/>} />

      <Route path="/request/celebrity" element={<RequestCeleb/>} />

      <Route path="/login" element={<LocalLogin/>} />
      <Route path="/find/email" element={<FindEmail/>} />
      <Route path="/find/password" element={<FindPassword/>} />

      <Route path='/home' element={<Home/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/scrap' element={<Scrap/>} />
      <Route path='/my' element={<My/>} />
    </Routes>
  )
}
