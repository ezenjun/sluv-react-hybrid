import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { SubText } from '../../components/Texts/SubText';

import { BottomNavState } from '../../recoil/BottomNav';

export default function Notice() {
  const navigate = useNavigate();

  const setBottomNavStatus = useSetRecoilState(BottomNavState);
  
  useEffect(() => {
    setBottomNavStatus(false);
  });

  return (
		<MainContainer>
			<TopNav style={{ border: '1px solid red' }}>
				<BackButton onClick={() => navigate(-1)} />
				<SubText fontsize="18px" fontweight="bold" className="centerText">
					알림
				</SubText>
			</TopNav>

      

		</MainContainer>
  );
}
