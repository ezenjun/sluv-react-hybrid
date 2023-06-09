import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { customApiClient } from '../../../utils/apiClient';

import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';
import { HorizontalLine } from '../../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../../components/Lines/VerticalLine';
import { BottomSlideMenu } from '../../../components/containers/BottomSlideMenu';
import { ReactComponent as PlusButton } from '../../../assets/Icons/plusButton.svg';
import { ReactComponent as NoItem } from '../../../assets/Icons/noItemIcon.svg';
import { ReactComponent as RightArrow } from '../../../assets/Icons/right_arrow.svg';
import { ReactComponent as BinderWhite } from '../../../assets/Icons/binderWhite.svg';
import { ReactComponent as BinderRed } from '../../../assets/Icons/binderRed.svg';

import { ReactComponent as PinkBinder } from '../../../assets/Binder/PinkBinder.svg';
import { ReactComponent as YellowBinder } from '../../../assets/Binder/YellowBinder.svg';
import { ReactComponent as GreenBinder } from '../../../assets/Binder/GreenBinder.svg';
import { ReactComponent as BlueBinder } from '../../../assets/Binder/BlueBinder.svg';
import { ReactComponent as Diamond } from '../../../assets/Custom/Custom_diamond.svg';
import { ReactComponent as Crown } from '../../../assets/Custom/Custom_crown.svg';
import { ReactComponent as Present } from '../../../assets/Custom/Custom_present.svg';
import { ReactComponent as Heart } from '../../../assets/Custom/Custom_heart.svg';
import { ReactComponent as Flag } from '../../../assets/Custom/Custom_StarFlag.svg';
import { ReactComponent as Shop } from '../../../assets/Custom/Custom_Shop.svg';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../../recoil/ToastMessage';
import Loading from '../../../components/Loading';

export const CelebsLuvItem = ({ celeb, ComponentIndex }) => {
	const navigate = useNavigate();
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);
	const onDetailCelebClick = celeb => {
		navigate(`/celeb/detail/${celeb.celebIdx}`, {
			state: celeb,
		});
	};
	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
	};

	const [CurrentList, setCurrentList] = useState([]);

	const [selectedFilter, setSelectedFilter] = useState(1);
	const filterList = [
		{
			idx: 1,
			name: '최신순',
		},
		{
			idx: 2,
			name: '인기순',
		},
	];

	const onFilterClick = idx => {
		setSelectedFilter(idx);
		if (idx === 1) {
			setCurrentList(latestList[selectedChip]);
		}
		if (idx === 2) {
			setCurrentList(hotList[selectedChip]);
		}
		for (var i = 0; i < hotList.length; i++) {
			console.log(hotList[i]);
		}
	};
	// 연예인 선택
	const [selectedMemeberIdx, setSelectedMemeberIdx] = useState(-1);
	const [selectedChip, setSelectedChip] = useState(0);
	const onChipClick = (idx, memberIdx) => {
		setSelectedMemeberIdx(memberIdx);
		setSelectedChip(idx);
		if (!latestList[idx]) {
			getEachMemberLatestList(idx, memberIdx);
		} else {
			if (selectedFilter === 1) {
				setCurrentList(latestList[idx]);
			} else {
				setCurrentList(hotList[idx]);
			}
		}
		if (!hotList[idx]) {
			getEachMemberHotList(idx, memberIdx);
		} else {
			if (selectedFilter === 1) {
				setCurrentList(latestList[idx]);
			} else {
				setCurrentList(hotList[idx]);
			}
		}
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
		const Uri = '/dibs';
		const data = await customApiClient('post', Uri, body);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		let tempLatest = latestIsBinderList;
		for (var i = 0; i < latestIsBinderList.length; i++) {
			for (var j = 0; j < latestIsBinderList[i].length; j++) {
				if (latestList[i]) {
					if (latestList[i][j].itemIdx === selectedItemIdx) {
						tempLatest[i][j] = !tempLatest[i][j];
						setLatestIsBinderList([...tempLatest]);
					}
				}
			}
		}
		let tempHot = hotIsBinderList;
		for (var k = 0; k < hotIsBinderList.length; k++) {
			for (var l = 0; l < hotIsBinderList[k].length; l++) {
				if (hotList[k]) {
					if (hotList[k][l].itemIdx === selectedItemIdx) {
						tempHot[k][l] = !tempHot[k][l];
						setHotIsBinderList([...tempHot]);
					}
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
		let tempLatest = latestIsBinderList;
		for (var i = 0; i < latestIsBinderList.length; i++) {
			for (var j = 0; j < latestIsBinderList[i].length; j++) {
				if (latestList[i]) {
					if (latestList[i][j].itemIdx === itemIdx) {
						tempLatest[i][j] = !tempLatest[i][j];
						setLatestIsBinderList([...tempLatest]);
					}
				}
			}
		}
		let tempHot = hotIsBinderList;
		for (var k = 0; k < hotIsBinderList.length; k++) {
			for (var l = 0; l < hotIsBinderList[k].length; l++) {
				if (hotList[k]) {
					if (hotList[k][l].itemIdx === itemIdx) {
						tempHot[k][l] = !tempHot[k][l];
						setHotIsBinderList([...tempHot]);
					}
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
	const [latestList, setLatestList] = useState([]);
	const [hotList, setHotList] = useState([]);
	const [loading, setLoading] = useState(true);
	const getTotalLatestList = async () => {
		const data = await customApiClient(
			'get',
			`/homes/items?celebIdx=${celeb.celebIdx}&order=latest&page=1&pageSize=4`
		);
		if (!data) return;
		if (!data.isSuccess) {
			// console.log(data.message);
			setLoading(false);
			return;
		}
		setLatestList([...latestList, data.result]);
		setCurrentList(data.result);
		var tmp = [];
		for (var i = 0; i < data.result.length; i++) {
			if (data.result[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		setLatestIsBinderList([...latestIsBinderList, tmp]);
		setLoading(false);
	};
	const getTotalHotList = async () => {
		const data = await customApiClient(
			'get',
			`/homes/items?celebIdx=${celeb.celebIdx}&order=hot&page=1&pageSize=4`
		);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		} else {
			console.log('아이템 HOT결과', data.result);
			setHotList([...hotList, data.result]);
			var tmp = [];
			for (var i = 0; i < data.result.length; i++) {
				if (data.result[i].isDib === 'Y') {
					tmp.push(true);
				} else {
					tmp.push(false);
				}
			}
			setHotIsBinderList([...hotIsBinderList, tmp]);
		}
	};

	const getEachMemberLatestList = async (idx, memberidx) => {
		const data = await customApiClient(
			'get',
			`/homes/items?memberIdx=${memberidx}&order=latest&page=1&pageSize=4`
		);
		if (!data) return;
		if (!data.isSuccess) {
			// console.log(data.message);
			setCurrentList([]);
			return;
		}
		var temp = latestList;
		temp[idx] = data.result;
		setLatestList([...temp]);
		if (selectedFilter === 1) {
			setCurrentList(data.result);
		}
		var binderList = latestIsBinderList;
		var tmp = [];
		for (var i = 0; i < data.result.length; i++) {
			if (data.result[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		binderList[idx] = tmp;
		setLatestIsBinderList([...binderList]);
	};
	const getEachMemberHotList = async (idx, memberidx) => {
		const data = await customApiClient(
			'get',
			`/homes/items?memberIdx=${memberidx}&order=hot&page=1&pageSize=4`
		);
		if (!data) return;
		if (!data.isSuccess) {
			// console.log(data.message);
			setCurrentList([]);
			return;
		}
		let temp = hotList;
		temp[idx] = data.result;
		setHotList([...temp]);
		if (selectedFilter === 2) {
			setCurrentList(data.result);
		}
		var binderList = hotIsBinderList;
		var tmp = [];
		for (var i = 0; i < data.result.length; i++) {
			if (data.result[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		binderList[idx] = tmp;
		setHotIsBinderList([...binderList]);
	};
	useEffect(() => {
		getTotalLatestList();
		getTotalHotList();
	}, []);

	return (
		<>
			<ItemContainer>
				<TextWrap>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<MainText fontsize="1.5rem">#{celeb.name}'s</MainText>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<MainText fontsize="1.5rem">LUV 아이템</MainText>
							{ComponentIndex % 6 === 0 ? (
								<Crown
									style={{
										width: '1.5rem',
										height: '1.5rem',
										marginLeft: '0.3125rem',
									}}
								/>
							) : (
								<>
									{ComponentIndex % 6 === 1 ? (
										<Diamond
											style={{
												width: '1.5rem',
												height: '1.5rem',
												marginLeft: '0.3125rem',
											}}
										/>
									) : (
										<>
											{ComponentIndex % 6 === 2 ? (
												<Present
													style={{
														width: '1.5rem',
														height: '1.5rem',
														marginLeft: '0.3125rem',
													}}
												/>
											) : (
												<>
													{ComponentIndex % 6 === 3 ? (
														<Flag
															style={{
																width: '1.5rem',
																height: '1.5rem',
																marginLeft: '0.3125rem',
															}}
														/>
													) : (
														<>
															{ComponentIndex % 6 === 4 ? (
																<Heart
																	style={{
																		width: '1.5rem',
																		height: '1.5rem',
																		marginLeft: '0.3125rem',
																	}}
																/>
															) : (
																<Shop
																	style={{
																		width: '1.5rem',
																		height: '1.5rem',
																		marginLeft: '0.3125rem',
																	}}
																/>
															)}
														</>
													)}
												</>
											)}
										</>
									)}
								</>
							)}
						</div>
					</div>
					<RightArrow onClick={() => onDetailCelebClick(celeb)}></RightArrow>
				</TextWrap>
				{celeb.memberList.length > 0 ? (
					<ChipWrap>
						<Chip selected={selectedChip === 0} onClick={() => onChipClick(0)}>
							{celeb.name}
						</Chip>
						{celeb.memberList.map((member, idx) => (
							<Chip
								key={idx}
								selected={selectedChip === idx + 1}
								onClick={() => onChipClick(idx + 1, member.memberIdx)}
							>
								{member.name}
							</Chip>
						))}
					</ChipWrap>
				) : (
					<></>
				)}

				<HorizontalLine style={{ marginRight: '1.25rem', marginLeft: '1.25rem' }} />
				{CurrentList.length > 0 && (
					<FilterWrap>
						<SubText
							fontsize="0.875rem"
							fontweight={selectedFilter === filterList[0].idx ? 'bold' : 'normal'}
							onClick={() => onFilterClick(filterList[0].idx)}
							selected={selectedFilter === filterList[0].idx}
							color={selectedFilter === filterList[0].idx ? '#262626' : '#8D8D8D'}
						>
							{filterList[0].name}
						</SubText>
						<VerticalLine />
						<SubText
							fontsize="0.875rem"
							fontweight={selectedFilter === filterList[1].idx ? 'bold' : 'normal'}
							onClick={() => onFilterClick(filterList[1].idx)}
							selected={selectedFilter === filterList[1].idx}
							color={selectedFilter === filterList[1].idx ? '#262626' : '#8D8D8D'}
						>
							{filterList[1].name}
						</SubText>
					</FilterWrap>
				)}
				<>
					{!loading ? (
						<>
							{CurrentList.length > 0 ? (
								<ItemWrap>
									{CurrentList.map((item, index) => (
										<Item key={item.itemIdx}>
											<Image
												style={{ zIndex: '0' }}
												src={item.itemImgUrl}
												onClick={() => onDetailItemClick(item.itemIdx)}
											>
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
															{latestIsBinderList[selectedChip] && (
																<>
																	{latestIsBinderList[
																		selectedChip
																	][index] === true ? (
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
															{hotIsBinderList[selectedChip] && (
																<>
																	{hotIsBinderList[selectedChip][
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
											</Image>
											<SubText
												fontsize="16px"
												fontweight="bold"
												margin="0 0 0.375rem 0 "
											>
												{item.brandKr}
											</SubText>

											<SubText
												color="#262626"
												fontweight="regular"
												style={{
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													width: '100%',
													marginBottom: '0.9375rem',
												}}
											>
												{item.itemName}
											</SubText>
										</Item>
									))}
								</ItemWrap>
							) : (
								<ItemContainer
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignContent: 'center',
										alignItems: 'center',
										padding: '1.25rem 1.25rem 2.5rem 1.25rem',
										width: '100%',
									}}
								>
									<NoItem
										style={{ width: '3.75rem', height: '3.75rem' }}
									></NoItem>
									<SubText
										margin="1rem 0 0.5rem 0"
										fontsize="0.875rem"
										fontweight="bold"
									>
										아직 업로드된 아이템이 없어요
									</SubText>
									<SubText
										fontsize="0.875rem"
										fontweight="normal"
										color="#8D8D8D"
									>
										직접 업로드 해보세요!
									</SubText>
								</ItemContainer>
							)}
						</>
					) : (
						// <ItemContainer
						// 	style={{
						// 		display: 'flex',
						// 		alignContent: 'center',
						// 		justifyContent: 'center',
						// 		alignItems: 'center',
						// 		paddingBottom: '2.5rem',
						// 		paddingRight: '1.25rem',
						// 		width: '100%',
						// 	}}
						// >
						// 	<NoItem style={{ width: '3.75rem', height: '3.75rem' }}></NoItem>
						// 	<SubText margin="1rem 0" fontsize="0.875rem" fontweight="bold">
						// 		아직 해당 셀럽의 아이템이 존재하지 않아요
						// 	</SubText>
						// </ItemContainer>
						<div style={{ height: '5rem' }}>
							<Loading></Loading>
						</div>
					)}
				</>
			</ItemContainer>

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
				<BinderOverflow style={{ maxHeight: '24.6875rem', overflowY: 'scroll' }}>
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
		</>
	);
};
const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
`;
const TextWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 1.25rem 1.25rem 0 1.25rem;
`;
const ChipWrap = styled.div`
	overflow-x: scroll;
	white-space: nowrap;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	box-sizing: border-box;
	padding: 1.25rem 0 0 1.25rem;
`;
const Chip = styled.div`
	display: inline-block;
	box-sizing: border-box;
	padding: 0.625rem 1rem;
	margin-right: 0.5rem;
	margin-bottom: 0.0625rem;
	border-radius: 1.9rem;
	border: ${props => (props.selected ? 'none' : 'solid 1px #e2e0e0')};
	background-color: ${props => (props.selected ? '#2b1e34' : '#fff')};
	color: ${props => (props.selected ? '#fff' : '#2b1e34')};
	font-size: 0.875rem;
	font-weight: 600;
`;
const FilterWrap = styled.div`
	display: flex;
	text-align: center;
	align-items: center;
	margin-bottom: 1rem;
	padding-left: 1.25rem;
`;

const ItemWrap = styled.div`
	display: grid;
	justify-items: center;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: minmax(6.25rem, auto);
	row-gap: 0.6875rem;
	column-gap: 0.6875rem;
	padding: 0 1.25rem 1.25rem 1.25rem;
`;
const Item = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const Image = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	width: 100%;
	border-radius: 1rem;

	background-image: linear-gradient(
			to top,
			#000 0%,
			rgba(60, 60, 60, 0.77) 0%,
			rgba(0, 0, 0, 0) 34%
		),
		url(${props => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	margin-bottom: 0.75rem;
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	font-size: 0.8125rem;
	:after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`;

const ImageText = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
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
	/* padding-bottom: 1.25rem; */
	::-webkit-scrollbar {
		display: none;
	}
`;
