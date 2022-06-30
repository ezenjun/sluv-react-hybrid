import React from 'react';
import styled from 'styled-components';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';

import { ReactComponent as RightArrow } from '../../assets/Icons/right_arrow.svg';
import { ReactComponent as SpeakerPhone } from '../../assets/Icons/speakerphone.svg';
import { ReactComponent as BubbleHeart } from '../../assets/Icons/bubbleHeart.svg';
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
					<Chip selected={true}>스트레이키즈</Chip>
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
			<RecommendUserWrap>
				<TextWrap>
					<MainText fontsize="1.5rem">인기 스러버 추천</MainText>
				</TextWrap>
				<ChipWrap>
					<Chip selected={true}>전체 Best</Chip>
					<Chip>스트레이키즈</Chip>
					<Chip>있지</Chip>
					<Chip>최우식</Chip>
					<Chip>블랙핑크</Chip>
				</ChipWrap>
				<UserWrap>
					<User>
						<ProfileImg></ProfileImg>
						<SubText fontsize="0.875rem" margin="8px 0 4px 0">
							신류땡의 옷장
						</SubText>
						<SubText color="#8d8d8d">@ryujinee</SubText>
						<FollowButton follow={false}>팔로우</FollowButton>
					</User>
					<User>
						<ProfileImg></ProfileImg>
						<SubText fontsize="0.875rem" margin="8px 0 4px 0">
							도영이 클로젯12
						</SubText>
						<SubText color="#8d8d8d">@doyoung12</SubText>
						<FollowButton follow={true}>팔로잉</FollowButton>
					</User>
					<User>
						<ProfileImg></ProfileImg>
						<SubText fontsize="0.875rem" margin="8px 0 4px 0">
							신류땡의 옷장
						</SubText>
						<SubText color="#8d8d8d">@ryujinee</SubText>
						<FollowButton follow={false}>팔로우</FollowButton>
					</User>
					<User>
						<ProfileImg></ProfileImg>
						<SubText fontsize="0.875rem" margin="8px 0 4px 0">
							신류땡의 옷장
						</SubText>
						<SubText color="#8d8d8d">@ryujinee</SubText>
						<FollowButton follow={true}>팔로잉</FollowButton>
					</User>
				</UserWrap>
			</RecommendUserWrap>
			<BannerWrap>
				<Banner backgroundcolor="#ff006b">
					<BannerText>
						<MainText
							fontsize="1.125rem"
							fontweight="600"
							color="#fff"
							style={{ lineHeight: '1.28' }}
						>
							{' '}
							나누자! 정보!
						</MainText>
						<MainText
							fontsize="1.125rem"
							fontweight="600"
							color="#fff"
							style={{ lineHeight: '1.28' }}
						>
							{' '}
							우리들만의 아지트에서!
						</MainText>
						<SubText
							fontweight="normal"
							margin="6px 0 0 0"
							color="rgba(255, 255, 255, 0.8)"
						>
							최애의 아이템 정보를 공유해 보아요!
						</SubText>
					</BannerText>
					<BannerImg>
						<SpeakerPhone />
					</BannerImg>
				</Banner>
			</BannerWrap>
			<ItemContainer>
				<TextWrap>
					<MainText fontsize="1.5rem">
						#있지's
						<br />
						LUV 아이템
					</MainText>
					<RightArrow></RightArrow>
				</TextWrap>
				<ChipWrap>
					<Chip selected={true}>스트레이키즈</Chip>
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
			<QuestionContainer>
				<TextWrap padding="0 20px 0 0">
					<MainText fontsize="1.5rem">실시간 아이템 질문</MainText>
					<RightArrow></RightArrow>
				</TextWrap>
				<ChipWrap>
					<Chip selected={true}>전체 Best</Chip>
					<Chip>스트레이키즈</Chip>
					<Chip>있지</Chip>
					<Chip>최우식</Chip>
					<Chip>블랙핑크</Chip>
				</ChipWrap>
				<QuestionWrap>
					<Question>1</Question>
					<Question>2</Question>
					<Question>3</Question>
					<Question>4</Question>
					<Question>5</Question>
					<Question>6</Question>
					<Question>7</Question>
					<Question>8</Question>
					<Question>9</Question>
					<Question>10</Question>
				</QuestionWrap>
			</QuestionContainer>
			<BannerWrap>
				<Banner backgroundcolor="#7000ff">
					<BannerText>
						<MainText
							fontsize="1.125rem"
							fontweight="600"
							color="#fff"
							style={{ lineHeight: '1.28' }}
						>
							{' '}
							오늘 셀럽이 착용한
						</MainText>
						<MainText
							fontsize="1.125rem"
							fontweight="600"
							color="#fff"
							style={{ lineHeight: '1.28' }}
						>
							{' '}
							저 아이템 정보가 궁금해!
						</MainText>
						<SubText
							fontweight="normal"
							margin="6px 0 0 0"
							color="rgba(255, 255, 255, 0.8)"
						>
							아이템 정보를 마구마구 물어보세요
						</SubText>
					</BannerText>
					<BannerImg>
						<BubbleHeart />
					</BannerImg>
				</Banner>
			</BannerWrap>
			<ItemContainer>
				<TextWrap>
					<MainText fontsize="1.5rem">
						#최우식's
						<br />
						LUV 아이템
					</MainText>
					<RightArrow></RightArrow>
				</TextWrap>
				<ChipWrap>
					<Chip selected={true}>스트레이키즈</Chip>
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
			<ItemContainer padding="10px 0 50px 20px">
				<TextWrap padding="0 20px 0 0">
					<MainText fontsize="1.5rem">
						#스러버's LUV
						<br />
						HOT 아이템
					</MainText>
					<RightArrow></RightArrow>
				</TextWrap>
				<FilterWrap>
					<SubText fontsize="14px" fontweight="bold">
						일간
					</SubText>
					<VerticalLine />
					<SubText fontsize="14px" color="#8d8d8d">
						주간
					</SubText>
				</FilterWrap>
				<HotItemWrap>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
					<HotItem></HotItem>
				</HotItemWrap>
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
`;
const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: ${props => props.padding || '40px 20px 50px 20px'};
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
`;
const Chip = styled.div`
	display: inline-block;
	box-sizing: border-box;
	padding: 0.625rem 1rem;
	margin-right: 0.5rem;
	border-radius: 1.9rem;
	border: solid 1px #e2e0e0;
	background-color: ${props => (props.selected ? '#2b1e34' : '#fff')};
	color: ${props => (props.selected ? '#fff' : '#2b1e34')};
	font-size: 0.875rem;
	font-weight: 600;
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
	@media screen and (width: 360px) {
		width: 9.5625rem;
		height: 9.5625rem;
	}
	@media screen and (width: 320px) {
		width: 8.4063rem;
		height: 8.4063rem;
	}
`;
const RecommendUserWrap = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 40px 20px 50px 20px;
	background-color: #f8f7fa;
`;
const UserWrap = styled.div`
	display: flex;
	overflow-x: auto;
	margin-top: 20px;
	flex-direction: row;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const User = styled.div`
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	box-sizing: border-box;
	align-items: center;
	width: 9.0625rem;
	height: 12.375rem;
	padding: 20px;
	margin-right: 11px;
	border-radius: 16px;
	box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.05);
	background-color: rgba(255, 255, 255, 0.4);
`;
const ProfileImg = styled.div`
	width: 3.875rem;
	height: 3.875rem;
	border-radius: 50%;
	background-color: chocolate;
`;
const FollowButton = styled.div`
	padding: 10px 16px;
	border-radius: 30.4px;
	border: solid 1px #9e30f4;
	margin-top: 1rem;
	background-color: ${props => (props.follow ? '#fff' : '#9e30f4')};
	color: ${props => (props.follow ? '#9e30f4' : '#fff')};
	font-size: 0.875rem;
	font-weight: 600;
`;
const BannerWrap = styled.div`
	margin-top: 32px;
	padding: 0 20px;
`;
const Banner = styled.div`
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	height: 6.625rem;
	border-radius: 16px;
	background-color: ${props => props.backgroundcolor};
	/*  */
`;
const BannerText = styled.div`
	display: flex;
	flex-grow: 1;
	padding: 20px 0 20px 26px;
	flex-direction: column;
`;
const BannerImg = styled.div`
	padding-top: 5px;
`;
const QuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 40px 0 50px 20px;
	background-image: linear-gradient(to top, #f0fff4 102%, #f8f7fa 0%);
`;
const QuestionWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	box-sizing: border-box;
	align-content: space-between;
	height: 17.25rem;
	overflow-x: scroll;
	margin-top: 20px;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const Question = styled.div`
	box-sizing: border-box;
	width: 19.6875rem;
	height: 8.125rem;
	margin-bottom: 8px;
	margin-right: 11px;
	padding: 20px;
	border-radius: 16px;
	background-color: #fff;
	box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.05);
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const HotItemWrap = styled.div`
	display: grid;
	gap: 0.625rem;
	height: 31.75rem;
	padding: 0 20px 20px 0;
	/*  margin-right: 20px; */
	overflow-x: scroll;
	grid-template-columns: repeat(8, minmax(10.125rem, auto));
	grid-template-rows: 1fr 1fr 1fr;
	/* box-sizing: border-box; */

	::-webkit-scrollbar {
		margin-top: 10px;
		width: 5px;
		height: 4px;
		background-color: #f0f0f0; /* 또는 트랙에 추가한다 */
		bottom: 100px;
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
	background-color: darkolivegreen;
	border-radius: 16px;
`;
