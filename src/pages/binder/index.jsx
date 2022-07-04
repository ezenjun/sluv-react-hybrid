import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { MainContainer } from '../../components/containers/MainContainer';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridImage } from '../../components/GridItems/GridImage';

import { ReactComponent as AddBinderButton } from '../../assets/Icons/addBinder.svg';

import { SampleItems } from './sampleItems';

export default function Binder() {
	const navigate = useNavigate();
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [binderCnt, setBinderCnt] = useState(2);
	const imageList = [
		{
			src: 'https://images.pexels.com/photos/3075988/pexels-photo-3075988.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
			id: '1',
		},
		{
			src: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '2',
		},
		{
			src: 'https://images.pexels.com/photos/1405773/pexels-photo-1405773.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '3',
		},
		{
			src: 'https://images.pexels.com/photos/269318/pexels-photo-269318.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '4',
		},
		{
			src: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '5',
		},
		{
			src: 'https://images.pexels.com/photos/2575279/pexels-photo-2575279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '6',
		},
		{
			src: 'https://images.pexels.com/photos/1029609/pexels-photo-1029609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '7',
		},
		{
			src: 'https://images.pexels.com/photos/1122414/pexels-photo-1122414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '8',
		},
		{
			src: 'https://images.pexels.com/photos/2698761/pexels-photo-2698761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '9',
		},
	];
	const onAddBinder = () => {
		navigate('./add');
	};
	const onPrimaryBinderClick = () => {
		navigate('./:1');
	};
	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(true);
	}, []);

	return (
		<MainContainer padding="0 0 3.125rem 0">
			<TopNav>
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					바인더
				</MainText>
			</TopNav>
			<FeedContainer>
				<BinderTextWrap>
					<MainText fontsize="1.25rem">내바인더</MainText>
					<SubText color="#8d8d8d" onClick={onAddBinder}>
						바인더 추가
					</SubText>
				</BinderTextWrap>
				<GridItemWrap>
					{binderCnt > 0 ? (
						<>
							<GridItem onClick={onPrimaryBinderClick}>
								<GridImage
									backgroundColor="linear-gradient(180deg, #F0FFF4 -1.86%, #ECEEFF 100%);"
									marginbottom="0.6875rem"
								></GridImage>
								<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.25rem 0 ">
									기본 바인더
								</SubText>
								<SubText fontsize="0.75rem">0개 보관중</SubText>
							</GridItem>
							{imageList.map(item => (
								<GridItem key={item.id}>
									<GridImage src={item.src} marginbottom="0.6875rem"></GridImage>
									<SubText
										fontsize="1rem"
										fontweight="bold"
										margin="0 0 0.25rem 0 "
									>
										{item.id} 바인더
									</SubText>
									<SubText fontsize="0.75rem">{item.id}개 보관중</SubText>
								</GridItem>
							))}
						</>
					) : (
						<>
							<GridItem>
								<GridImage
									backgroundColor="#f4f4f4"
									marginbottom="0.6875rem"
								></GridImage>
								<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.25rem 0 ">
									기본 바인더
								</SubText>
								<SubText fontsize="0.75rem">0개 보관중</SubText>
							</GridItem>
							<GridItem onClick={onAddBinder}>
								<AddBinder backgroundColor="#fbf6ff" marginbottom="0.6875rem">
									<AddBinderButton
										style={{ width: '30px', height: '30px' }}
									></AddBinderButton>
									<SubText fontsize="13px" margin="0.375rem 0 0.25rem 0">
										나만의 바인더를
									</SubText>
									<SubText fontsize="13px">만들어봐요!</SubText>
								</AddBinder>
							</GridItem>
						</>
					)}
				</GridItemWrap>
			</FeedContainer>
		</MainContainer>
	);
}
const FeedContainer = styled.div`
	height: 100vh;
	padding: 1.25rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const BinderTextWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 1rem;
	align-items: center;
`;
const AddBinder = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	text-align: center;
	background-color: #fbf6ff;
	color: #564b5c;
	@media screen and (width: 360px) {
		width: 9.5625rem;
		height: 9.5625rem;
	}
	@media screen and (width: 320px) {
		width: 8.4063rem;
		height: 8.4063rem;
	}
	@media screen and (width: 280px) {
		width: 8.125rem;
		height: 8.125rem;
	}
`;
