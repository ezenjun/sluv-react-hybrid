import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import { BottomMenuStatusState, TotalSelectedFilterState } from '../../recoil/BottomSlideMenu';
import { AlignFilter } from '../Filters/AlignFilter';
import { PriceFilter } from '../Filters/PriceFilter';
import { ColorFilter } from '../Filters/ColorFilter';
import { ItemFilter } from '../Filters/ItemFilter';

import { SubText } from '../Texts/SubText';

export function SearchBottomSlideMenu() {
	const bottomMenuStatusState = useRecoilValue(BottomMenuStatusState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);

	// 아이템 종류
	const [selectedItemMainFilter, setSelectedItemMainFilter] = useState(0);
	const [selectedItemStatusList, setSelectedItemStatusList] = useState([]);
	const [selectedItemFilterList, setSelectedItemFilterList] = useState([]);

	const getSelectedItemMainFilter = input => {
		setSelectedItemMainFilter(input);
	};
	const getSelectedItemStatusList = input => {
		setSelectedItemStatusList(input);
	};
	const getSelectedItemFilterList = input => {
		setSelectedItemFilterList(input);
	};

	// 가격대
	const [selectedPriceMainFilter, setSelectedPriceMainFilter] = useState(0);
	const getSelectedPriceMainFilter = input => {
		setSelectedPriceMainFilter(input);
	};

	// 정렬
	const [selectedAlignMainFilter, setSelectedAlignMainFilter] = useState(0);
	const getSelectedAlignMainFilter = input => {
		setSelectedAlignMainFilter(input);
	};

	// 색상
	const [selectedColorStatusList, setSelectedColorStatusList] = useState([]);
	const [selectedColorFilterList, setSelectedColorFilterList] = useState([]);
	const getSelectedColorStatusList = input => {
		setSelectedColorStatusList(input);
	};
	const getSelectedColorFilterList = input => {
		setSelectedColorFilterList(input);
	};

	const closeDialog = () => {
		setBottomMenuStatusState(false);
		console.log(BottomMenuStatusState);
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
	const [selectedTab, setSelectedTab] = useState(1);
	const onClickTab = idx => {
		setSelectedTab(idx);
	};
	return (
		<BottomDialogWrap openStatus={bottomMenuStatusState}>
			<div onClick={closeDialog} style={{ height: '100%', width: '100%' }}></div>
			<BottomDialogDiv>
				<CloseWrap>
					{tabList.map(item => {
						return (
							<SubText
								key={item.idx}
								fontsize="1.125rem"
								margin="0 1rem 0 0 "
								onClick={() => onClickTab(item.idx, item.name)}
								selected={selectedTab === item.idx}
							>
								{item.name}
							</SubText>
						);
					})}
					<Close
						style={{
							width: '1.5rem',
							height: '1.5rem',
							position: 'absolute',
							right: '1.25rem',
						}}
						onClick={closeDialog}
					></Close>
				</CloseWrap>
				{selectedTab === 1 && (
					<ItemFilter
						selectedMainFilter={selectedItemMainFilter}
						selectedStatusList={selectedItemStatusList}
						selectedFilterList={selectedItemFilterList}
						getSelectedMainFilter={getSelectedItemMainFilter}
						getSelectedStatusList={getSelectedItemStatusList}
						getSelectedFilterList={getSelectedItemFilterList}
					></ItemFilter>
				)}
				{selectedTab === 2 && (
					<PriceFilter
						selectedMainFilter={selectedPriceMainFilter}
						getSelectedMainFilter={getSelectedPriceMainFilter}
					></PriceFilter>
				)}
				{selectedTab === 3 && (
					<AlignFilter
						selectedMainFilter={selectedAlignMainFilter}
						getSelectedMainFilter={getSelectedAlignMainFilter}
					></AlignFilter>
				)}
				{selectedTab === 4 && (
					<ColorFilter
						selectedStatusList={selectedColorStatusList}
						selectedFilterList={selectedColorFilterList}
						getSelectedStatusList={getSelectedColorStatusList}
						getSelectedFilterList={getSelectedColorFilterList}
					></ColorFilter>
				)}

				<ButtonWrap>
					<ResetButton active={true}>초기화</ResetButton>
					<SubmitButton active={true}>선택 완료</SubmitButton>
				</ButtonWrap>
			</BottomDialogDiv>
		</BottomDialogWrap>
	);
}

export const BottomDialogWrap = styled.div`
	display: ${props => (props.openStatus ? 'block' : 'none')};
	z-index: 10000;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
`;

const BottomDialogDiv = styled.div`
	position: absolute;
	bottom: 0;
	display: flex;
	flex-direction: column;
	background-color: white;
	text-align: center;
	font-size: 0.875rem;
	font-family: 'Pretendard';
	font-weight: 600;
	color: #000000;
	width: 100%;
	min-height: 8rem;
	border-radius: 1rem 1rem 0 0;
	padding: 1.25rem 0 1.25rem 0;
	box-sizing: border-box;
`;
const CloseWrap = styled.div`
	display: flex;
	/* justify-content: flex-end; */
	padding: 0 1.25rem;
`;
const ButtonWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 1.25rem;
`;
const ResetButton = styled.div`
	display: flex;
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 16px;
	font-weight: bold;
	font-size: 16px;
	font-weight: bold;
	padding: 14px 0;
	width: 6.375rem;
	height: 3rem;
	margin-right: 0.5rem;
	border-radius: 30.3774px;
	color: ${props => (props.active ? '#9E30F4' : '#dadada')};
	border: ${props => (props.active ? '1px solid #9E30F4' : '1px solid #dadada')};
`;
const SubmitButton = styled.div`
	display: flex;
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 16px;
	font-weight: bold;
	font-size: 16px;
	font-weight: bold;
	padding: 14px 0;
	width: 14.0625rem;
	height: 3rem;
	border-radius: 30.3774px;
	color: white;
	border: ${props => (props.active ? '1px solid #9E30F4' : '1px solid #dadada')};
	background-color: ${props => (props.active ? '#9E30F4' : '#dadada')};
`;
