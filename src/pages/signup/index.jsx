import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SignupProgressState } from '../../recoil/User';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

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

	const handleNickname = e => {
		setNickname(e.target.value);
		const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/; // 한글 영문 숫자 1글자 이상 regex
		if (regex.test(e.target.value)) {
			setNicknameValid(true);
		} else {
			setNicknameValid(false);
		}
	};
	// page
	const handleNextClick = () => {
		if (currentPage < 5) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleBackClick = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
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
					<Button onClick={handleBackClick}>before</Button>
					{/* <div>progress = {currentPage * 25}%</div> */}
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
						<SubText>휴대폰 번호</SubText>
						<InputWrapPhone>
							<InputPhone>
								<Input
									value={phoneNumber}
									onChange={handlePhoneNumber}
									type="text"
									placeholder="-없이 휴대폰 번호 입력"
									ref={inputRef}
								/>
								{phoneNumberValid ? <Check>ok</Check> : <Clear>x</Clear>}
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
						<SubText>인증번호</SubText>
						<InputWrap>
							{codeInputAccess ? (
								<Input
									value={authCode}
									onChange={handleAuthCode}
									type="number"
									placeholder="인증번호 4자리"
									ref={inputRef}
								/>
							) : (
								<Input
									value={authCode}
									onChange={handleAuthCode}
									type="number"
									placeholder="인증번호 4자리"
									disabled={true}
								/>
							)}

							{authCodeValid ? (
								<Check>ok</Check>
							) : (
								<Clear>
									{timeMin}:{timeSec < 10 ? `0${timeSec}` : timeSec}
								</Clear>
							)}
						</InputWrap>
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
						<SubText>이메일 주소</SubText>
						<InputWrap>
							<Input
								value={email}
								onChange={handleEmail}
								type="text"
								placeholder="이메일을 입력해주세요"
							/>
							{emailValid ? <Check>ok</Check> : <Clear>x</Clear>}
						</InputWrap>
						<SubText>비밀번호</SubText>
						<InputWrap>
							<Input
								value={password}
								onChange={handlePassword}
								type="password"
								placeholder="영문, 숫자, 특수문자 포함 8자 이상"
							/>
							{passwordValid ? <Check>ok</Check> : <Clear>x</Clear>}
						</InputWrap>
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
						<SubText>닉네임</SubText>
						<InputWrap>
							<Input
								value={nickname}
								onChange={handleNickname}
								type="text"
								placeholder="언제든지 수정이 가능해요"
							/>
							{nicknameValid ? <Check>ok</Check> : <Clear>x</Clear>}
						</InputWrap>
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
						<NameText color="#9e30f4">
							{nickname}
							<NameText> 님</NameText>
						</NameText>
						<CompletePageLabel>
							<MainText>스럽 회원가입을</MainText>
							<MainText>축하드려요!</MainText>
							<SubText fontsize="16px" color="#4A4A4A" margin="20px">
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
	background-color: ${palette.white.primary}; ;
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
	margin-top: 36px;
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
	font-size: 24px;
	font-weight: 700;
`;
const SubText = styled.span`
	font-size: ${props => props.fontsize || '12px'};
	font-weight: 600;
	color: ${props => props.color || 'black'};
	margin: ${props => props.margin || '0 0 8px 0'};
`;
const NameText = styled.span`
	font-size: 18px;
	font-weight: 700;
	margin-bottom: 16px;
	color: ${props => props.color || 'black'};
`;

const InputWrap = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid #e2e0e0;
	border-radius: 10px;
	padding: 8px;
	margin-bottom: 26px;
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
	margin-bottom: 26px;
`;
const InputPhone = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: inherit;
	height: 40px;
	width: 65%;
	border: 1px solid #e2e0e0;
	border-radius: 8px;
	padding: 8px;
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
	height: 40px;
	width: 100%;
	padding: 0 10px;
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
const Check = styled.div`
	color: #9e30f4;
	font-weight: bold;
`;
const Clear = styled.button`
	align-items: center;
	border: none;
	font-size: 14px;
	font-weight: 400;
	background-color: transparent;
	border-radius: 20px;
	color: #9e30f4;
	font-size: medium;
	&:hover {
		cursor: pointer;
	}
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
	border: none;
	height: 48px;
	border-radius: 24px;
	font-weight: bold;
	font-size: 14px;
	background-color: #ebebeb;
	padding: 0 18px;
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
