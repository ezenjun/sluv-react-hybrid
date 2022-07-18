import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../../assets/Logo/LogoHome.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../../components/Buttons/BackButton';
import { ContentWrap } from '../../../components/containers/ContentWrap';
import { MainContainer } from '../../../components/containers/MainContainer';
import { TopNav } from '../../../components/containers/TopNav';
import { Input } from '../../../components/Input';
import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';

import { ReactComponent as Delete } from '../../../assets/Icons/delete_input.svg';
import { ReactComponent as Check } from '../../../assets/Icons/check_validation.svg';
import { ReactComponent as SendEmail } from '../../../assets/Signup/SendEmail.svg';
import { PurpleButton } from '../../../components/Buttons/PurpleButton';
import { useState } from 'react';
import { customApiClient } from '../../../utils/apiClient';
import { useSetRecoilState } from 'recoil';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../../recoil/ToastMessage';

export default function Index() {
	const navigate = useNavigate();
	const { jwt } = useParams();

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [passwordValid1, setPasswordValid1] = useState(false);
	const [passwordValid2, setPasswordValid2] = useState(false);

	const [changeConfirm, setChangeConfirm] = useState(false);
	const handlePassword1 = e => {
		setPassword1(e.target.value);
		const regex =
			/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/; // 영문 숫자 특수문자 포함 8~20자 regex
		if (regex.test(e.target.value)) {
			setPasswordValid1(true);
		} else {
			setPasswordValid1(false);
		}
	};
	const handlePassword2 = e => {
		setPassword2(e.target.value);
		if (password1 !== e.target.value) {
			setPasswordValid2(false);
		} else {
			setPasswordValid2(true);
		}
	};
	const onClickChangePassword = async () => {
		const body = {
			purpose: 0,
			pwd: password1,
		};

		const data = await customApiClient('patch', '/users/pwd', body, jwt);
		console.log(data);

		if (!data) return;
		if (data.code === 5003) {
			setToastMessageBottomPosition('5rem');
			setToastMessage('이전 암호는 다시 사용할 수 없어요');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
		} else if (data.isSuccess) {
			setToastMessageBottomPosition('5rem');
			setToastMessage('새 비밀번호로 변경되었어요');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setChangeConfirm(true);
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
				navigate(-1);
			}, 2300);
		}
	};
	return (
		<Background>
			<Card>
				<Logo style={{ width: '38px', height: '38px' }} />
				{!changeConfirm ? (
					<>
						<MainText style={{ marginTop: '0.375rem', marginBottom: '1.625rem' }}>
							비밀번호 변경
						</MainText>
						<FormWrap>
							<SubText margin="0 0 0.5rem 0">새 비밀번호</SubText>
							<InputWrap valid={passwordValid1} value={password1}>
								<Input
									value={password1}
									onChange={handlePassword1}
									type="password"
									placeholder="영문, 숫자, 특수문자 포함 8자 이상"
								/>
								{passwordValid1 && (
									<IconWrap>
										<Check />
									</IconWrap>
								)}
								{password1.length !== 0 && !passwordValid1 && (
									<IconWrap onClick={() => setPassword1('')}>
										<Delete />
									</IconWrap>
								)}
							</InputWrap>
							<div style={{ display: 'flex', marginTop: '0.5rem' }}>
								{!passwordValid1 && password1.length !== 0 && (
									<SubText color="#ef0000" fontweight="normal">
										영문, 숫자, 특수문자 포함 8자 이상 입력해주세요
									</SubText>
								)}
							</div>
						</FormWrap>

						<FormWrap>
							<SubText margin="0 0 0.5rem 0">새 비밀번호 확인</SubText>
							<InputWrap valid={passwordValid2} value={password2}>
								<Input
									value={password2}
									onChange={handlePassword2}
									type="password"
									placeholder="비밀번호 재입력"
								/>
								{passwordValid2 && (
									<IconWrap>
										<Check />
									</IconWrap>
								)}
								{password2.length !== 0 && !passwordValid2 && (
									<IconWrap onClick={() => setPassword2('')}>
										<Delete />
									</IconWrap>
								)}
							</InputWrap>
							<div style={{ display: 'flex', marginTop: '0.5rem' }}>
								{!passwordValid2 && password2.length !== 0 && (
									<SubText color="#ef0000" fontweight="normal">
										비밀번호가 일치하지 않습니다
									</SubText>
								)}
							</div>
						</FormWrap>
						<div style={{ width: '100%' }}>
							{passwordValid1 && passwordValid2 ? (
								<PurpleButton onClick={onClickChangePassword}>
									비밀번호 변경하기
								</PurpleButton>
							) : (
								<PurpleButton disabled={true}>비밀번호 변경하기</PurpleButton>
							)}
						</div>
						<SubText
							fontsize="0.8125rem"
							fontweight="normal"
							style={{ lineHeight: '1.5' }}
						>
							문의사항은 <b>celebit.sluv@gmail.com</b>에 남겨주세요!
							<br />
							감사합니다.
						</SubText>
					</>
				) : (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							marginTop: '1.25rem',
						}}
					>
						<SendEmail
							style={{ width: '3.75rem', height: '3.75rem', marginBottom: '1.25rem' }}
						></SendEmail>
						<MainText fontsize="1.25rem" margin="0 0 0.75rem 0">
							비밀번호가 변경되었어요!{' '}
						</MainText>
						<SubText fontsize="0.875rem" fontweight="normal" color="#8d8d8d">
							정보 보호를 위해 비밀번호를
						</SubText>
						<SubText fontsize="0.875rem" fontweight="normal" color="#8d8d8d">
							정기적으로 변경해주세요
						</SubText>
					</div>
				)}
			</Card>
		</Background>
	);
}

const Background = styled.div`
	height: 100vh;
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #f4f4f4;
	padding: 1.25rem;
`;
const Card = styled.div`
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
	background-color: white;
	width: 100%;
	min-height: 18.5rem;
	padding: 0.8125rem 1.25rem 1.25rem 1.25rem;
	border-radius: 1rem;
`;
const FormWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.625rem;
`;

const InputWrap = styled.div`
	${props =>
		props.valid || props.value.length === 0
			? 'border: 1px solid #e2e0e0;'
			: 'border: 1px solid #ef0000'};
	display: flex;
	align-items: center;
	border-radius: 0.5rem;
	padding: 0.875rem;
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
`;

const IconWrap = styled.div.attrs(props => ({
	className: props.className,
}))`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${props => props.margin || '0'};
	${props =>
		props.button
			? `&:hover {
			cursor: pointer;
		}`
			: ''};
`;
