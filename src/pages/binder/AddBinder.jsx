import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { SubText } from '../../components/Texts/SubText';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';

import { ReactComponent as BinderHelp } from '../../assets/Icons/binderHelp.svg';
import { ReactComponent as BinderAddPicture } from '../../assets/Icons/binderAddPicture.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';

export default function AddBinder() {
	const navigate = useNavigate();
	const [isConfirm, setIsConfirm] = useState(false);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [binderName, setBinderName] = useState('');
	const [binderHelpStatus, setBinderHelpStatus] = useState(false);

	const onClickHelp = () => setBinderHelpStatus(!binderHelpStatus);

	const handleBinderName = e => {
		setBinderName(e.target.value);
		const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]{1,5}$/; // 한글 영문 숫자 1글자 이상 regex
		if (regex.test(e.target.value)) {
			setBinderName(e.target.value);
			setIsConfirm(true);
			console.log(binderName);
		} else {
			setIsConfirm(false);
		}
	};
	const clickNext = () => {
		setToastMessageBottomPosition('1.625rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage('이미 같은 이름의 바인더가 있어요');

		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	};
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(false);
	}, []);

	return (
		<MainContainer padding="0 0 0 0">
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => navigate(-1)} />
				<div className="centerText">
					바인더 만들기
					<BinderHelp style={{ margin: '0 0.25rem' }} onClick={onClickHelp}></BinderHelp>
					<MiniInfoDialog openStatus={binderHelpStatus}>
						<TopWrap>
							<SubText fontweight="bold" fontsize="0.875rem" color="#9E30F4">
								바인더 만들기
							</SubText>
							<Close onClick={onClickHelp}></Close>
						</TopWrap>
						<SubText
							fontsize="0.875rem"
							color="#564B5C"
							style={{ whiteSpace: 'normal' }}
						>
							바인더 이름은 15자 이내로 입력해 주세요! <br />
							이름과 커버 이미지는 언제 든지 수정이 가능해요
						</SubText>
					</MiniInfoDialog>
				</div>

				<div
					className="rightText"
					style={{ color: isConfirm ? '#262626' : '#b1b1b1' }}
					onClick={clickNext}
				>
					완료
				</div>
			</TopNav>
			<FeedContainer>
				<AddImage>
					<PictureIconBackground>
						<BinderAddPicture
							style={{ width: '2rem', height: '2rem' }}
						></BinderAddPicture>
					</PictureIconBackground>

					<SubText fontweight="normal" color="#b1b1b1">
						커버 이미지 추가
					</SubText>
				</AddImage>
				<BinderName
					placeholder="내 바인더 이름"
					value={binderName}
					type="text"
					onChange={handleBinderName}
				/>
			</FeedContainer>
		</MainContainer>
	);
}

const FeedContainer = styled.div`
	height: 100vh;
	padding: 4.375rem 1.25rem 1.25rem 1.25rem;
	border: 1px solid black;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const AddImage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: #f6f6f6;
`;
const BinderName = styled.input`
	margin-top: 0.75rem;
	outline: none;
	border: none;
	font-family: Pretendard;
	font-size: 1.25rem;
	font-weight: normal;
	text-align: center;
	width: 9.375rem;
	color: #262626;
	text-decoration: none;
	::placeholder {
		color: #b1b1b1;
	}
	caret-color: #9e30f4;
`;
const PictureIconBackground = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3.125rem;
	height: 3.125rem;
	border-radius: 50%;
	background-color: #ebebeb;
	margin-bottom: 0.375rem;
`;
const MiniInfoDialog = styled.div`
	display: ${props => (props.openStatus ? 'block' : 'none')};
	position: absolute;
	text-align: start;
	top: 1.875rem;
	left: -4.375rem;
	z-index: 10000;

	margin-top: 0.4063rem;
	width: 14.9375rem;
	padding: 1rem;
	border-radius: 0.8125rem;
	border: solid 1px #9e30f4;
	background-color: #fbf6ff;
	word-break: keep-all;
`;
const TopWrap = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.75rem;
`;
