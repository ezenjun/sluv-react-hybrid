import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';

import { ReactComponent as Settings } from '../../assets/Icons/icon_setting.svg';
import { ReactComponent as ThreeDots } from '../../assets/Icons/icon_three_dots_row.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import { ReactComponent as IconUploadItem } from '../../assets/Icons/bottom_nav_upload_item.svg';
import { ReactComponent as IconUploadQuestion } from '../../assets/Icons/bottom_nav_upload_question.svg';
import { ReactComponent as IconArrowUp } from '../../assets/Icons/icon_arrow_up.svg';
import { ReactComponent as IconArrowDown } from '../../assets/Icons/icon_arrow_down.svg';

import { ContentWrap } from '../../components/containers/ContentWrap';
import { BottomDialogDiv, BottomDialogWrap, CloseWrap } from '../../components/containers/BottomSlideMenu';
import styled from 'styled-components';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import MyPageContainer from './MyPageContainer';
import ProfileContainer from './ProfileContainer';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BottomNavState, UploadPopupState } from '../../recoil/BottomNav';
import { UploadPopup, UploadPopupWrap } from '../home';
import { customApiClient } from '../../utils/apiClient';
import { BackButton } from '../../components/Buttons/BackButton';

export default function My() {

  const { idx } = useParams();
	
  const navigate = useNavigate();

  const [isAuthUser, setIsAuthUser] = useState(false);
  const [reportPopupStatus, setReportPopupStatus] = useState(false);
	const [isCelebOpen, setIsCelebOpen] = useState(false);
	const [celebList, setCelebList] = useState([]);
	const [uploadInfo, setUploadInfo] = useState({});
	const [userInfo, setUserInfo] = useState({});
	const [isFollow, setIsFollow] = useState(false);

	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const uploadPopupStatus = useRecoilValue(UploadPopupState);
  
  useEffect(() => {
		getUserPageData(idx);
  },[]);

	const getUserPageData = async (userIdx) => {
		console.log('유저인덱스(path variable 늘 조심하자!!! : ', typeof userIdx, userIdx);

		const data = await customApiClient('get', `/users/${userIdx}/page`);

		if(!data) return;
		if(!data.isSuccess) return;

		data.result.isMyPage === 'Y' ? setBottomNavStatus(true) : setBottomNavStatus(false);
		setIsAuthUser(data.result.isMyPage === 'Y' ? true : false);
		setCelebList(data.result.userInfo.interestCelebList);
		setUserInfo(data.result.userInfo);
		setUploadInfo(data.result.uploadInfo);
		console.log(data);

	}

  const onClickThreeDots = () => {
    setReportPopupStatus(!reportPopupStatus);
  };
  const onClickSettings = () => {
    navigate('/settings');
  };

  return (
		<MainContainer>
			<TopNav>
				{isAuthUser ? (
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
				) : (
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

			<ContentWrap padding="0">
				<ProfileWrap>
					<ProfileContentsWrap>
						<img
							className="userProfileImg"
							src="https://sluv-actor-image-bucket.s3.ap-northeast-2.amazonaws.com/%EA%B9%80%EA%B3%A0%EC%9D%80/%EA%B9%80%EA%B3%A0%EC%9D%80.png"
							alt="유저 프로필 사진"
						/>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
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
							}}
						>
							<span className="followTitle">팔로잉</span>
							<span className="followNum">{userInfo.followingCnt}</span>
							<div
								style={{
									borderLeft: '1px solid #d9d9d9',
									height: '0.75rem',
									margin: '0 0.5rem',
								}}
							></div>
							<span className="followTitle">팔로워</span>
							<span className="followNum">{userInfo.followerCnt}</span>
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
											style={{ width: '2rem', height: '2rem' }}
										/>
									) : (
										<IconArrowDown
											onClick={() => setIsCelebOpen(!isCelebOpen)}
											style={{ width: '2rem', height: '2rem' }}
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

						{!isAuthUser && (
							<PurpleButton
								style={{ fontSize: '1rem', marginTop: '1rem' }}
								disabled={isFollow}
								marginBottom="0"
							>
								{isFollow ? '팔로우' : '팔로잉'}
							</PurpleButton>
						)}
					</ProfileContentsWrap>
				</ProfileWrap>

				{isAuthUser ? (
					<MyPageContainer uploadInfo={uploadInfo} />
				) : (
					<ProfileContainer uploadInfo={uploadInfo} />
				)}
			</ContentWrap>

			{/* 유저 신고하기 팝업  */}
			<BottomDialogWrap openStatus={reportPopupStatus}>
				<div
					onClick={() => setReportPopupStatus(false)}
					style={{ height: '100%', width: '100%' }}
				></div>
				<BottomDialogDiv>
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
				</BottomDialogDiv>
			</BottomDialogWrap>

			<UploadPopupWrap openStatus={uploadPopupStatus}>
				<UploadPopup>
					<div onClick={() => navigate('/upload/item')} className="uploadPopupBtn topBtn">
						<IconUploadItem
							style={{
								width: '1.125rem',
								height: '1.125rem',
								marginRight: '0.5rem',
							}}
						/>
						<span>정보 공유하기</span>
					</div>
					<div
						onClick={() => navigate('/upload/question')}
						className="uploadPopupBtn bottomBtn"
					>
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
  );
}

const ProfileWrap = styled.div`
	padding: 4.375rem 1rem 1.875rem;
	background-color: #ff365f;
`;

const ProfileContentsWrap = styled.div`
	background-color: #fff;
	border-radius: 16px;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3.25rem 1.25rem 1.625rem;

	.userProfileImg {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		position: absolute;
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
		flex-wrap: wrap;
	}
`;

const Chip = styled.div`
	display: inline-block;
	box-sizing: border-box;
	padding: 0.625rem 1rem;
	margin-right: 0.5rem;
	border-radius: 1.9rem;
	background-color: #fbf6ff;
	color: #9e30f4;
	font-size: 0.875rem;
	font-weight: 600;
`;

const CelebFadeDiv = styled.div`
	flex-wrap: wrap;
	margin-top: 0.625rem;

	display: ${props => (props.openStatus ? 'flex' : 'none')};
	opacity: ${props => (props.openStatus ? '1' : '0')};
`;
