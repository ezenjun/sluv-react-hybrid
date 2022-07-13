import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { customApiClient } from '../../utils/apiClient';

import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
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
import { ReactComponent as DownArrow } from '../../assets/Icons/downArrowGray.svg';
import { ReactComponent as FilterSmall } from '../../assets/Icons/filterSmall.svg';
import { ReactComponent as FilterBig } from '../../assets/Icons/filterBig.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import { ReactComponent as Refresh } from '../../assets/Icons/refreshFilter.svg';

export default function SearchResult() {
	const navigate = useNavigate();
	const location = useLocation();
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);

	const [searchInput, setSearchInput] = useState('');
	const [view, setView] = useState(false); //view = true 크게보기  false = 작게보기

	const [selectedItemFilter, setSelectedItemFilter] = useState();
	const [selectedPriceFilter, setSelectedPriceFilter] = useState();
	const [selectedAlignFilter, setSelectedAlignFilter] = useState();
	const [selectedColorFilter, setSelectedColorFilter] = useState();

	const [isSelected, setIsSelected] = useState(false);
	const getIsSelected = input => {
		setIsSelected(input);
	};

	const tabList = [
		{
			idx: 1,
			name: '아이템 종류',
		},
		{
			idx: 2,
			name: '가격대',
		},
		{
			idx: 3,
			name: '정렬',
		},
		{
			idx: 4,
			name: '색상',
		},
	];

	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
	};

	const [selectedTab, setSelectedTab] = useState(1);
	const getSelectedTab = input => {
		setSelectedTab(input);
	};

	const childFunc = React.useRef(null);
	const getResetFunction = input => {};
	const getSelectedItemFilter = input => {
		setSelectedItemFilter(input);
		console.log(selectedItemFilter);
	};
	const getSelectedPriceFilter = input => {
		setSelectedPriceFilter(input);
		console.log(selectedPriceFilter);
	};
	const getSelectedAlignFilter = input => {
		setSelectedAlignFilter(input);
		console.log(selectedAlignFilter);
	};
	const getSelectedColorFilter = input => {
		setSelectedColorFilter(input);
		console.log(selectedColorFilter);
	};

	const changeView = () => {
		setView(!view);
	};
	const onFilterClick = idx => {
		setBottomMenuStatusState(true);
		setSelectedTab(idx);
	};

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

	const [searchResultList, setSearchResultList] = useState([]);
	const getSearchResultList = async queryKeyword => {
		const data = await customApiClient(
			'get',
			`/search?search_word=${queryKeyword}&page=1&pageSize=10`
		);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('getHotKeywordList', data.result.searchItemList);
		setSearchResultList(data.result.searchItemList);
	};

	useEffect(() => {
		setBottomMenuStatusState(false);
		setSearchInput(location.state.searchInput);
		let queryKeyword = location.state.searchInput;
		let blank = ' ';
		let isBlank = queryKeyword.includes(blank);
		if (isBlank) {
			queryKeyword = queryKeyword.replaceAll(' ', '+');
			console.log('with blank', queryKeyword);
		}
		console.log(queryKeyword);
		getSearchResultList(queryKeyword);
	}, []);
	return (
		<MainContainer padding="0 0 3.125rem 0">
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
				{isSelected ? (
					<Refresh
						onClick={() => childFunc.current()}
						style={{
							width: '32px',
							height: '32px',
							marginRight: '0.5rem',
							flexShrink: 0,
						}}
					></Refresh>
				) : (
					<></>
				)}
				<Filter onClick={() => onFilterClick(1)} selected={selectedItemFilter}>
					{selectedItemFilter ? selectedItemFilter : '아이템 종류'}

					<DownArrow
						style={{
							width: '1.125rem',
							height: '1.125rem',
							marginLeft: '0.125rem',
						}}
					></DownArrow>
				</Filter>
				<Filter onClick={() => onFilterClick(2)} selected={selectedPriceFilter}>
					{selectedPriceFilter ? selectedPriceFilter : '가격대'}
					<DownArrow
						style={{
							width: '1.125rem',
							height: '1.125rem',
							marginLeft: '0.125rem',
						}}
					></DownArrow>
				</Filter>
				<Filter onClick={() => onFilterClick(3)} selected={selectedAlignFilter}>
					{selectedAlignFilter ? selectedAlignFilter : '정렬'}
					<DownArrow
						style={{
							width: '1.125rem',
							height: '1.125rem',
							marginLeft: '0.125rem',
						}}
					></DownArrow>
				</Filter>
				<Filter onClick={() => onFilterClick(4)} selected={selectedColorFilter}>
					{selectedColorFilter ? selectedColorFilter : '색상'}
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
							전체 {searchResultList.searchItemCnt}
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
							{searchResultList && (
								<>
									{searchResultList.map(item => (
										<>
											<LargeViewItem
												onClick={() => {
													onDetailItemClick(item.itemIdx);
												}}
												key={item.itemIdx}
											>
												<LargeViewImage src={item.itemImgUrl}>
													<ImageText>
														<SubText
															fontsize="0.8125rem"
															fontweight="bold"
															color="white"
														>
															{item.name}'s
														</SubText>
														{item.isDib === 'Y' ? (
															<BinderRed
																style={{
																	width: '1.5rem',
																	height: '1.5rem',
																	zIndex: '50',
																}}
															/>
														) : (
															<BinderWhite
																style={{
																	width: '1.5rem',
																	height: '1.5rem',
																	zIndex: '50',
																}}
															/>
														)}
													</ImageText>
												</LargeViewImage>
												<ItemTextWrap>
													<SubText fontsize="1rem">
														{item.brandKr}
													</SubText>
													<VerticalLine></VerticalLine>
													<SubText fontsize="1rem">
														{item.itemName}
													</SubText>
												</ItemTextWrap>
												<SubInfoWrap>
													<ProfileImg
														src={item.profileImgUrl}
													></ProfileImg>
													<SubText margin="0 "> {item.nickName}</SubText>
													<Dot></Dot>
													<SubText color="#8d8d8d">
														{' '}
														{item.uploadTime}
													</SubText>
												</SubInfoWrap>
											</LargeViewItem>
											<HorizontalLine></HorizontalLine>
										</>
									))}
								</>
							)}
						</LargeViewWrap>
					) : (
						<GridItemWrap>
							{searchResultList && (
								<>
									{searchResultList.map(item => (
										<>
											<GridItem
												onClick={() => {
													onDetailItemClick(item.itemIdx);
												}}
												key={item.itemIdx}
											>
												<GridImage src={item.itemImgUrl}>
													<ImageText>
														<SubText
															fontsize="0.8125rem"
															fontweight="bold"
															color="white"
														>
															{item.name}'s
														</SubText>
														<BinderWhite
															style={{
																width: '1.375rem',
																height: '1.375rem',
															}}
														/>
													</ImageText>
												</GridImage>
												<SubText
													fontsize="1rem"
													fontweight="bold"
													margin="0 0 0.375rem 0 "
												>
													{item.brandKr}
												</SubText>
												<SubText
													style={{
														textOverflow: 'ellipsis',
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														width: '100%',
													}}
												>
													{item.itemName}
												</SubText>
											</GridItem>
										</>
									))}
								</>
							)}
						</GridItemWrap>
					)}
				</ItemContainer>
			</FeedContainer>
			<SearchBottomSlideMenu
				childFunc={childFunc}
				selectedTab={selectedTab}
				getSelectedTab={getSelectedTab}
				getSelectedItemFilter={getSelectedItemFilter}
				getSelectedPriceFilter={getSelectedPriceFilter}
				getSelectedAlignFilter={getSelectedAlignFilter}
				getSelectedColorFilter={getSelectedColorFilter}
				getIsSelected={getIsSelected}
			></SearchBottomSlideMenu>
		</MainContainer>
	);
}

const FilterContainer = styled.div`
	display: flex;
	flex-shrink: 0;
	flex-grow: 1;
	overflow-x: scroll;
	flex-direction: row;
	align-items: center;
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
	border: ${props => (props.selected ? 'solid 1px #9E30F4' : 'solid 1px #d9d9d9')};
	background-color: ${props => (props.selected ? '#9E30F4' : 'white')};
	margin-right: 0.5rem;
	font-family: Pretendard;
	font-size: 0.8125rem;
	font-weight: 600;
	color: ${props => (props.selected ? 'white' : '564B5C')};
	/* ${props => (props.selected ? 'white' : '564B5C')} */
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
	background-image: url(${props => props.src});
	background-size: cover;
	background-position: 50%;
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
