import React,{ useEffect } from 'react'
import styled from 'styled-components'
import { KAKAO_AUTH_URL } from './KakaoOAuth'
import Kakaoimg from '../../assets/kakao_buttons/kakao_login_medium_wide.png'
import {GoogleClient_ID} from './GoogleOAuth'
import jwt_decode from 'jwt-decode'
import { useSetRecoilState } from 'recoil';
import { GoogleUserInfoState } from '../../recoil/User';
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const setUserInfo = useSetRecoilState(GoogleUserInfoState);
  const navigate = useNavigate();
  
  function handleCallbackResponse(response){
    console.log("encoded JWT ID Token: " + response.credential);

    var userObject = jwt_decode(response.credential);

    console.log(userObject);
    setUserInfo(userObject);
    navigate('/signup/nickname');
  }


  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id: GoogleClient_ID,
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("google"),
      {type:"standard", theme:"outline", size:"large", width:"300px", logo_alignment:"left", shape:"circle"}
    )
  },[]);
  


  return (
    <>
      <MainContainer>
        <LogoContainer>LOGO</LogoContainer>
        <InfotextContainer>
          <MainText>셀럽의 아이템을 <br/>공유하는 공간<br/></MainText>
          <SubText>로그인하여 다양한 서비스를 이용하세요</SubText>
        </InfotextContainer>
        <ButtonContainer>
          <KaKaoButton href={KAKAO_AUTH_URL} />
          <GoogleButton id="google" />
          {/* Email Login */}
        </ButtonContainer>
      </MainContainer>
        
      
    </>
  )
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;


`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
`;

const InfotextContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const MainText = styled.h2``
const SubText = styled.h5`
  font-weight: lighter;
`


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
  width: 300px;
  height: 45px;
  border: none;
  border-radius: 40px;
  margin-bottom: 20px;
`;

const GoogleButton = styled.div`
  width: 300px;
  height: 45px;
  margin: 10px 0;
`
