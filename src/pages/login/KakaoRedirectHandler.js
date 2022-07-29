import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { customApiClient } from '../../utils/apiClient';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AutoLoginState, SignupProgressState, SocialLoginUserIdxState } from '../../recoil/User';
import Loading from '../../components/Loading';
import { ToastMessageBottomPositionState, ToastMessageState, ToastMessageStatusState, ToastMessageWrapStatusState } from '../../recoil/ToastMessage';

export default function KakaoRedirectHandler() {
	const navigate = useNavigate();

	const setCurrentPage = useSetRecoilState(SignupProgressState);
	const setUserIdx = useSetRecoilState(SocialLoginUserIdxState);

	const [autoLoginCheck, setAutoLoginCheck] = useRecoilState(AutoLoginState);

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	useEffect(() => {
		getKakaoJwt();
	}, []);

	const getKakaoJwt = async () => {
		let params = new URL(document.location.toString()).searchParams;
		let code = params.get('code'); // 인가코드 받는 부분
		const url = `/auth/kakao-login?code=${code}`;
		const data = await customApiClient('get', url);

		if (data.code === 3001) {
			console.log('중복된 사용자입니다.');
			console.log(data.result.jwt);
			localStorage.setItem('x-access-token', data.result.jwt);
			localStorage.setItem('myUserIdx', data.result.userIdx);
			if (data.result.nickname === 'tempNickName') {
				setCurrentPage(4);
				setUserIdx(data.result.userIdx);
				setAutoLoginCheck(true);
				localStorage.setItem('autoLogin', true);
				console.log('처음 회원가입 jwt', data.result.jwt);
				console.log(data.result.userIdx);
				navigate('/signup');
			} else {
				console.log('다시 로그인 jwt', data.result.jwt);
				setUserIdx(data.result.userIdx);
				navigate('/home');
			}
		}
		if (data.code === 1000) {
			console.log('최초 회원가입 사용자입니다.');
			console.log(data.result.jwt);
			localStorage.setItem('x-access-token', data.result.jwt);
			localStorage.setItem('myUserIdx', data.result.userIdx);
			// 닉네임으로 페이지 변경
			setCurrentPage(4);
			setAutoLoginCheck(true);
			localStorage.setItem('autoLogin', true);
			setUserIdx(data.result.userIdx);
			navigate('/signup');
		}

		if(!data) {
			setToastMessageBottomPosition('3.75rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage('카카오 로그인 실패');
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
				navigate('/');
			}, 2300);
		}
	};

	return (
		<div style={{ height: '5rem' }}>
			<Loading></Loading>
		</div>
	);
}
