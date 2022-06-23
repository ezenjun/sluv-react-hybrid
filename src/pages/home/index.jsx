import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {

	useEffect(() => {
		// 하단바 띄워주기
		
	}, []);

	return (
		<>
			<MainContainer>
				<Header>
					<StyledLink to="">SLUV</StyledLink>
					<StyledLink to="../notice">알림</StyledLink>
				</Header>
				<TabContainer>
					<StyledLink to="">
						<Tab>맞춤</Tab>
					</StyledLink>
					<StyledLink to="follow">
						<Tab>팔로잉</Tab>
					</StyledLink>
					<StyledLink to="question">
						<Tab>질문</Tab>
					</StyledLink>
					<StyledLink to="event">
						<Tab>이벤트</Tab>
					</StyledLink>
				</TabContainer>
				<FeedContainer>
					<Outlet />
				</FeedContainer>
			</MainContainer>
		</>
	);
}

const MainContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	padding: 1rem;
`;

const Header = styled.div`
	display: flex;
	height: 60px;
	background-color: pink;
	justify-content: space-between;
	align-items: center;
`;
const TabContainer = styled.div`
	display: flex;
	height: 50px;
	background-color: skyblue;
	align-items: center;
`;

const Tab = styled.h4`
	margin-right: 20px;
	text-decoration: none;
	color: white;
	font-weight: bold;
`;

const FeedContainer = styled.div`
	height: 100vh;
	border: 1px solid black;
	background-color: orange;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;
