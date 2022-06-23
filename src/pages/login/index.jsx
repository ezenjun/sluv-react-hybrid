import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from './KakaoOAuth';
import Kakaoimg from '../../assets/kakao_buttons/kakao_login_medium_wide.png';
import { GoogleClient_ID } from './GoogleOAuth';
import { useNavigate } from 'react-router-dom';
import { customApiClient } from '../../utils/apiClient';
import { ReactComponent as EmailIcon } from '../../assets/Icons/emailIcon.svg';
import { ReactComponent as LoginSubtext } from '../../assets/Icons/LoginSubtext.svg';
import { ReactComponent as Logo } from '../../assets/Logo/Logo.svg';
import { palette } from '../../styles/palette';
export default function Login() {
	const navigate = useNavigate();

	async function handleCallbackResponse(response) {
		// console.log("encoded JWT ID Token: " + response.credential);
		const url = `/auth/google-login?code=${response.credential}`;
		const data = await customApiClient('get', url);
		console.log(data);

		navigate('/signup/nickname');
	}

	useEffect(() => {
		/* global google*/
		google.accounts.id.initialize({
			client_id: GoogleClient_ID,
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(document.getElementById('google'), {
			type: 'standard',
			theme: 'outline',
			size: 'large',
			width: '100%',
			text: 'signin_with',
			logo_alignment: 'left',
			shape: 'circle',
		});
	}, []);

	return (
		<>
			<MainContainer>
				<LogoContainer>
					<Logo></Logo>
					<InfotextContainer>
						<MainText>
							셀럽의 아이템 정보 집합소 <br />
							스럽에서 시작해 보세요!
							<br />
						</MainText>
					</InfotextContainer>
				</LogoContainer>

				<ButtonContainer>
					<LoginSubtext style={{ marginBottom: '12px' }}></LoginSubtext>
					<KaKaoButton href={KAKAO_AUTH_URL} />
					<GoogleButton>
						<div id="google" />
					</GoogleButton>

					<EmailButton to="/signup">
						<IconWrap>
							<EmailIcon />
						</IconWrap>
						이메일로 시작
					</EmailButton>
					{/* Email Login */}
				</ButtonContainer>
				<LocalLogin>
					이미 계정이 있어요. <LoginText to="/login">로그인하기</LoginText>
				</LocalLogin>
			</MainContainer>
		</>
	);
}

const MainContainer = styled.div`
	display: flex;
	box-sizing: border-box;
	background-color: ${palette.white.primary};
	padding: 1.25rem;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const LogoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const InfotextContainer = styled.div`
	text-align: center;
`;

const MainText = styled.span`
	font-size: 1rem;
	font-weight: 600;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const KaKaoButton = styled.a`
	background-image: url(${Kakaoimg});
	background-repeat: no-repeat;
	color: transparent;
	width: 18.75rem;
	height: 2.8125rem;
	border: none;
	border-radius: 2.5rem;
	margin-bottom: 0.75rem;
`;

const GoogleButton = styled.div`
	width: 100vw;
	margin-bottom: 0.75rem;
`;

const EmailButton = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	font-family: Pretendard;
	font-size: 0.875rem;
	color: #9e30f4;
	width: 18.75rem;
	height: 2.625rem;
	border-radius: 2.5rem;
	margin-bottom: 0.75rem;
	border: 1px solid #9e30f4;
`;

const IconWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 1rem;
`;

const LoginText = styled(Link)`
	color: #6a6a6a;
	font-family: Pretendard;
	font-size: 0.75rem;
`;

const LocalLogin = styled.span`
	color: #6a6a6a;
	text-decoration: none;
	font-family: Pretendard;
	font-size: 0.75rem;
	border-radius: 2.5rem;
`;
