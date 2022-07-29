import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { customApiClient } from '../../../utils/apiClient';
import { ReactComponent as NoItem } from '../../../assets/Icons/noItemIcon.svg';
import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';
import { VerticalLine } from '../../../components/Lines/VerticalLine';

import { ReactComponent as RightArrow } from '../../../assets/Icons/right_arrow.svg';
import { ReactComponent as Icon } from '../../../assets/Custom/Custom_target.svg';

export const HotItemComponent = () => {
	const navigate = useNavigate();
	const onHotClick = () => {
		navigate('/hot');
	};
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
	};

	const [dailyList, setDailyList] = useState([]);
	const [weeklyList, setWeeklyList] = useState([]);

	const getDailyHotList = async () => {
		const data = await customApiClient('get', `/homes/hot-items?period=daily`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}

		let temp = data.result;
		setDailyList(temp);
	};
	const getWeeklyHotList = async () => {
		const data = await customApiClient('get', `/homes/hot-items?period=weekly`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		let temp = data.result;
		setWeeklyList(temp);
	};
	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
	};
	useEffect(() => {
		getDailyHotList();
		getWeeklyHotList();
	}, []);
	return (
		<ItemContainer padding="0.625rem 0 1.875rem 0">
			<TextWrap padding="0 1.25rem 0 1.25rem">
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<MainText fontsize="1.5rem">#스러버's</MainText>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<MainText fontsize="1.5rem">HOT 아이템</MainText>
						<Icon
							style={{ width: '1.5rem', height: '1.5rem', marginLeft: '0.3125rem' }}
						/>
					</div>
				</div>

				<RightArrow onClick={onHotClick}></RightArrow>
			</TextWrap>
			{dailyList.length > 0 && weeklyList.length > 0 ? (
				<>
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
					<HotItemWrap>
						{selectedFilter === 1 ? ( // 인기순
							<>
								{dailyList ? (
									<>
										{dailyList.map(hotitem => (
											<HotItem
												key={hotitem.itemIdx}
												src={hotitem.itemImgUrl}
												onClick={() => onDetailItemClick(hotitem.itemIdx)}
											>
												<SubText
													fontsize="0.8125rem"
													fontweight="bold"
													color="#6de98d"
												>
													{hotitem.name}'s
												</SubText>
												<SubText
													fontsize="13px"
													fontweight="bold"
													color="white"
													margin="0.5rem 0 0 0 "
												>
													{hotitem.brandKr}
												</SubText>
												<SubText fontsize="12px" color="white">
													{hotitem.itemName}
												</SubText>
											</HotItem>
										))}
									</>
								) : (
									<></>
								)}
							</>
						) : (
							<>
								{weeklyList ? (
									<>
										{weeklyList.map(hotitem => (
											<HotItem
												key={hotitem.itemIdx}
												src={hotitem.itemImgUrl}
												onClick={() => onDetailItemClick(hotitem.itemIdx)}
											>
												<SubText
													fontsize="0.8125rem"
													fontweight="bold"
													color="#6de98d"
												>
													{hotitem.name}'s
												</SubText>
												<SubText
													fontsize="13px"
													fontweight="bold"
													color="white"
													margin="0.5rem 0 0 0 "
												>
													{hotitem.brandKr}
												</SubText>
												<SubText fontsize="12px" color="white">
													{hotitem.itemName}
												</SubText>
											</HotItem>
										))}
									</>
								) : (
									<></>
								)}
							</>
						)}
					</HotItemWrap>
				</>
			) : (
				<ItemContainer
					style={{
						display: 'flex',
						alignContent: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						paddingBottom: '2.5rem',
						width: '100%',
					}}
				>
					<NoItem></NoItem>
					<SubText margin="1rem 0" fontsize="0.875rem" fontweight="bold">
						아직 아이템이 존재하지 않아요
					</SubText>
				</ItemContainer>
			)}
		</ItemContainer>
	);
};

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: ${props => props.padding || '2.5rem 1.25rem 1.25rem 1.25rem'};
`;
const FilterWrap = styled.div`
	display: flex;
	text-align: center;
	align-items: center;
	margin-bottom: 1rem;
	padding-left: 1.25rem;
`;

const HotItemWrap = styled.div`
	display: grid;
	gap: 0.625rem;
	height: 31.75rem;
	padding: 0 1.25rem 1.25rem 1.25rem;
	/*  margin-right: 20px; */
	overflow-x: scroll;
	grid-template-columns: repeat(8, minmax(10.125rem, auto));
	grid-template-rows: 1fr 1fr 1fr;
	::-webkit-scrollbar-corner {
		height: 1.25rem;
	}
	/* box-sizing: border-box; */
	::-webkit-scrollbar {
		margin-top: 0.625rem;
		width: 80%;
		height: 4px;
		background-color: #f0f0f0; /* 또는 트랙에 추가한다 */
		bottom: 6.25rem;
		left: 1.25rem;
	}
	::-webkit-scrollbar-button:start:decrement,
	::-webkit-scrollbar-button:end:increment {
		height: 1.25rem;
		background-color: white;
	}
	/* 썸(thumb) 추가 */
	::-webkit-scrollbar-thumb {
		margin-top: 10px;
		width: 38px;
		background: #262626;
		border-radius: 38px;
	}

	> div:nth-child(1) {
		grid-column: 1 / 2;
		grid-row: 1 / 4;
	}
	> div:nth-child(2) {
		grid-column: 2 / 3;
		grid-row: 1 / 2;
	}
	> div:nth-child(3) {
		grid-column: 3 / 4;
		grid-row: 1 / 2;
	}
	> div:nth-child(4) {
		grid-column: 2 / 4;
		grid-row: 2 / 3;
	}
	> div:nth-child(5) {
		grid-column: 2 / 3;
		grid-row: 3 / 4;
	}
	> div:nth-child(6) {
		grid-column: 3 / 4;
		grid-row: 3 / 4;
	}
	> div:nth-child(7) {
		grid-column: 4 / 5;
		grid-row: 1 / 2;
	}
	> div:nth-child(8) {
		grid-column: 5 / 6;
		grid-row: 1 / 2;
	}
	> div:nth-child(9) {
		grid-column: 4 / 6;
		grid-row: 2 / 4;
	}
	> div:nth-child(10) {
		grid-column: 6 / 7;
		grid-row: 1 / 2;
	}
	> div:nth-child(11) {
		grid-column: 7 / 9;
		grid-row: 1 / 2;
		/* margin-right: 20px; */
	}
	> div:nth-child(12) {
		grid-column: 6 / 9;
		grid-row: 2 / 3;
		/* margin-right: 20px; */
	}
	> div:nth-child(13) {
		grid-column: 6 / 8;
		grid-row: 3 / 4;
	}
	> div:nth-child(14) {
		grid-column: 8 / 9;
		grid-row: 3 / 4;
		column-gap: 20px;
		/* margin-right: 20px; */
	}
`;
const HotItem = styled.div`
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
	align-items: flex-start;
	flex-direction: column;
	background-color: grey;
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
	border-radius: 1rem;
	padding: 0.75rem 1rem;
	span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}
`;

const TextWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: ${props => props.marginbottom || '20px'};
	padding: ${props => props.padding};
`;
