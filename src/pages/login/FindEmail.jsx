import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { customApiClient } from '../../utils/apiClient';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as Check } from '../../assets/Icons/check_validation.svg';
import { MainContainer } from '../../components/containers/MainContainer';
import { Input } from '../../components/Input';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';

export default function FindEmail() {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [authCode, setAuthCode] = useState('');
	const [phoneNumberValid, setPhoneNumberValid] = useState(false);
	const [authCodeValid, setAuthCodeValid] = useState(false);
	const [timeMin, setTimeMin] = useState(0);
	const [timeSec, setTimeSec] = useState(15);
	const [codeInputAccess, setCodeInputAccess] = useState(false);

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const handlePhoneNumber = e => {
		const regex = /^[0-9\b -]{0,11}$/; //숫자만 포함 11자
		if (regex.test(e.target.value)) {
			setPhoneNumber(e.target.value);
			if (e.target.value.length === 11) {
				setPhoneNumberValid(true);
			} else {
				setPhoneNumberValid(false);
			}
		}
	};
	const phoneInputReset = () => {
		setPhoneNumber('');
	};

	const handleAuthCode = e => {
		const regex = /^[0-9\b -]{0,4}$/; //숫자만 포함 4자
		if (regex.test(e.target.value)) {
			setAuthCode(e.target.value);
			if (e.target.value.length === 4) {
				setAuthCodeValid(true);
			} else {
				setAuthCodeValid(false);
			}
		}
	};
	const authCodeInputReset = () => {
		setAuthCode('');
	};

	const navigate = useNavigate();
	const handleNextClick = () => {};
	// 인증번호 발송 API
	async function handleAuthCodeSendAPI() {
		const url = `/auth/sms?phone=${phoneNumber}`;
		const data = await customApiClient('get', url);
		if (!data) return;
		if (data.isSuccess) {
			beginTimer();
		}
	}
	// 인증번호 확인 API
	async function handleAuthCodeCheckAPI() {
		const url = `/auth/sms/validation?phone=${phoneNumber}&certnum=${authCode}`;
		const data = await customApiClient('get', url);
		if (data.isSuccess === true) {
			handleNextClick();
			setToastMessageBottomPosition('5.125rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage('휴대폰 인증에 하였어요');
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
			navigate('/find/email/result', { state: { phone: phoneNumber } });
		} else {
			setAuthCodeValid(false);

			setToastMessageBottomPosition('5.125rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage('휴대폰 인증에 실패하였어요');

			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);

			console.log('인증번호 인증 실패');
		}
	}

	let min = 3;
	let sec = 0;

	const beginTimer = () => {
		setCodeInputAccess(true);
		min = 3;
		sec = 0;
		setTimeMin(min);
		setTimeSec(sec);

		//시간 감소
		const timer = setInterval(() => {
			if (min === 0 && sec === 0) {
				clearInterval(timer);
				setCodeInputAccess(false);
				setAuthCode('');
				setAuthCodeValid(false);
			} else {
				if (sec === 0) {
					min = min - 1;
					sec = 59;
					setTimeMin(parseInt(min));
					setTimeSec(sec);
				} else {
					sec = sec - 1;
					setTimeSec(parseInt(sec));
				}
			}
		}, 1000);
	};
	const handleAuthSend = () => {
		beginTimer();
	};
	const handleBackClick = () => {
		navigate('/login');
	};
	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={handleBackClick} />
			</TopNav>
			<ContentWrap>
				<TopWrap>
					<PageLabel>
						<MainText fontsize="1.5rem">이메일 찾기</MainText>
					</PageLabel>
					<FormWrap>
						<SubText margin="0 0 0.5rem 0">휴대폰 번호</SubText>
						<InputWrapPhone>
							<InputPhone valid={phoneNumberValid} value={phoneNumber}>
								<Input
									value={phoneNumber}
									onChange={handlePhoneNumber}
									type="text"
									placeholder="-없이 휴대폰 번호 입력"
								/>
								{phoneNumberValid ? (
									<IconWrap>
										<Check />
									</IconWrap>
								) : (
									<></>
								)}
								{phoneNumber.length !== 0 && !phoneNumberValid ? (
									<IconWrap onClick={phoneInputReset}>
										<Delete />
									</IconWrap>
								) : (
									<></>
								)}
							</InputPhone>
							{phoneNumberValid ? (
								<AuthButton disabled={false} onClick={handleAuthCodeSendAPI}>
									인증하기
								</AuthButton>
							) : (
								<AuthButton disabled={true}>인증하기</AuthButton>
							)}

							{/* 재발송 버튼 */}
						</InputWrapPhone>
						<ErrorMessage>
							{!phoneNumberValid && phoneNumber.length !== 0 ? (
								<SubText color="#ef0000" fontweight="normal">
									올바른 휴대폰 번호를 입력해주세요.
								</SubText>
							) : (
								<></>
							)}
						</ErrorMessage>
					</FormWrap>
					<FormWrap>
						<SubText margin="0 0 0.5rem 0">인증번호</SubText>
						<InputWrap valid={authCodeValid} value={authCode}>
							{codeInputAccess ? (
								<>
									<Input
										value={authCode}
										onChange={handleAuthCode}
										type="number"
										placeholder="인증번호 4자리"
									/>
								</>
							) : (
								<Input
									value={authCode}
									onChange={handleAuthCode}
									type="number"
									placeholder="인증번호 4자리"
									disabled={true}
								/>
							)}

							{authCode.length !== 0 && !authCodeValid ? (
								<IconWrap onClick={authCodeInputReset}>
									<Delete />
								</IconWrap>
							) : (
								<></>
							)}

							{codeInputAccess && !authCodeValid ? (
								<Clear>
									{timeMin}:{timeSec < 10 ? `0${timeSec}` : timeSec}
								</Clear>
							) : (
								<></>
							)}
							{authCodeValid ? (
								<IconWrap>
									<Check />
								</IconWrap>
							) : (
								<></>
							)}
						</InputWrap>
						<ErrorMessage>
							{!authCodeValid && authCode.length !== 0 ? (
								<SubText color="#ef0000" fontweight="normal">
									올바른 인증번호 형식이 아닙니다.
								</SubText>
							) : (
								<></>
							)}
						</ErrorMessage>
					</FormWrap>
				</TopWrap>
				<BottomWrap>
					{authCodeValid ? (
						<PurpleButton onClick={handleAuthCodeCheckAPI}>확인</PurpleButton>
					) : (
						<PurpleButton disabled={true}>확인</PurpleButton>
					)}
				</BottomWrap>
			</ContentWrap>
		</MainContainer>
	);
}

const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.25rem;
	height: 100%;
	justify-content: space-between;
`;
const TopWrap = styled.div`
	display: flex;
	flex-direction: column;
`;
const BottomWrap = styled.div``;
const PageLabel = styled.div`
	margin-bottom: 1.625rem;
`;

const FormWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: ${props => props.marginBottom || '1.625rem'};
`;

const InputWrapPhone = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: transparent;
`;
const InputPhone = styled.div`
	${props =>
		props.valid || props.value.length === 0
			? 'border: 1px solid #e2e0e0;'
			: 'border: 1px solid #ef0000'};
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	color: inherit;
	border-radius: 0.5rem;
	padding: 0.875rem;
	caret-color: #9e30f4;
	margin-right: 0.6875rem;
	&:active,
	&:focus-within {
		border: 1px solid #9e30f4;
	}
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const InputWrap = styled.div`
	${props =>
		props.valid || props.value.length === 0
			? 'border: 1px solid #e2e0e0;'
			: 'border: 1px solid #ef0000'};
	display: flex;
	align-items: center;
	border-radius: 0.625rem;
	padding: 0.875rem;
	caret-color: #9e30f4;
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
`;

const AuthButton = styled.button`
	box-sizing: border-box;
	font-family: Pretendard;
	border: none;
	height: 3rem;
	flex-shrink: 0;
	border-radius: ${props => props.borderradius || '24px'};
	font-weight: bold;
	font-size: 0.875rem;
	background-color: ${props => props.backgroundcolor || '#ebebeb'};
	padding: 1rem 1.125rem 0.9375rem;
	color: #262626;
	:disabled {
		border: none;
		color: white;
	}
	&:hover {
		cursor: pointer;
		:disabled {
			cursor: not-allowed;
		}
	}
	.span {
		width: 49px;
		height: 1.0625rem;
		font-family: Pretendard;
		font-size: 0.875rem;
		font-weight: 600;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: center;
		color: #262626;
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

const ErrorMessage = styled.div`
	display: flex;
	margin-top: 0.5rem;
`;

const Clear = styled.div`
	align-items: center;
	padding: none;
	border: none;
	font-size: 0.875rem;
	font-weight: normal;
	background-color: transparent;
	border-radius: 1.25rem;
	color: #9e30f4;
	font-size: medium;
	margin-left: 1rem;
`;
