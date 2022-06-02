import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

export default function SignUp() {
  return (
    <>
        <Header />
        <SignUpContainer >
          <Outlet/>
        </SignUpContainer >
    </>
    
  )
}

const Header = styled.div`
    height: 60px;
    border-bottom: 2px solid black;
`
const SignUpContainer = styled.div`
    padding: 30px;
    display: flex;
    height: 85%;
    flex-direction: column;
    justify-content: space-between;
`