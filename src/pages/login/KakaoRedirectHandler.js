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

        console.log(data);
        if (!data) return
        if (data.statusCode !== 1000) { return }

        const jwt = data.result.jwt;
        localStorage.setItem("x-access-token", jwt);  

        navigate("/signup/nickname"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(닉네임으로)
    }


    return <div>로그인중</div>
}
