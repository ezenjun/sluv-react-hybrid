import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Binder from '../pages/binder'
import FindEmail from '../pages/login/FindEmail'
import FindPassword from '../pages/login/FindPassword'
import Home from '../pages/home'
import LocalLogin from '../pages/login/LocalLogin'
import Login from '../pages/login'
import KakaoRedirectHandler from '../pages/login/KakaoRedirectHandler'
import My from '../pages/my'
import RequestCeleb from '../pages/request'
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
      <Route path='/binder' element={<Binder/>} />
      <Route path='/my' element={<My/>} />
    </Routes>
  )
}
