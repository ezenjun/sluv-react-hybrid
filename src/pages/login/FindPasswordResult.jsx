import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TopNav } from '../../components/containers/TopNav';
import { MainContainer } from '../../components/containers/MainContainer';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as SendEmail } from '../../assets/Signup/SendEmail.svg';
import { ReactComponent as NoEmail } from '../../assets/Signup/FindEmail.svg';

export default function FindPasswordResult() {
	const [idExist, setIdExist] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const handleNextClick = () => {
		if (idExist) navigate('/login');
		else navigate('/');
	};
	const handleBackClick = () => {
		navigate('/find/password');
	};
	let maskingFunc = {
		checkNull: function (str) {
			if (typeof str == 'undefined' || str == null || str === '') {
				return true;
			} else {
				return false;
			}
		},
		email: function (str) {
			let originStr = str;
			let emailStr = originStr.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
			let strLength;

			if (this.checkNull(originStr) == true || this.checkNull(emailStr) == true) {
				return originStr;
			} else {
				strLength = emailStr.toString().split('@')[0].length - 4;

				// ex1) abcdefg12345@naver.com => ab**********@naver.com
				return originStr
					.toString()
					.replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*');
			}
		},
	};
	const [email, setEmail] = useState('');
	useEffect(() => {
		if (location.state.email !== '') {
			setIdExist(true);
			setEmail(maskingFunc.email(location.state.email));
		} else {
			setIdExist(false);
		}
	}, []);
	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={handleBackClick} />
			</TopNav>
			{idExist ? (
				<ContentWrap>
					<CompleteTopWrap>
						<SendEmail></SendEmail>
						<CompletePageLabel>
							<MainText fontsize="1.25rem">
								아래 이메일로 비밀번호
								<br />
								변경링크를 보내드렸어요
							</MainText>

							<SubText fontsize="0.875rem" color="#8d8d8d" margin="1rem 0 0 0">
								개인정보 보호를 위해 뒷자리는 ***로 표시할게요.
							</SubText>
						</CompletePageLabel>
						<EmailWrap>{email}</EmailWrap>
					</CompleteTopWrap>
					<BottomWrap>
						<PurpleButton onClick={handleNextClick}>로그인으로 돌아가기 </PurpleButton>
					</BottomWrap>
				</ContentWrap>
			) : (
				<ContentWrap>
					<CompleteTopWrap>
						<NoEmail></NoEmail>
						<CompletePageLabel>
							<MainText fontsize="1.25rem">
								이메일 가입 내역이
								<br />
								존재하지 않아요
							</MainText>

							<SubText fontsize="0.875rem" color="#8d8d8d" margin="16px 0">
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
	text-align: center;
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
