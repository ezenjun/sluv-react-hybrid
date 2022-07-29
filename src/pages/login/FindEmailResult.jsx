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
import { customApiClient } from '../../utils/apiClient';

export default function FindEmailResult() {
	const [idExist, setIdExist] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const handleNextClick = () => {
		if (idExist) navigate('/login');
		else navigate('/');
	};
	const handleBackClick = () => {
		navigate('/find/email');
	};
	const [emailInfo, setEmailInfo] = useState();
	async function handleFindEmailAPI(phoneNumber) {
		const url = `/auth/forget-email?phone=${phoneNumber}`;
		const data = await customApiClient('get', url);
		if (!data) return;
		if (data.isSuccess) {
			setEmailInfo(maskingFunc.email(data.result.email));
			setIdExist(false);
		} else {
			setIdExist(false);
		}
	}
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

	useEffect(() => {
		const phone = location.state.phone;
		handleFindEmailAPI(phone);
	}, []);
	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={handleBackClick} />
			</TopNav>

			{idExist ? (
				<ContentWrap>
					<CompleteTopWrap>
						<SendEmail style={{ width: '3.75rem', height: '3.75rem' }}></SendEmail>
						<CompletePageLabel>
							<MainText>입력하신 번호로</MainText>
							<MainText>찾은 이메일이에요.</MainText>
							<SubText fontsize="14px" color="#8d8d8d" margin="16px 0">
								개인정보 보호를 위해 뒷자리는 ***로 표시할게요.
							</SubText>
						</CompletePageLabel>
						<EmailWrap>{emailInfo}</EmailWrap>
					</CompleteTopWrap>
					<BottomWrap>
						<PurpleButton onClick={handleNextClick}>로그인으로 돌아가기 </PurpleButton>
					</BottomWrap>
				</ContentWrap>
			) : (
				<ContentWrap>
					<CompleteTopWrap>
						<NoEmail style={{ width: '3.75rem', height: '3.75rem' }}></NoEmail>
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
