import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';
import { customApiClient } from '../../utils/apiClient';

import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../components/Lines/VerticalLine';
import { SubText } from '../../components/Texts/SubText';

import { LargeViewWrap } from '../../components/LargeViewWrap/LargeViewWrap';
import { LargeViewItem } from '../../components/LargeViewWrap/LargeViewItem';
import { LargeViewImage } from '../../components/LargeViewWrap/LargeViewImage';

import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridImage } from '../../components/GridItems/GridImage';
import { ImageText } from '../../components/ImageText';

import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { ReactComponent as PinkBinder } from '../../assets/Binder/PinkBinder.svg';
import { ReactComponent as YellowBinder } from '../../assets/Binder/YellowBinder.svg';
import { ReactComponent as GreenBinder } from '../../assets/Binder/GreenBinder.svg';
import { ReactComponent as BlueBinder } from '../../assets/Binder/BlueBinder.svg';

import { ReactComponent as PlusButton } from '../../assets/Icons/plusButton.svg';
import { ReactComponent as NoItem } from '../../assets/Icons/noItemIcon.svg';
import { ReactComponent as FilterSmall } from '../../assets/Icons/filterSmall.svg';
import { ReactComponent as FilterBig } from '../../assets/Icons/filterBig.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';

export default function HotItem() {
	const navigate = useNavigate();
	const [latestList, setLatestList] = useState([]);
	const [hotList, setHotList] = useState([]);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
	};
	// 최신순/ 인기순

	const [selectedFilter, setSelectedFilter] = useState(1);
	const filterList = [
		{
			idx: 1,
			name: '일간',
		},
		{
			idx: 2,
			name: '주간',
		},
	];

	const onFilterClick = idx => {
		setSelectedFilter(idx);
		if (idx === 1) {
			setCurrentList(latestList);
		}
		if (idx === 2) {
			setCurrentList(hotList);
		}
	};

	const [view, setView] = useState(true); //view = true 크게보기  false = 작게보기
	const changeView = () => {
		setView(!view);
	};
	const backClick = () => {
		navigate(-1);
	};

	const [binderList, setBinderList] = useState([]);
	const getBinderList = async () => {
		const data = await customApiClient('get', '/binders');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setBinderList(data.result);
	};
	const [openState, setOpenState] = useState(false);
	const onCreateBinder = itemIdx => {
		navigate('/binder/add', {
			state: { item: itemIdx },
		});
	};
	const [selectedItemIdx, setSelectedItemIdx] = useState(0);

	const [latestIsBinderList, setLatestIsBinderList] = useState([]);
	const [hotIsBinderList, setHotIsBinderList] = useState([]);

	const onAddBinderClick = (e, itemIdx) => {
		e.stopPropagation();
		getBinderList();
		setOpenState(true);
		setSelectedItemIdx(itemIdx);
		// setBottomMenuStatusState(true);
	};
	const getOpenStatus = input => {
		setOpenState(input);
	};
	// console.log('셀렉트아이템인덱스', selectedItemIdx);
	const onSelectBinder = binderIdx => {
		for (var i = 0; i < binderList.length; i++) {
			if (binderList[i].binderIdx === binderIdx) {
				addToBinderAPI(selectedItemIdx, binderIdx, binderList[i].name);
			}
		}
	};
	const onDeleteBinderClick = (itemIdx, e) => {
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
		console.log('latestIsBinderList', latestIsBinderList);
		let tempLatest = latestIsBinderList;
		for (var i = 0; i < latestIsBinderList.length; i++) {
			if (latestList[i]) {
				if (latestList[i].itemIdx === selectedItemIdx) {
					tempLatest[i] = !tempLatest[i];
					setLatestIsBinderList([...tempLatest]);
				}
			}
		}
		console.log('tempLatest', tempLatest);
		let tempHot = hotIsBinderList;
		for (var k = 0; k < hotIsBinderList.length; k++) {
			if (hotList[k]) {
				if (hotList[k].itemIdx === selectedItemIdx) {
					tempHot[k] = !tempHot[k];
					setHotIsBinderList([...tempHot]);
				}
			}
		}
		console.log('tempHot', tempHot);
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
		let tempLatest = latestIsBinderList;
		for (var i = 0; i < latestIsBinderList.length; i++) {
			if (latestList[i]) {
				if (latestList[i].itemIdx === itemIdx) {
					tempLatest[i] = !tempLatest[i];
					setLatestIsBinderList([...tempLatest]);
				}
			}
		}
		console.log('tempLatest', tempLatest);
		let tempHot = hotIsBinderList;
		for (var k = 0; k < hotIsBinderList.length; k++) {
			if (hotList[k]) {
				if (hotList[k].itemIdx === itemIdx) {
					tempHot[k] = !tempHot[k];
					setHotIsBinderList([...tempHot]);
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

	const [CurrentList, setCurrentList] = useState([]);
	const getTotalLatestList = async () => {
		const data = await customApiClient('get', `/homes/hot-items?period=daily`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setLatestList(data.result);
		setCurrentList(data.result);
		var tmp = [];
		for (var i = 0; i < data.result.length; i++) {
			if (data.result[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		setLatestIsBinderList([...tmp]);
	};
	const getTotalHotList = async () => {
		const data = await customApiClient('get', `/homes/hot-items?period=weekly`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setHotList(data.result);
		var tmp = [];
		for (var i = 0; i < data.result.length; i++) {
			if (data.result[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}

		setHotIsBinderList([...tmp]);
	};
	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(false);
		getTotalLatestList();
		getTotalHotList();
	}, []);

	return (
		<MainContainer padding="0 0 0 0">
			<TopNav>
				<BackButton onClick={backClick} />
				<div style={{ fontSize: '1.125rem' }} className="centerText">
					스러버's LUV 아이템
				</div>
			</TopNav>
			<FeedContainer>
				{CurrentList.length > 0 && (
					<FilterWrap>
						<Filter>
							<SubText
								fontsize="0.875rem"
								fontweight={
									selectedFilter === filterList[0].idx ? 'bold' : 'normal'
								}
								onClick={() => onFilterClick(filterList[0].idx)}
								selected={selectedFilter === filterList[0].idx}
								color={selectedFilter === filterList[0].idx ? '#262626' : '#8D8D8D'}
							>
								{filterList[0].name}
							</SubText>
							<VerticalLine />
							<SubText
								fontsize="0.875rem"
								fontweight={
									selectedFilter === filterList[1].idx ? 'bold' : 'normal'
								}
								onClick={() => onFilterClick(filterList[1].idx)}
								selected={selectedFilter === filterList[1].idx}
								color={selectedFilter === filterList[1].idx ? '#262626' : '#8D8D8D'}
							>
								{filterList[1].name}
							</SubText>
						</Filter>
						{view ? (
							<Filter onClick={changeView}>
								<FilterSmall style={{ marginRight: '0.125rem' }}></FilterSmall>
								<SubText fontsize="0.75rem" color="#8d8d8d">
									작게보기
								</SubText>
							</Filter>
						) : (
							<Filter onClick={changeView}>
								<FilterBig style={{ marginRight: '0.125rem' }}></FilterBig>
								<SubText fontsize="0.75rem" color="#8d8d8d">
									크게보기
								</SubText>
							</Filter>
						)}
					</FilterWrap>
				)}

				{CurrentList.length > 0 ? (
					<>
						{view ? (
							<>
								<LargeViewWrap>
									{CurrentList && (
										<>
											{CurrentList.map((item, index) => (
												<div
													key={item.itemIdx}
													onClick={() => onDetailItemClick(item.itemIdx)}
												>
													<LargeViewItem>
														<LargeViewImage src={item.itemImgUrl}>
															<ImageText>
																<SubText
																	fontsize="0.8125rem"
																	fontweight="bold"
																	color="white"
																>
																	{item.name}'s
																</SubText>
																{selectedFilter === 1 ? (
																	<>
																		{latestIsBinderList && (
																			<>
																				{latestIsBinderList[
																					index
																				] === true ? (
																					<BinderRed
																						onClick={e =>
																							onDeleteBinderClick(
																								item.itemIdx,
																								e
																							)
																						}
																						style={{
																							width: '1.5rem',
																							height: '1.5rem',
																							zIndex: '900',
																						}}
																					/>
																				) : (
																					<BinderWhite
																						onClick={e =>
																							onAddBinderClick(
																								e,
																								item.itemIdx
																							)
																						}
																						style={{
																							width: '1.5rem',
																							height: '1.5rem',
																							zIndex: '900',
																						}}
																					/>
																				)}
																			</>
																		)}
																	</>
																) : (
																	<>
																		{hotIsBinderList && (
																			<>
																				{hotIsBinderList[
																					index
																				] ? (
																					<BinderRed
																						onClick={e =>
																							onDeleteBinderClick(
																								item.itemIdx,
																								e
																							)
																						}
																						style={{
																							width: '1.5rem',
																							height: '1.5rem',
																							zIndex: '150',
																						}}
																					/>
																				) : (
																					<BinderWhite
																						onClick={e =>
																							onAddBinderClick(
																								item.itemIdx,
																								e
																							)
																						}
																						style={{
																							width: '1.5rem',
																							height: '1.5rem',
																							zIndex: '150',
																						}}
																					/>
																				)}
																			</>
																		)}
																	</>
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
															<SubText margin="0 ">
																{' '}
																{item.publisher}
															</SubText>
															<Dot></Dot>
															<SubText color="#8d8d8d">
																{' '}
																{item.uploadTime}
															</SubText>
														</SubInfoWrap>
													</LargeViewItem>
													<HorizontalLine></HorizontalLine>
												</div>
											))}
										</>
									)}
								</LargeViewWrap>
							</>
						) : (
							<>
								<GridItemWrap>
									{CurrentList.map((item, index) => (
										<GridItem
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
													{selectedFilter === 1 ? (
														<>
															{latestIsBinderList && (
																<>
																	{latestIsBinderList[index] ===
																	true ? (
																		<BinderRed
																			onClick={e =>
																				onDeleteBinderClick(
																					item.itemIdx,
																					e
																				)
																			}
																			style={{
																				width: '1.5rem',
																				height: '1.5rem',
																				zIndex: '900',
																			}}
																		/>
																	) : (
																		<BinderWhite
																			onClick={e =>
																				onAddBinderClick(
																					e,
																					item.itemIdx
																				)
																			}
																			style={{
																				width: '1.5rem',
																				height: '1.5rem',
																				zIndex: '900',
																			}}
																		/>
																	)}
																</>
															)}
														</>
													) : (
														<>
															{hotIsBinderList && (
																<>
																	{hotIsBinderList[index] ? (
																		<BinderRed
																			onClick={e =>
																				onDeleteBinderClick(
																					item.itemIdx,
																					e
																				)
																			}
																			style={{
																				width: '1.5rem',
																				height: '1.5rem',
																				zIndex: '150',
																			}}
																		/>
																	) : (
																		<BinderWhite
																			onClick={e =>
																				onAddBinderClick(
																					item.itemIdx,
																					e
																				)
																			}
																			style={{
																				width: '1.5rem',
																				height: '1.5rem',
																				zIndex: '150',
																			}}
																		/>
																	)}
																</>
															)}
														</>
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
										</GridItem>
									))}
								</GridItemWrap>
							</>
						)}
					</>
				) : (
					<ItemContainer
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							height: '70%',
						}}
					>
						<NoItem style={{ width: '3.75rem', height: '3.75rem' }}></NoItem>
						<SubText fontsize="1rem" fontweight="bold" margin="1rem 0 0.4375rem 0">
							아직 업로드된 아이템이 없어요
						</SubText>
						<SubText fontsize="0.875rem" fontweight="bold" color="#8D8D8D">
							직접 업로드 해보세요!
						</SubText>
					</ItemContainer>
				)}
			</FeedContainer>
			<BottomSlideMenu open={openState} getOpenStatus={getOpenStatus}>
				<RowWrap onClick={() => onCreateBinder(selectedItemIdx)}>
					<ImageWrap>
						<PlusButton></PlusButton>
					</ImageWrap>
					<SubText fontsize="1rem" margin="0.9375rem 0">
						바인더 만들기
					</SubText>
				</RowWrap>
				<HorizontalLine></HorizontalLine>
				<BinderOverflow>
					{binderList.map(binder => (
						<RowWrap key={binder.name} onClick={() => onSelectBinder(binder.binderIdx)}>
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
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	background-image: url(${props => props.src});
	margin-right: 0.5rem;
`;
const Dot = styled.div`
	width: 0.125rem;
	height: 0.125rem;
	border-radius: 50%;
	background-color: #8d8d8d;
	margin: 0 6px;
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
	background-color: #f6f6f6;
	border-radius: 0.8125rem;
	margin-right: 1.25rem;
`;
const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const BinderOverflow = styled.div`
	max-height: 24.6875rem;
	overflow-y: scroll;
	/* padding-bottom: 1.25rem; */
	::-webkit-scrollbar {
		display: none;
	}
`;
