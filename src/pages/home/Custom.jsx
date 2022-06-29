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
				<RecommendUserWrap>
					<TextWrap>
						<MainText fontsize="1.5rem">인기 스러버 추천</MainText>
					</TextWrap>
					<ChipWrap>
						<Chip>스트레이키즈</Chip>
						<Chip>리노</Chip>
						<Chip>현진</Chip>
						<Chip>아이엔</Chip>
						<Chip>필릭스</Chip>
					</ChipWrap>
				</RecommendUserWrap>
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
	box-sizing: border-box;
	padding: 2.5rem 1.25rem 3.125rem 1.25rem;
`;
const TextWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: ${props => props.marginbottom || '20px'};
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
	font-size: 0.875rem;
`;
const FilterWrap = styled.div`
	display: flex;
	margin-bottom: 1rem;
`;
const HorizontalLine = styled.div`
	margin: 0.75rem 0;
	border-top: 1px solid #f4f4f4;
`;
const VerticalLine = styled.div`
	margin: 0 0.5rem;
	border-right: 1px solid #d9d9d9;
`;
const ItemWrap = styled.div`
	display: grid;
	justify-items: center;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: minmax(6.25rem, auto);
	row-gap: 0.6875rem;
	column-gap: 0.6875rem;
`;
const Item = styled.div``;
const Image = styled.div`
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: blue;
	margin-bottom: 1rem;
`;
const RecommendUserWrap = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding-top: 40px;
	padding-bottom: 50px;
`;
