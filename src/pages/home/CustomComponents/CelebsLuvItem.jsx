import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';
import { HorizontalLine } from '../../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../../components/Lines/VerticalLine';

import { ReactComponent as RightArrow } from '../../../assets/Icons/right_arrow.svg';
import { ReactComponent as BinderWhite } from '../../../assets/Icons/binderWhite.svg';
import { ReactComponent as BinderRed } from '../../../assets/Icons/binderRed.svg';
import img from '../img.png';

export const CelebsLuvItem = () => {
	const navigate = useNavigate();
	const onDetailCelebClick = celebId => {
		navigate('/celeb/detail/' + celebId);
	};
	return (
		<ItemContainer>
			<TextWrap>
				<MainText fontsize="1.5rem">
					#스트레이키즈's
					<br />
					LUV 아이템
				</MainText>
				<RightArrow onClick={() => onDetailCelebClick(1)}></RightArrow>
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
					<Image>
						<ImageText>
							<SubText fontsize="0.8125rem" fontweight="bold" color="white">
								리노's
							</SubText>
							<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
						</ImageText>
					</Image>
					<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
						마하그리드
					</SubText>
					<SubText
						color="#262626"
						style={{
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							width: '100%',
						}}
					>
						Rugby Polo Ls TEE BLUE
					</SubText>
				</Item>
				<Item>
					<Image>
						<ImageText>
							<SubText fontsize="0.8125rem" fontweight="bold" color="white">
								현진's
							</SubText>
							<BinderRed style={{ width: '1.5rem', height: '1.5rem' }} />
						</ImageText>
					</Image>
					<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
						마하그리드
					</SubText>
					<SubText
						color="#262626"
						style={{
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							width: '100%',
						}}
					>
						Rugby Polo Ls TEE BLUE
					</SubText>
				</Item>
				<Item>
					<Image>
						<ImageText>
							<SubText fontsize="0.8125rem" fontweight="bold" color="white">
								아이엔's
							</SubText>
							<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
						</ImageText>
					</Image>
					<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
						마하그리드
					</SubText>
					<SubText
						color="#262626"
						style={{
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							width: '100%',
						}}
					>
						Rugby Polo Ls TEE BLUE
					</SubText>
				</Item>
				<Item>
					<Image>
						<ImageText>
							<SubText fontsize="0.8125rem" fontweight="bold" color="white">
								필릭스's
							</SubText>
							<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
						</ImageText>
					</Image>
					<SubText fontsize="16px" fontweight="bold" margin="0 0 0.375rem 0 ">
						마하그리드
					</SubText>
					<SubText
						color="#262626"
						style={{
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							width: '100%',
						}}
					>
						Rugby Polo Ls TEE BLUE
					</SubText>
				</Item>
			</ItemWrap>
		</ItemContainer>
	);
};
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
	text-align: center;
	align-items: center;
	margin-bottom: 1rem;
`;

const ItemWrap = styled.div`
	display: grid;
	justify-items: center;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: minmax(6.25rem, auto);
	row-gap: 0.6875rem;
	column-gap: 0.6875rem;
`;
const Item = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const Image = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: white;
	background-image: linear-gradient(
			to top,
			#000 0%,
			rgba(60, 60, 60, 0.77) 0%,
			rgba(0, 0, 0, 0) 34%
		),
		url(${img});
	background-repeat: no-repeat;
	background-size: contain;
	margin-bottom: 1rem;
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	font-size: 0.8125rem;
	@media screen and (width: 360px) {
		width: 9.5625rem;
		height: 9.5625rem;
	}
	@media screen and (width: 320px) {
		width: 9.375rem;
		height: 9.375rem;
	}
	@media screen and (width: 280px) {
		width: 8.125rem;
		height: 8.125rem;
	}
`;
const ImageText = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`;
