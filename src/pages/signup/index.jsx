import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { SignupProgressState } from '../../recoil/User';
import styled from 'styled-components';

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

	return (
		<MainContainer>
			<Button onClick={handleBackClick}>before</Button>
			<div>progress = {currentPage * 25}%</div>
			{currentPage === 1 && (
				<ContentWrap>
					<MainText>
						스럽 서비스 이용약관에 <br />
						동의해주세요
					</MainText>
					<NextButton onClick={handleNextClick}>next</NextButton>
					{/* 버튼 disabled 처리 */}
				</ContentWrap>
			)}
			{currentPage === 2 && (
				<ContentWrap>
					<MainText>
						휴대전화번호 <br />
						인증이 필요해요
					</MainText>
					<SubText>휴대전화번호</SubText>
					<InputWrapPhone>
						<InputPhone>
							<Input
								value={phoneNumber}
								onChange={handlePhoneNumber}
								type="text"
								placeholder="휴대폰 번호 (- 없이 입력)"
							/>
							{phoneNumberValid ? <Check>ok</Check> : <Clear>x</Clear>}
						</InputPhone>
						{phoneNumberValid ? (
							<Button disabled={false} onClick={beginTimer}>
								인증번호 발송
							</Button>
						) : (
							<Button disabled={true}>인증번호 발송</Button>
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
								placeholder="4자리 숫자"
							/>
						) : (
							<Input
								value={authCode}
								onChange={handleAuthCode}
								type="number"
								placeholder="4자리 숫자"
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
					<NextButton onClick={handleNextClick}>next</NextButton>
					{/* 버튼 disabled처리 */}
				</ContentWrap>
			)}
			{currentPage === 3 && (
				<ContentWrap>
					<MainText>
						이메일과 비밀번호를
						<br />
						입력해 주세요
					</MainText>
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
					<NextButton onClick={handleNextClick}>next</NextButton>
					{/* 버튼 disabled처리 */}
				</ContentWrap>
			)}
			{currentPage === 4 && (
				<ContentWrap>
					<MainText>
						사용하실 닉네임을
						<br />
						입력해 주세요
					</MainText>
					<SubText>닉네임</SubText>
					<InputWrap>
						<Input
							value={nickname}
							onChange={handleNickname}
							type="text"
							placeholder="언제든지 수정가능해요"
						/>
						{nicknameValid ? <Check>ok</Check> : <Clear>x</Clear>}
					</InputWrap>
					<NextButton onClick={handleNextClick}>완료</NextButton>
					{/* 버튼 disabled처리 */}
				</ContentWrap>
			)}
			{currentPage === 5 && (
				<ContentWrap>
					<MainText>
						{nickname}님<br />
						스럽 회원가입을 축하드려요!
						<Button onClick={handleNextClick}>관심셀럽 선택하기</Button>
					</MainText>
				</ContentWrap>
			)}
		</MainContainer>
	);
}

const MainContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	background-color: white;
`;
const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
`;
const MainText = styled.h1``;
const InputWrap = styled.div`
	display: flex;
	align-items: center;
	background-color: white;
	margin-bottom: 10px;
	border-bottom: 1px solid #d6d6d6;
	&:active,
	&:focus-within {
		border-bottom: 1px solid #9e30f4;
		color: #9e30f4;
	}
`;
const InputWrapPhone = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: white;
	margin-bottom: 10px;
`;
const InputPhone = styled.div`
	display: flex;
	align-items: center;
	color: inherit;
	font-weight: bold;
	height: 40px;
	width: 70%;
	outline: none;
	border: none;
	border-bottom: 1px solid #d6d6d6;
	&:active,
	&:focus-within {
		border-bottom: 1px solid #9e30f4;
		color: #9e30f4;
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
	padding: 0 10px;
	color: inherit;
	font-weight: bold;
	height: 40px;
	width: 100%;
	outline: none;
	border: none;

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
	background-color: transparent;
	border-radius: 20px;
	color: #9e30f4;
	font-size: medium;
	&:hover {
		cursor: pointer;
	}
`;
const SubText = styled.h3``;
const NextButton = styled.button`
	border: none;
	height: 40px;
	border-radius: 20px;
	:disabled {
		background-color: #d6d6d6;
	}
	&:hover {
		cursor: pointer;
	}
`;
const Button = styled.button`
	border: none;
	height: 40px;
	border-radius: 20px;
	color: #9e30f4;
	border: 1px solid #9e30f4;
	background-color: transparent;
	padding: 0 20px;
	:disabled {
		border: none;
		background-color: #d6d6d6;
		color: black;
	}
	&:hover {
		cursor: pointer;
		:disabled {
			cursor: not-allowed;
		}
	}
`;
