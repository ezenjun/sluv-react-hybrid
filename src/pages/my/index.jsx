import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';

import { ReactComponent as Settings } from '../../assets/Icons/icon_setting.svg';
import { ReactComponent as ThreeDots } from '../../assets/Icons/icon_three_dots_row.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';

import { ContentWrap } from '../../components/containers/ContentWrap';
import { BottomDialogDiv, BottomDialogWrap, CloseWrap } from '../../components/containers/BottomSlideMenu';

export default function My() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [isAuthUser, setIsAuthUser] = useState(true);

  const [reportPopupStatus, setReportPopupStatus] = useState(false);
  
  useEffect(() => {
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
						<Settings onClick={onClickSettings} style={{ width: '24px', height: '24px' }} />
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

			<ContentWrap padding="0 1.25rem 0 1.25rem"></ContentWrap>

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
		</MainContainer>
  );
}
