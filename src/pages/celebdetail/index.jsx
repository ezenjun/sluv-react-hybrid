import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../components/Lines/VerticalLine';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as FilterSmall } from '../../assets/Icons/filterSmall.svg';
import { ReactComponent as FilterBig } from '../../assets/Icons/filterBig.svg';

export default function CelebDetail() {
	let params = useParams();
	const navigate = useNavigate();
	const [view, setView] = useState(true);
	const changeView = () => {
		setView(!view);
	};
	const backClick = () => {
		navigate(-1);
	};

	return (
		<MainContainer>
			<TopNav style={{ position: 'relative' }}>
				<BackButton onClick={backClick} />
				<div style={{ fontSize: '1.125rem' }} className="centerText">
					{params.celebIdx}'s LUV 아이템
				</div>
			</TopNav>
			<ContentWrap padding="20px">
				<ChipWrap>
					<Chip selected={true}>스트레이키즈</Chip>
					<Chip>리노</Chip>
					<Chip>현진</Chip>
					<Chip>아이엔</Chip>
					<Chip>필릭스</Chip>
				</ChipWrap>
				<HorizontalLine />
				<FilterWrap>
					<Filter>
						<SubText fontsize="14px" fontweight="bold">
							최신순
						</SubText>
						<VerticalLine />
						<SubText fontsize="14px" color="#8d8d8d">
							인기순
						</SubText>
					</Filter>
					{view ? (
						<Filter onClick={changeView}>
							<FilterSmall style={{ marginRight: '4px' }}></FilterSmall>
							<SubText fontsize="14px" color="#8d8d8d">
								작게보기
							</SubText>
						</Filter>
					) : (
						<Filter onClick={changeView}>
							<FilterBig style={{ marginRight: '4px' }}></FilterBig>
							<SubText fontsize="14px" color="#8d8d8d">
								크게보기
							</SubText>
						</Filter>
					)}
				</FilterWrap>
				<ItemsContainer>
					<Item>
						<Image></Image>
						<ItemTextWrap>
							<SubText fontsize="1rem">마하그리드</SubText>
							<VerticalLine></VerticalLine>
							<SubText fontsize="1rem">Rugby Polo LS TEE BLUE</SubText>
						</ItemTextWrap>
						<SubInfoWrap>
							<ProfileImg></ProfileImg>
							<SubText> 이리노순둥도리</SubText>
							<Dot></Dot>
							<SubText> 5분 전</SubText>
						</SubInfoWrap>
					</Item>
				</ItemsContainer>
			</ContentWrap>
		</MainContainer>
	);
}
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
	justify-content: space-between;
	margin-bottom: 1rem;
`;
const Filter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	&:hover {
		cursor: pointer;
	}
`;
const ItemsContainer = styled.div`
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
const Item = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const Image = styled.div`
	width: 100%;
	height: 230px;
	background-color: darkturquoise;
	border-radius: 1rem;
`;
const ItemTextWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 16px 0 10px 0;
`;
const SubInfoWrap = styled.div`
	justify-content: space-between;
	align-items: center;
`;
const ProfileImg = styled.div`
	width: 22px;
	height: 22px;
	border-radius: 50%;
	background-color: darkturquoise;
`;
const Dot = styled.div`
	width: 2px;
	height: 2px;
	border-radius: 50%;
	background-color: #8d8d8d;
`;
