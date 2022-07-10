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

import { ReactComponent as Unchecked } from '../../assets/Icons/icon_circular_checkbox_empty.svg';
import { ReactComponent as Checked } from '../../assets/Icons/icon_circular_checkbox_fill.svg';

export default function ReportUser() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [extraOpinion, setExtraOpinion] = useState('');
	const [isExtraOpinion, setIsExtraOpinion] = useState(false);
	const [checkListData, setCheckListData] = useState([
		{
			idx: 0,
			text: '스팸 / 홍보성 게시글이에요',
		},
		{
			idx: 1,
			text: '똑같은 정보를 도배 하였어요',
		},
		{
			idx: 2,
			text: '단순 비방으로 불쾌감을 유발해요',
		},
		{
			idx: 3,
			text: '외설적 표현이 담겨있어요',
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
	const onClickConfirm = () => {
		const body = {
			// 유제인덱스 들어가야 함
			// 신고 이유 5가지 중 택 1 들어가야함
			// 추가적인 의견 들어가야함
		}
		
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
	margin-right: 0.5rem;
`;

const CircularCheckboxWrap = styled.label`
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
