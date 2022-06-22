import React, { useState, useEffect, useRef } from 'react';
import { Link, useRoutes, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { TopNav } from '../../components/TopNav';
import { PurpleButton } from '../../components/PurpleButton';
import { ReactComponent as LeftArrow } from '../../assets/Icons/left_arrow.svg';
import { ReactComponent as Present } from '../../assets/Icons/Present.svg';

export default function FindPasswordResult() {
	const [idExist, setIdExist] = useState(true);
	const navigate = useNavigate();
	const handleNextClick = () => {
		if (idExist) navigate('/login');
		else navigate('/');
	};
	return (
		<MainContainer>
			<TopNav>
				<StyledLink to="/find/password">
					<BackButton>
						<LeftArrow />
					</BackButton>
				</StyledLink>
			</TopNav>
			{idExist ? (
				<ContentWrap>
					<CompleteTopWrap>
						<Present></Present>
						<CompletePageLabel>
							<MainText>아래 이메일로 비밀번호</MainText>
							<MainText>변경링크를 보내드렸어요.</MainText>
							<SubText fontsize="14px" color="#8d8d8d" margin="16px 0">
								개인정보 보호를 위해 뒷자리는 ***로 표시할게요.
							</SubText>
						</CompletePageLabel>
						<EmailWrap>sss123123****@naver.com</EmailWrap>
					</CompleteTopWrap>
					<BottomWrap>
						<PurpleButton onClick={handleNextClick}>로그인으로 돌아가기 </PurpleButton>
					</BottomWrap>
				</ContentWrap>
			) : (
				<ContentWrap>
					<CompleteTopWrap>
						<Present></Present>
						<CompletePageLabel>
							<MainText>이메일 가입 내역이 </MainText>
							<MainText>존재하지 않아요.</MainText>
							<SubText fontsize="14px" color="#8d8d8d" margin="16px 0">
								스럽 회원가입 진행 후 이용해 주세요
							</SubText>
						</CompletePageLabel>
					</CompleteTopWrap>
					<BottomWrap>
						<PurpleButton onClick={handleNextClick}>회원가입 하러가기</PurpleButton>
					</BottomWrap>
				</ContentWrap>
			)}
		</MainContainer>
	);
}

const MainContainer = styled.div`
	display: flex;
	height: 100%;
	box-sizing: border-box;
	flex-direction: column;
	border: 1px solid black;
	background-color: ${palette.white.primary};
`;
const BackButton = styled.div`
	border: none;
	background-color: transparent;
	padding: none;
	margin: none;
	&:hover {
		cursor: pointer;
	}
`;

const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	height: 100%;
	justify-content: space-between;
`;
const CompleteTopWrap = styled.div`
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const CompletePageLabel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 32px;
	margin-bottom: 24px;
`;
const BottomWrap = styled.div``;

const MainText = styled.span`
	font-size: 24px;
	font-weight: bold;
	color: #262626;
`;
const SubText = styled.span`
	font-family: Pretendard;
	font-size: ${props => props.fontsize || '12px'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => props.color || 'black'};
	margin: ${props => props.margin || '0'};
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${props => props.color || 'black'};
	font-family: Pretendard;
	font-size: ${props => props.fontsize || '12px'};
	font-weight: ${props => props.fontweight || 'normal'};
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;

const EmailWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-weight: bold;
	height: 44px;
	padding: 0 26px;
	background-color: #f4f4f4;
	border-radius: 13px;
	color: #9e30f4;
`;
