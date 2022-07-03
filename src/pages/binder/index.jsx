import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';

import { MainContainer } from '../../components/containers/MainContainer';

import DragItem from './DragItem';
import { Grid, GridImage, GridItem } from './Grid';
import GridContext from '../../GridContext';

import img from '../home/img.png';
import { TopNav } from '../../components/containers/TopNav';
import { SubText } from '../../components/Texts/SubText';
import { TextWrap } from '../signup/SelectCeleb';

export default function Binder() {
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const { items, moveItem } = useContext(GridContext);
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
				<Grid>
					<GridItem>
						<GridImage src={img}></GridImage>
						<SubText fontsize="16px">기본 바인더</SubText>
						<SubText color="#8d8d8d">0개 보관중</SubText>
					</GridItem>

					{items.map(item => (
						<DragItem key={item.id} id={item.id} onMoveItem={moveItem}>
							<GridItem>
								<GridImage src={item.src}></GridImage>
								<SubText fontsize="16px">기본 바인더</SubText>
								<SubText color="#8d8d8d">0개 보관중</SubText>
							</GridItem>
						</DragItem>
					))}
				</Grid>
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
