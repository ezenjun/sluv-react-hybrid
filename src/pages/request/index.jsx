import React from 'react'
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav'
import { TopRadiusContainer } from '../../components/containers/TopRadiusContainer';
import SpeechBubble from '../../components/SpeechBubble';

export default function RequestCeleb() {
    return (
		<MainContainer>
			<TopNav style={{ justifyContent: 'space-between', border: '1px solid red' }}>
				<BackButton />
				<div className="centerText">셀럽 추가 요청하기</div>
				<div className="rightText">완료</div>
			</TopNav>
			<TopRadiusContainer style={{ flex: 1 }}>
				<SpeechBubble>추가 되었으면 하는 셀럽이 누구인가요?*</SpeechBubble>
				<SpeechBubble>추가 되었으면 하는 이유가 궁금해요</SpeechBubble>
			</TopRadiusContainer>
		</MainContainer>
	);
}


