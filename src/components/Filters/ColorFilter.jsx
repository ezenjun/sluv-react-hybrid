import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { ReactComponent as WhiteCheck } from '../../assets/Icons/whiteCheck.svg';
import { ReactComponent as BlackCheck } from '../../assets/Icons/blackCheck.svg';

export function ColorFilter() {
	const filterList = [
		{ idx: 1, name: '빨강', color: '#ea3323' },
		{ idx: 2, name: '주확', color: '#FE9150' },
		{ idx: 3, name: '노랑', color: '#F8D748' },
		{ idx: 4, name: '초록', color: '#459949' },
		{ idx: 5, name: '파랑', color: '#4166ED' },
		{ idx: 6, name: '남색', color: '#1C358F' },
		{ idx: 7, name: '보라', color: '#8C3ED9' },
		{ idx: 8, name: '분홍', color: '#EC658B' },
		{ idx: 9, name: '베이지', color: '#EFE2C6' },
		{ idx: 10, name: '갈색', color: '#9A6B41' },
		{ idx: 11, name: '회색', color: '#BEBEBE' },
		{ idx: 12, name: '검정', color: '#000000' },
		{ idx: 13, name: '흰색', color: '#FFFFFF', border: 'solid 1px #c9c9c9;', checkBlack: true },
		{
			idx: 14,
			name: '실버',
			color: 'linear-gradient(179deg, #c7c7c7 1%, #eee 69%)',
			// checkBlack: true,
		},
		{
			idx: 15,
			name: '골드',
			color: 'linear-gradient(to bottom, #f2a840 -6%, #fbe779 106%)',
			// checkBlack: true,
		},
	];

	const [selectedStatusList, setSelectedStatusList] = useState([]);
	const [selectedFilterList, setSelectedFilterList] = useState([]);

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
		console.log('clickedIndex', index);
		console.log(selectedFilterList);
	};

	return (
		<FilterContainer>
			<FilterWrap>
				{filterList.map((filter, index) => (
					<Filter
						key={filter.idx}
						selected={selectedStatusList[index] === filter.idx}
						onClick={() => eachStatusClick(filter.idx, index)}
					>
						<Color color={filter.color} border={filter.border}>
							{selectedStatusList[index] ? (
								<>
									{filter.checkBlack ? (
										<BlackCheck></BlackCheck>
									) : (
										<WhiteCheck></WhiteCheck>
									)}
								</>
							) : (
								<></>
							)}
						</Color>
						{filter.name}
					</Filter>
				))}
			</FilterWrap>
		</FilterContainer>
	);
}

const FilterContainer = styled.div`
	display: flex;
	padding: 1.25rem;
	flex-direction: column;
	height: 18.5625rem;
`;
const FilterWrap = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

	flex-direction: row;
	flex-wrap: wrap;
	box-sizing: border-box;
	justify-content: space-evenly;
	align-items: center;
	align-content: center;
	width: 100%;
`;
const Filter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 0;
	font-size: 14px;
	font-weight: normal;
	margin-bottom: 0.75rem;
`;
const Color = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	background-color: ${props => props.color};
	background-image: ${props => props.color};
	border: ${props => props.border || 'none'};
	height: 3rem;
	width: 3rem;
	border-radius: 50%;
	margin-bottom: 0.375rem;
`;
export const TopWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
export const BottomWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 18.5625rem;
`;
