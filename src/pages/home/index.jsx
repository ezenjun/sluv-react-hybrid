import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/Logo/LogoHome.svg';
import { ReactComponent as Notice } from '../../assets/Icons/alarm.svg';
import { ReactComponent as NoNotice } from '../../assets/Icons/noNotice.svg';
import { ReactComponent as IconUploadItem } from '../../assets/Icons/bottom_nav_upload_item.svg';
import { ReactComponent as IconUploadQuestion } from '../../assets/Icons/bottom_nav_upload_question.svg';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BottomNavState, UploadPopupState } from '../../recoil/BottomNav';
import { PopUpModal } from '../../components/PopUp/PopUpModal';
import { FavoriteCelebListState, UserFavoriteCelebIdxListState } from '../../recoil/Celebrity';
import { customApiClient } from '../../utils/apiClient';
import { checkMobile } from '../../App';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';

export default function Home() {
	const navigate = useNavigate();
	const location = useLocation();
	const [tabIndex, setTabIndex] = useState(1);
	const [noticeState, setNoticeState] = useState(false);

	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [uploadPopupStatus, setUploadPopupStatus] = useRecoilState(UploadPopupState);
	const [favoriteCelebList, setFavoriteCelebList] = useRecoilState(FavoriteCelebListState);

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const tabList = [
		{
			idx: 1,
			name: '맞춤',
			to: '',
			path: '/home',
		},
		{
			idx: 2,
			name: '팔로잉',
			to: 'follow',
			path: '/home/follow',
		},
		{
			idx: 3,
			name: '질문',
			to: 'question',
			path: '/home/question',
		},
		{
			idx: 4,
			name: '이벤트',
			to: 'event',
			path: '/home/event',
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
		postFcmToken();
		// 관심셀럽 조회 API 호출
		if (favoriteCelebList.length < 1) {
			getFavoriteCeleb();
		}
	}, []);

	const postFcmToken = async () => {
		const userPlatform = checkMobile();
		let platform = '';

		//fcm token
		if (!localStorage.getItem('isFcmLoad') || localStorage.getItem('isFcmLoad') != 'deactive') {
			localStorage.setItem('isFcmLoad', 'deactive');

			if (userPlatform == 'android') {
				platform = 'AOS';

				//splash close 함수 호출
				try {
					window.android.closeSplash();
				} catch (err) {
					console.log(err);
				}

				//업데이트되기전까지는 이 로직 사용 -> 업데이트 되고나서는 밑에 로직 사용
				let tokenTest = localStorage.getItem('fcmToken');
				if (tokenTest == undefined || tokenTest == 'undefined' || tokenTest.length == 0)
					tokenTest = null;
				if (!tokenTest) {
					//fcm token 가져오기 함수
					try {
						const deviceToken = await window.android.getFcmToken();
						localStorage.setItem('fcmToken', deviceToken);
					} catch (err) {
						console.log(err);
					}
				}
			} else if (userPlatform == 'ios') {
				platform = 'IOS';

				//splash close 함수 호출
				try {
					window.webkit.messageHandlers.closeSplash.postMessage('hihi');
				} catch (err) {
					console.log(err);
				}

				//fcm token 가져오기 함수
				try {
					window.webkit.messageHandlers.getFcmToken.postMessage('hihi');
				} catch (err) {
					console.log(err);
				}
			} else {
				platform = 'WEB';
				localStorage.setItem('fcmToken', null);
			}

			setTimeout(() => {
				let fcmToken = localStorage.getItem('fcmToken');

				if (
					!fcmToken ||
					fcmToken == 'null' ||
					fcmToken == undefined ||
					fcmToken == 'undefined' ||
					fcmToken.length == 0
				)
					fcmToken = null;

				//fcm 등록
				const data = customApiClient('patch', '/users/fcm', {
					fcmToken: fcmToken,
					platform: platform,
					type: 'UPDATE',
				});
			}, 3000);
		}
	};

	const getFavoriteCeleb = async () => {
		const data = await customApiClient('get', '/interest');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('ggetFavoriteCeleb', data.result);
		setFavoriteCelebList(data.result);
	};
	const scrolltoTop = () => {
		window.scrollTo(0, 0);
	};

	const onClickUploadQuestion = () => {
		setUploadPopupStatus(false);
		setToastMessageBottomPosition('4rem');
		setToastMessage('준비 중이에요. 조금만 기다려주세요!');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);

		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	};

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
								selected={location.pathname === item.path}
							>
								<Tab selected={location.pathname === item.path}>{item.name}</Tab>
							</StyledLink>
						);
					})}
				</TabContainer>
				<FeedContainer>
					<Outlet scrolltoTop={scrolltoTop} />
				</FeedContainer>

				{/* 업로드 팝업 모달 */}
				<UploadPopupWrap openStatus={uploadPopupStatus}>
					<UploadPopup>
						<div
							onClick={() => navigate('/upload/item')}
							className="uploadPopupBtn topBtn"
						>
							<IconUploadItem
								style={{
									width: '1.125rem',
									height: '1.125rem',
									marginRight: '0.5rem',
								}}
							/>
							<span>정보 공유하기</span>
						</div>
						<div onClick={onClickUploadQuestion} className="uploadPopupBtn bottomBtn">
							<IconUploadQuestion
								style={{
									width: '1.125rem',
									height: '1.125rem',
									marginRight: '0.5rem',
								}}
							/>
							<span>질문 올리기</span>
						</div>
						<div
							style={{
								width: '20px',
								height: '20px',
								backgroundColor: '#9e30f4',
								position: 'absolute',
								left: '50%',
								transform: 'translate(-50%,0)',
								bottom: '-10px',
								borderRadius: '50%',
							}}
						></div>
					</UploadPopup>
				</UploadPopupWrap>
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
	padding: 0 0 20px 0;
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

export const UploadPopupWrap = styled.div`
	display: ${props => (props.openStatus ? 'block' : 'none')};
	z-index: 100000;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 3.125rem;

	background-color: rgba(0, 0, 0, 0.7);
`;

export const UploadPopup = styled.div`
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
	width: 11.0625rem;
	bottom: 1.125rem;
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	background-color: #9e30f4;
	border-radius: 16px;

	.uploadPopupBtn {
		padding: 1.25rem;
		display: flex;
		align-items: center;
	}
	.topBtn {
		border-bottom: 1px solid rgba(235, 235, 235, 0.3);
	}
`;
