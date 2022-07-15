import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { TopRadiusContainer } from '../../components/containers/TopRadiusContainer';
import { MainText } from '../../components/Texts/MainText';
import { CheckboxWrap, CircularCheckboxWrap } from './ReportUser';
import { ReactComponent as Unchecked } from '../../assets/Icons/icon_circular_checkbox_empty.svg';
import { ReactComponent as Checked } from '../../assets/Icons/icon_circular_checkbox_fill.svg';
import { InputSpeechBubbleWrap, SpeechBubbleTextArea } from '../../components/Bubbles/InputSpeechBubble';
import { customApiClient } from '../../utils/apiClient';

export default function ReportPost() {
	const { idx } = useParams();
	const navigate = useNavigate();

	const [isConfirm, setIsConfirm] = useState(false);
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
	const [checkedElement, setCheckedElement] = useState(-1);
	const [extraOpinion, setExtraOpinion] = useState('');
	const [isExtraOpinion, setIsExtraOpinion] = useState(false);

	const onChangeRadioButton = e => {
		setIsConfirm(true);
		setCheckedElement(e.target.value);
	};

	const onChangeExtraOpinion = e => {
		if (e.target.value) {
			setIsExtraOpinion(true);
		} else {
			setIsExtraOpinion(false);
		}
		setExtraOpinion(e.target.value);
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
		
		const data = await customApiClient('post', `/items/${idx}/report`, body);
		if(!data) return;
		console.log(data);
		if(!data.isSuccess) return;

		navigate(-1);
	}

	return (
		<MainContainer>
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					게시글 신고하기
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
					<span>
						게시글을 신고하는 이유가 궁금해요<span className="redStar">*</span>
					</span>
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
					<span>자세한 이야기도 들려주세요</span>
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

