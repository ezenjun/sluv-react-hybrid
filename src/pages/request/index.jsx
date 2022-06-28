import React, { useEffect, useState } from 'react'
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav'
import { TopRadiusContainer } from '../../components/containers/TopRadiusContainer';
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import { InputSpeechBubbleWrap, SpeechBubbleInput, SpeechBubbleTextArea } from '../../components/Bubbles/InputSpeechBubble';
import { useNavigate } from 'react-router-dom';

export default function RequestCeleb() {

	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [reason, setReason] = useState('');
	const [isName, setIsName] = useState(false);
	const [isReason, setIsReason] = useState(false);
	const [isConfirm, setIsConfirm] = useState(false);

	useEffect(() => {
		if(name) {
			setIsName(true);
			return;
		} 
		setIsName(false);
	},[name]);

	useEffect(() => {
		if (reason) {
			setIsReason(true);
			return;
		}
		setIsReason(false);
	}, [reason]);

	useEffect(() => {
		if(name && reason) {
			setIsConfirm(true);
			return;
		}
		setIsConfirm(false);
	},[name,reason]);

	const onClickConfirm = () => {
		if(isConfirm) navigate(-1);
	}

    return (
		<MainContainer>
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={()=>navigate(-1)} />
				<div className="centerText">셀럽 추가 요청하기</div>
				<div
					className="rightText"
					style={{ color: isConfirm ? '#262626' : '#b1b1b1' }}
					onClick={onClickConfirm}
				>
					완료
				</div>
			</TopNav>

			<TopRadiusContainer style={{ flex: 1 }}>
				<SpeechBubbleWrap>
					<div>
						추가 되었으면 하는 셀럽이 누구인가요?<span className="redStar">*</span>
					</div>
				</SpeechBubbleWrap>
				<InputSpeechBubbleWrap notEmpty={isName}>
					<SpeechBubbleInput
						notEmpty={isName}
						type="text"
						placeholder="공식 활동명을 한글로 입력해주세요"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</InputSpeechBubbleWrap>

				<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
					<div>추가 되었으면 하는 이유가 궁금해요</div>
				</SpeechBubbleWrap>
				<InputSpeechBubbleWrap notEmpty={isReason} style={{ height: '100px' }}>
					<SpeechBubbleTextArea
						notEmpty={isReason}
						type="text"
						placeholder="내용을 입력해 주세요(최대 1,000자)"
						value={reason}
						onChange={e => setReason(e.target.value)}
					/>
				</InputSpeechBubbleWrap>
			</TopRadiusContainer>
		</MainContainer>
	);
}


