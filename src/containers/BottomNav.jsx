import React from 'react'
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components'
import { BottomNavState } from '../recoil/BottomNav';

import { palette } from '../styles/palette';

export default function BottomNav() {
  const bottomNavStatus = useRecoilValue(BottomNavState);

  return (
		<BottomNavWrap openStatus={bottomNavStatus}>
			<Link style={{ flex: 1 }} to="/home">
				<BottomNavItem>홈</BottomNavItem>
			</Link>
			<Link style={{ flex: 1 }} to="/search">
				<BottomNavItem>검색</BottomNavItem>
			</Link>
			<Link style={{ flex: 1 }} to="/search">
				<BottomNavItem>+</BottomNavItem>
			</Link>
			<Link style={{ flex: 1 }} to="/binder">
				<BottomNavItem>바인더</BottomNavItem>
			</Link>
			<Link style={{ flex: 1 }} to="/my">
				<BottomNavItem>마이</BottomNavItem>
			</Link>
		</BottomNavWrap>
  );
}

const BottomNavWrap = styled.div`
	z-index: 50;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-top: 0.0625rem solid #ebebeb;
  height: 3.125rem;
	background-color: ${palette.white.primary};
	bottom: ${props => (props.openStatus ? '0' : '-2.9063rem')};
	display: ${props => (props.openStatus ? 'flex' : 'none')};
	transition: bottom 300ms ease-in-out;
`;

const BottomNavItem = styled.div`
  height: 100%;
  text-align:center;

  border: 1px red solid;
`;

