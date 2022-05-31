import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        axios({
            method: "GET",
            // url: `backend/auth/kakao?code=${code}`
          })
        .then((res) => {
            const ACCESS_TOKEN = res.data.access_token;
            console.log('토큰',ACCESS_TOKEN)
            // localStorage.setItem("token", ACCESS_TOKEN);    //예시로 로컬에 저장함    
            
            navigate("/home") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
            console.log('로그인 성공')
        
        }).catch((err) => {
            console.log("소셜로그인 에러", err);
            window.alert("로그인에 실패하였습니다.");
            navigate("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
            })
    }, [])
    return <div>로그인중</div>
}

export default KakaoRedirectHandler;