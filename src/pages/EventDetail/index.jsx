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
import { PurpleButton } from '../../components/Buttons/PurpleButton';

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
				<Image src={firstimg}></Image>
				<Image src={secondimg}></Image>
				<Image src={thirdimg}></Image>
				<Image src={fourthimg}></Image>
				<div style={{ padding: '0 1.25rem', marginTop: '0.75rem' }}>
					<a
						href="https://www.instagram.com/sluv_official/"
						style={{
							textDecoration: 'none',
						}}
					>
						<PurpleButton>스럽 인스타그램 바로가기</PurpleButton>
					</a>
				</div>
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
const Image = styled.div`
	width: 100%;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	margin-bottom: 1.25rem;
	:after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`;
