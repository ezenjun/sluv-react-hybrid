import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { BottomWrap, NavRight, NextButton, TextWrap } from '../../pages/signup/SelectCeleb';
import { ChooseCelebCurrentPageState } from '../../recoil/Celebrity';
import { SpeechBubbleWrap } from '../Bubbles/SpeechBubble';
import { BackButton } from '../Buttons/BackButton';
import { MainText } from '../Texts/MainText';
import { SubText } from '../Texts/SubText';
import { ContentWrap } from './ContentWrap';
import { TopNav } from './TopNav';

export default function SelectMemberContainer({ data }) {

	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);

	const [currentMemberPage, setCurrentMemberPage] = useState(0);
	const [selectedMemberNum, setSelectedMemberNum] = useState(0);

	const onHandleBackButton = () => {
		if(!currentMemberPage) {
			setCurrentPage(0);
		} else {
			setCurrentMemberPage(currentMemberPage - 1);
		}
	};

	const onHandleNextButton = () => {
		if(currentMemberPage === data.length - 1) {
			// API 호출 완료 후
			onPostFavoriteCelebs();
			return;
		} 

		selectedMemberNum && setCurrentMemberPage(currentMemberPage + 1);
	};

	const onPostFavoriteCelebs = async () => {

		// API 호출

		// API 호출 성공하면 
		navigate('/home');
	}


	return (
		<>
			<TopNav>
				<BackButton onClick={onHandleBackButton} />
				<NavRight>
					{selectedMemberNum > 0 && (
						<SubText margin="0 1rem" color="#9e30f4">
							개 선택
						</SubText>
					)}
					<NextButton status={selectedMemberNum > 0 ? true : false} onClick={onHandleNextButton}>
						다음
					</NextButton>
				</NavRight>
			</TopNav>

			<ContentWrap padding="0">
				<TextWrap>
					<MainText fontsize="1.5rem" margin="1.625rem 0 0.5rem 0">
						좋아하는 멤버를
						<br />
						자유롭게 선택해주세요
					</MainText>
					<SubText
						color="#8d8d8d"
						fontsize="0.875rem"
						fontweight="regular"
						margin="0 0 1.25rem 0"
					>
						선택한 순서대로 더 빠른 정보를 제공받을 수 있어요!
					</SubText>
				</TextWrap>

				<BottomWrap>
					<SpeechBubbleWrap
						backgroundColor="#9e30f4"
						color="white"
						borderRight="8px solid #9e30f4"
					>
						<div>{data[currentMemberPage].name}</div>
					</SpeechBubbleWrap>
				</BottomWrap>
			</ContentWrap>
		</>
	);
}
