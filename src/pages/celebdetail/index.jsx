import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';
import { customApiClient } from '../../utils/apiClient';

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
	let { celebIdx } = useParams();
	let location = useLocation();
	const navigate = useNavigate();
	const [latestList, setLatestList] = useState([]);
	const [hotList, setHotList] = useState([]);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(false);
	}, []);

	useEffect(() => {
		getTotalLatestList();
		getTotalHotList();
	}, []);

	// 최신순/ 인기순
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
		if (!latestList[selectedMemeberIdx]) {
			getEachMemberLatestList(selectedMemeberIdx);
			console.log(selectedMemeberIdx);
			console.log('latest' + idx + '비어있음');
		}
		if (!hotList[selectedMemeberIdx]) {
			getEachMemberHotList(selectedMemeberIdx);
			console.log(selectedMemeberIdx);
			console.log('hot' + idx + '비어있음');
		}
	};
	// 연예인 선택
	const [selectedMemeberIdx, setSelectedMemeberIdx] = useState(-1);
	const [selectedChip, setSelectedChip] = useState(0);
	const onChipClick = (idx, memberIdx) => {
		setSelectedMemeberIdx(memberIdx);
		setSelectedChip(idx);
		console.log('idx, memberIdx', idx, memberIdx);
		if (selectedFilter === 1) {
			//최신순
			if (!latestList[idx]) {
				getEachMemberLatestList(memberIdx);
				console.log('filter 1, latest');
			}
		}
		if (selectedFilter === 2) {
			// 인기순
			if (!hotList[idx]) {
				getEachMemberHotList(memberIdx);
				console.log('filter 2, hot');
			}
		}
	};

	const [view, setView] = useState(true); //view = true 크게보기  false = 작게보기
	const changeView = () => {
		setView(!view);
	};
	const backClick = () => {
		navigate(-1);
	};

	const getTotalLatestList = async () => {
		const data = await customApiClient(
			'get',
			`/homes/items?celebIdx=${celebIdx}&order=latest&page=1&pageSize=6`
		);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setLatestList([...latestList, data.result]);
		console.log('latest : ', data.result);
	};
	const getTotalHotList = async () => {
		const data = await customApiClient(
			'get',
			`/homes/items?celebIdx=${celebIdx}&order=hot&page=1&pageSize=6`
		);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setHotList([...hotList, data.result]);
		console.log('hot : ', data.result);
	};

	const getEachMemberLatestList = async idx => {
		const data = await customApiClient(
			'get',
			`/homes/items?memberIdx=${idx}&order=latest&page=1&pageSize=15`
		);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setLatestList([...latestList, data.result]);
		console.log('member latest', idx, latestList);
		console.log(data.result);
	};
	const getEachMemberHotList = async idx => {
		const data = await customApiClient(
			'get',
			`/homes/items?memberIdx=${idx}&order=hot&page=1&pageSize=15`
		);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setHotList([...hotList, data.result]);
		console.log('member hot', idx, latestList);
		console.log(data.result);
		console.log('hotList[selectedFilter]', hotList[selectedFilter]);
	};

	return (
		<MainContainer padding="0">
			<TopNav>
				<BackButton onClick={backClick} />
				<div style={{ fontSize: '1.125rem' }} className="centerText">
					{location.state.name}'s 아이템
				</div>
			</TopNav>
			<FeedContainer>
				{/* /그룹인 경우 Chip 보여줌 / 개인일 경우 Chip없음 */}
				{location.state.memberList.length > 0 ? (
					<>
						<ChipWrap>
							<Chip selected={selectedChip === 0} onClick={() => onChipClick(0)}>
								{location.state.name}
							</Chip>
							{location.state.memberList.map((member, idx) => {
								return (
									<Chip
										key={member.idx}
										onClick={() => onChipClick(idx + 1, member.memberIdx)}
										selected={selectedChip === idx + 1}
									>
										{member.name}
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
				{view ? (
					<>
						{selectedFilter === 1 ? ( // 최신순
							<>
								{latestList[selectedFilter] ? (
									<LargeViewWrap>
										{latestList[selectedFilter].map(item => (
											<div key={item.itemIdx}>
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
															<BinderWhite
																style={{
																	width: '1.5rem',
																	height: '1.5rem',
																}}
															/>
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
														<ProfileImg></ProfileImg>
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
									</LargeViewWrap>
								) : (
									<></>
								)}
							</>
						) : (
							//인기순
							<>
								{hotList[selectedFilter] ? (
									<LargeViewWrap>
										{hotList[selectedFilter].map(item => (
											<div key={item.itemIdx}>
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
															<BinderWhite
																style={{
																	width: '1.5rem',
																	height: '1.5rem',
																}}
															/>
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
														<ProfileImg></ProfileImg>
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
									</LargeViewWrap>
								) : (
									<></>
								)}
							</>
						)}
					</>
				) : (
					<>
						{selectedFilter === 1 ? ( //최신순
							<>
								{latestList[selectedFilter] ? (
									<>
										<GridItemWrap>
											{latestList[selectedFilter].map(item => (
												<GridItem key={item.itemIdx}>
													<GridImage>
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
											))}
										</GridItemWrap>
									</>
								) : (
									<></>
								)}
							</>
						) : (
							//인기순
							<>
								{hotList[selectedFilter] ? (
									<GridItemWrap>
										{hotList[selectedFilter].map(item => (
											<GridItem key={item.itemIdx}>
												<GridImage>
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
										))}
									</GridItemWrap>
								) : (
									<></>
								)}
							</>
						)}
					</>
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
