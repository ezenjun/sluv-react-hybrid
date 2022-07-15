import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav';
import { TopRadiusContainer } from '../../components/containers/TopRadiusContainer';
import { MainText } from '../../components/Texts/MainText';
import { CheckboxWrap, CircularCheckboxWrap } from './ReportUser';
import { ReactComponent as Unchecked } from '../../assets/Icons/icon_circular_checkbox_empty.svg';
import { ReactComponent as Checked } from '../../assets/Icons/icon_circular_checkbox_fill.svg';
import { InputSpeechBubbleWrap, SpeechBubbleTextArea } from '../../components/Bubbles/InputSpeechBubble';
import { customApiClient } from '../../utils/apiClient';
import { ModalWrap, PopUpModal, WholePage } from '../../components/PopUp/PopUpModal';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { useSetRecoilState } from 'recoil';
import { PopUpModalState } from '../../recoil/PopUpModal';

export default function ReportComment() {
	const navigate = useNavigate();
	const { idx } = useParams();

	const [isConfirm, setIsConfirm] = useState(false);
	const [checkedElement, setCheckedElement] = useState(-1);
	const [extraOpinion, setExtraOpinion] = useState('');
	const [isExtraOpinion, setIsExtraOpinion] = useState(false);
	const [popupStatus, setPopupStatus] = useState(false);
	const [checkListData, setCheckListData] = useState([
		{
			idx: 0,
			text: '해당 셀럽의 아이템이 아니에요',
		},
		{
			idx: 1,
			text: '아이템 정보가 잘못 되었어요',
		},
		{
			idx: 2,
			text: '날짜 정보가 잘못 되었어요',
		},
		{
			idx: 3,
			text: '방송 정보가 잘못 되었어요',
		},
		{
			idx: 4,
			text: '기타',
		},
	]);

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
		console.log('click');
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
		
		const data = await customApiClient('post', `/items/${idx}/edit-req`, body);
		if(!data) return;
		console.log(data);
		if(!data.isSuccess) return;

		setPopupStatus(true);
	}

	const onClickYes = () => {
		setPopupStatus(false);
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

			<WholePage openStatus={popupStatus}>
				<ModalWrap>
					<div
						style={{
							marginTop: '1.5rem',
							fontSize: '1.125rem',
							fontWeight: 'bold',
							color: '#262626',
						}}
					>
						수정이 요청되었어요
					</div>
					<div
						style={{
							fontSize: '0.875rem',
							color: '#8d8d8d',
							margin: '0.75rem 0 2rem',
							lineHeight: '1.36',
						}}
					>
						업로더에게 수정 요청 알림이 가요
						<br />
						정보의 질을 높여주셔서 감사해요
					</div>
					<PurpleButton onClick={onClickYes} marginBottom="0">
						확인
					</PurpleButton>
				</ModalWrap>
			</WholePage>
		</MainContainer>
	);
}

