import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { BackButton } from '../../../components/Buttons/BackButton';
import { ContentWrap } from '../../../components/containers/ContentWrap';
import { MainContainer } from '../../../components/containers/MainContainer';
import { TopNav } from '../../../components/containers/TopNav';
import { customApiClient } from '../../../utils/apiClient';
import {
	Button,
	ButtonWrap,
	CloseWrap,
	ModalWrap,
	PopUpModal,
	WholePage,
} from '../../../components/PopUp/PopUpModal';
import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';
import { BottomNavState } from '../../../recoil/BottomNav';
import { PopUpModalState } from '../../../recoil/PopUpModal';
import { AutoLoginState } from '../../../recoil/User';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../../recoil/ToastMessage';

export default function Settings() {
	const navigate = useNavigate();
	const { state, pathname } = useLocation();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const setPopUpModalState = useSetRecoilState(PopUpModalState);

	const [autoLoginCheck, setAutoLoginCheck] = useRecoilState(AutoLoginState);
	const [deletePopUpState, setDeletePopUpState] = useState(false);
	useEffect(() => {
		setBottomNavStatus(false);
	}, []);

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const onClickLogout = () => {
		localStorage.removeItem('x-access-token');
		localStorage.removeItem('myUserIdx');
		setAutoLoginCheck(false);
		localStorage.removeItem('autoLogin');

		setPopUpModalState(false);
		navigate('/');
	};

	async function onDeleteAccount() {
		const url = `/users/delete`;
		const data = await customApiClient('delete', url);
		if (!data) return;
		if (data.isSuccess) {
			console.log(data);
			console.log(data.message);
			localStorage.removeItem('x-access-token');
			localStorage.removeItem('myUserIdx');
			setAutoLoginCheck(false);
			localStorage.removeItem('autoLogin');
			setDeletePopUpState(false);
			setToastMessageBottomPosition('5.125rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage('회원 탈퇴가 완료되었어요. 다음에 또 스럽을 찾아와 주세요!');
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
			navigate('/');
		}
	}

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					설정
				</MainText>
			</TopNav>

			<ContentWrap padding="1.625rem 1.25rem 0 1.25rem">
				<ItemWrap>
					<TitleWrap>계정</TitleWrap>
					<div className="buttonWrap">
						<div
							onClick={() => navigate('/settings/edit/profile', { state: state })}
							className="marginBottom"
						>
							프로필 수정
						</div>
						<div
							onClick={() => navigate('/settings/edit/password')}
							className="marginBottom"
						>
							비밀번호 변경
						</div>
						<div
							onClick={() =>
								navigate('/select/celebrity', {
									state: pathname,
								})
							}
						>
							셀럽 선택 편집
						</div>
					</div>
				</ItemWrap>
				{/* <ItemWrap>
					<TitleWrap>알림 설정</TitleWrap>
					<div className="buttonWrap">
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<span>푸쉬 알림</span>
							<SwitchWrap className="switch">
								<input type="checkbox" />
								<span className="slider round"></span>
							</SwitchWrap>
						</div>
					</div>
				</ItemWrap> */}
				<ItemWrap>
					<TitleWrap>서비스 정보</TitleWrap>
					<div className="buttonWrap">
						<div
							className="marginBottom"
							onClick={() => navigate('/settings/terms-of-use')}
						>
							서비스 이용약관
						</div>
						<div className="marginBottom" onClick={() => navigate('/settings/privacy')}>
							개인정보 처리방침
						</div>
					</div>
				</ItemWrap>
				<ItemWrap>
					<TitleWrap>기타</TitleWrap>
					<div
						onClick={() => setPopUpModalState(true)}
						className="buttonWrap marginBottom"
					>
						<div>로그아웃</div>
					</div>
					<div onClick={() => setDeletePopUpState(true)} className="buttonWrap">
						<div>탈퇴하기</div>
					</div>
				</ItemWrap>
			</ContentWrap>

			<PopUpModal>
				<MainText fontsize="1.125rem" margin="1.5rem 0 0.75rem 0">
					정말 스럽에서
					<br />
					로그아웃 할까요?
				</MainText>
				<SubText fontsize="0.875rem" margin="0 0 2rem 0" color="#8d8d8d">
					확인을 누르면 스럽에서 로그아웃 돼요
					<br />
					다음에 또 만나요!
				</SubText>
				<ButtonWrap>
					<Button backgroundColor="#c9c9c9" onClick={() => setPopUpModalState(false)}>
						취소
					</Button>
					<Button backgroundColor="#9e30f4" onClick={onClickLogout}>
						확인
					</Button>
				</ButtonWrap>
			</PopUpModal>

			<WholePage openStatus={deletePopUpState}>
				<ModalWrap>
					<MainText fontsize="1.125rem" margin="1.5rem 0 0.75rem 0">
						정말 탈퇴하시나요?
					</MainText>
					<SubText fontsize="0.875rem" margin="0 0 2rem 0" color="#8d8d8d">
						개인 정보를 포함한 모든 정보가 삭제되어요
						<br />
						그래도 탈퇴하실 건가요?
					</SubText>
					<ButtonWrap>
						<Button
							backgroundColor="#c9c9c9"
							onClick={() => setDeletePopUpState(false)}
						>
							취소
						</Button>
						<Button backgroundColor="#9e30f4" onClick={onDeleteAccount}>
							확인
						</Button>
					</ButtonWrap>
				</ModalWrap>
			</WholePage>
		</MainContainer>
	);
}

const TitleWrap = styled.div`
	color: #8d8d8d;
	font-size: 0.75rem;
	margin-bottom: 1rem;
`;

const ItemWrap = styled.div`
	margin-bottom: 2.5rem;

	.buttonWrap {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #262626;
		font-size: 1.125rem;
		font-weight: 600;
	}
	.marginBottom {
		margin-bottom: 1.25rem;
	}
`;

const SwitchWrap = styled.label`
	position: relative;
	display: inline-block;
	width: 1.875rem;
	height: 1.25rem;

	input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #b1b1b1;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 0.75rem;
		width: 0.75rem;
		left: 0.25rem;
		bottom: 0.25rem;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #9e30f4;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #9e30f4;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(0.625rem);
		-ms-transform: translateX(0.625rem);
		transform: translateX(0.625rem);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
`;
