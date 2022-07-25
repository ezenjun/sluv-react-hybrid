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
import { checkMobile } from '../../App';
import {
	SignupProgressState,
	SocialLoginUserIdxState,
	SocialLoginCompleteState,
} from '../../recoil/User';

export default function Login() {
	const navigate = useNavigate();

	const setCurrentPage = useSetRecoilState(SignupProgressState);
	const setSocialLoginComplete = useSetRecoilState(SocialLoginCompleteState);

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
			setSocialLoginComplete(true);
			setCurrentPage(4);
			navigate('/signup');
		}
	}

	const getMyFcmTokenAndAutoLogin = async () => {
		localStorage.removeItem('isFcmLoad');
		let localFcm = localStorage.getItem('fcmToken');

		if (localFcm == undefined || localFcm == 'undefined' || localFcm.length == 0) {
			localFcm = null;
		}

		const current_user_platform = checkMobile;

		//앱 버전관련 로직
		// try {
		// 	if (current_user_platform == 'android') {
		// 		const verson = await window.android.getVersionName();
		// 		localStorage.setItem('versonName', verson);
		// 	} else if (current_user_platform == 'ios') {
		// 		window.webkit.messageHandlers.getVersionName.postMessage('hihi');
		// 	}
		// } catch (err) {
		// 	localStorage.removeItem('versonName');
		// }

		if (current_user_platform == 'android' && !localFcm) {
			try {
				const fcmToken = await window.android.getFcmToken();
				localStorage.setItem('fcmToken', fcmToken);
			} catch (err) {
				console.log(err);
			}
		}

		const data = await customApiClient('get', '/auth/auto-login');
		console.log(data);
		if (!data) return;

		if (!data.isSuccess) {
			localStorage.removeItem('x-access-token');

			if (current_user_platform == 'android') {
				//splash close 함수 호출
				try {
					window.android.closeSplash();
				} catch (err) {
					console.log(err);
				}
			} else if (current_user_platform == 'ios') {
				//splash close 함수 호출
				try {
					window.webkit.messageHandlers.closeSplash.postMessage('hihi');
				} catch (err) {
					console.log(err);
				}
			}

			return;
		}

		if (data.code === 1001) {
			localStorage.setItem('myUserIdx', data.result.userIdx);
			navigate('/home');
		}
	};
	const setUserIdx = useSetRecoilState(SocialLoginUserIdxState);

	async function handleCallbackResponse(response) {
		console.log('Encoded JWT ID token: ' + response.credential);
		const url = `/auth/google-login?code=${response.credential}`;
		const data = await customApiClient('get', url);
		console.log(data);

		if (data.code === 3001) {
			console.log(data.result.jwt);
			localStorage.setItem('x-access-token', data.result.jwt);
			if (data.result.nickname === 'tempNickName') {
				setCurrentPage(4);
				setUserIdx(data.result.userIdx);
				console.log(data.result.userIdx);
				navigate('/signup');
			} else {
				navigate('/home');
			}
		}
		if (data.code === 1000) {
			console.log(data.result.jwt);
			localStorage.setItem('x-access-token', data.result.jwt);
			// 닉네임으로 페이지 변경

			setUserIdx(data.result.userIdx);
			setCurrentPage(4);
			navigate('/signup');
		}
	}

	useEffect(() => {
		// 로컬 로그인 페이지 및 뒤로 가기 버튼 상태 초기화
		setCurrentPage(1);
		setSocialLoginComplete(false);

		getMyFcmTokenAndAutoLogin();
		// window.addEventListener('DOMContentLoaded', function () {
		// 	console.log('domcontent');
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
		google.accounts.id.prompt(); // also display the One Tap dialog
		// });
		// window.addEventListener('load', () => {
		// 	/* global google*/

		// });
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
				{/* <a href={KAKAO_AUTH_URL}>
					<KaKaoButton>
						<KakaoIcon
							style={{ width: '1.125rem', height: '1.125rem', marginRight: '1rem' }}
						/>
						<span className="kakaoBtnText">카카오로 시작하기</span>
					</KaKaoButton>
				</a> */}
				<EmailButton to="/login">
					<EmailIcon
						style={{ width: '1.125rem', height: '1.125rem', marginRight: '1rem' }}
					/>
					이메일로 로그인하기
				</EmailButton>

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
			{/* <LocalLogin>
				이미 계정이 있어요. <LoginText to="/login">로그인하기</LoginText>
			</LocalLogin> */}
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
	/* margin-bottom: 1.25rem; */
	margin-bottom: 0.5rem;
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
