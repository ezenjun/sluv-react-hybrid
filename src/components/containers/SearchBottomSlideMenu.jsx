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

export const filterList = [
	{ idx: 1, name: '상의', list: ['반소매', '긴소매', '아우터'] },
	{ idx: 2, name: '하의', list: ['바지', '치마'] },
	{ idx: 3, name: '원피스', list: ['원피스', '점프슈트'] },
	{ idx: 4, name: '뷰티', list: ['메이트업', '스킨케어', '향수', '헤어 & 바디'] },
	{ idx: 5, name: '액세서리', list: ['신발', '모자', '가방'] },
	{ idx: 6, name: '라이프', list: ['홈웨어', '가구', '생활용품'] },
	{ idx: 7, name: '기타', list: [] },
];

export function SearchBottomSlideMenu(props) {
	const bottomMenuStatusState = useRecoilValue(BottomMenuStatusState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const [isSelected, setIsSelected] = useState(false);
	

	const onReset = () => {
		props.getSelectedItemFilter();
		props.getSelectedPriceFilter();
		props.getSelectedAlignFilter();
		props.getSelectedColorFilter();
		setSelectedItemMainFilter(0);
		setSelectedItemStatusList([]);
		setSelectedItemFilterList([]);
		setSelectedPriceMainFilter(null);
		setSelectedAlignMainFilter(null);
		setSelectedColorStatusList([]);
		setSelectedColorFilterList([]);
	};
	const onSubmit = e => {
		setBottomMenuStatusState(false);
		if (selectedItemMainFilter !== 0) {
			if (selectedItemFilterList.length === 0) {
				props.getSelectedItemFilter(filterList[selectedItemMainFilter - 1].name);
				console.log(selectedItemFilterList.length);
			} else {
				if (selectedItemFilterList.length === 1) {
					props.getSelectedItemFilter(`${selectedItemFilterList[0]}`);
				} else {
					props.getSelectedItemFilter(
						`${selectedItemFilterList[0]} 외 ${selectedItemFilterList.length - 1}`
					);
				}

				console.log(selectedItemFilterList.length);
			}
		} else {
			props.getSelectedItemFilter();
		}

		if (selectedPriceMainFilter !== null) {
			props.getSelectedPriceFilter(selectedPriceMainFilter);
		} else {
			props.getSelectedPriceFilter();
		}

		if (selectedAlignMainFilter !== null) {
			props.getSelectedAlignFilter(selectedAlignMainFilter);
		} else {
			props.getSelectedAlignFilter();
		}

		if (selectedColorFilterList.length > 0) {
			if (selectedColorFilterList.length === 1) {
				props.getSelectedColorFilter(selectedColorFilterList[0].name);
			} else {
				props.getSelectedColorFilter(
					`${selectedColorFilterList[0].name} 외 ${selectedColorFilterList.length - 1}`
				);
			}
		} else {
			props.getSelectedColorFilter();
		}
		e.preventDefault();
	};
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
	const [selectedPriceMainFilter, setSelectedPriceMainFilter] = useState(null);
	const getSelectedPriceMainFilter = input => {
		setSelectedPriceMainFilter(input);
	};

	// 정렬
	const [selectedAlignMainFilter, setSelectedAlignMainFilter] = useState(null);
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
	useEffect(() => {
		props.childFunc.current = onReset;
	}, []);

	useEffect(() => {
		if (
			selectedItemMainFilter === 0 &&
			selectedPriceMainFilter === null &&
			selectedAlignMainFilter === null &&
			selectedColorFilterList.length === 0
		) {
			setIsSelected(false);
			props.getIsSelected(false);
		} else {
			setIsSelected(true);
			props.getIsSelected(true);
		}
	}, [
		selectedItemMainFilter,
		selectedPriceMainFilter,
		selectedAlignMainFilter,
		selectedColorFilterList,
	]);

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
	// const [selectedTab, setSelectedTab] = useState(1);
	const onClickTab = idx => {
		props.getSelectedTab(idx);
		console.log(props.selectedTab);
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
								selected={props.selectedTab === item.idx}
								color={props.selectedTab === item.idx ? '#262626' : '#8D8D8D'}
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
				{props.selectedTab === 1 && (
					<ItemFilter
						filterList={filterList}
						selectedMainFilter={selectedItemMainFilter}
						selectedStatusList={selectedItemStatusList}
						selectedFilterList={selectedItemFilterList}
						getSelectedMainFilter={getSelectedItemMainFilter}
						getSelectedStatusList={getSelectedItemStatusList}
						getSelectedFilterList={getSelectedItemFilterList}
					></ItemFilter>
				)}
				{props.selectedTab === 2 && (
					<PriceFilter
						selectedMainFilter={selectedPriceMainFilter}
						getSelectedMainFilter={getSelectedPriceMainFilter}
					></PriceFilter>
				)}
				{props.selectedTab === 3 && (
					<AlignFilter
						selectedMainFilter={selectedAlignMainFilter}
						getSelectedMainFilter={getSelectedAlignMainFilter}
					></AlignFilter>
				)}
				{props.selectedTab === 4 && (
					<ColorFilter
						selectedStatusList={selectedColorStatusList}
						selectedFilterList={selectedColorFilterList}
						getSelectedStatusList={getSelectedColorStatusList}
						getSelectedFilterList={getSelectedColorFilterList}
					></ColorFilter>
				)}

				<ButtonWrap>
					<ResetButton active={isSelected} onClick={onReset}>
						초기화
					</ResetButton>
					<SubmitButton active={isSelected} onClick={e => onSubmit(e)}>
						선택 완료
					</SubmitButton>
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
export const ButtonWrap = styled.div`
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
