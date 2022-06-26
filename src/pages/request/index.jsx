import React from 'react'
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav'
import { TopRadiusContainer } from '../../components/containers/TopRadiusContainer';
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import { InputSpeechBubbleWrap } from '../../components/Bubbles/InputSpeechBubble';

export default function RequestCeleb() {
    return (
		<MainContainer>
			<TopNav style={{ justifyContent: 'space-between', border: '1px solid red' }}>
				<BackButton />
				<div className="centerText">셀럽 추가 요청하기</div>
				<div className="rightText">완료</div>
			</TopNav>
			<TopRadiusContainer style={{ flex: 1 }}>
				<SpeechBubbleWrap>
					<div>
						추가 되었으면 하는 셀럽이 누구인가요?<span className="redStar">*</span>
					</div>
				</SpeechBubbleWrap>
				<InputSpeechBubbleWrap>
					<input
						type='text'
						className="speechBubbleInput"
						placeholder="공식 활동명을 한글로 입력해주세요"
					/>
				</InputSpeechBubbleWrap>

				<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
					<div>추가 되었으면 하는 이유가 궁금해요</div>
				</SpeechBubbleWrap>
				<InputSpeechBubbleWrap style={{ height: '100px' }}>
					<textarea
						type='text'
						className="speechBubbleInput"
						placeholder="내용을 입력해 주세요(최대 1,000자)"
					/>
				</InputSpeechBubbleWrap>
			</TopRadiusContainer>
		</MainContainer>
	);
}


