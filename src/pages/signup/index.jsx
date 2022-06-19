import React, { useState, useEffect, useRef } from 'react';
import { Link, useRoutes, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SignupProgressState } from '../../recoil/User';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { TopNav } from '../../components/TopNav';
import { ReactComponent as LeftArrow } from '../../assets/Icons/left_arrow.svg';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as Check } from '../../assets/Icons/check_validation.svg';
import { ReactComponent as Present } from '../../assets/Icons/Present.svg';

export default function Signup() {
	const [currentPage, setCurrentPage] = useRecoilState(SignupProgressState);
	// input value
	const [phoneNumber, setPhoneNumber] = useState('');
	const [authCode, setAuthCode] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [nickname, setNickname] = useState('');
	// input validation
	const [phoneNumberValid, setPhoneNumberValid] = useState(false);
	const [authCodeValid, setAuthCodeValid] = useState(false);
	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [nicknameValid, setNicknameValid] = useState(false);
	// auth code
	const [timeMin, setTimeMin] = useState(0);
	const [timeSec, setTimeSec] = useState(15);
	const [codeInputAccess, setCodeInputAccess] = useState(false);
	const [intervalId, setIntervalId] = useState();

	// handler functions
	const handlePhoneNumber = e => {
		const regex = /^[0-9\b -]{0,11}$/; //숫자만 포함 11자
		if (regex.test(e.target.value)) {
			setPhoneNumber(e.target.value);
			if (e.target.value.length === 11) {
				setPhoneNumberValid(true);
			} else {
				setPhoneNumberValid(false);
			}
			// console.log(phoneNumber);
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
			// console.log(authCode);
		}
	};
	const authCodeInputReset = () => {
		setAuthCode('');
	};

	const handleEmail = e => {
		setEmail(e.target.value);
		console.log(emailValid);
		const regex =
			/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; // email regex
		if (regex.test(email)) {
			setEmailValid(true);
		} else {
			setEmailValid(false);
		}
	};
	const emailInputReset = () => {
		setEmail('');
	};

	const handlePassword = e => {
		setPassword(e.target.value);
		const regex =
			/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/; // 영문 숫자 특수문자 포함 8~20자 regex
		if (regex.test(e.target.value)) {
			setPasswordValid(true);
		} else {
			setPasswordValid(false);
		}
	};
	const passwordInputReset = () => {
		setPassword('');
	};

	const handleNickname = e => {
		setNickname(e.target.value);
		const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/; // 한글 영문 숫자 1글자 이상 regex
		if (regex.test(e.target.value)) {
			setNicknameValid(true);
		} else {
			setNicknameValid(false);
		}
	};
	const nicknameInputReset = () => {
		setNickname('');
	};
	// page
	const handleNextClick = () => {
		if (currentPage < 5) {
			setCurrentPage(currentPage + 1);
		}
	};

	const navigate = useNavigate();
	const handleBackClick = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
		if (currentPage === 1) {
			navigate('/');
		}
	};
	// auth code timer
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
			{currentPage !== 5 && (
				<>
					<TopNav>
						<BackButton onClick={handleBackClick}>
							<LeftArrow />
						</BackButton>
					</TopNav>
					<ProgressWrap>
						<ProgressBar progress={currentPage * 25}></ProgressBar>
					</ProgressWrap>
				</>
			)}
			{currentPage === 1 && (
				<ContentWrap>
					<TopWrap>
						<PageLabel>
							<MainText>
								스럽 서비스 이용약관에 <br />
								동의해주세요
							</MainText>
						</PageLabel>
					</TopWrap>
					<BottomWrap>
						<NextButton onClick={handleNextClick}>다음</NextButton>
						{/* 버튼 disabled 처리 */}
					</BottomWrap>
				</ContentWrap>
			)}
			{currentPage === 2 && (
				<ContentWrap>
					<TopWrap>
						<PageLabel>
							<MainText>
								휴대폰 번호 <br />
								인증이 필요해요.
							</MainText>
						</PageLabel>
						<FormWrap>
							<SubText>휴대폰 번호</SubText>
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
									<Button disabled={false} onClick={handleAuthSend}>
										인증하기
									</Button>
								) : (
									<Button disabled={true}>인증하기</Button>
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
							<SubText>인증번호</SubText>
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
						<NextButton onClick={handleNextClick}>다음</NextButton>
						{/* 버튼 disabled처리 */}
					</BottomWrap>
				</ContentWrap>
			)}
			{currentPage === 3 && (
				<ContentWrap>
					<TopWrap>
						<PageLabel>
							<MainText>
								이메일과 비밀번호를
								<br />
								입력해 주세요
							</MainText>
						</PageLabel>
						<FormWrap>
							<SubText>이메일 주소</SubText>
							<InputWrap valid={emailValid} value={email}>
								<Input
									value={email}
									onChange={handleEmail}
									type="text"
									placeholder="이메일을 입력해주세요"
								/>
								{emailValid ? (
									<IconWrap>
										<Check />
									</IconWrap>
								) : (
									<IconWrap onClick={emailInputReset}>
										<Delete />
									</IconWrap>
								)}
							</InputWrap>
							<ErrorMessage>
								{!emailValid && email.length !== 0 ? (
									<SubText color="#ef0000" fontweight="normal">
										올바른 이메일을 입력해주세요.
									</SubText>
								) : (
									<></>
								)}
							</ErrorMessage>
						</FormWrap>
						<FormWrap>
							<SubText>비밀번호</SubText>
							<InputWrap valid={passwordValid} value={password}>
								<Input
									value={password}
									onChange={handlePassword}
									type="password"
									placeholder="영문, 숫자, 특수문자 포함 8자 이상"
								/>
								{passwordValid ? (
									<IconWrap>
										<Check />
									</IconWrap>
								) : (
									<IconWrap onClick={passwordInputReset}>
										<Delete />
									</IconWrap>
								)}
							</InputWrap>
							<ErrorMessage>
								{!passwordValid && password.length !== 0 ? (
									<SubText color="#ef0000" fontweight="normal">
										영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
									</SubText>
								) : (
									<></>
								)}
							</ErrorMessage>
						</FormWrap>
					</TopWrap>
					<BottomWrap>
						<NextButton onClick={handleNextClick}>다음</NextButton>
						{/* 버튼 disabled처리 */}
					</BottomWrap>
				</ContentWrap>
			)}
			{currentPage === 4 && (
				<ContentWrap>
					<TopWrap>
						<PageLabel>
							<MainText>
								사용하실 닉네임을
								<br />
								입력해 주세요
							</MainText>
						</PageLabel>
						<FormWrap>
							<SubText>닉네임</SubText>
							<InputWrap valid={nicknameValid} value={nickname}>
								<Input
									value={nickname}
									onChange={handleNickname}
									type="text"
									placeholder="언제든지 수정이 가능해요"
								/>
								{nicknameValid ? (
									<IconWrap>
										<Check />
									</IconWrap>
								) : (
									<IconWrap onClick={nicknameInputReset}>
										<Delete />
									</IconWrap>
								)}
							</InputWrap>
							<ErrorMessage>
								{!nicknameValid && nickname.length !== 0 ? (
									<SubText color="#ef0000" fontweight="normal">
										올바른 닉네임을 입력해주세요.
									</SubText>
								) : (
									<></>
								)}
							</ErrorMessage>
						</FormWrap>
					</TopWrap>
					<BottomWrap>
						<NextButton onClick={handleNextClick}>완료</NextButton>
						{/* 버튼 disabled처리 */}
					</BottomWrap>
				</ContentWrap>
			)}
			{currentPage === 5 && (
				<ContentWrap>
					<CompleteTopWrap>
						<Present></Present>
						<NameText color="#9e30f4">
							{nickname}
							<NameText> 님</NameText>
						</NameText>
						<CompletePageLabel>
							<MainText>스럽 회원가입을</MainText>
							<MainText>축하드려요!</MainText>
							<SubText fontsize="16px" color="#4A4A4A" margin="30px">
								스럽에서 다양한 활동 기대할게요.
							</SubText>
						</CompletePageLabel>
					</CompleteTopWrap>
					<BottomWrap>
						<StyledLink to={'/select/celebrity'}>
							<NextButton>관심셀럽 등록하러 가기</NextButton>
						</StyledLink>
					</BottomWrap>
				</ContentWrap>
			)}
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
const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	height: 100%;
	justify-content: space-between;
`;

const ProgressWrap = styled.div`
	width: 100%;
	height: 2px;
	margin-bottom: 1rem;
	background-color: #fbf6ff;
`;
const ProgressBar = styled.div`
	width: ${props => props.progress}%;
	height: 100%;
	background-color: #9e30f4;
	transition: width 0.5s;
`;

const TopWrap = styled.div`
	display: flex;
	flex-direction: column;
`;
const CompleteTopWrap = styled.div`
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const BottomWrap = styled.div``;

const PageLabel = styled.div`
	margin-bottom: 24px;
`;
const CompletePageLabel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 24px;
`;

const MainText = styled.span`
	font-size: 26px;
	font-weight: bold;
	color: #262626;
`;
const SubText = styled.span`
	font-size: ${props => props.fontsize || '12px'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => props.color || 'black'};
	margin: ${props => props.margin || '0 0 8px 0'};
`;
const NameText = styled.span`
	font-size: 18px;
	font-weight: bold;
	margin-top: 16px;
	margin-bottom: 32px;
	color: ${props => props.color || 'black'};
`;

const FormWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 26px;
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
	/* margin-bottom: 26px; */
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
`;
const InputWrapPhone = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: transparent;
	/* margin-bottom: 26px; */
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

const Input = styled.input`
	align-items: center;
	height: 17px;
	width: 100%;
	font-size: 14px;
	font-weight: 400;
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

const ErrorMessage = styled.div`
	display: flex;
	margin-top: 8px;
`;

const IconWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
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

const NextButton = styled.button`
	width: 100%;
	height: 44px;
	border: none;
	border-radius: 20px;
	background-color: #9e30f4;
	margin-bottom: 30px;
	color: white;
	:disabled {
		background-color: #dadada;
	}
	&:hover {
		cursor: pointer;
	}
`;

const Button = styled.button`
	box-sizing: border-box;
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
const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
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
