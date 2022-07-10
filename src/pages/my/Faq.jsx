import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { BottomNavState } from '../../recoil/BottomNav';

export default function Faq() {
	const navigate = useNavigate();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	useEffect(() => {
		setBottomNavStatus(false);
	}, []);

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					문의하기
				</MainText>
			</TopNav>

			<ContentWrap style={{ flex: '1' }}></ContentWrap>

			<a
				href="https://open.kakao.com/o/s1IQ8upe"
				target="blank"
				style={{ textDecoration: 'none', padding: '0 1.25rem' }}
			>
				<PurpleButton marginBottom="1.625rem">1 : 1 문의하기</PurpleButton>
			</a>
		</MainContainer>
	);
}

