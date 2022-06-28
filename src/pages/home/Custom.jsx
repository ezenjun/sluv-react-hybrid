import React from 'react';
import styled from 'styled-components';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';

import { ReactComponent as RightArrow } from '../../assets/Icons/right_arrow.svg';

export default function Custom() {
	return (
		<>
			<EventContainer>
				<Events>이벤트 배너</Events>
				<Events bg="red">이벤트 배너</Events>
				<Events>이벤트 배너</Events>
				<Events bg="red">이벤트 배너</Events>
			</EventContainer>
			<ItemContainer>
				<TextWrap>
					<MainText fontsize="1.5rem">
						#스트레이키즈's
						<br />
						LUV 아이템
					</MainText>
					<RightArrow></RightArrow>
				</TextWrap>
				<ChipWrap>
					<Chip>스트레이키즈</Chip>
					<Chip>리노</Chip>
					<Chip>현진</Chip>
					<Chip>아이엔</Chip>
					<Chip>필릭스</Chip>
				</ChipWrap>
				<HorizontalLine />
				<FilterWrap>
					<SubText fontsize="14px" fontweight="bold">
						최신순
					</SubText>
					<VerticalLine />
					<SubText fontsize="14px" color="#8d8d8d">
						인기순
					</SubText>
				</FilterWrap>
				<ItemWrap>
					<Item>
						<Image />
						<SubText fontsize="16px" fontweight="bold" margin="0 0 6px0 ">
							마하그리드
						</SubText>
						<br />
						<SubText fontsize="12px">Rugby Polo Ls TEE BLUE</SubText>
					</Item>
					<Item>
						<Image />
						<SubText fontsize="16px" fontweight="bold" margin="0 0 6px0 ">
							더블유브이프로젝트
						</SubText>
						<br />
						<SubText fontsize="12px">Round Lawn Short Shirt...</SubText>
					</Item>
					<Item>
						<Image />
						<SubText fontsize="16px" fontweight="bold" margin="0 0 6px0 ">
							우알롱
						</SubText>
						<br />
						<SubText fontsize="12px">Signature hood sip-up - ...</SubText>
					</Item>
					<Item>
						<Image />
						<SubText fontsize="16px" fontweight="bold" margin="0 0 6px0 ">
							마하그리드
						</SubText>
						<br />
						<SubText fontsize="12px">Rugby Polo Ls TEE BLUE</SubText>
					</Item>
				</ItemWrap>
			</ItemContainer>
		</>
	);
}

const EventContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 100%;
	box-sizing: border-box;
	height: 400px;
	overflow-x: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const Events = styled.div`
	height: 400px;
	width: 100%;
	box-sizing: border-box;
	background-color: ${props => props.bg || 'pink'};
	/* border: 1px solid red; */
	overflow-x: scroll;
`;
const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 40px 20px 50px 20px;
`;
const TextWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 25px;
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
	padding: 10px 16px;
	margin-right: 8px;
	border-radius: 30.4px;
	border: solid 1px #e2e0e0;
	font-size: 14px;
`;
const FilterWrap = styled.div`
	display: flex;
	margin-bottom: 16px;
`;
const HorizontalLine = styled.div`
	margin: 12px 0;
	border-top: 1px solid #f4f4f4;
`;
const VerticalLine = styled.div`
	margin: 0 8px;
	border-right: 1px solid #d9d9d9;
`;
const ItemWrap = styled.div`
	display: grid;
	justify-content: center;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 13.6875rem 13.6875rem;
	row-gap: 11px;
	column-gap: 11px;
`;
const Item = styled.div``;
const Image = styled.div`
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 16px;
	background-color: blue;
	margin-bottom: 1rem;
`;
