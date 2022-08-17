import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { customApiClient } from '../../utils/apiClient';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ImageText } from '../../components/ImageText';
import { GridImage } from '../../components/GridItems/GridImage';
import { BottomNavState, UploadPopupState } from '../../recoil/BottomNav';
import { Input } from '../../components/Input';
import Slider from 'react-slick';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ReactComponent as UpArrow } from '../../assets/Icons/upArrow.svg';
import { ReactComponent as DownArrow } from '../../assets/Icons/downArrow.svg';
import { ReactComponent as X } from '../../assets/Icons/TagDeleteX.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as IconUploadItem } from '../../assets/Icons/bottom_nav_upload_item.svg';
import { ReactComponent as IconUploadQuestion } from '../../assets/Icons/bottom_nav_upload_question.svg';
import { ReactComponent as PinkBinder } from '../../assets/Binder/PinkBinder.svg';
import { ReactComponent as YellowBinder } from '../../assets/Binder/YellowBinder.svg';
import { ReactComponent as GreenBinder } from '../../assets/Binder/GreenBinder.svg';
import { ReactComponent as BlueBinder } from '../../assets/Binder/BlueBinder.svg';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { ReactComponent as PlusButton } from '../../assets/Icons/plusButton.svg';
import { UploadPopup, UploadPopupWrap } from '../home';
import { useNavigate } from 'react-router-dom';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';

export default function Search() {
	const navigate = useNavigate();
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);
	const [uploadPopupStatus, setUploadPopupStatus] = useRecoilState(UploadPopupState);

	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [rankDate, setRankDate] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [isCollapsed, setIsCollapsed] = useState(true);

	const [hotSearchList, setHotSearchList] = useState([]);
	// const hotSearchList = [
	// 	{
	// 		searchWord: '에스파 윈터',
	// 		standard: '2022-07-13 17:00 기준',
	// 		count: 1,
	// 	},
	// 	// {
	// 	// 	searchWord: '카리나 치마',
	// 	// 	standard: '2022-07-13 17:00 기준',
	// 	// 	count: 1,
	// 	// },
	// 	// {
	// 	// 	searchWord: '블랙핑크 제니',
	// 	// 	standard: '2022-07-13 17:00 기준',
	// 	// 	count: 1,
	// 	// },
	// 	// {
	// 	// 	searchWord: '카리나',
	// 	// 	standard: '2022-07-13 17:00 기준',
	// 	// 	count: 1,
	// 	// },
	// 	// {
	// 	// 	searchWord: '강다니엘 셔츠',
	// 	// 	standard: '2022-07-13 17:00 기준',
	// 	// 	count: 1,
	// 	// },
	// 	// {
	// 	// 	searchWord: '리사',
	// 	// 	standard: '2022-07-13 17:00 기준',
	// 	// 	count: 1,
	// 	// },
	// 	// {
	// 	// 	searchWord: '윈터',
	// 	// 	standard: '2022-07-13 17:00 기준',
	// 	// 	count: 1,
	// 	// },
	// 	// {
	// 	// 	searchWord: '에스파',
	// 	// 	standard: '2022-07-13 17:00 기준',
	// 	// 	count: 1,
	// 	// },
	// 	// {
	// 	// 	searchWord: '제니 가방',
	// 	// 	standard: '2022-07-13 17:00 기준',
	// 	// 	count: 1,
	// 	// },
	// 	// {
	// 	// 	searchWord: '블랙핑크',
	// 	// 	standard: '2022-07-13 17:00 기준',
	// 	// 	count: 1,
	// 	// },
	// ];
	const [latestViewList, setLatestViewList] = useState([]);
	const [binderList, setBinderList] = useState([]);
	const [openState, setOpenState] = useState(false); // 바인더 클릭 시 하단바 status
	const [viewIsDibList, setviewIsDibList] = useState([]);
	const [selectedItemIdx, setSelectedItemIdx] = useState(0);

	const getLatestViewList = async () => {
		// 최근본 게시물
		const data = await customApiClient('get', '/my-page/recents');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setLatestViewList(data.result.recentItemList.slice(0, 10));
		var tmp = [];
		for (var i = 0; i < data.result.recentItemList.length; i++) {
			if (data.result.recentItemList[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		setviewIsDibList([...tmp]);
	};
	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
	};

	// 바인더 관련 코드
	const getBinderList = async () => {
		const data = await customApiClient('get', '/binders');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setBinderList(data.result);
	};
	const onCreateBinder = itemIdx => {
		navigate('/binder/add', {
			state: { item: itemIdx },
		});
		setBottomMenuStatusState(false);
	};
	//바인더에 추가
	const onSelectBinder = (binderIdx, itemIdx) => {
		for (var i = 0; i < binderList.length; i++) {
			if (binderList[i].binderIdx === binderIdx) {
				if (itemIdx === selectedItemIdx) {
					addToBinderAPI(selectedItemIdx, binderIdx, binderList[i].name);
				}
			}
		}
	};
	//바인더에서 삭제
	const onDeleteBinderClick = (e, itemIdx) => {
		e.stopPropagation();
		DeleteFromBinderAPI(itemIdx);
	};

	async function addToBinderAPI(itemIdx, binderIdx, binderName) {
		const body = {
			itemIdx: itemIdx,
			binderIdx: binderIdx,
		};
		console.log(body);
		const Uri = '/dibs';
		const data = await customApiClient('post', Uri, body);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		var tmp = viewIsDibList;
		for (var i = 0; i < viewIsDibList.length; i++) {
			if (latestViewList[i]) {
				if (latestViewList[i].itemIdx === itemIdx) {
					tmp[i] = !tmp[i];
					setviewIsDibList([...tmp]);
				}
			}
		}
		setOpenState(false);
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`아이템이 ${binderName} 바인더에 저장됐어요`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	}
	async function DeleteFromBinderAPI(itemIdx) {
		const Uri = `/dibs/${itemIdx}`;
		const data = await customApiClient('delete', Uri);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		var tmp = viewIsDibList;
		for (var i = 0; i < viewIsDibList.length; i++) {
			if (latestViewList[i]) {
				if (latestViewList[i].itemIdx === itemIdx) {
					tmp[i] = !tmp[i];
					setviewIsDibList([...tmp]);
				}
			}
		}
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`아이템이 바인더에서 삭제됐어요`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	}

	const onAddEachBinderClick = (e, itemIdx) => {
		e.stopPropagation();
		getBinderList();
		setOpenState(true);
		setSelectedItemIdx(itemIdx);
	};
	const getOpenStatus = input => {
		setOpenState(input);
	};
	///////////////////////////////////////////////////////////////////////////////
	const getHotSearchList = async () => {
		const data = await customApiClient('get', '/search/hot-ranking');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setHotSearchList(data.result);
		let standarddate = data.result[0].standard;
		standarddate = standarddate.replaceAll('-', '.');
		setRankDate(standarddate);
	};

	const [hotKeywordList, setHotKeywordList] = useState([]);
	const getHotKeywordList = async () => {
		const data = await customApiClient('get', '/search/hot-searchword');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setHotKeywordList(data.result);
	};

	const [recentSearchList, setRecentSearchList] = useState([]);
	const getRecentSearchList = async () => {
		const data = await customApiClient('get', '/search/recent');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setRecentSearchList(data.result);
	};
	const onDeleteAll = () => {
		deleteAllRecentSearch();
	};
	const deleteAllRecentSearch = async () => {
		const data = await customApiClient('delete', '/search/recent');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setRecentSearchList([]);
	};
	const onDeleteEach = (searchidx, idx) => {
		let temp = recentSearchList;
		temp.splice(idx, 1);
		console.log(temp);
		setRecentSearchList([...temp]);
		deleteEachRecentSearch(searchidx);
	};
	const deleteEachRecentSearch = async searchidx => {
		const data = await customApiClient('delete', `/search/recent/${searchidx}`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
	};

	const onHandleChangeSearch = e => {
		setSearchInput(e.target.value);
		const value = e.target.value;
	};
	const onClickInputDelete = () => {
		setSearchInput('');
	};
	const handleEnterEvent = () => {
		if (window.event.keyCode === 13) {
			navigate(`/search/result`, { state: { searchInput } });
		}
	};

	const onClickKeyword = searchInput => {
		navigate(`/search/result`, { state: { searchInput } });
	};

	const settings = {
		dots: true,
		fade: false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: 'linear',
		arrows: false,
	};
	const verticalsettings = {
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		swipeToSlide: true,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		cssEase: 'linear',
		arrows: false,
	};
	const onClickUploadQuestion = () => {
		setUploadPopupStatus(false);
		setToastMessageBottomPosition('4rem');
		setToastMessage('준비 중이에요. 조금만 기다려주세요!');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);

		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	};

	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(true);
		getHotSearchList();
		getHotKeywordList();
		getRecentSearchList();
		getLatestViewList();
	}, []);

	return (
		<MainContainer padding="0 0 3.125rem 0">
			<TopNav style={{ height: '3.0625rem' }}>
				<SubText fontsize="1.125rem" fontweight="bold" className="centerText">
					검색
				</SubText>
			</TopNav>
			<div style={{ padding: '0.5rem 1.25rem' }}>
				<InputWrap>
					<SearchIcon
						style={{ width: '1.125rem', height: '1.125rem', flexShrink: '0' }}
					/>
					<Input
						onKeyUp={handleEnterEvent}
						value={searchInput}
						onChange={onHandleChangeSearch}
						type="text"
						placeholder="셀럽과 아이템을 검색해 보세요"
						margin="0 0 0 0.375rem"
					/>
					{searchInput.length !== 0 ? (
						<IconWrap onClick={onClickInputDelete}>
							<Delete style={{ width: '1.125rem', height: '1.125rem' }} />
						</IconWrap>
					) : (
						<></>
					)}
				</InputWrap>
			</div>

			{searchInput.length === 0 ? (
				<>
					<FeedContainer>
						<SearchBottom>
							<HotSearchWrap>
								<HotSearch collapsed={isCollapsed}>
									{isCollapsed ? (
										<CollapsedRow>
											<SubText
												fontsize="0.875rem"
												fontweight="bold"
												margin="0 0.25rem 0 0"
											>
												HOT
											</SubText>
											<div
												style={{
													flexDirection: 'column',
													width: '75%',
													alignItems: 'center',
												}}
											>
												<Slider {...verticalsettings}>
													{hotSearchList.map((rank, index) => (
														<div
															key={rank.searchWord}
															onClick={() =>
																onClickKeyword(rank.searchWord)
															}
														>
															<SubText
																fontsize="0.875rem"
																fontweight="bold"
																color="#9e30f4"
																margin="0 0.5rem 0 0"
															>
																{index + 1}
															</SubText>
															<SubText
																fontsize="0.875rem"
																fontweight="600"
															>
																{rank.searchWord}
															</SubText>
														</div>
													))}
												</Slider>
											</div>

											<DownArrow
												onClick={() => setIsCollapsed(!isCollapsed)}
												style={{
													width: '1.125rem',
													height: '1.125rem',
												}}
											></DownArrow>
										</CollapsedRow>
									) : (
										<>
											<CollapsedRow style={{ marginBottom: '1.125rem' }}>
												<div>
													<SubText
														fontsize="0.875rem"
														fontweight="bold"
														margin="0 0.625rem 0 0"
													>
														HOT 랭킹
													</SubText>
													<SubText fontweight="normal" color="#8d8d8d">
														{rankDate && <>{rankDate}</>}
													</SubText>
												</div>
												<UpArrow
													onClick={() => setIsCollapsed(!isCollapsed)}
													style={{
														width: '1.125rem',
														height: '1.125rem',
													}}
												></UpArrow>
											</CollapsedRow>
											<Slider {...settings}>
												{/* {hotSearchList && ( */}
												<div>
													{hotSearchList
														.slice(0, 5)
														.map((rank, index) => (
															<EachRank
																key={index}
																onClick={() =>
																	onClickKeyword(rank.searchWord)
																}
															>
																<div
																	style={{
																		width: '1.625rem',
																	}}
																>
																	<SubText
																		fontsize="0.875rem"
																		fontweight="bold"
																		color="#9e30f4"
																		margin="0.5rem 0"
																	>
																		{index + 1}
																	</SubText>
																</div>

																<SubText
																	fontsize="0.875rem"
																	fontweight="600"
																	margin="0.5rem 0"
																>
																	{rank.searchWord}
																</SubText>
															</EachRank>
														))}
												</div>
												{hotSearchList.length > 5 && (
													<div>
														{hotSearchList
															.slice(5, 10)
															.map((rank, index) => (
																<EachRank
																	key={index}
																	onClick={() =>
																		onClickKeyword(
																			rank.searchWord
																		)
																	}
																>
																	<div
																		style={{
																			width: '1.625rem',
																		}}
																	>
																		<SubText
																			fontsize="0.875rem"
																			fontweight="bold"
																			color="#9e30f4"
																			margin="0.5rem 0"
																		>
																			{index + 6}
																		</SubText>
																	</div>

																	<SubText
																		fontsize="0.875rem"
																		fontweight="600"
																		margin="0.5rem 0"
																	>
																		{rank.searchWord}
																	</SubText>
																</EachRank>
															))}
													</div>
												)}

												{/* )} */}
											</Slider>
										</>
									)}
								</HotSearch>
							</HotSearchWrap>
							<HotKeyword>
								<MainText fontsize="1.25rem" margin="0 0 0.25rem 0">
									인기 검색어
								</MainText>
								<HashTagWrap>
									{hotKeywordList && (
										<>
											{hotKeywordList.map(keyword => (
												<HashTag
													onClick={() =>
														onClickKeyword(keyword.searchWord)
													}
												>
													# {keyword.searchWord}
												</HashTag>
											))}
										</>
									)}
								</HashTagWrap>
							</HotKeyword>
						</SearchBottom>
					</FeedContainer>
					{latestViewList.length > 0 && (
						<MyUploadWrap>
							<div className="titleWrap">
								<MainText fontweight="bold" fontsize="1.125rem">
									최근 본 게시글
								</MainText>
							</div>
							<div className="contentWrap">
								{latestViewList.map((item, index) => (
									<MyPageGridItem
										key={item.itemIdx}
										onClick={() => onDetailItemClick(item.itemIdx)}
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
												{viewIsDibList[index] === true ? (
													<BinderRed
														onClick={e =>
															onDeleteBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												) : (
													<BinderWhite
														onClick={e =>
															onAddEachBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												)}
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
									</MyPageGridItem>
								))}
							</div>
						</MyUploadWrap>
					)}
				</>
			) : (
				<FeedContainer>
					<SearchBottom>
						<RecentSearchTextWrap>
							<MainText fontsize="1.25rem">최근 검색어</MainText>
							<SubText
								onClick={() => onDeleteAll()}
								color="#8D8D8D"
								fontweight="normal"
							>
								전체삭제
							</SubText>
						</RecentSearchTextWrap>
						<RecentKeywordWrap>
							{recentSearchList.length > 0 ? (
								<>
									{recentSearchList.map((search, index) => (
										<Keyword key={search.recentSearchIdx}>
											<SubText
												fontsize="0.875rem"
												fontweight="600"
												margin="0 0.5rem 0 0"
												onClick={() => onClickKeyword(search.searchWord)}
											>
												{search.searchWord}
											</SubText>
											<X
												onClick={() =>
													onDeleteEach(search.recentSearchIdx, index)
												}
												style={{ width: '1.125rem', height: '1.125rem' }}
											></X>
										</Keyword>
									))}
								</>
							) : (
								<div
									style={{
										display: 'flex',
										width: '100%',
										height: '3.125rem',
										justifyContent: 'center',
									}}
								>
									<SubText
										fontsize="0.875rem"
										fontweight="normal"
										margin="0 0.5rem 0 0"
									>
										최근 검색어가 없습니다
									</SubText>
								</div>
							)}
						</RecentKeywordWrap>
					</SearchBottom>
				</FeedContainer>
			)}

			<BottomSlideMenu open={openState} getOpenStatus={getOpenStatus}>
				<RowWrap
					style={{ marginBottom: '0' }}
					onClick={() => onCreateBinder(selectedItemIdx)}
				>
					<ImageWrap>
						<PlusButton></PlusButton>
					</ImageWrap>
					<SubText fontsize="1rem" margin="0.9375rem 0">
						바인더 만들기
					</SubText>
				</RowWrap>
				<HorizontalLine
					style={{ marginLeft: '1.25rem', marginRight: '1.25rem' }}
				></HorizontalLine>
				<BinderOverflow>
					{binderList.map(binder => (
						<RowWrap
							key={binder.name}
							onClick={() => onSelectBinder(binder.binderIdx, selectedItemIdx)}
						>
							{binder.coverImgUrl ? (
								<ImageWrap src={binder.coverImgUrl}></ImageWrap>
							) : (
								<>
									{!binder.isBasic ? (
										<PinkBinder
											style={{
												width: '3.75rem',
												height: '3.75rem',
												marginRight: '1.25rem',
												borderRadius: '1rem',
											}}
										></PinkBinder>
									) : (
										<>
											{binder.binderIdx % 3 === 0 ? (
												<YellowBinder
													style={{
														width: '3.75rem',
														height: '3.75rem',
														marginRight: '1.25rem',
														borderRadius: '1rem',
													}}
												></YellowBinder>
											) : (
												<>
													{binder.binderIdx % 3 === 1 ? (
														<GreenBinder
															style={{
																width: '3.75rem',
																height: '3.75rem',
																marginRight: '1.25rem',
																borderRadius: '1rem',
															}}
														></GreenBinder>
													) : (
														<BlueBinder
															style={{
																width: '3.75rem',
																height: '3.75rem',
																marginRight: '1.25rem',
																borderRadius: '1rem',
															}}
														></BlueBinder>
													)}
												</>
											)}
										</>
									)}
								</>
							)}
							<SubText fontsize="1rem" margin="0.9375rem 0">
								{binder.name}
							</SubText>
							<SubText fontweight="normal" fontsize="1rem" color="#8d8d8d">
								&nbsp;({binder.dibCount})
							</SubText>
						</RowWrap>
					))}
				</BinderOverflow>
			</BottomSlideMenu>

			{/* 업로드 팝업 모달 */}
			<UploadPopupWrap
				onClick={() => setUploadPopupStatus(false)}
				openStatus={uploadPopupStatus}
			>
				<UploadPopup>
					<div onClick={() => navigate('/upload/item')} className="uploadPopupBtn topBtn">
						<IconUploadItem
							style={{
								width: '1.125rem',
								height: '1.125rem',
								marginLeft: '0.375rem',
								marginRight: '0.5rem',
							}}
						/>
						<span>정보 공유하기</span>
					</div>
					<div onClick={onClickUploadQuestion} className="uploadPopupBtn bottomBtn">
						<IconUploadQuestion
							style={{
								width: '1.125rem',
								height: '1.125rem',
								marginLeft: '0.375rem',
								marginRight: '0.5rem',
							}}
						/>
						<span>질문 올리기</span>
					</div>
					<div
						style={{
							width: '1.25rem',
							height: '1.25rem',
							backgroundColor: '#9e30f4',
							position: 'absolute',
							left: '50%',
							transform: 'translate(-50%,0)',
							bottom: '-0.625rem',
							borderRadius: '50%',
						}}
					></div>
				</UploadPopup>
			</UploadPopupWrap>
		</MainContainer>
	);
}

export const InputWrap = styled.div`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	border-radius: 0.8125rem;
	height: 3rem;
	padding-left: 1.1875rem;
	padding-right: 0.9375rem;
	border: solid 1px #c9c9c9;
	margin: ${props => props.margin || '0'};
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
`;

const SearchBottom = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.25rem 0 1.25rem 1.25rem;
`;

export const FeedContainer = styled.div`
	height: 100%;
	/* overflow-y: scroll; */
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;

const HotSearchWrap = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 100%;
	padding-right: 1.25rem;
	margin-bottom: 1.25rem;
`;
const HotSearch = styled.div`
	align-items: center;
	background-color: #fbf6ff;
	box-sizing: border-box;
	border-radius: 1rem;
	height: ${props => (props.collapsed ? '3.5625rem' : '16.4375rem')};
	overflow: hidden;
	padding: 1.25rem;
	transition: all 0.3s ease-out;
	.slick-dots li.slick-active button:before {
		color: #9e30f4;
		margin: 0;
	}
	.slick-dots {
		bottom: -2.5rem;
	}
	.slick-dots li {
		margin: 0;
	}
`;
const CollapsedRow = styled.div`
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	.slick-vertical .slick-slide {
		border: none;
	}
`;
const EachRank = styled.div`
	display: flex;
	box-sizing: border-box;
	flex-grow: 0;
	align-items: center;
`;
const HotKeyword = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1.25rem 0;
`;

const HashTagWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding-top: 0.25rem;
	width: 100%;
`;
const HashTag = styled.div`
	padding: 0.625rem 1rem;
	border: 1px solid #ede4f4;
	border-radius: 8rem;
	margin: 0.375rem 0.5rem 0.375rem 0;
	font-size: 0.875rem;
	font-weight: 600;
	font-family: Pretendard;
	color: #564b5c;
`;

const RecentSearchTextWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-right: 1.25rem;
`;
const RecentKeywordWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	overflow-x: scroll;
	white-space: nowrap;
	margin-top: 1rem;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const Keyword = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	box-sizing: border-box;
	height: 2.375rem;
	padding: 0.6875rem 1rem;
	border-radius: 8rem;
	border: solid 1px #f8f7fa;
	background-color: #f8f7fa;
	margin-right: 0.5rem;
`;

export const IconWrap = styled.div.attrs(props => ({
	className: props.className,
}))`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${props => props.margin || '0'};
	${props =>
		props.button
			? `&:hover {
			cursor: pointer;
		}`
			: ''};
`;
const MyUploadWrap = styled.div`
	margin-bottom: 1.25rem;

	.titleWrap {
		padding: 0;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.875rem;
		margin-left: 1.25rem;
	}
	.contentWrap {
		display: flex;
		flex-direction: row;
		padding-left: 1.25rem;
		overflow-x: auto;
		::-webkit-scrollbar {
			display: none; /* for Chrome, Safari, and Opera */
		}
	}
`;
const MyPageGridItem = styled.div`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	width: 10.125rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 0.6875rem;
`;
const RowWrap = styled.div`
	display: flex;
	width: 100%;
	padding: 0 1.25rem;
	margin-bottom: 1rem;
	box-sizing: border-box;
	text-align: center;
	align-items: center;
`;
const ImageWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.75rem;
	height: 3.75rem;
	background: url(${props => props.src});
	background-position: 50%;
	background-size: cover;
	background-color: #f6f6f6;
	border-radius: 0.8125rem;
	margin-right: 1.25rem;
`;
const BinderOverflow = styled.div`
	max-height: 24.6875rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
