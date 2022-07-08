import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import Slider from 'react-slick';

import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { SearchBottomSlideMenu } from '../../components/containers/SearchBottomSlideMenu';
import { Input } from '../../components/Input';
import { InputWrap, IconWrap, FeedContainer } from '.';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../components/Lines/VerticalLine';

import { LargeViewWrap } from '../../components/LargeViewWrap/LargeViewWrap';
import { LargeViewItem } from '../../components/LargeViewWrap/LargeViewItem';
import { LargeViewImage } from '../../components/LargeViewWrap/LargeViewImage';

import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridImage } from '../../components/GridItems/GridImage';
import { ImageText } from '../../components/ImageText';

import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ReactComponent as UpArrow } from '../../assets/Icons/upArrow.svg';
import { ReactComponent as DownArrow } from '../../assets/Icons/downArrowGray.svg';
import { ReactComponent as X } from '../../assets/Icons/TagDeleteX.svg';
import { ReactComponent as FilterSmall } from '../../assets/Icons/filterSmall.svg';
import { ReactComponent as FilterBig } from '../../assets/Icons/filterBig.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';

export default function SearchResult() {
	const navigate = useNavigate();
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);

	const [searchInput, setSearchInput] = useState('');
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [view, setView] = useState(true); //view = true 크게보기  false = 작게보기

	const changeView = () => {
		setView(!view);
	};
	setBottomMenuStatusState(true);
	const onHandleChangeSearch = e => {
		setSearchInput(e.target.value);
		const value = e.target.value;
	};
	const onClickInputDelete = () => {
		setSearchInput('');
	};
	const onBackClick = () => {
		navigate('../search');
	};
	useEffect(() => {
		setBottomMenuStatusState(true);
	});
	return (
		<MainContainer padding="0 0 0 0">
			<TopNav>
				<BackButton
					onClick={onBackClick}
					style={{ width: '1.5rem', height: '1.5rem' }}
				></BackButton>
				<SubText fontsize="18px" fontweight="bold" className="centerText">
					검색 결과
				</SubText>
			</TopNav>
			<div style={{ padding: '0.5rem 1.25rem' }}>
				<InputWrap>
					<IconWrap>
						<SearchIcon />
					</IconWrap>
					<Input
						value={searchInput}
						onChange={onHandleChangeSearch}
						type="text"
						placeholder="셀럽과 아이템을 검색해 보세요"
						margin="0 0 0 0.375rem"
					/>
					{searchInput.length !== 0 ? (
						<IconWrap onClick={onClickInputDelete}>
							<Delete />
						</IconWrap>
					) : (
						<></>
					)}
				</InputWrap>
			</div>
			<FilterContainer>
				<Filter>
					아이템 종류{' '}
					<DownArrow
						style={{
							width: '1.125rem',
							height: '1.125rem',
							marginLeft: '0.125rem',
						}}
					></DownArrow>
				</Filter>
				<Filter>
					가격대
					<DownArrow
						style={{
							width: '1.125rem',
							height: '1.125rem',
							marginLeft: '0.125rem',
						}}
					></DownArrow>
				</Filter>
				<Filter>
					정렬
					<DownArrow
						style={{
							width: '1.125rem',
							height: '1.125rem',
							marginLeft: '0.125rem',
						}}
					></DownArrow>
				</Filter>
				<Filter>
					색상
					<DownArrow
						style={{
							width: '1.125rem',
							height: '1.125rem',
							marginLeft: '0.125rem',
						}}
					></DownArrow>
				</Filter>
			</FilterContainer>
			<FeedContainer>
				<ItemContainer>
					<FilterWrap>
						<SubText fontsize="14px" color="#8d8d8d">
							전체 1234
						</SubText>
						{view ? (
							<ViewButton onClick={changeView}>
								<FilterSmall style={{ marginRight: '2px' }}></FilterSmall>
								<SubText fontsize="12px" color="#8d8d8d">
									작게보기
								</SubText>
							</ViewButton>
						) : (
							<ViewButton onClick={changeView}>
								<FilterBig style={{ marginRight: '2px' }}></FilterBig>
								<SubText fontsize="12px" color="#8d8d8d">
									크게보기
								</SubText>
							</ViewButton>
						)}
					</FilterWrap>
					{view ? (
						<LargeViewWrap>
							<LargeViewItem>
								<LargeViewImage>
									<ImageText>
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
											리노's
										</SubText>
										<BinderWhite
											style={{ width: '1.5rem', height: '1.5rem' }}
										/>
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
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
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
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
											아이엔's
										</SubText>
										<BinderWhite
											style={{ width: '1.5rem', height: '1.5rem' }}
										/>
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
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
											필릭스's
										</SubText>
										<BinderWhite
											style={{ width: '1.5rem', height: '1.5rem' }}
										/>
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
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
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
								<SubText
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
									}}
								>
									Rugby Polo Ls TEEㄻㄴㅁㄴ라ㅣ;ㅁㄴㅇ러;ㄹ미나어 ㅁㄴㅇ리ㅏㅁ넝ㄹ
								</SubText>
							</GridItem>
							<GridItem>
								<GridImage>
									<ImageText>
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
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
								<SubText
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
									}}
								>
									Rugby Polo Ls TEE BLUE
								</SubText>
							</GridItem>
							<GridItem>
								<GridImage>
									<ImageText>
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
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
								<SubText
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
									}}
								>
									Rugby Polo Ls TEE BLUE
								</SubText>
							</GridItem>
							<GridItem>
								<GridImage>
									<ImageText>
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
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
								<SubText
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
									}}
								>
									Rugby Polo Ls TEE BLUE
								</SubText>
							</GridItem>
							<GridItem>
								<GridImage>
									<ImageText>
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
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
								<SubText
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
									}}
								>
									Rugby Polo Ls TEE BLUE
								</SubText>
							</GridItem>
							<GridItem>
								<GridImage>
									<ImageText>
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
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
								<SubText
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
									}}
								>
									Round Lawn Short Shirt.Round Lawn Short ShirtRound Lawn Short
									Shirt.
								</SubText>
							</GridItem>
							<GridItem>
								<GridImage>
									<ImageText>
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
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
								<SubText
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
									}}
								>
									Rugby Polo Ls TEE BLUE
								</SubText>
							</GridItem>
							<GridItem>
								<GridImage>
									<ImageText>
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
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
								<SubText
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
									}}
								>
									Rugby Polo Ls TEE BLUE
								</SubText>
							</GridItem>
						</GridItemWrap>
					)}
				</ItemContainer>
			</FeedContainer>
			<SearchBottomSlideMenu></SearchBottomSlideMenu>
		</MainContainer>
	);
}

const FilterContainer = styled.div`
	display: flex;
	flex-shrink: 0;
	flex-direction: row;
	align-items: center;
	overflow-x: scroll;
	white-space: nowrap;
	box-sizing: border-box;
	margin: 4px 0 0 0;
	padding-left: 1.25rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #f0f0f0;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const Filter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	box-sizing: border-box;
	height: 2rem;
	padding: 0.5rem 0.625rem;
	border-radius: 8rem;
	border: solid 1px #d9d9d9;
	background-color: #fff;
	margin-right: 0.5rem;
	font-family: Pretendard;
	font-size: 13px;
	font-weight: 600;
	color: #564b5c;
`;
const FilterWrap = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
`;
const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
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
const ViewButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	&:hover {
		cursor: pointer;
	}
`;
