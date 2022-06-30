import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from './KakaoOAuth';
import { GoogleClient_ID } from './GoogleOAuth';
import { useNavigate } from 'react-router-dom';
import { customApiClient } from '../../utils/apiClient';
import { ReactComponent as EmailIcon } from '../../assets/Icons/emailIcon.svg';
import { ReactComponent as LoginSubtext } from '../../assets/Icons/login_subText.svg';
import { ReactComponent as Logo } from '../../assets/Logo/Logo.svg';
import { ReactComponent as KakaoIcon } from '../../assets/Icons/kakao_icon.svg';
import { MainText } from '../../components/Texts/MainText';
import { palette } from '../../styles/palette';
import { LoginSpeechBubble } from '../../components/Bubbles/LoginSpeechBubble';
import { useSetRecoilState } from 'recoil';
import { SignupProgressState } from '../../recoil/User';

export default function Login() {
	const navigate = useNavigate();

	const setCurrentPage = useSetRecoilState(SignupProgressState);

	async function handleCallbackResponse(response) {
		// console.log("encoded JWT ID Token: " + response.credential);
		const url = `/auth/google-login?code=${response.credential}`;
		const data = await customApiClient('get', url);
		console.log(data);

		if (data.code === 3001) {
			console.log(data.result.jwt);
			localStorage.setItem('x-access-token', data.result.jwt);
			navigate('/home');
		}
		if (data.code === 1000) {
			console.log(data.result.jwt);
			localStorage.setItem('x-access-token', data.result.jwt);
			// 닉네임으로 페이지 변경
			setCurrentPage(4);
			navigate('/signup');
		}
	}

	useEffect(() => {
		/* global google*/
		google.accounts.id.initialize({
			client_id: GoogleClient_ID,
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(document.getElementById('google'), {
			type: 'icon',
			theme: 'outline',
			size: 'large',
			width: '40px',
			shape: 'circle',
		});
		// eslint-disable-next-line
	}, []);

	return (
		<MainContainer>
			<LogoContainer>
				<Logo></Logo>
				<InfotextContainer>
					<div className="mainInfoText">셀럽의 아이템 정보 집합소</div>
					<div className="subInfoText">스럽의 정보는 사랑스럽다!</div>
				</InfotextContainer>
			</LogoContainer>

			<ButtonContainer>
				<div style={{ margin: '0 auto' }}>
					<LoginSpeechBubble>
						로그인하여 다양한
						<span className="boldText"> 셀럽의 아이템</span>을 만나보세요!
					</LoginSpeechBubble>
				</div>
				<a href={KAKAO_AUTH_URL}>
					<KaKaoButton>
						<KakaoIcon
							style={{ width: '1.125rem', height: '1.125rem', marginRight: '1rem' }}
						/>
						<span className="kakaoBtnText">카카오로 시작하기</span>
					</KaKaoButton>
				</a>

				<EmailButton to="/signup">
					<EmailIcon
						style={{ width: '1.125rem', height: '1.125rem', marginRight: '1rem' }}
					/>
					이메일로 시작하기
				</EmailButton>

				<Division>
					<div className="grayLine"></div>
					<span className="divisionText">또는</span>
					<div className="grayLine"></div>
				</Division>

				<div>
					<GoogleButton>
						<div id="google" />
					</GoogleButton>
				</div>
			</ButtonContainer>
			<LocalLogin>
				이미 계정이 있어요. <LoginText to="/login">로그인하기</LoginText>
			</LocalLogin>
		</MainContainer>
	);
}

const MainContainer = styled.div`
	display: flex;
	box-sizing: border-box;
	background-color: ${palette.white.secondary};
	padding: 0 2.5rem 1rem 2.5rem;
	flex-direction: column;
	/* justify-content: space-evenly; */
	height: 100%;
	width: 100%; 
`;

const LogoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	margin-top: 158px;
`;

const InfotextContainer = styled.div`
	text-align: center;

	.mainInfoText {
		margin-top: 0.75rem;
		font-size: 1.25rem;
		font-weight: 600;
		color: #262626;
	}
	.subInfoText {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: #6a6a6a;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	flex: 1;
`;

const KaKaoButton = styled.div`
	background-color: #fee500;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.8125rem 0;

	border-radius: 1.375rem;
	margin-bottom: 0.5rem;

	.kakaoBtnText {
		font-size: 0.875rem;
		font-weight: 600;
		color: #000000;
	}
`;

const EmailButton = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: Pretendard;
	font-size: 0.875rem;
	font-weight: 600;
	color: #9e30f4;
	height: 2.75rem;
	border-radius: 1.375rem;
	border: 1px solid #9e30f4;
	margin-bottom: 1.25rem;
`;

const Division = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.25rem;

	.divisionText {
		color: #c9c9c9;
		font-size: 0.6875rem;
		font-weight: 600;
		margin: 0 0.625rem;
	}
	.grayLine {
		background-color: #ebebeb;
		flex: 1;
		height: 0.0625rem;
	}
`;

const GoogleButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 12px;
`;


const LoginText = styled(Link)`
	text-decoration: underline;
	color: #6a6a6a;
	font-family: Pretendard;
	font-size: 0.75rem;
`;

const LocalLogin = styled.div`
	margin: 0 auto;
	color: #6a6a6a;
	font-family: Pretendard;
	font-size: 0.75rem;
	border-radius: 2.5rem;
`;
