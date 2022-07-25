import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { customApiClient } from '../../utils/apiClient';
import { useSetRecoilState } from 'recoil';
import { SignupProgressState, SocialLoginUserIdxState } from '../../recoil/User';
import Loading from '../../components/Loading';
import { ToastMessageBottomPositionState, ToastMessageState, ToastMessageStatusState, ToastMessageWrapStatusState } from '../../recoil/ToastMessage';

export default function KakaoRedirectHandler() {
	const navigate = useNavigate();

	const setCurrentPage = useSetRecoilState(SignupProgressState);
	const setUserIdx = useSetRecoilState(SocialLoginUserIdxState);

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
			console.log('최초 회원가입 사용자입니다.');
			console.log(data.result.jwt);
			localStorage.setItem('x-access-token', data.result.jwt);
			// 닉네임으로 페이지 변경
			setCurrentPage(4);
			setUserIdx(data.result.userIdx);
			navigate('/signup');
		}

		if(!data.isSuccess) {
			setToastMessageBottomPosition('3.75rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage('카카오 로그인 실패');
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
			return;
		}

	};

	return <Loading />;
}
