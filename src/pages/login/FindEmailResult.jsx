import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TopNav } from '../../components/containers/TopNav';
import { MainContainer } from '../../components/containers/MainContainer';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as Present } from '../../assets/Icons/Present.svg';

export default function FindEmailResult() {
	const [idExist, setIdExist] = useState(false);
	const navigate = useNavigate();
	const handleNextClick = () => {
		if (idExist) navigate('/login');
		else navigate('/');
	};
	const handleBackClick = () => {
		navigate('/find/email');
	};
	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={handleBackClick} />
			</TopNav>

			{idExist ? (
				<ContentWrap>
					<CompleteTopWrap>
						<Present></Present>
						<CompletePageLabel>
							<MainText>입력하신 번호로</MainText>
							<MainText>찾은 이메일이에요.</MainText>
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

const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.25rem;
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
	margin-top: 2rem;
	margin-bottom: 1.5rem;
`;
const BottomWrap = styled.div``;

const EmailWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-weight: bold;
	height: 2.75rem;
	padding: 0 1.625rem;
	background-color: #f4f4f4;
	border-radius: 0.8125rem;
	color: #9e30f4;
`;
