import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { customApiClient } from "../../utils/apiClient";

export default function KakaoRedirectHandler (){
    const navigate = useNavigate();

    useEffect(() => {
        getKakaoJwt();
    }, [])

    const getKakaoJwt = async () => {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        const url = `/auth/kakao-login?code=${code}`;
        const data = await customApiClient('get', url);

        if(data.code === 3001) {
            console.log(data.result.jwt);
			localStorage.setItem('x-access-token', data.result.jwt); 
            navigate('/home'); 
        } 
        if(data.code === 1000) {
            console.log(data.result.jwt);
            localStorage.setItem('x-access-token', data.result.jwt);  
            // 닉네임으로 페이지 변경
        }
        
    }


    return <div>로그인중</div>
}
