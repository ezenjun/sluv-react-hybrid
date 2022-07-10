import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { customApiClient } from '../../../utils/apiClient';

import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';
import { HorizontalLine } from '../../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../../components/Lines/VerticalLine';

import { ReactComponent as RightArrow } from '../../../assets/Icons/right_arrow.svg';
import { ReactComponent as BinderWhite } from '../../../assets/Icons/binderWhite.svg';
import { ReactComponent as BinderRed } from '../../../assets/Icons/binderRed.svg';
import img from '../img.png';

export const CelebsLuvItem = ({ celeb }) => {
	const navigate = useNavigate();
	const onDetailCelebClick = celebId => {
		navigate('/celeb/detail/' + celebId);
	};
	// console.log('celeb', celeb);
	// console.log('celeb.memberList', celeb.memberList);
	const [selected, setSelected] = useState(0);
	const onChipClick = (idx, memberIdx) => {
		setSelected(idx);
		setSelectedMemeberIdx(memberIdx);
		if (selectedFilter === 1) {
			//최신순
			if (!latestList[idx]) {
				getEachMemberLatestList(memberIdx);
			}
		}
		if (selectedFilter === 2) {
			// 인기순
			if (!hotList[idx]) {
				getEachMemberHotList(memberIdx);
			}
		}
	};
	const [selectedFilter, setSelectedFilter] = useState(1);
	const tabList = [
		{
			idx: 1,
			name: '최신순',
		},
		{
			idx: 2,
			name: '인기순',
		},
	];
	const [selectedMemeberIdx, setSelectedMemeberIdx] = useState(-1);
	const onFilterClick = idx => {
		setSelectedFilter(idx);
		if (!latestList[idx]) {
			getEachMemberLatestList(selectedMemeberIdx);
		}
		if (!hotList[idx]) {
			getEachMemberHotList(selectedMemeberIdx);
		}
	};

	const [latestList, setLatestList] = useState([]);
	const [hotList, setHotList] = useState([]);

	const getTotalLatestList = async () => {
		const data = await customApiClient(
			'get',
			`/homes/items?celebIdx=${celeb.celebIdx}&order=latest&page=1&pageSize=4`
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
			`/homes/items?celebIdx=${celeb.celebIdx}&order=hot&page=1&pageSize=4`
		);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setHotList([...hotList, data.result]);
		console.log(data.result);
	};

	const getEachMemberLatestList = async idx => {
		const data = await customApiClient(
			'get',
			`/homes/items?memberIdx=${idx}&order=latest&page=1&pageSize=4`
		);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setLatestList([...latestList, data.result]);
		console.log(idx, latestList);
		console.log(data.result);
	};
	const getEachMemberHotList = async idx => {
		const data = await customApiClient(
			'get',
			`/homes/items?memberIdx=${idx}&order=hot&page=1&pageSize=4`
		);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setHotList([...hotList, data.result]);
		console.log(idx, latestList);
		console.log(data.result);
	};
	useEffect(() => {
		getTotalLatestList();
		getTotalHotList();
	}, []);

	return (
		<ItemContainer>
			<TextWrap>
				<MainText fontsize="1.5rem">
					#{celeb.name}'s
					<br />
					LUV 아이템
				</MainText>
				<RightArrow onClick={() => onDetailCelebClick(1)}></RightArrow>
			</TextWrap>
			<ChipWrap>
				<Chip selected={selected === 0} onClick={() => onChipClick(0)}>
					{celeb.name}
				</Chip>
				{celeb.memberList.map((member, idx) => (
					<Chip
						key={idx}
						selected={selected === idx + 1}
						onClick={() => onChipClick(idx + 1, member.memberIdx)}
					>
						{member.name}
					</Chip>
				))}
			</ChipWrap>
			<HorizontalLine />
			<FilterWrap>
				{tabList.map(item => {
					return (
						<SubText
							key={item.idx}
							fontsize="0.875rem"
							fontweight={selectedFilter === item.idx ? 'bold' : 'normal'}
							margin="0 1rem 0 0 "
							onClick={() => onFilterClick(item.idx)}
							selected={selectedFilter === item.idx}
							color={selectedFilter === item.idx ? '#262626' : '#8D8D8D'}
						>
							{item.name}
						</SubText>
					);
				})}
			</FilterWrap>
			<ItemWrap>
				{selectedFilter === 1 ? (
					<>
						{latestList[selected] ? (
							<>
								{latestList[selected].map(item => (
									<Item>
										<Image>
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
														}}
													/>
												) : (
													<BinderWhite
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
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
											style={{
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												width: '100%',
											}}
										>
											{item.itemName}
										</SubText>
									</Item>
								))}
							</>
						) : (
							<>
								<Item>
									<SkeletonImg>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												스럽's
											</SubText>
											<BinderWhite
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										</ImageText>
									</SkeletonImg>
									<SubText
										fontsize="16px"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										스러버 브랜드
									</SubText>
									<SubText
										color="#262626"
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										스럽이 사랑한 아이템
									</SubText>
								</Item>
								<Item>
									<SkeletonImg>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												스럽's
											</SubText>
											<BinderWhite
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										</ImageText>
									</SkeletonImg>
									<SubText
										fontsize="16px"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										스러버 브랜드
									</SubText>
									<SubText
										color="#262626"
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										스럽이 사랑한 아이템
									</SubText>
								</Item>
								<Item>
									<SkeletonImg>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												스럽's
											</SubText>
											<BinderWhite
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										</ImageText>
									</SkeletonImg>
									<SubText
										fontsize="16px"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										스러버 브랜드
									</SubText>
									<SubText
										color="#262626"
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										스럽이 사랑한 아이템
									</SubText>
								</Item>
								<Item>
									<SkeletonImg>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												스럽's
											</SubText>
											<BinderWhite
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										</ImageText>
									</SkeletonImg>
									<SubText
										fontsize="16px"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										스러버 브랜드
									</SubText>
									<SubText
										color="#262626"
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										스럽이 사랑한 아이템
									</SubText>
								</Item>
							</>
						)}
					</>
				) : (
					<>
						{hotList[selected] ? (
							<>
								{hotList[selected].map(item => (
									<Item>
										<Image>
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
														}}
													/>
												) : (
													<BinderWhite
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
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
											style={{
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												width: '100%',
											}}
										>
											{item.itemName}
										</SubText>
									</Item>
								))}
							</>
						) : (
							<>
								<Item>
									<SkeletonImg>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												스럽's
											</SubText>
											<BinderWhite
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										</ImageText>
									</SkeletonImg>
									<SubText
										fontsize="16px"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										스러버 브랜드
									</SubText>
									<SubText
										color="#262626"
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										스럽이 사랑한 아이템
									</SubText>
								</Item>
								<Item>
									<SkeletonImg>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												스럽's
											</SubText>
											<BinderWhite
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										</ImageText>
									</SkeletonImg>
									<SubText
										fontsize="16px"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										스러버 브랜드
									</SubText>
									<SubText
										color="#262626"
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										스럽이 사랑한 아이템
									</SubText>
								</Item>
								<Item>
									<SkeletonImg>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												스럽's
											</SubText>
											<BinderWhite
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										</ImageText>
									</SkeletonImg>
									<SubText
										fontsize="16px"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										스러버 브랜드
									</SubText>
									<SubText
										color="#262626"
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										스럽이 사랑한 아이템
									</SubText>
								</Item>
								<Item>
									<SkeletonImg>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												스럽's
											</SubText>
											<BinderWhite
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										</ImageText>
									</SkeletonImg>
									<SubText
										fontsize="16px"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										스러버 브랜드
									</SubText>
									<SubText
										color="#262626"
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										스럽이 사랑한 아이템
									</SubText>
								</Item>
							</>
						)}
					</>
				)}
			</ItemWrap>
		</ItemContainer>
	);
};
const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: ${props => props.padding || '2.5rem 1.25rem 1.25rem 1.25rem'};
`;
const TextWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: ${props => props.marginbottom || '20px'};
	padding: ${props => props.padding};
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
	box-sizing: border-box;
	padding: 0.625rem 1rem;
	margin-right: 0.5rem;
	border-radius: 1.9rem;
	border: solid 1px #e2e0e0;
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
`;

const ItemWrap = styled.div`
	display: grid;
	justify-items: center;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: minmax(6.25rem, auto);
	row-gap: 0.6875rem;
	column-gap: 0.6875rem;
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
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: white;
	background-image: linear-gradient(
			to top,
			#000 0%,
			rgba(60, 60, 60, 0.77) 0%,
			rgba(0, 0, 0, 0) 34%
		),
		url(${img});
	background-repeat: no-repeat;
	background-size: contain;
	margin-bottom: 1rem;
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	font-size: 0.8125rem;
	@media screen and (width: 360px) {
		width: 9.5625rem;
		height: 9.5625rem;
	}
	@media screen and (width: 320px) {
		width: 9.375rem;
		height: 9.375rem;
	}
	@media screen and (width: 280px) {
		width: 8.125rem;
		height: 8.125rem;
	}
`;
const SkeletonImg = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: #8d8d8d;

	margin-bottom: 1rem;
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	font-size: 0.8125rem;
	@media screen and (width: 360px) {
		width: 9.5625rem;
		height: 9.5625rem;
	}
	@media screen and (width: 320px) {
		width: 9.375rem;
		height: 9.375rem;
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
