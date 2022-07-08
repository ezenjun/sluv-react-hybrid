import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';

export function ItemFilter() {
	const filterList = [
		{ idx: 1, name: '상의', list: ['반소매', '긴소매', '아우터'] },
		{ idx: 2, name: '하의', list: ['바지', '치마'] },
		{ idx: 3, name: '원피스', list: ['원피스', '점프슈트'] },
		{ idx: 4, name: '뷰티', list: ['메이트업', '스킨케어', '향수', '헤어 & 바디'] },
		{ idx: 5, name: '액세서리', list: ['신발', '모자', '가방'] },
		{ idx: 6, name: '라이프', list: ['홈웨어', '가구', '생활용품'] },
		{ idx: 7, name: '기타', list: [] },
	];
	const [selectedMainFilter, setSelectedMainFilter] = useState(0);
	const [selectedStatusList, setSelectedStatusList] = useState([]);
	const [selectedFilterList, setSelectedFilterList] = useState([]);

	const onMainSelect = idx => {
		if (selectedMainFilter === idx) {
			setSelectedMainFilter(0);
			let temp = [];
			setSelectedFilterList(temp);
		} else {
			setSelectedMainFilter(idx);
			let temp;
			(temp = []).length = filterList[idx - 1].list.length;
			temp.fill(false);
			setSelectedStatusList(temp);
			temp = [];
			setSelectedFilterList(temp);
		}
	};
	const eachStatusClick = (subfilter, index) => {
		if (selectedStatusList[index]) {
			//선택되어있을 때
			setSelectedFilterList(selectedFilterList.filter(item => item !== subfilter));
		} else {
			// 선택 안되어있을 때
			setSelectedFilterList([...selectedFilterList, subfilter]);
		}
		let temp = selectedStatusList;
		temp[index] = !temp[index];
		setSelectedStatusList(temp);
		console.log(selectedFilterList);
	};

	return (
		<FilterContainer>
			<TopWrap>
				{filterList.map(filter => (
					<Filter
						key={filter.idx}
						selected={selectedMainFilter === filter.idx}
						onClick={() => onMainSelect(filter.idx)}
					>
						{filter.name}
					</Filter>
				))}
			</TopWrap>
			<HorizontalLine margin="0.5rem 0 1.25rem"></HorizontalLine>
			<BottomWrap>
				{selectedMainFilter > 0 && (
					<>
						{filterList[selectedMainFilter - 1].list.map((subfilter, index) => (
							<Filter
								key={subfilter}
								selected={selectedStatusList[index]}
								onClick={() => eachStatusClick(subfilter, index)}
							>
								{subfilter}
							</Filter>
						))}
					</>
				)}
			</BottomWrap>
		</FilterContainer>
	);
}

const FilterContainer = styled.div`
	display: flex;
	padding: 1.25rem;
	flex-direction: column;
	height: 18.5625rem;
`;
const Filter = styled.div`
	display: flex;
	align-items: center;
	height: 48px;
	flex-grow: 0;
	font-size: 14px;
	font-weight: normal;
	margin-right: 0.5rem;
	margin-bottom: 0.75rem;
	padding: 16px 20px;
	border-radius: 13px;
	border: solid 1px #e5cff6;
	box-sizing: border-box;
	color: ${props => (props.selected ? '#262626' : '#c9c9c9')};
	background-color: ${props => (props.selected ? '#fbf6ff' : '#fff')};
`;
export const TopWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
export const BottomWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
