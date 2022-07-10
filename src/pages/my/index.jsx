import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';

import { ReactComponent as Settings } from '../../assets/Icons/icon_setting.svg';
import { ReactComponent as ThreeDots } from '../../assets/Icons/icon_three_dots_row.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import { ReactComponent as IconUploadItem } from '../../assets/Icons/bottom_nav_upload_item.svg';
import { ReactComponent as IconUploadQuestion } from '../../assets/Icons/bottom_nav_upload_question.svg';

import { ContentWrap } from '../../components/containers/ContentWrap';
import { BottomDialogDiv, BottomDialogWrap, CloseWrap } from '../../components/containers/BottomSlideMenu';
import styled from 'styled-components';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import MyPageContainer from './MyPageContainer';
import ProfileContainer from './ProfileContainer';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BottomNavState, UploadPopupState } from '../../recoil/BottomNav';
import { UploadPopup, UploadPopupWrap } from '../home';

export default function My() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [isAuthUser, setIsAuthUser] = useState(true);
  const [reportPopupStatus, setReportPopupStatus] = useState(false);

	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const uploadPopupStatus = useRecoilValue(UploadPopupState);
  
  useEffect(() => {
		setBottomNavStatus(true);

    // 유저페이지 조회 API
    // if 사용자 본인이면
    // => 하단바 생기기
    // => setIsAuthUser(true)
    // else 
    // => 하단바 사라지기
    // => setIsAuthUser(false)

  },[]);

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
						<div>
							<span>닉네임</span>
							<span>아이디</span>
						</div>
						<div>
							<span>팔로잉</span>
							<span>10</span>
							<span>팔로워</span>
							<span>12</span>
						</div>
						<div>CHIP</div>
						{!isAuthUser && (
							<PurpleButton disabled={true} marginBottom="0"></PurpleButton>
						)}
					</ProfileContentsWrap>
				</ProfileWrap>

				{isAuthUser ? <MyPageContainer /> : <ProfileContainer />}
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
	padding: 4.375rem 1.25rem 1.875rem;
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
`;

