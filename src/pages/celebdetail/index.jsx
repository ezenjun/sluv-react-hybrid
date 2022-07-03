import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';

import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../components/Lines/VerticalLine';
import { SubText } from '../../components/Texts/SubText';

import { ChipWrap } from '../../components/Chip/ChipWrap';
import { Chip } from '../../components/Chip/Chip';

import { LargeViewWrap } from '../../components/LargeViewWrap/LargeViewWrap';
import { LargeViewItem } from '../../components/LargeViewWrap/LargeViewItem';
import { LargeViewImage } from '../../components/LargeViewWrap/LargeViewImage';

import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridImage } from '../../components/GridItems/GridImage';
import { ImageText } from '../../components/ImageText';

import { ReactComponent as FilterSmall } from '../../assets/Icons/filterSmall.svg';
import { ReactComponent as FilterBig } from '../../assets/Icons/filterBig.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';

export default function CelebDetail() {
	let params = useParams();
	const navigate = useNavigate();

	// const [isGroup, setIsGroup] = useState(false); // 그룹인 경우 Chip 보여줌 / 개인일 경우 Chip없음
	const membersList = [
		{
			idx: 1,
			name: '스트레이키즈',
		},
		{
			idx: 2,
			name: '리노',
		},
		{
			idx: 3,
			name: '현진',
		},
		{
			idx: 4,
			name: '아이엔',
		},
		{
			idx: 5,
			name: '필릭스',
		},
		{
			idx: 6,
			name: '한',
		},
		{
			idx: 7,
			name: '창빈',
		},
		{
			idx: 8,
			name: '승민',
		},
		{
			idx: 9,
			name: '우진',
		},
	];

	// const [latestList, setLatestList] = useState([]);
	// const [hotList, setHotList] = useState([]);

	const [currentItemList, setCurrentItemList] = useState([]);
	const [selectedChip, setSelectedChip] = useState(1);

	const [view, setView] = useState(true); //view = true 크게보기  false = 작게보기
	const changeView = () => {
		setView(!view);
	};
	const backClick = () => {
		navigate(-1);
	};

	const onClickTab = (idx, name) => {
		setSelectedChip(idx);
		let tempArr = [];
		tempArr = currentItemList.filter(item => item.name === name); //item 리스트와 chip 이름 비교
		setCurrentItemList(tempArr);
	};

	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(false);
	}, []);

	return (
		<MainContainer padding="0 0 3.125rem 0">
			<TopNav>
				<BackButton onClick={backClick} />
				<div style={{ fontSize: '1.125rem' }} className="centerText">
					{membersList[0].name}'s 아이템
				</div>
			</TopNav>
			<FeedContainer>
				{/* /그룹인 경우 Chip 보여줌 / 개인일 경우 Chip없음 */}
				{membersList.length > 1 ? (
					<>
						<ChipWrap>
							{membersList.map(item => {
								return (
									<Chip
										key={item.idx}
										onClick={() => onClickTab(item.idx, item.name)}
										selected={selectedChip === item.idx}
									>
										{item.name}
									</Chip>
								);
							})}
						</ChipWrap>
						<HorizontalLine />
					</>
				) : (
					<></>
				)}

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
							<FilterSmall style={{ marginRight: '2px' }}></FilterSmall>
							<SubText fontsize="12px" color="#8d8d8d">
								작게보기
							</SubText>
						</Filter>
					) : (
						<Filter onClick={changeView}>
							<FilterBig style={{ marginRight: '2px' }}></FilterBig>
							<SubText fontsize="12px" color="#8d8d8d">
								크게보기
							</SubText>
						</Filter>
					)}
				</FilterWrap>
				{view ? (
					<LargeViewWrap>
						<LargeViewItem>
							<LargeViewImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										리노's
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</LargeViewImage>
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
						</LargeViewItem>
						<HorizontalLine></HorizontalLine>
						<LargeViewItem>
							<LargeViewImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										현진's
									</SubText>
									<BinderRed style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</LargeViewImage>
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
						</LargeViewItem>
						<HorizontalLine></HorizontalLine>
						<LargeViewItem>
							<LargeViewImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										아이엔's
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</LargeViewImage>
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
						</LargeViewItem>
						<HorizontalLine></HorizontalLine>
						<LargeViewItem>
							<LargeViewImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										필릭스's
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</LargeViewImage>
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
						</LargeViewItem>
					</LargeViewWrap>
				) : (
					<GridItemWrap>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's
									</SubText>
									<BinderWhite
										style={{ width: '1.375rem', height: '1.375rem' }}
									/>
								</ImageText>
							</GridImage>
							<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="0.75rem">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's
									</SubText>
									<BinderWhite
										style={{ width: '1.375rem', height: '1.375rem' }}
									/>
								</ImageText>
							</GridImage>
							<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="0.75rem">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's
									</SubText>
									<BinderWhite
										style={{ width: '1.375rem', height: '1.375rem' }}
									/>
								</ImageText>
							</GridImage>
							<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="0.75rem">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's
									</SubText>
									<BinderWhite
										style={{ width: '1.375rem', height: '1.375rem' }}
									/>
								</ImageText>
							</GridImage>
							<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="0.75rem">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's
									</SubText>
									<BinderWhite
										style={{ width: '1.375rem', height: '1.375rem' }}
									/>
								</ImageText>
							</GridImage>
							<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="0.75rem">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's
									</SubText>
									<BinderWhite
										style={{ width: '1.375rem', height: '1.375rem' }}
									/>
								</ImageText>
							</GridImage>
							<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
								더블유브이프로젝트
							</SubText>
							<SubText fontsize="0.75rem">Round Lawn Short Shirt...</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's
									</SubText>
									<BinderWhite
										style={{ width: '1.375rem', height: '1.375rem' }}
									/>
								</ImageText>
							</GridImage>
							<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="0.75rem">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
						<GridItem>
							<GridImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										우식's
									</SubText>
									<BinderWhite
										style={{ width: '1.375rem', height: '1.375rem' }}
									/>
								</ImageText>
							</GridImage>
							<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
								마하그리드
							</SubText>
							<SubText fontsize="0.75rem">Rugby Polo Ls TEE BLUE</SubText>
						</GridItem>
					</GridItemWrap>
				)}
			</FeedContainer>
		</MainContainer>
	);
}
const FeedContainer = styled.div`
	height: 100vh;
	padding: 0 1.25rem 1.25rem 1.25rem;
	margin-top: 0.3125rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
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

const ItemTextWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 1rem 0 0.625rem 0;
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
	margin: 0 0.375rem;
`;
