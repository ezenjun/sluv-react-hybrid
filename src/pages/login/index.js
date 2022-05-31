import React from 'react'
import styled from 'styled-components'
import { KAKAO_AUTH_URL } from './KakaoOAuth'
import Kakaoimg from '../../assets/kakao_buttons/kakao_login_medium_wide.png'



export default function Login(){
  
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
          {/* Google Login */}
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
`;

