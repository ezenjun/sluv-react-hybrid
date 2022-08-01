import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as DemodayEvetnIcon } from '../../assets/Event/demodayEvetnIcon.svg';
import { useNavigate } from 'react-router-dom';
export default function Event() {
	const navigate = useNavigate();
	const onClickCard = idx => {
		navigate(`/event/${idx}`, { state: { eventName: '스럽 X CMC 10기 데모데이 이벤트' } });
	};
	var today = new Date();
	var Dday = new Date('July,30,2022');
	var gap = Dday.getTime() - today.getTime();
	var result = Math.ceil(gap / (1000 * 60 * 60 * 24));

	return (
		<FeedContainer>
			<EventCard onClick={() => onClickCard(1)}>
				<Top>
					<DDAY>
						{/* {result !== 0 ? (
							<SubText fontweight="700" color="#9E30F4">
								D-{result}
							</SubText>
						) : (
							<SubText fontweight="700" color="#9E30F4">
								D-Day
							</SubText>
						)} */}
						<SubText fontweight="700" color="#9E30F4">
							종료
						</SubText>
					</DDAY>
				</Top>

				{/* <Bottom> */}
				<BottomTop>
					<DemodayEvetnIcon
						style={{
							width: '11.4375rem',
							height: '2.9438rem',
						}}
					></DemodayEvetnIcon>
				</BottomTop>

				<TextWrap>
					<MainText fontsize="1.125rem" fontweight="700" color="white">
						스럽 X CMC 10기 데모데이 이벤트
					</MainText>
					<HorizontalLine
						color="1px solid rgba(255, 255, 255, 0.2);"
						margin="0.375rem 0"
					></HorizontalLine>
					<SubText fontsize="0.875rem" fontweight="400" color="white">
						인스타그램 스토리로 스럽을 홍보하고,
						<br />
						기프티콘을 받아가세요!
					</SubText>
				</TextWrap>
				{/* </Bottom> */}
			</EventCard>
		</FeedContainer>
	);
}
const FeedContainer = styled.div`
	padding: 1.25rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;

const EventCard = styled.div`
	display: flex;
	z-index: 0;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 14.375rem;
	background: linear-gradient(
			330.46deg,
			rgba(0, 0, 0, 0.5) -60.04%,
			rgba(255, 255, 255, 0) 41.39%
		),
		linear-gradient(330deg, #9e30f4 -41.04%, #ffe6eb 91.39%);

	border-radius: 0.8125rem;
	padding: 1.25rem;
	box-sizing: border-box;
`;
const TextWrap = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`;
const DDAY = styled.div`
	display: flex;
	top: 150px;
	right: 2.5rem;
	padding: 0.375rem 0.75rem;
	background: #f5eafe;
	border-radius: 32.5625rem;
	justify-content: center;
	align-items: center;
`;
const Top = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
`;
const Bottom = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
`;
const BottomTop = styled.div`
	display: flex;
	justify-content: center;
`;
