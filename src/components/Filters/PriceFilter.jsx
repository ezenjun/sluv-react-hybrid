import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';

export default function PriceFilter() {
	const filterList = [
		{ idx: 1, name: '최신순' },
		{ idx: 2, name: '인기순' },
	];
	const [selectedMainFilter, setSelectedMainFilter] = useState(0);

	const onMainSelect = idx => {
		if (selectedMainFilter === idx) {
			setSelectedMainFilter(0);
		} else {
			setSelectedMainFilter(idx);
		}
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
