import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/Logo/LogoHome.svg';
import { ReactComponent as Notice } from '../../assets/Icons/alarm.svg';
import { ReactComponent as NoNotice } from '../../assets/Icons/noNotice.svg';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { useSetRecoilState } from 'recoil';
import { BottomNavState } from '../../recoil/BottomNav';

export default function Home() {
	const [tabIndex, setTabIndex] = useState(1);
	const [noticeState, setNoticeState] = useState(false);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const tabList = [
		{
			idx: 1,
			name: '맞춤',
			to: '',
		},
		{
			idx: 2,
			name: '팔로잉',
			to: 'follow',
		},
		{
			idx: 3,
			name: '질문',
			to: 'question',
		},
		{
			idx: 4,
			name: '이벤트',
			to: 'event',
		},
	];
	const [selectedTab, setSelectedTab] = useState(1);
	const onClickTab = (idx, name) => {
		setSelectedTab(idx);
	};
	const toggleTab = idx => {
		setTabIndex(idx);
		console.log(tabIndex);
	};
	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(true);
	}, []);

	return (
		<>
			<MainContainer padding="0 0 1.25rem 0">
				<TopNav style={{ justifyContent: 'space-between' }}>
					<LogoWrap to="">
						<Logo style={{ width: '3.75rem', height: '1.4375rem' }} />
					</LogoWrap>
					<NavRight to="../notice">{noticeState ? <Notice /> : <NoNotice />}</NavRight>
				</TopNav>
				<TabContainer>
					{tabList.map(item => {
						return (
							<StyledLink
								to={item.to}
								key={item.idx}
								onClick={() => onClickTab(item.idx, item.name)}
								selected={selectedTab === item.idx}
							>
								<Tab selected={selectedTab === item.idx}>{item.name}</Tab>
							</StyledLink>
						);
					})}
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
	color: ${props => (props.selected ? '#262626' : '#8d8d8d')};
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
	margin: 0 20px 0 0;
	border-bottom: ${props => (props.selected ? '2px solid #262626' : 'none')};
`;
