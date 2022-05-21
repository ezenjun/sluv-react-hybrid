import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { palette } from '../styles/palette';

export default function BottomNav() {
  return (
    <BottomNavWrap openStatus={true}>
      <Link to='/home'>
        <BottomNavItem>
          홈
        </BottomNavItem>
      </Link>
      <Link to='/search'>
        <BottomNavItem>
          검색
        </BottomNavItem>
      </Link>
      <Link to='/search'>
        <BottomNavItem>
          검색
        </BottomNavItem>
      </Link>
      <Link to='/search'>
        <BottomNavItem>
          검색
        </BottomNavItem>
      </Link>
      <Link to='/search'>
        <BottomNavItem>
          검색
        </BottomNavItem>
      </Link>

    </BottomNavWrap>
  )
}

const BottomNavWrap = styled.div`
  z-index:50;
  position: fixed;
  bottom:0;
  left: 0;
  right: 0;

  border-top: 0.0625rem solid #e2e2e2;

  /* 세부 디자인 추후 수정 */
  height: 2.9063rem;
  padding: 0 2.8125rem;
  background-color: ${palette.white.primary};
  bottom : ${props => props.openStatus ? '0' : '-2.9063rem'};
  display: ${props => props.openStatus ? 'flex' : 'none'};
  justify-content: space-between;
  transition: bottom 300ms ease-in-out;
`;

const BottomNavItem = styled.div`
  /* 세부 디자인 추후 수정 */
  width:3.125rem;
  height: 100%;
  text-align:center;

  border: 1px red solid;
`;

