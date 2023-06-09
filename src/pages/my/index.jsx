import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';

import { ReactComponent as Settings } from '../../assets/Icons/icon_setting.svg';
import { ReactComponent as ThreeDots } from '../../assets/Icons/icon_three_dots_row.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import { ReactComponent as IconUploadItem } from '../../assets/Icons/bottom_nav_upload_item.svg';
import { ReactComponent as IconUploadQuestion } from '../../assets/Icons/bottom_nav_upload_question.svg';
import { ReactComponent as IconArrowUp } from '../../assets/Icons/icon_arrow_up.svg';
import { ReactComponent as IconArrowDown } from '../../assets/Icons/icon_arrow_down.svg';
import { ReactComponent as UserBasicProfileImg } from '../../assets/Icons/user_basic_profile_img.svg';
import { ReactComponent as PlusButton } from '../../assets/Icons/plusButton.svg';
import { ReactComponent as PinkBinder } from '../../assets/Binder/PinkBinder.svg';
import { ReactComponent as YellowBinder } from '../../assets/Binder/YellowBinder.svg';
import { ReactComponent as GreenBinder } from '../../assets/Binder/GreenBinder.svg';
import { ReactComponent as BlueBinder } from '../../assets/Binder/BlueBinder.svg';
import { ContentWrap } from '../../components/containers/ContentWrap';
import {
	BottomDialogDiv,
	BottomDialogWrap,
	CloseWrap,
	BottomSlideMenu,
} from '../../components/containers/BottomSlideMenu';
import styled from 'styled-components';
import MyPageContainer from './MyPageContainer';
import ProfileContainer from './ProfileContainer';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BottomNavState, UploadPopupState } from '../../recoil/BottomNav';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { UploadPopup, UploadPopupWrap } from '../home';
import { customApiClient } from '../../utils/apiClient';
import { BackButton } from '../../components/Buttons/BackButton';
import Loading from '../../components/Loading';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import useGetUserPage from '../../hooks/myPage/useGetUserPage';
import useGetBinder from '../../hooks/binder/useGetBinder';

export default function My() {
	const { idx } = useParams();
	const navigate = useNavigate();

	const [isAuthUser, setIsAuthUser] = useState(-1);
	const [reportPopupStatus, setReportPopupStatus] = useState(false);
	const [isCelebOpen, setIsCelebOpen] = useState(false);
	const [celebList, setCelebList] = useState([]);
	const [uploadInfo, setUploadInfo] = useState({});
	const [userInfo, setUserInfo] = useState({});
	const [myUploadIsDibList, setMyUploadIsDibList] = useState([]);
	const [binderList, setBinderList] = useState([]);
	const [selectedItemIdx, setSelectedItemIdx] = useState(0);
	const [followStatus, setFollowStatus] = useState();

	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [uploadPopupStatus, setUploadPopupStatus] = useRecoilState(UploadPopupState);
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	// 특정 유저 페이지 조회 API 응답이 onSuccess일 때 호출되는 콜백 함수
	const onSuccessGetUserPage = data => {
		data.result.isMyPage === 'Y' ? setBottomNavStatus(true) : setBottomNavStatus(false);
		setIsAuthUser(data.result.isMyPage === 'Y' ? 1 : 0);
		setCelebList(data.result.userInfo.interestCelebList);
		setUserInfo(data.result.userInfo);
		setUploadInfo(data.result.uploadInfo);

		let tmp = [];
		for (let i = 0; i < data.result.uploadInfo.uploadItemList.length; i++) {
			if (data.result.uploadInfo.uploadItemList[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		if (data.result.userInfo.isFollow === 'Y') {
			setFollowStatus(true);
		} else {
			setFollowStatus(false);
		}
		setMyUploadIsDibList([...tmp]);
	};
	// 바인더 목록 조회 API 응답이 onSuccess일 때 호출되는 콜백 함수
	const onSuccessGetBinder = data => setBinderList(data.result);

	const { data: getUserPageData } = useGetUserPage(idx, { onSuccessGetUserPage });
	const { data: getBindersData } = useGetBinder({ onSuccessGetBinder });

	const onClickThreeDots = () => {
		setReportPopupStatus(!reportPopupStatus);
	};
	const onClickSettings = () => {
		navigate('/settings', {
			state: {
				nickName: userInfo.nickName,
				url: userInfo.profileImgUrl,
			},
		});
	};

	const getSelectedItemIdx = idx => {
		setSelectedItemIdx(idx);
	};
	const getMyUpLoadDibList = input => {
		setMyUploadIsDibList(input);
	};
	const onCreateBinder = itemIdx => {
		navigate('/binder/add', {
			state: { item: itemIdx },
		});
		setBottomMenuStatusState(false);
	};

	const onSelectBinder = (binderIdx, itemIdx) => {
		for (var i = 0; i < binderList.length; i++) {
			if (binderList[i].binderIdx === binderIdx) {
				if (itemIdx === selectedItemIdx) {
					addToBinderAPI(selectedItemIdx, binderIdx, binderList[i].name);
				}
			}
		}
	};
	async function addToBinderAPI(itemIdx, binderIdx, binderName) {
		const body = {
			itemIdx: itemIdx,
			binderIdx: binderIdx,
		};
		console.log(body);
		const Uri = '/dibs';
		const data = await customApiClient('post', Uri, body);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		var tmp = myUploadIsDibList;
		for (var i = 0; i < myUploadIsDibList.length; i++) {
			if (uploadInfo.uploadItemList[i]) {
				if (uploadInfo.uploadItemList[i].itemIdx === itemIdx) {
					tmp[i] = !tmp[i];
					setMyUploadIsDibList([...tmp]);
				}
			}
		}
		setBottomMenuStatusState(false);
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`아이템이 ${binderName} 바인더에 저장됐어요`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	}
	const onFollow = (e, userIdx) => {
		e.stopPropagation();
		FollowUser(userIdx);
	};
	const onUnFollow = (e, userIdx) => {
		e.stopPropagation();
		UnFollowUser(userIdx);
	};
	const FollowUser = async userIdx => {
		// 팔로우 버튼 클릭
		const data = await customApiClient('post', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setFollowStatus(true);
		// console.log('userRecommendList', userRecommendList);
	};
	const UnFollowUser = async userIdx => {
		// 팔로잉 버튼 클릭(언팔)
		const data = await customApiClient('delete', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setFollowStatus(false);
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
		<MainContainer>
			{/* {isAuthUser === -1 && (
				<div style={{ height: '5rem' }}>
					<Loading></Loading>
				</div>
			)} */}
			<TopNav>
				{isAuthUser === 1 && (
					<>
						<MainText style={{ fontSize: '1.125rem' }} className="centerText">
							마이페이지
						</MainText>
						<div style={{ flex: '1' }}></div>
						<Settings
							onClick={onClickSettings}
							style={{ width: '24px', height: '24px' }}
						/>
					</>
				)}
				{isAuthUser === 0 && (
					<>
						<BackButton onClick={() => navigate(-1)} />
						<MainText style={{ fontSize: '1.125rem' }} className="centerText">
							프로필
						</MainText>
						<div style={{ flex: '1' }}></div>
						<ThreeDots
							onClick={onClickThreeDots}
							style={{ width: '24px', height: '24px' }}
						/>
					</>
				)}
			</TopNav>
			{userInfo ? (
				<ContentWrap padding="0">
					<ProfileWrap>
						<ProfileContentsWrap>
							{userInfo.profileImgUrl ? (
								<ProfileImg
									className="userProfileImg"
									src={userInfo.profileImgUrl}
								/>
							) : (
								<UserBasicProfileImg className="userProfileImg" />
							)}

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<span className="userNickname">{userInfo.nickName}</span>
								<span className="userId">{userInfo.id}</span>
							</div>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									marginTop: '0.5rem',
									justifyContent: 'center',
								}}
							>
								<span
									onClick={() =>
										navigate(`/users/${userInfo.userIdx}/followings`)
									}
								>
									<span className="followTitle">팔로잉</span>
									<span className="followNum">{userInfo.followingCnt}</span>
								</span>
								<div
									style={{
										borderLeft: '1px solid #d9d9d9',
										height: '0.75rem',
										margin: '0 0.5rem',
									}}
								></div>
								<span
									onClick={() => navigate(`/users/${userInfo.userIdx}/followers`)}
								>
									<span className="followTitle">팔로워</span>
									<span className="followNum">{userInfo.followerCnt}</span>
								</span>
							</div>
							<div className="celebWrap">
								{celebList.slice(0, 3).map((celeb, index) => (
									<Chip key={index}>{celeb.celebName}</Chip>
								))}
								{celebList.length > 3 && (
									<div>
										{isCelebOpen ? (
											<IconArrowUp
												onClick={() => setIsCelebOpen(!isCelebOpen)}
												style={{ width: '1.75rem', height: '1.75rem' }}
											/>
										) : (
											<IconArrowDown
												onClick={() => setIsCelebOpen(!isCelebOpen)}
												style={{ width: '1.75rem', height: '1.75rem' }}
											/>
										)}
									</div>
								)}
							</div>
							<CelebFadeDiv openStatus={isCelebOpen}>
								{celebList.slice(3).map((celeb, index) => (
									<Chip key={index}>{celeb.celebName}</Chip>
								))}
							</CelebFadeDiv>

							{isAuthUser === 0 && (
								<>
									{followStatus ? (
										<FollowButton
											onClick={e => onUnFollow(e, userInfo.userIdx)}
											follow={followStatus}
										>
											팔로잉
										</FollowButton>
									) : (
										<FollowButton
											onClick={e => onFollow(e, userInfo.userIdx)}
											follow={followStatus}
										>
											팔로우
										</FollowButton>
									)}
								</>
							)}
						</ProfileContentsWrap>
					</ProfileWrap>

					{isAuthUser === 1 && (
						<MyPageContainer
							uploadInfo={uploadInfo}
							getSelectedItemIdx={getSelectedItemIdx}
							myUploadIsDibList={myUploadIsDibList}
							getMyUpLoadDibList={getMyUpLoadDibList}
							// myUploadIsDibList={myUploadIsDibList}
						/>
					)}
					{isAuthUser === 0 && (
						<ProfileContainer
							uploadInfo={uploadInfo}
							getSelectedItemIdx={getSelectedItemIdx}
							myUploadIsDibList={myUploadIsDibList}
							getMyUpLoadDibList={getMyUpLoadDibList}
						/>
					)}
				</ContentWrap>
			) : (
				<div style={{ height: '5rem' }}>
					<Loading></Loading>
				</div>
			)}

			{/* 아이템 바인더 추가용 bottomslideMenu */}
			<BottomSlideMenu>
				<RowWrap
					style={{ marginBottom: '0' }}
					onClick={() => onCreateBinder(selectedItemIdx)}
				>
					<ImageWrap>
						<PlusButton></PlusButton>
					</ImageWrap>
					<SubText fontsize="1rem" margin="0.9375rem 0">
						바인더 만들기
					</SubText>
				</RowWrap>
				<HorizontalLine
					style={{ marginLeft: '1.25rem', marginRight: '1.25rem' }}
				></HorizontalLine>
				<BinderOverflow>
					{binderList.map(binder => (
						<RowWrap
							key={binder.name}
							onClick={() => onSelectBinder(binder.binderIdx, selectedItemIdx)}
						>
							{binder.coverImgUrl ? (
								<ImageWrap src={binder.coverImgUrl}></ImageWrap>
							) : (
								<>
									{!binder.isBasic ? (
										<PinkBinder
											style={{
												width: '3.75rem',
												height: '3.75rem',
												marginRight: '1.25rem',
												borderRadius: '1rem',
											}}
										></PinkBinder>
									) : (
										<>
											{binder.binderIdx % 3 === 0 ? (
												<YellowBinder
													style={{
														width: '3.75rem',
														height: '3.75rem',
														marginRight: '1.25rem',
														borderRadius: '1rem',
													}}
												></YellowBinder>
											) : (
												<>
													{binder.binderIdx % 3 === 1 ? (
														<GreenBinder
															style={{
																width: '3.75rem',
																height: '3.75rem',
																marginRight: '1.25rem',
																borderRadius: '1rem',
															}}
														></GreenBinder>
													) : (
														<BlueBinder
															style={{
																width: '3.75rem',
																height: '3.75rem',
																marginRight: '1.25rem',
																borderRadius: '1rem',
															}}
														></BlueBinder>
													)}
												</>
											)}
										</>
									)}
								</>
							)}
							<SubText fontsize="1rem" margin="0.9375rem 0">
								{binder.name}
							</SubText>
							<SubText fontweight="normal" fontsize="1rem" color="#8d8d8d">
								&nbsp;({binder.dibCount})
							</SubText>
						</RowWrap>
					))}
				</BinderOverflow>
			</BottomSlideMenu>

			{/* 유저 신고하기 팝업  */}
			<BottomDialogWrap openStatus={reportPopupStatus}>
				<div
					onClick={() => setReportPopupStatus(false)}
					style={{ height: '100%', width: '100%' }}
				></div>
				<BottomDialogDiv openStatus={reportPopupStatus} style={{ minHeight: '5.5625rem' }}>
					<CloseWrap>
						<Close
							style={{
								width: '1.5rem',
								height: '1.5rem',
								position: 'absolute',
								right: '1.25rem',
							}}
							onClick={() => setReportPopupStatus(false)}
						></Close>
					</CloseWrap>
					<div
						onClick={() => navigate(`/report/user/${userInfo.userIdx}`)}
						style={{
							padding: '1.25rem',
							fontSize: '1rem',
							fontWeight: '600',
							color: '#262626',
						}}
					>
						'{userInfo.nickName}'님 신고하기
					</div>
				</BottomDialogDiv>
			</BottomDialogWrap>

			<UploadPopupWrap
				onClick={() => setUploadPopupStatus(false)}
				openStatus={uploadPopupStatus}
			>
				<UploadPopup>
					<div onClick={() => navigate('/upload/item')} className="uploadPopupBtn topBtn">
						<IconUploadItem
							style={{
								width: '1.125rem',
								height: '1.125rem',
								marginLeft: '0.375rem',
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
								marginLeft: '0.375rem',
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
	);
}

const ProfileWrap = styled.div`
	padding: 4.375rem 1rem 1.875rem;
	background-image: radial-gradient(circle at 40% 46%, #ff365e2b, rgba(255, 223, 229, 0) 100%),
		radial-gradient(circle at -276% -165%, #ff365e4b, rgba(255, 223, 229, 0) 87%); ;
`;

const ProfileContentsWrap = styled.div`
	background-color: #fff;
	border-radius: 16px;
	position: relative;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	padding: 3.25rem 1rem 1.625rem;

	.userProfileImg {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		position: absolute;
		background-position: 50%;
		background-repeat: no-repeat;
		top: -2.5rem;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.userNickname {
		margin-right: 0.25rem;
		font-size: 1rem;
		font-weight: bold;
		color: #262626;
	}
	.userId {
		font-size: 0.875rem;
		color: #8d8d8d;
	}
	.followTitle {
		font-size: 0.8125rem;
		color: #262626;
		margin-right: 0.25rem;
	}
	.followNum {
		font-size: 0.8125rem;
		font-weight: bold;
		color: #262626;
	}
	.celebWrap {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}
`;

const Chip = styled.div`
	display: inline-block;
	box-sizing: border-box;
	padding: 0.625rem 1rem;
	margin-right: 0.375rem;
	border-radius: 1.9rem;
	background-color: #fbf6ff;
	color: #9e30f4;
	font-size: 0.875rem;
	font-weight: 600;
`;

const CelebFadeDiv = styled.div`
	flex-wrap: wrap;
	margin-top: 0.625rem;
	justify-content: center;

	display: ${props => (props.openStatus ? 'flex' : 'none')};
	opacity: ${props => (props.openStatus ? '1' : '0')};
`;
const RowWrap = styled.div`
	display: flex;
	width: 100%;
	padding: 0 1.25rem;
	margin-bottom: 1rem;
	box-sizing: border-box;
	text-align: center;
	align-items: center;
`;
const ImageWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.75rem;
	height: 3.75rem;
	background: url(${props => props.src});
	background-position: 50%;
	background-size: cover;
	background-color: #f6f6f6;
	border-radius: 0.8125rem;
	margin-right: 1.25rem;
`;
const FollowButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	padding: 0.625rem 1rem;
	border-radius: 30.4px;
	border: solid 1px #9e30f4;
	height: 3rem;
	/* text-align: center; */
	margin-top: 0.75rem;
	background-color: ${props => (props.follow ? '#fff' : '#9e30f4')};
	color: ${props => (props.follow ? '#9e30f4' : '#fff')};
	font-weight: 600;
	position: relative;
	z-index: '900';
	box-sizing: border-box;
`;
const ProfileImg = styled.div`
	width: ${props => props.size || '1.375rem'};
	height: ${props => props.size || '1.375rem'};
	/* width: 1.375rem;
	height: 1.375rem; */
	border-radius: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	background-image: url(${props => props.src});
	margin-right: ${props => props.marginright || '0.5rem'}; ;
`;
const BinderOverflow = styled.div`
	max-height: 24.6875rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
