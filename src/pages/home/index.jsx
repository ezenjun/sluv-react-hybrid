import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/Logo/LogoHome.svg';
import { ReactComponent as Alarm } from '../../assets/Icons/alarm.svg';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';

export default function Home() {
	const [tabIndex, setTabIndex] = useState(1);
	const toggleTab = idx => {
		setTabIndex(idx);
		console.log(tabIndex);
	};
	useEffect(() => {
		// 하단바 띄워주기
	}, []);

	return (
		<>
			<MainContainer>
				<TopNav style={{ justifyContent: 'space-between' }}>
					<LogoWrap to="">
						<Logo />
					</LogoWrap>
					<NavRight to="../notice">
						<Alarm />
					</NavRight>
				</TopNav>
				<TabContainer>
					<StyledLink
						to=""
						margin="0 20px 0 0"
						borderbottom={tabIndex === 1 ? '2px solid #262626' : ''}
						onClick={() => toggleTab(1)}
					>
						<Tab color={tabIndex === 1 ? '#262626' : ''}>맞춤</Tab>
					</StyledLink>
					<StyledLink
						to="follow"
						margin="0 20px 0 0"
						borderbottom={tabIndex === 2 ? '2px solid #262626' : ''}
						onClick={() => toggleTab(2)}
					>
						<Tab color={tabIndex === 1 ? '#262626' : ''}>팔로잉</Tab>
					</StyledLink>
					<StyledLink
						to="question"
						margin="0 20px 0 0"
						borderbottom={tabIndex === 3 ? '2px solid #262626' : ''}
						onClick={() => toggleTab(3)}
					>
						<Tab color={tabIndex === 1 ? '#262626' : ''}>질문</Tab>
					</StyledLink>
					<StyledLink
						to="event"
						margin="0 20px 0 0"
						borderbottom={tabIndex === 4 ? '2px solid #262626' : ''}
						onClick={() => toggleTab(4)}
					>
						<Tab color={tabIndex === 1 ? '#262626' : ''}>이벤트</Tab>
					</StyledLink>
				</TabContainer>
				<FeedContainer>
					<Outlet />
				</FeedContainer>
			</MainContainer>
		</>
	);
}

const LogoWrap = styled(Link)`
	display: flex;
`;

const NavRight = styled(Link)`
	display: flex;
	justify-content: flex-end;
`;
const TabContainer = styled.div`
	display: flex;
	padding: 0.6875rem 1.25rem 0 1.25rem;
`;

const Tab = styled.div`
	box-sizing: border-box;
	color: ${props => props.color || '#8d8d8d'};
	margin-bottom: 0.6875rem;
	font-size: 1.125rem;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: normal;
	text-align: left;
`;

const FeedContainer = styled.div`
	height: 100vh;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;

const StyledLink = styled(Link)`
	margin: 0;
	padding: 0;
	text-decoration: none;
	color: ${props => props.margin || '#8d8d8d'};
	margin: ${props => props.margin || '0'};
	border-bottom: ${props => props.borderbottom || 'none'};
`;
