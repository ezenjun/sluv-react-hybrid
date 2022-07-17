import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HorizontalLine } from '../Lines/HorizontalLine';

export function PriceFilter(props) {
	const filterList = [
		{ idx: 1, name: '5만원 이하' },
		{ idx: 2, name: '5만원 ~ 10만원' },
		{ idx: 3, name: '10만원 ~ 20만원' },
		{ idx: 4, name: '20만원 ~ 30만원' },
		{ idx: 5, name: '30만원 이상' },
	];
	const setSelectedMainFilter = input => {
		props.getSelectedMainFilter(input);
	};
	const setSelectedMainFilterIdx = input => {
		props.getSelectedPriceFilterIdx(input);
	};

	const onMainSelect = filter => {
		if (props.selectedMainFilter === filter.name) {
			setSelectedMainFilter(null);
			setSelectedMainFilterIdx(0);
		} else {
			setSelectedMainFilter(filter.name);
			setSelectedMainFilterIdx(filter.idx);
		}
		console.log(props.selectedMainFilter);
	};

	return (
		<FilterContainer>
			<TopWrap>
				{filterList.map(filter => (
					<Filter
						key={filter.idx}
						selected={props.selectedMainFilter === filter.name}
						onClick={() => onMainSelect(filter)}
					>
						{filter.name}
					</Filter>
				))}
			</TopWrap>
		</FilterContainer>
	);
}

export const FilterContainer = styled.div`
	display: flex;
	padding: 1.25rem;
	flex-direction: column;
	height: 18.5625rem;
`;
export const Filter = styled.div`
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
