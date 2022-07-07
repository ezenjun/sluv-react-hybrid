import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { customApiClient } from "../../utils/apiClient";
import { useSetRecoilState } from "recoil";
import { SignupProgressState, SocialLoginUserIdxState } from "../../recoil/User";

export default function KakaoRedirectHandler (){
    const navigate = useNavigate();

    const setCurrentPage = useSetRecoilState(SignupProgressState); 
    const setUserIdx = useSetRecoilState(SocialLoginUserIdxState);

    useEffect(() => {
        getKakaoJwt();
    }, [])

    const getKakaoJwt = async () => {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        const url = `/auth/kakao-login?code=${code}`;
        const data = await customApiClient('get', url);

        if(data.code === 3001) {
            console.log('중복된 사용자입니다.');
            console.log(data.result.jwt);
			localStorage.setItem('x-access-token', data.result.jwt); 
            navigate('/home'); 
        } 
        if(data.code === 1000) {
            console.log('최초 회원가입 사용자입니다.');
            console.log(data.result.jwt);
            localStorage.setItem('x-access-token', data.result.jwt);  
            // 닉네임으로 페이지 변경
            setCurrentPage(4);
            setUserIdx(data.result.userIdx);
            navigate('/signup');
        }
        
    }


    return <div>로그인중</div>
}
