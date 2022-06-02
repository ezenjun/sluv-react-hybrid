import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function KakaoRedirectHandler (){
    const navigate = useNavigate();

    useEffect(()=> {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        console.log(code);
        axios({
            method: "GET",
            url: `https://dev.cmc-sluv.shop/auth/kakao-login?code=${code}`
          })
        .then((res) => {
            const jwt = res.data.result.jwt;
            console.log('토큰',jwt)
            console.log('성공')
            localStorage.setItem("token", jwt);    //예시로 로컬에 저장함
            navigate("/signup/nickname") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
            console.log('로그인 성공')
        
        }).catch((err) => {
            console.log("소셜로그인 에러", err);
            window.alert("로그인에 실패하였습니다.");
            navigate("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
            })
    }, [])
    return <div>로그인중</div>
}
