import React, { useState, useEffect, useRef } from 'react';
import { Link, useRoutes, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { TopNav } from '../../components/TopNav';
import { PurpleButton } from '../../components/PurpleButton';
import { ReactComponent as LeftArrow } from '../../assets/Icons/left_arrow.svg';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as Check } from '../../assets/Icons/check_validation.svg';

export default function FindEmail() {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [authCode, setAuthCode] = useState('');
	const [phoneNumberValid, setPhoneNumberValid] = useState(false);
	const [authCodeValid, setAuthCodeValid] = useState(false);
	const [timeMin, setTimeMin] = useState(0);
	const [timeSec, setTimeSec] = useState(15);
	const [codeInputAccess, setCodeInputAccess] = useState(false);
	const [intervalId, setIntervalId] = useState();

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
	const handleNextClick = () => {
		navigate('/find/email/result');
	};

	let min = 0;
	let sec = 15;

	const beginTimer = () => {
		setCodeInputAccess(true);
		min = 0;
		sec = 15;
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

		setIntervalId(timer);
	};
	const inputRef = useRef(null);
	const handleAuthSend = () => {
		beginTimer();
	};

	return (
		<MainContainer>
			<TopNav>
				<StyledLink to="/login">
					<BackButton>
						<LeftArrow />
					</BackButton>
				</StyledLink>
			</TopNav>
			<ContentWrap>
				<TopWrap>
					<PageLabel>
						<MainText>이메일 찾기</MainText>
					</PageLabel>
					<FormWrap>
						<SubText margin="0 0 8px 0">휴대폰 번호</SubText>
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
								<AuthButton disabled={false} onClick={handleAuthSend}>
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
						<SubText margin="0 0 8px 0">인증번호</SubText>
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
						<PurpleButton onClick={handleNextClick}>확인</PurpleButton>
					) : (
						<PurpleButton disabled={true}>확인</PurpleButton>
					)}
				</BottomWrap>
			</ContentWrap>
		</MainContainer>
	);
}
const MainContainer = styled.div`
	display: flex;
	height: 100%;
	box-sizing: border-box;
	flex-direction: column;
	border: 1px solid black;
	background-color: ${palette.white.primary};
`;
const BackButton = styled.div`
	border: none;
	background-color: transparent;
	padding: none;
	margin: none;
	&:hover {
		cursor: pointer;
	}
`;

const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	height: 100%;
	justify-content: space-between;
`;
const TopWrap = styled.div`
	display: flex;
	flex-direction: column;
`;
const BottomWrap = styled.div``;
const PageLabel = styled.div`
	margin-bottom: 26px;
`;
const MainText = styled.span`
	font-size: 24px;
	font-weight: bold;
	color: #262626;
`;
const SubText = styled.span`
	font-family: Pretendard;
	font-size: ${props => props.fontsize || '12px'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => props.color || 'black'};
	margin: ${props => props.margin || '0'};
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${props => props.color || 'black'};
	font-family: Pretendard;
	font-size: ${props => props.fontsize || '12px'};
	font-weight: ${props => props.fontweight || 'normal'};
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;
const FormWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: ${props => props.marginBottom || '26px'};
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
	border-radius: 8px;
	padding: 16px;
	margin-right: 11px;
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
	border-radius: 10px;
	padding: 16px;
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
`;
const Input = styled.input`
	align-items: center;
	height: 17px;
	width: 100%;
	font-size: 14px;
	font-weight: 400;
	font-family: Pretendard;
	outline: none;
	border: none;
	background-color: transparent;
	&:disabled {
		::placeholder {
			color: #dadada;
		}
		cursor: not-allowed;
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

const AuthButton = styled.button`
	box-sizing: border-box;
	font-family: Pretendard;
	border: none;
	height: 48px;
	flex-shrink: 0;
	border-radius: ${props => props.borderradius || '24px'};
	font-weight: bold;
	font-size: 14px;
	background-color: ${props => props.backgroundcolor || '#ebebeb'};
	padding: 16px 18px 15px;
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
		height: 17px;
		font-family: Pretendard;
		font-size: 14px;
		font-weight: 600;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: center;
		color: #262626;
	}
`;

const LoginOptionWrap = styled.div`
	display: flex;
	margin-bottom: 26px;
`;

const TermsWrap = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	margin: ${props => props.margin || '0 20px 0 0'};
	.span {
		margin: 0;
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

const FindWrap = styled.div`
	display: flex;
	box-sizing: border-box;
	padding: 0 50px;
	justify-content: space-around;
`;

const Line = styled.div`
	border-right: 1px solid #e2e0e0;
`;
const ErrorMessage = styled.div`
	display: flex;
	margin-top: 8px;
`;

const Clear = styled.div`
	align-items: center;
	padding: none;
	border: none;
	font-size: 14px;
	font-weight: normal;
	background-color: transparent;
	border-radius: 20px;
	color: #9e30f4;
	font-size: medium;
	margin-left: 16px;
`;
