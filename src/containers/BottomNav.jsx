import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { BottomNavState, UploadPopupState } from '../recoil/BottomNav';
import { useLocation } from 'react-router-dom';

import icon_home_selected from '../assets/Icons/bottom_nav_home_selected.svg';
import icon_search_selected from '../assets/Icons/bottom_nav_search_selected.svg';
import icon_binder_selected from '../assets/Icons/bottom_nav_binder_selected.svg';
import icon_my_selected from '../assets/Icons/bottom_nav_my_selected.svg';

import icon_home from '../assets/Icons/bottom_nav_home.svg';
import icon_search from '../assets/Icons/bottom_nav_search.svg';
import icon_binder from '../assets/Icons/bottom_nav_binder.svg';
import icon_my from '../assets/Icons/bottom_nav_my.svg';
import { ReactComponent as IconUpload } from '../assets/Icons/bottom_nav_upload.svg';
import { ReactComponent as IconUploadSelected } from '../assets/Icons/bottom_nav_upload_selected.svg';

import { palette } from '../styles/palette';

export default function BottomNav() {
	const location = useLocation();

	const [iconHome, setIconHome] = useState(false);
	const [iconSearch, setIconSearch] = useState(false);
	const [iconUpload, setIconUpload] = useState(false);
	const [iconBinder, setIconBinder] = useState(false);
	const [iconMy, setIconMy] = useState(false);

	const bottomNavStatus = useRecoilValue(BottomNavState);
	const [uploadPopupStatus, setUploadPopupStatus] = useRecoilState(UploadPopupState);

	useEffect(() => {
		switch (location.pathname) {
			case '/home':
				setIconHome(true);
				setIconSearch(false);
				setIconBinder(false);
				setIconMy(false);
				break;
			case '/search':
				setIconHome(false);
				setIconSearch(true);
				setIconBinder(false);
				setIconMy(false);
				break;
			case '/binder':
				setIconHome(false);
				setIconSearch(false);
				setIconBinder(true);
				setIconMy(false);
				break;
			case '/users/:id':
				setIconHome(false);
				setIconSearch(false);
				setIconBinder(false);
				setIconMy(true);
				break;
			default:
				break;
		}
	});

	const onClickUploadBtn = () => {
		if (!uploadPopupStatus) {
			setUploadPopupStatus(true);
		} else {
			setUploadPopupStatus(false);
		}
	};

	return (
		<BottomNavWrap openStatus={bottomNavStatus}>
			<Link style={{ flex: 1 }} to="/home">
				<BottomNavItem status={iconHome}>
					{iconHome ? (
						<BottomNavIcon src={icon_home_selected} />
					) : (
						<BottomNavIcon src={icon_home} />
					)}
					<div className="bottomNavItemText">홈</div>
				</BottomNavItem>
			</Link>
			<Link style={{ flex: 1 }} to="/search">
				<BottomNavItem status={iconSearch}>
					{iconSearch ? (
						<BottomNavIcon src={icon_search_selected} />
					) : (
						<BottomNavIcon src={icon_search} />
					)}
					<div className="bottomNavItemText">검색</div>
				</BottomNavItem>
			</Link>

			<BottomNavItem onClick={onClickUploadBtn} style={{ flex: 1 }}>
				<div
					style={{
						borderRadius: '50%',
						backgroundColor: '#9e30f4',
						width: '2.5rem',
						height: '2.5rem',
						margin: '0 auto',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{uploadPopupStatus ? (
						<IconUploadSelected style={{ width: '1.5rem', height: '1.5rem' }} />
					) : (
						<IconUpload style={{ width: '1.5rem', height: '1.5rem' }} />
					)}
				</div>
			</BottomNavItem>

			<Link style={{ flex: 1 }} to="/binder">
				<BottomNavItem status={iconBinder}>
					{iconBinder ? (
						<BottomNavIcon src={icon_binder_selected} />
					) : (
						<BottomNavIcon src={icon_binder} />
					)}
					<div className="bottomNavItemText">바인더</div>
				</BottomNavItem>
			</Link>
			<Link style={{ flex: 1 }} to="/users/:id">
				<BottomNavItem status={iconMy}>
					{iconMy ? (
						<BottomNavIcon src={icon_my_selected} />
					) : (
						<BottomNavIcon src={icon_my} />
					)}
					<div className="bottomNavItemText">마이</div>
				</BottomNavItem>
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
	text-align: center;
	padding-top: 0.375rem;

	.bottomNavItemText {
		color: ${props => (props.status ? '#9e30f4' : '#b1b1b1')};
		font-size: 0.625rem;
		font-weight: 600;
		margin-top: 0.0625rem;
	}
`;

const BottomNavIcon = styled.img`
	width: 1.5rem;
	height: 1.5rem;
`;
