import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';

import { MainContainer } from '../../components/containers/MainContainer';

import img from '../home/img.png';
import { TopNav } from '../../components/containers/TopNav';
import { SubText } from '../../components/Texts/SubText';
import { TextWrap } from '../signup/SelectCeleb';

export default function Binder() {
	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(true);
	}, []);

	return (
		<MainContainer padding="0 0 3.125rem 0">
			<TopNav>
				<div style={{ fontSize: '1.125rem' }} className="centerText">
					바인더
				</div>
			</TopNav>
			<FeedContainer>
				<TextWrap>
					<SubText>내바인더</SubText>
					<SubText>바인더 추가</SubText>
				</TextWrap>
			</FeedContainer>
		</MainContainer>
	);
}
const FeedContainer = styled.div`
	height: 100vh;
	margin-top: 0.3125rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
