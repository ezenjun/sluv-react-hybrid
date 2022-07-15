import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
	InputSpeechBubbleWrap,
	SpeechBubbleTextArea,
} from '../../components/Bubbles/InputSpeechBubble';
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { TopRadiusContainer } from '../../components/containers/TopRadiusContainer';
import { MainText } from '../../components/Texts/MainText';
import { PopUpModal } from '../../components/PopUp/PopUpModal';

import { ReactComponent as Unchecked } from '../../assets/Icons/icon_circular_checkbox_empty.svg';
import { ReactComponent as Checked } from '../../assets/Icons/icon_circular_checkbox_fill.svg';
import { customApiClient } from '../../utils/apiClient';
import { useSetRecoilState } from 'recoil';
import { PopUpModalState } from '../../recoil/PopUpModal';
import { PurpleButton } from '../../components/Buttons/PurpleButton';

export default function ReportUser() {
	const navigate = useNavigate();
	const { idx } = useParams();

	const setPopUpModalState = useSetRecoilState(PopUpModalState);

	const [extraOpinion, setExtraOpinion] = useState('');
	const [isExtraOpinion, setIsExtraOpinion] = useState(false);
	const [checkListData, setCheckListData] = useState([
		{
			idx: 0,
			text: '판매업자 활동을 해요',
		},
		{
			idx: 1,
			text: '비매너 사용자에요',
		},
		{
			idx: 2,
			text: '욕설을 해요',
		},
		{
			idx: 3,
			text: '성희롱을 해요',
		},
		{
			idx: 4,
			text: '기타',
		},
	]);
	const [isConfirm, setIsConfirm] = useState(false);
	const [checkedElement, setCheckedElement] = useState(-1);

	const onChangeExtraOpinion = e => {
		if (e.target.value) {
			setIsExtraOpinion(true);
		} else {
			setIsExtraOpinion(false);
		}
		setExtraOpinion(e.target.value);
	};
	const onChangeRadioButton = (e) => {
		setIsConfirm(true);
		setCheckedElement(e.target.value);
	};
	const onClickConfirm = async () => {
		let body = {};
		if(extraOpinion) {
			body = {
				category: checkedElement,
				content: extraOpinion,
			};
		} else {
			body = {
				category: checkedElement,
			};
		}
		
		const data = await customApiClient('post', `/users/${idx}/report`, body);

		if(!data) return;
		if(!data.isSuccess) return;
		console.log(data);

		setPopUpModalState(true);
	}

	const onClickYes = () => {
		setPopUpModalState(false);
		navigate(-1);
	}

	return (
		<MainContainer>
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					사용자 신고하기
				</MainText>
				<div
					style={{ color: isConfirm ? '#262626' : '#dadada' }}
					className="rightText"
					onClick={onClickConfirm}
				>
					완료
				</div>
			</TopNav>
			<TopRadiusContainer style={{ flex: '1' }}>
				<SpeechBubbleWrap>
					<div>
						사용자를 신고하는 이유가 궁금해요<span className="redStar">*</span>
					</div>
				</SpeechBubbleWrap>
				<CheckboxWrap>
					{checkListData.map(item => {
						return (
							<CircularCheckboxWrap key={item.idx}>
								<input
									type="radio"
									className="inputHidden"
									value={item.idx}
									onChange={onChangeRadioButton}
									checked={checkedElement == item.idx}
								/>
								{checkedElement == item.idx ? (
									<Checked style={{ width: '1.5rem', height: '1.5rem' }} />
								) : (
									<Unchecked style={{ width: '1.5rem', height: '1.5rem' }} />
								)}
								<div className="circularCheckboxText">{item.text}</div>
							</CircularCheckboxWrap>
						);
					})}
				</CheckboxWrap>

				<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
					<div>자세한 이야기도 들려주세요</div>
				</SpeechBubbleWrap>
				<InputSpeechBubbleWrap notEmpty={isExtraOpinion} style={{ height: '100px' }}>
					<SpeechBubbleTextArea
						notEmpty={isExtraOpinion}
						type="text"
						placeholder="내용을 입력해 주세요(최대 1,000자)"
						value={extraOpinion}
						onChange={onChangeExtraOpinion}
					/>
				</InputSpeechBubbleWrap>
			</TopRadiusContainer>

			<PopUpModal closeButton={false}>
				<div
					style={{
						marginTop: '1.5rem',
						fontSize: '1.125rem',
						fontWeight: 'bold',
						color: '#262626',
					}}
				>
					사용자가 신고되었어요
				</div>
				<div
					style={{
						fontSize: '0.875rem',
						color: '#8d8d8d',
						margin: '0.75rem 0 2rem',
						lineHeight: '1.36'
					}}
				>
					해당 사용자를 검수할게요
					<br />
					조금만 기다려 주세요!
				</div>
				<PurpleButton onClick={onClickYes} marginBottom="0">확인</PurpleButton>
			</PopUpModal>
		</MainContainer>
	);
}

export const CheckboxWrap = styled.div`
	border-radius: 13px;
	background-color: #fff;
	padding: 1.125rem 1.25rem;
	border: 1px solid #fff;
	box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.05);
	margin-top: 0.75rem;
	margin-left: 0.5rem;
`;

export const CircularCheckboxWrap = styled.label`
	display: flex;
	align-items: center;
	margin-bottom: 0.75rem;

	.inputHidden {
		display: none;
	}

	.circularCheckboxText {
		font-size: 0.875rem;
		font-weight: 600;
		color: #262626;
		margin-left: 0.5rem;
	}
`;
