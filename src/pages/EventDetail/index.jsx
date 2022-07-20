import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';

import { BottomNavState } from '../../recoil/BottomNav';
import firstimg from '../../assets/Event/0.png';
import secondimg from '../../assets/Event/1.png';
import thirdimg from '../../assets/Event/2.png';
import fourthimg from '../../assets/Event/3.png';

export default function EventDetail() {
	const navigate = useNavigate();
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const location = useLocation();
	const EventName = location.state.eventName;
	const backClick = () => {
		navigate(-1);
	};
	useEffect(() => {
		setBottomNavStatus(false);
	});
	return (
		<MainContainer padding="0" margin="0">
			<TopNav>
				<BackButton onClick={backClick} />
				<div style={{ fontSize: '1.125rem' }} className="centerText">
					{EventName}
				</div>
			</TopNav>
			<FeedContainer>
				<img
					style={{
						width: '100%',
						height: '23.4375rem',
						marginBottom: '8px',
					}}
					src={firstimg}
					alt="first"
				></img>
				<img
					style={{
						width: '100%',
						height: '23.4375rem',
						marginBottom: '8px',
					}}
					src={secondimg}
					alt="first"
				></img>
				<img
					style={{
						width: '100%',
						height: '23.4375rem',
						marginBottom: '8px',
					}}
					src={thirdimg}
					alt="first"
				></img>
				<img
					style={{
						width: '100%',
						height: '23.4375rem',
						marginBottom: '8px',
					}}
					src={fourthimg}
					alt="first"
				></img>
			</FeedContainer>
		</MainContainer>
	);
}

const FeedContainer = styled.div`
	height: 100vh;
	margin: 0;
	padding: 0 0 2.5rem 0;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	svg > rect {
		width: 100%;
	}
`;
