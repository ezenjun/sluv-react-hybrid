import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { Input } from '../../components/Input';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as RequestCelebIcon } from '../../assets/Icons/RequestCeleb.svg';
import { ReactComponent as RequestBubble } from '../../assets/Icons/RequestBubble.svg';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { customApiClient } from '../../utils/apiClient';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
	celebCategoryList,
	ChooseCelebCurrentPageState,
	FavoriteCelebListState,
	PopularCelebListState,
	TotalCelebListState,
} from '../../recoil/Celebrity';
import SelectMemberContainer from '../../components/containers/SelectMemberContainer';
import { BottomNavState } from '../../recoil/BottomNav';

export default function SelectCeleb() {
	const { state } = useLocation();

	const navigate = useNavigate();

	const [checkStatusList, setCheckStatusList] = useState([]);
	const [badgeNumList, setBadgeNumList] = useState([]);
	const [selectedGroups, setSelectedGroups] = useState([]);
	const [selectedCelebIdxArray, setSelectedCelebIdxArray] = useState([]);

	const [isCelebConfirm, setIsCelebConfirm] = useState(false);
	const [selectedNum, setSelectedNum] = useState(0);

	const [searchInput, setSearchInput] = useState('');
	const [currentCelebList, setCurrentCelebList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(1);
	const [searchFailStatus, setSearchFailStatus] = useState(false);

	const [popularCelebList, setPopularCelebList] = useRecoilState(PopularCelebListState);
	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const [totalCelebList, setTotalCelebList] = useRecoilState(TotalCelebListState);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [favoriteCelebList, setFavoriteCelebList] = useRecoilState(FavoriteCelebListState);

	useEffect(() => {
		// 하단바 사라지기
		setBottomNavStatus(false);
		// 선택한 관심셀럽 수 초기화
		setSelectedNum(0);

		setCurrentPage(0);

		// 셀럽 및 멤버 목록 조회 API 호출
		getCelebList();
		// if (totalCelebList.length < 1) {
		// 	getCelebList();
		// } else {
		// 	setCurrentCelebList(totalCelebList.filter(item => item.category === 'SINGER'));

		// 	let temp;
		// 	let temp2;
		// 	(temp = []).length = totalCelebList.length;
		// 	temp.fill(false);
		// 	temp2 = new Array(totalCelebList.length).fill(0);
		// 	setCheckStatusList(temp);
		// 	setBadgeNumList(temp2);
		// }
		// 다른 스러버들이 많이 추가한 셀럽 API 호출
		if (popularCelebList.length < 1) {
			getPopularCelebList();
		}
	}, []);

	useEffect(() => {
		let temp2;
		temp2 = new Array(totalCelebList.length).fill(0);
		setBadgeNumList(temp2);
		console.log(temp2);
	}, [totalCelebList]);

	useEffect(() => {
		if (selectedNum < 3) {
			setIsCelebConfirm(false);
			return;
		}
		setIsCelebConfirm(true);
	}, [selectedNum]);

	useEffect(() => {
		if (state === '/settings') {
			let tempBadgeNumList = badgeNumList;
			let cnt = 1;
			favoriteCelebList.map((favorite, index) => {
				tempBadgeNumList[
					totalCelebList.findIndex(item => item.celebIdx === favorite.celebIdx)
				] = cnt;
				cnt++;
			});
			setBadgeNumList(tempBadgeNumList);
		}
	}, [badgeNumList]);

	const getCelebList = async () => {
		const data = await customApiClient('get', '/celebs/members');

		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		if (state === '/settings') {
			const favoriteList = localStorage.getItem('favoriteCeleb');
			let temp = [];
			setFavoriteCelebList(JSON.parse(favoriteList));

			// tempBadgeNumList = badgeNumList;
			// tempBadgeNumList[totalCelebList.findIndex(item => item.celebIdx === celeb.celebIdx)] =
			// 	selectedNum + 1;
			// setBadgeNumList(tempBadgeNumList);

			let tempBadgeNumList = badgeNumList;
			let cnt = 1;

			JSON.parse(favoriteList).map((favorite, index) => {
				let favoriteTemp = data.result.find(item => item.celebIdx === favorite.celebIdx);
				onSelectCeleb(favoriteTemp);
				temp.push(favoriteTemp);
			});
			setSelectedNum(JSON.parse(favoriteList).length);
			let tempSet = new Set(temp.concat(data.result));

			setTotalCelebList(Array.from(tempSet));
			setCurrentCelebList(Array.from(tempSet).filter(item => item.category === 'SINGER'));
		} else {
			setTotalCelebList(data.result);
			setCurrentCelebList(data.result.filter(item => item.category === 'SINGER'));

			let temp;
			(temp = []).length = totalCelebList.length;
			temp.fill(false);
			setCheckStatusList(temp);
		}
	};

	const getPopularCelebList = async () => {
		const data = await customApiClient('get', '/interest/top-choice');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setPopularCelebList(data.result);
	};

	const onClickTab = (idx, name) => {
		let tempArr = [];
		if (idx === 1) {
			setSelectedCategory(1);
			tempArr = totalCelebList.filter(item => item.category === 'SINGER');
			setCurrentCelebList(tempArr);
		} else if (idx === 2) {
			setSelectedCategory(2);
			tempArr = totalCelebList.filter(item => item.category === 'ACTOR');
			setCurrentCelebList(tempArr);
		}
	};

	const onSelectCeleb = (celeb, index) => {
		let tempGroup = [];
		let tempWholeCeleb = [];
		let tempBadgeNumList = [];
		if (!checkStatusList[celeb.celebIdx - 1]) {
			setSelectedNum(selectedNum + 1);

			if (celeb.isGroup === 1) {
				tempGroup = selectedGroups;
				tempGroup.push(celeb);
				setSelectedGroups(tempGroup);
			}
			tempWholeCeleb = selectedCelebIdxArray;
			tempWholeCeleb.push({ celebIdx: celeb.celebIdx });
			setSelectedCelebIdxArray(tempWholeCeleb);

			tempBadgeNumList = badgeNumList;
			tempBadgeNumList[totalCelebList.findIndex(item => item.celebIdx === celeb.celebIdx)] =
				selectedNum + 1;
			setBadgeNumList(tempBadgeNumList);
		} else {
			setSelectedNum(selectedNum - 1);

			if (celeb.isGroup === 1) {
				tempGroup = selectedGroups;
				setSelectedGroups(tempGroup.filter(item => item.celebIdx !== celeb.celebIdx));
			}
			tempWholeCeleb = selectedCelebIdxArray;
			setSelectedCelebIdxArray(
				tempWholeCeleb.filter(item => item.celebIdx !== celeb.celebIdx)
			);

			tempBadgeNumList = badgeNumList;
			tempBadgeNumList.map((badgeNum, _index) => {
				if (
					badgeNum >
					tempBadgeNumList[
						totalCelebList.findIndex(item => item.celebIdx === celeb.celebIdx)
					]
				) {
					tempBadgeNumList[_index] = tempBadgeNumList[_index] - 1;
				}
			});
			setBadgeNumList(tempBadgeNumList);
		}
		let tempCheckList = checkStatusList;
		tempCheckList[celeb.celebIdx - 1] = !tempCheckList[celeb.celebIdx - 1];
		setCheckStatusList(tempCheckList);
	};

	const onPostFavoriteCelebs = async () => {
		const body = {
			celebMemberList: selectedCelebIdxArray,
		};
		const data = await customApiClient('post', '/interest', body);

		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}

		setFavoriteCelebList([]);
		setTotalCelebList([]);
		localStorage.removeItem('favoriteCeleb');
		console.log(data.message);
		navigate('/home');
	};

	const onHandleNextButton = () => {
		if (isCelebConfirm) {
			if (selectedGroups.length === 0) {
				onPostFavoriteCelebs();
			} else {
				setCurrentPage(currentPage + 1);
			}
		}
	};

	const onHandleChangeSearch = e => {
		setSearchInput(e.target.value);

		const value = e.target.value;

		const searchResult = totalCelebList.filter(data => {
			return data.name.includes(value);
		});

		if (searchResult.length > 0) {
			if (searchResult[0].category === 'SINGER') {
				setSelectedCategory(1);
			} else if (searchResult[0].category === 'ACTOR') {
				setSelectedCategory(2);
			}
			setSearchFailStatus(false);
		} else {
			setSearchFailStatus(true);
		}

		setCurrentCelebList(searchResult);
	};

	const onClickInputDelete = () => {
		setSearchInput('');
		setCurrentCelebList(totalCelebList);
		setSelectedCategory(1);
		setSearchFailStatus(false);
	};
	const listInnerRef = useRef();
	const [reachedBottom, setReachedBottom] = useState(false);
	const onScroll = () => {
		if (listInnerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
			if (scrollTop + clientHeight >= scrollHeight) {
				setReachedBottom(true);
			} else {
				setReachedBottom(false);
			}
		}
	};
	return (
		<>
			{currentPage === 0 && (
				<MainContainer>
					<TopNav style={{ justifyContent: 'space-between' }}>
						{state === '/settings' && <BackButton onClick={() => navigate(-1)} />}
						<NavRight style={{ alignItems: 'center' }}>
							{selectedNum > 0 && (
								<SubText fontsize="1rem" margin="0 1rem" color="#9e30f4">
									{selectedNum}개 선택
								</SubText>
							)}
							<NextButton
								fontsize="1rem"
								status={isCelebConfirm}
								onClick={onHandleNextButton}
							>
								다음
							</NextButton>
						</NavRight>
					</TopNav>

					<ContentWrap padding="0" onScroll={onScroll} ref={listInnerRef}>
						<TextWrap>
							<MainText fontsize="1.5rem" margin="1.625rem 0 0.5rem 0">
								좋아하는 셀럽 태그를
								<br />
								3개 이상 선택해주세요
							</MainText>
							<SubText
								color="#8d8d8d"
								fontsize="0.875rem"
								fontweight="regular"
								margin="0 0 1.25rem 0"
							>
								선택한 순서대로 더 빠른 정보를 제공받을 수 있어요!
							</SubText>
						</TextWrap>

						<SearchTab>
							<InputWrap>
								<SearchIcon
									style={{
										width: '1.125rem',
										height: '1.125rem',
										flexShrink: '0',
									}}
								/>
								<Input
									value={searchInput}
									onChange={onHandleChangeSearch}
									type="text"
									placeholder="활동명을 한글로 검색해주세요"
									margin="0 0 0 0.375rem"
								/>
								{searchInput.length !== 0 && (
									<IconWrap onClick={onClickInputDelete}>
										<Delete style={{ width: '1.125rem', height: '1.125rem' }} />
									</IconWrap>
								)}
							</InputWrap>
							<TabWrap>
								{celebCategoryList.map(item => {
									return (
										<Tab
											key={item.idx}
											onClick={() => onClickTab(item.idx, item.name)}
											status={selectedCategory === item.idx}
										>
											{item.name}
										</Tab>
									);
								})}
							</TabWrap>
						</SearchTab>

						{!searchFailStatus && (
							<ListContainer>
								{currentCelebList.length > 0 &&
									currentCelebList.map((celeb, index) => (
										<Celeb
											key={celeb.celebIdx}
											onClick={e => onSelectCeleb(celeb, index)}
										>
											<ImgCircle
												key={celeb.id}
												src={celeb.celebImgUrl}
												border={checkStatusList[celeb.celebIdx - 1]}
											/>
											{celeb.name}
											<CountBadge
												status={checkStatusList[celeb.celebIdx - 1]}
											>
												<span className="badgeItem">
													{
														badgeNumList[
															totalCelebList.findIndex(
																item =>
																	item.celebIdx === celeb.celebIdx
															)
														]
													}
												</span>
											</CountBadge>
										</Celeb>
									))}
							</ListContainer>
						)}

						{searchFailStatus && (
							<SearchFailContainer>
								<SearchFailDiv>
									<SubText
										color="#262626"
										fontsize="1rem"
										style={{ marginBottom: '0.5rem' }}
									>
										등록된 셀럽이 없어요
									</SubText>
									<SubText
										color="#8d8d8d"
										fontsize="0.875rem"
										fontweight="regular"
										style={{ textAlign: 'center', marginBottom: '1.25rem' }}
									>
										스럽에 추가 되었으면 하는
										<br />
										셀럽을 요청해 주세요!
									</SubText>

									<div
										className="requestCelebBtn"
										onClick={() => navigate('../../request/celebrity')}
									>
										셀럽 추가 요청하기
									</div>
								</SearchFailDiv>
								<PopularCelebContainer>
									<MainText fontsize="1.125rem" margin="0 0 0 1.25rem">
										스러버들이 많이 선택한 셀럽
									</MainText>
									<div className="popularCelebDiv">
										{popularCelebList.length > 0 &&
											popularCelebList.map((popular, index) => (
												<Celeb
													key={popular.celebIdx}
													onClick={e => onSelectCeleb(popular, index)}
													style={{ marginLeft: '0.6875rem' }}
												>
													<ImgCircle
														key={popular.id}
														src={popular.celebImgUrl}
														border={
															checkStatusList[popular.celebIdx - 1]
														}
													/>
													{popular.name}
													<CountBadge
														status={
															checkStatusList[popular.celebIdx - 1]
														}
													>
														<span className="badgeItem">
															{
																badgeNumList[
																	totalCelebList.findIndex(
																		item =>
																			item.celebIdx ===
																			popular.celebIdx
																	)
																]
															}
														</span>
													</CountBadge>
												</Celeb>
											))}
									</div>
								</PopularCelebContainer>
							</SearchFailContainer>
						)}

						{!searchFailStatus && (
							<>
								<RequestWrap>
									{reachedBottom ? (
										<RequestBubble
											style={{
												visibility: 'hidden',
												transition:
													'visibility 0s linear 300ms, opacity 300ms',
												opacity: '0',
												zIndex: '100000',
											}}
										></RequestBubble>
									) : (
										<RequestBubble
											style={{
												visibility: 'visible',
												transition:
													'visibility 0s linear 0s, opacity 300ms',
												opacity: '1',
												zIndex: '100000',
											}}
										></RequestBubble>
									)}

									<RequestButton
										onClick={() => navigate('../../request/celebrity')}
									>
										<RequestCelebIcon
											style={{ width: '1.5rem', height: '1.5rem' }}
										></RequestCelebIcon>
									</RequestButton>
								</RequestWrap>
							</>
						)}
					</ContentWrap>
				</MainContainer>
			)}

			{selectedNum && currentPage === 1 && (
				<MainContainer>
					<SelectMemberContainer
						data={selectedGroups}
						postIdxArray={selectedCelebIdxArray}
						setPostIdxArray={setSelectedCelebIdxArray}
					/>
				</MainContainer>
			)}
		</>
	);
}

export const RequestWrap = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: flex-end; */
	align-items: flex-end;
	position: absolute;
	right: 1rem;
	bottom: 1rem;
	/* transition: 0.3s ease-in-out; */
`;
export const RequestButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0.25rem 0.625rem 0 rgba(111, 32, 173, 0.3);
	width: 3.25rem;
	height: 3.25rem;
	border-radius: 50%;
	background-color: #9e30f4;
	margin: 0;
	z-index: 100000;
`;

export const BottomWrap = styled.div`
	box-sizing: border-box;
	padding: 0 20px;
`;
export const MembersContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	box-sizing: border-box;
	padding-right: 1.25rem;
	margin-top: 55px;
	overflow-x: scroll;
	overflow-y: hidden;
	height: 100%;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
export const RepeatWrap = styled.div`
	display: flex;
	position: relative;
	height: 370px;
`;

export const NavRight = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;
export const NextButton = styled.span`
	font-size: ${props => props.fontsize || '0.75rem'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => (props.status ? '#262626' : '#b1b1b1')};
	margin: ${props => props.margin || '0'};
	&:hover {
		cursor: pointer;
	}
`;

export const ListContainer = styled.div`
	display: grid;
	padding: 1rem 1.25rem 5.5rem;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: minmax(auto, auto);
	justify-content: center;
	gap: 16px 11px;
`;

export const TextWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${props => props.padding || '0 1.25rem'};
`;

export const SearchTab = styled.div`
	padding: 0 20px;
	background-color: white;
	position: sticky;
	top: 0;
	z-index: 10000;
`;
export const Celeb = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	font-size: 0.8125rem;
	font-weight: 700;
	color: #262626;
`;
export const CelebLeftTop = styled.div`
	position: relative;
	left: 1.25rem;
	font-size: 1rem;
`;
export const CelebRightTop = styled.div`
	position: relative;
	top: 4.6875rem;
	left: 1.125rem;
	font-size: 1rem;
`;
export const CelebLeftBottom = styled.div`
	position: absolute;
	left: 1.25rem;
	top: 10rem;
	font-size: 1rem;
`;
export const CelebRightBottom = styled.div`
	position: absolute;
	left: 10.625rem;
	top: 14.6875rem;
	font-size: 1rem;
`;
export const CelebNextLeftBottom = styled.div`
	position: relative;
	top: 10rem;
	left: 1.125rem;
	font-size: 1rem;
`;
export const CelebNextLeftTop = styled.div`
	position: absolute;
	left: 20rem;
	font-size: 1rem;
`;
export const CelebNextRightTop = styled.div`
	position: relative;
	left: 1.125rem;
	top: 4.6875rem;
	font-size: 1rem;
`;
export const CelebNextRightBottom = styled.div`
	position: absolute;
	top: 14.6875rem;
	left: 29.375rem;
	font-size: 1rem;
`;

export const ImgCircle = styled.div`
	background: url(${props => props.src});
	width: ${props => props.size || '6.25rem'};
	height: ${props => props.size || '6.25rem'};
	background-size: cover;
	background-position: 50%;
	background-repeat: no-repeat;
	border-radius: 50%;
	margin-bottom: 0.5rem;
	border: ${props => (props.border ? '0.1875rem solid #9e30f4' : 'none')};
	box-sizing: border-box;

	&:hover {
		cursor: pointer;
	}
	@media screen and (max-width: 350px) {
		width: 5.3125rem;
		height: 5.3125rem;
		margin-bottom: 0.375rem;
	}
	@media screen and (max-width: 320px) {
		width: 4.375rem;
		height: 4.375rem;
		margin-bottom: 0.3125rem;
	}
`;

export const Image = styled.div`
	position: relative;
	width: ${props => props.size || '6.25rem'};
	height: ${props => props.size || '6.25rem'};
	overflow: hidden;

	display: flex;

	justify-content: center;
	align-items: flex-end;
	color: white;
	border-radius: 50%;
	margin-bottom: 0.5rem;
	box-sizing: border-box;
	border: ${props => (props.border ? '0.1875rem solid #9e30f4' : 'none')};

	&:hover {
		cursor: pointer;
	}
	@media screen and (max-width: 350px) {
		width: 5.3125rem;
		height: 5.3125rem;
		margin-bottom: 0.375rem;
	}
	@media screen and (max-width: 320px) {
		width: 4.375rem;
		height: 4.375rem;
		margin-bottom: 0.3125rem;
	}
	.celebImg {
		position: absolute;
		top: -9999px;
		left: -9999px;
		right: -9999px;
		bottom: -9999px;
		margin: auto;
	}
`;

export const CountBadge = styled.span`
	border: 1px solid black;
	position: absolute;
	top: ${props => props.location || '0.4375rem'};
	right: ${props => props.location || '0.4375rem'};
	display: ${props => (props.status ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	background-color: #9e30f4;
	border: none;
	color: #ffffff;
	font-size: 0.8125rem;
	font-weight: 700;
	border-radius: 50%;
	width: 1.5rem;
	height: 1.5rem;
	z-index: 5000;
`;

export const InputWrap = styled.div`
	display: flex;
	align-items: center;
	border-radius: 0.625rem;
	padding: 16px;
	border: solid 1px #c9c9c9;
	margin: ${props => props.margin || '0'};
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
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

export const TabWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1rem 0 0.75rem;
`;

export const Tab = styled.div`
	background-color: ${props => (props.status ? '#2b1e34' : 'white')};
	color: ${props => (props.status ? 'white' : '#2b1e34')};
	border: ${props => (props.status ? 'none' : '1px solid #E2E0E0')};
	border-radius: 1.875rem;
	font-size: 0.875rem;
	font-weight: bold;
	padding: 0.625rem 1rem;
	margin: 0 0.375rem;
	&:hover {
		cursor: pointer;
	}
`;

export const SearchFailContainer = styled.div`
	margin-top: 3rem;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

export const SearchFailDiv = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.5rem;

	.requestCelebBtn {
		border-radius: 34.6px;
		background-color: #f5eafe;
		color: #9e30f4;
		padding: 0.625rem 1.625rem;
		font-size: 0.875rem;
		font-weight: 600;
	}
`;

export const PopularCelebContainer = styled.div`
	margin-bottom: 0.9375rem;

	.popularCelebDiv {
		overflow-x: scroll;
		margin-top: 1.25rem;
		display: flex;
		padding: 0 0.5625rem;

		::-webkit-scrollbar {
			display: none; /* for Chrome, Safari, and Opera */
		}
	}
`;
