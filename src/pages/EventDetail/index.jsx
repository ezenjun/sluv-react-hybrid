import React from 'react';
import styled from 'styled-components';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as DemoDay1 } from '../../assets/Event/DemoDay_1.svg';
import { ReactComponent as DemoDay2 } from '../../assets/Event/DemoDay_2.svg';
import { ReactComponent as DemoDay3 } from '../../assets/Event/DemoDay_3.svg';
import { ReactComponent as DemoDay4 } from '../../assets/Event/DemoDay_4.svg';

export default function EventDetail() {
	const navigate = useNavigate();
	const location = useLocation();
	const EventName = location.state.eventName;
	const backClick = () => {
		navigate(-1);
	};
	return (
		<MainContainer padding="0 0 0 0">
			<TopNav>
				<BackButton onClick={backClick} />
				<div style={{ fontSize: '1.125rem' }} className="centerText">
					{EventName}
				</div>
			</TopNav>
			<FeedContainer>
				<DemoDay1
					style={{
						width: '100%',
						height: '23.4375rem',
						marginBottom: '20px',
					}}
				></DemoDay1>
				<DemoDay2
					style={{
						width: '100%',
						height: '23.4375rem',
						marginBottom: '20px',
					}}
				></DemoDay2>
				<DemoDay3
					style={{
						width: '100%',
						height: '23.4375rem',
						marginBottom: '20px',
					}}
				></DemoDay3>
				<DemoDay4
					style={{
						width: '100%',
						height: '23.4375rem',
						marginBottom: '20px',
					}}
				></DemoDay4>
			</FeedContainer>
		</MainContainer>
	);
}

const FeedContainer = styled.div`
	height: 100vh;
	padding: 0 0 3.75rem 0;
	margin-top: 5px;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
