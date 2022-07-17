import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { customApiClient } from '../../utils/apiClient';

import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState, UploadPopupState } from '../../recoil/BottomNav';
import { Input } from '../../components/Input';
import Slider from 'react-slick';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ReactComponent as UpArrow } from '../../assets/Icons/upArrow.svg';
import { ReactComponent as DownArrow } from '../../assets/Icons/downArrow.svg';
import { ReactComponent as X } from '../../assets/Icons/TagDeleteX.svg';
import { ReactComponent as IconUploadItem } from '../../assets/Icons/bottom_nav_upload_item.svg';
import { ReactComponent as IconUploadQuestion } from '../../assets/Icons/bottom_nav_upload_question.svg';
import { UploadPopup, UploadPopupWrap } from '../home';
import { useNavigate } from 'react-router-dom';
import { ToastMessageBottomPositionState, ToastMessageState, ToastMessageStatusState, ToastMessageWrapStatusState } from '../../recoil/ToastMessage';

export default function Search() {
	const navigate = useNavigate();

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
	const getHotSearchList = async () => {
		// 팔로잉 버튼 클릭(언팔)
		const data = await customApiClient('get', '/search/hot-ranking');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('getHotSearchList', data.result);
		setHotSearchList(data.result);
		let standarddate = data.result[0].standard;
		standarddate = standarddate.replaceAll('-', '.');
		console.log('date changed to ', standarddate);
		setRankDate(standarddate);
	};

	const [hotKeywordList, setHotKeywordList] = useState([]);
	const getHotKeywordList = async () => {
		// 팔로잉 버튼 클릭(언팔)
		const data = await customApiClient('get', '/search/hot-searchword');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('getHotKeywordList', data.result);
		setHotKeywordList(data.result);
	};

	const [recentSearchList, setRecentSearchList] = useState([]);
	const getRecentSearchList = async () => {
		// 팔로잉 버튼 클릭(언팔)
		const data = await customApiClient('get', '/search/recent');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('getRecentSearchList', data.result);
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
		console.log('getRecentSearchList', data.result);
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
		console.log('getRecentSearchList', data.result);
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
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
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
					<IconWrap>
						<SearchIcon />
					</IconWrap>
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
							<Delete />
						</IconWrap>
					) : (
						<></>
					)}
				</InputWrap>
			</div>
			<FeedContainer>
				{searchInput.length === 0 ? (
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
													<div key={rank.searchWord}>
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
										<CollapsedRow style={{ marginBottom: '0.625rem' }}>
											<div>
												<SubText
													fontsize="0.875rem"
													fontweight="bold"
													margin="0 1rem 0 0"
												>
													HOT 랭킹
												</SubText>
												<SubText fontweight="normal">
													{rankDate && <>{rankDate}</>}
												</SubText>
											</div>
											<UpArrow
												onClick={() => setIsCollapsed(!isCollapsed)}
												style={{ width: '1.125rem', height: '1.125rem' }}
											></UpArrow>
										</CollapsedRow>
										<Slider {...settings}>
											{/* {hotSearchList && ( */}
											<div>
												{hotSearchList.slice(0, 5).map((rank, index) => (
													<EachRank
														key={index}
														onClick={() =>
															onClickKeyword(rank.searchWord)
														}
													>
														<SubText
															fontsize="0.875rem"
															fontweight="bold"
															color="#9e30f4"
															margin="1rem 1rem 1rem 0"
														>
															{index + 1}
														</SubText>
														<SubText
															fontsize="0.875rem"
															fontweight="600"
															margin="16px 0"
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
																	onClickKeyword(rank.searchWord)
																}
															>
																<SubText
																	key={index}
																	fontsize="0.875rem"
																	fontweight="bold"
																	color="#9e30f4"
																	margin="1rem 1rem 1rem 0"
																>
																	{index + 6}
																</SubText>
																<SubText
																	fontsize="0.875rem"
																	fontweight="600"
																	margin="16px 0"
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
												onClick={() => onClickKeyword(keyword.searchWord)}
											>
												# {keyword.searchWord}
											</HashTag>
										))}
									</>
								)}
							</HashTagWrap>
						</HotKeyword>
					</SearchBottom>
				) : (
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
				)}
			</FeedContainer>

			{/* 업로드 팝업 모달 */}
			<UploadPopupWrap openStatus={uploadPopupStatus}>
				<UploadPopup>
					<div onClick={() => navigate('/upload/item')} className="uploadPopupBtn topBtn">
						<IconUploadItem
							style={{
								width: '1.125rem',
								height: '1.125rem',
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
	border-radius: 0.8125rem;
	padding: 1rem;
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
	height: 100vh;
	overflow-y: scroll;
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
	/* display: flex; */
	align-items: center;
	background-color: #fbf6ff;
	box-sizing: border-box;
	border-radius: 1rem;
	height: ${props => (props.collapsed ? '3.5625rem' : '100%')};
	overflow: hidden;
	padding: 1.25rem;
	transition: all 0.3s ease-out;
	.slick-dots li.slick-active button:before {
		color: #9e30f4;
	}
`;
const CollapsedRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	align-items: center;
`;
const EachRank = styled.div`
	margin: 1rem 0;
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
