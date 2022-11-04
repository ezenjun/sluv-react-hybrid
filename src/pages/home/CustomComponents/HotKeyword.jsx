import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { customApiClient } from '../../../utils/apiClient';
import Slider from 'react-slick';
import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';
import { VerticalLine } from '../../../components/Lines/VerticalLine';

import { ReactComponent as RightArrow } from '../../../assets/Icons/right_arrow.svg';

export function HotKeyword() {
	const navigate = useNavigate();
	const [keywordList, setKeywordList] = useState([]);
	const getHotKeywordList = async () => {
		const data = await customApiClient('get', `/homes/hot-keywords`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		let temp = data.result;
		setKeywordList(temp);
	};
	const onKeywordClick = searchInput => {
		navigate(`/search/result/${searchInput}`);
	};

	useEffect(() => {
		getHotKeywordList();
	}, []);

	return (
		<ItemContainer padding="1.25rem 0">
			<TextWrap padding="0 1.25rem 0 1.25rem">
				<MainText fontsize="1.5rem">인기 키워드</MainText>
			</TextWrap>

			<ChipContainer>
				<ChipWrap>
					{keywordList.slice(0, 5).map(keyword => (
						<Chip key={keyword.keyword} onClick={() => onKeywordClick(keyword.keyword)}>
							{keyword.keyword}
						</Chip>
					))}
				</ChipWrap>

				<ChipWrap style={{ padding: '0 1.75rem' }}>
					{keywordList.slice(5, 10).map(keyword => (
						<Chip key={keyword.keyword} onClick={() => onKeywordClick(keyword.keyword)}>
							{keyword.keyword}
						</Chip>
					))}
				</ChipWrap>
				<ChipWrap>
					{keywordList.slice(10, 15).map(keyword => (
						<Chip key={keyword.keyword} onClick={() => onKeywordClick(keyword.keyword)}>
							{keyword.keyword}
						</Chip>
					))}
				</ChipWrap>
			</ChipContainer>
		</ItemContainer>
	);
}

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
	margin-left: ${props => props.marginleft || '20px'};
	margin-bottom: 10px;
	-webkit-animation-name: move;
	-webkit-animation-duration: 15s;
	-webkit-animation-iteration-count: infinite;
	-webkit-animation-direction: alternate;
	-webkit-animation-timing-function: linear;
	@keyframes move {
		0% {
			margin-left: -90%;
		}
		100% {
			margin-left: 20px;
		}
	}
`;

const Chip = styled.div`
	display: inline-block;
	box-sizing: border-box;
	padding: 0.625rem 1rem;
	margin-right: 0.5rem;
	border-radius: 1.9rem;
	/* border: solid 1px #e2e0e0; */
	background-color: #fbf6ff;
	color: #9e30f4;
	font-size: 0.875rem;
	font-weight: 600;
`;
const ChipContainer = styled.div`
	width: 100%;
	/* border: 1px solid #333; */
	overflow: hidden;
	/* margin: 25px auto; */
`;
