import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../components/Lines/VerticalLine';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as FilterSmall } from '../../assets/Icons/filterSmall.svg';
import { ReactComponent as FilterBig } from '../../assets/Icons/filterBig.svg';
import { ReactComponent as BubbleHeart } from '../../assets/Icons/bubbleHeart.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';

export default function CelebDetail() {
	let params = useParams();
	const navigate = useNavigate();
	const [view, setView] = useState(true);
	const changeView = () => {
		setView(!view);
	};
	const backClick = () => {
		navigate(-1);
	};

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={backClick} />
				<div style={{ fontSize: '1.125rem' }} className="centerText">
					{params.celebIdx}'s LUV 아이템
				</div>
			</TopNav>
			<FeedContainer>
				<ChipWrap>
					<Chip selected={true}>스트레이키즈</Chip>
					<Chip>리노</Chip>
					<Chip>현진</Chip>
					<Chip>아이엔</Chip>
					<Chip>필릭스</Chip>
				</ChipWrap>
				<HorizontalLine />
				<FilterWrap>
					<Filter>
						<SubText fontsize="14px" fontweight="bold">
							최신순
						</SubText>
						<VerticalLine />
						<SubText fontsize="14px" color="#8d8d8d">
							인기순
						</SubText>
					</Filter>
					{view ? (
						<Filter onClick={changeView}>
							<FilterSmall style={{ marginRight: '4px' }}></FilterSmall>
							<SubText fontsize="14px" color="#8d8d8d">
								작게보기
							</SubText>
						</Filter>
					) : (
						<Filter onClick={changeView}>
							<FilterBig style={{ marginRight: '4px' }}></FilterBig>
							<SubText fontsize="14px" color="#8d8d8d">
								크게보기
							</SubText>
						</Filter>
					)}
				</FilterWrap>
				{view ? (
					<ItemsContainer>
						<Item>
							<Image></Image>
							<ItemTextWrap>
								<SubText fontsize="1rem">마하그리드</SubText>
								<VerticalLine></VerticalLine>
								<SubText fontsize="1rem">Rugby Polo LS TEE BLUE</SubText>
							</ItemTextWrap>
							<SubInfoWrap>
								<ProfileImg></ProfileImg>
								<SubText margin="0 "> 이리노순둥도리</SubText>
								<Dot></Dot>
								<SubText color="#8d8d8d"> 5분 전</SubText>
							</SubInfoWrap>
						</Item>
						<HorizontalLine></HorizontalLine>
						<Item>
							<Image></Image>
							<ItemTextWrap>
								<SubText fontsize="1rem">더블유브이프로젝트</SubText>
								<VerticalLine></VerticalLine>
								<SubText fontsize="1rem">Round Lawn Short Shirt...</SubText>
							</ItemTextWrap>
							<SubInfoWrap>
								<ProfileImg></ProfileImg>
								<SubText margin="0 "> 이리노순둥도리</SubText>
								<Dot></Dot>
								<SubText color="#8d8d8d"> 5분 전</SubText>
							</SubInfoWrap>
						</Item>
						<HorizontalLine></HorizontalLine>
						<Item>
							<Image></Image>
							<ItemTextWrap>
								<SubText fontsize="1rem">우알롱</SubText>
								<VerticalLine></VerticalLine>
								<SubText fontsize="1rem">Signature hood sip-up - ...</SubText>
							</ItemTextWrap>
							<SubInfoWrap>
								<ProfileImg></ProfileImg>
								<SubText margin="0 "> 이리노순둥도리</SubText>
								<Dot></Dot>
								<SubText color="#8d8d8d"> 5분 전</SubText>
							</SubInfoWrap>
						</Item>
						<HorizontalLine></HorizontalLine>
						<Item>
							<Image></Image>
							<ItemTextWrap>
								<SubText fontsize="1rem">마하그리드</SubText>
								<VerticalLine></VerticalLine>
								<SubText fontsize="1rem">Rugby Polo LS TEE BLUE</SubText>
							</ItemTextWrap>
							<SubInfoWrap>
								<ProfileImg></ProfileImg>
								<SubText margin="0 "> 이리노순둥도리</SubText>
								<Dot></Dot>
								<SubText color="#8d8d8d"> 5분 전</SubText>
							</SubInfoWrap>
						</Item>
					</ItemsContainer>
				) : (
					<GridItemWrap>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's luv
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</GridImage>
							<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="12px">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's luv
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</GridImage>
							<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="12px">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's luv
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</GridImage>
							<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="12px">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's luv
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</GridImage>
							<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="12px">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's luv
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</GridImage>
							<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="12px">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's luv
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</GridImage>
							<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
								더블유브이프로젝트
							</SubText>
							<br />
							<SubText fontsize="0.75rem">Round Lawn Short Shirt...</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's luv
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</GridImage>
							<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="12px">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's luv
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</GridImage>
							<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="12px">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
					</GridItemWrap>
				)}
			</FeedContainer>
		</MainContainer>
	);
}
const FeedContainer = styled.div`
	height: 100vh;
	padding: 0 20px 20px 20px;
	margin-top: 5px;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const ChipWrap = styled.div`
	overflow-x: scroll;
	white-space: nowrap;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const Chip = styled.div`
	display: inline-block;
	/* box-sizing: border-box; */
	padding: 0.625rem 1rem;
	margin-right: 0.5rem;
	border-radius: 1.9rem;
	border: solid 1px #e2e0e0;
	background-color: ${props => (props.selected ? '#2b1e34' : '#fff')};
	color: ${props => (props.selected ? '#fff' : '#2b1e34')};
	font-size: 14px;
	font-weight: 600;
`;
const FilterWrap = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
`;
const Filter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	&:hover {
		cursor: pointer;
	}
`;
const ItemsContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	align-content: space-between;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	margin-bottom: 60px;
`;
const Item = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const Image = styled.div`
	width: 100%;
	height: 14.375rem;
	background-color: darkturquoise;
	border-radius: 1rem;
`;
const ItemTextWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 1rem 0 10px 0;
`;
const SubInfoWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const ProfileImg = styled.div`
	width: 1.375rem;
	height: 1.375rem;
	border-radius: 50%;
	background-color: darkturquoise;
	margin-right: 0.5rem;
`;
const Dot = styled.div`
	width: 0.125rem;
	height: 0.125rem;
	border-radius: 50%;
	background-color: #8d8d8d;
	margin: 0 6px;
`;
const GridItemWrap = styled.div`
	display: grid;
	justify-items: center;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: minmax(6.25rem, auto);
	row-gap: 0.6875rem;
	column-gap: 0.6875rem;
	margin-bottom: 60px;
`;
const GridItem = styled.div`
	display: flex;
	flex-direction: column;
`;
const GridImage = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: blue;
	margin-bottom: 1rem;
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	color: white;
	font-size: 0.8125rem;
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

const ImageText = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`;
