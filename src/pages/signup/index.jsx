import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { customApiClient } from '../../utils/apiClient';
import { TopNav } from '../../components/containers/TopNav';
import { MainContainer } from '../../components/containers/MainContainer';
import {
	SignupProgressState,
	SocialLoginCompleteState,
	SocialLoginUserIdxState,
} from '../../recoil/User';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { Input } from '../../components/Input';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as Check } from '../../assets/Icons/check_validation.svg';
import { ReactComponent as Congratulation } from '../../assets/Signup/Congratulation.svg';
import { ReactComponent as CheckOff } from '../../assets/Icons/checkbox_off.svg';
import { ReactComponent as CheckOn } from '../../assets/Icons/checkbox_on.svg';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';

export default function Signup() {
	const { pathname } = useLocation();

	const [currentPage, setCurrentPage] = useRecoilState(SignupProgressState);
	const setSocialLoginComplete = useSetRecoilState(SocialLoginCompleteState);
	const socialLoginUserIdx = useRecoilValue(SocialLoginUserIdxState);

	const [allCheck, setAllCheck] = useState(false);
	const [ageCheck, setAgeCheck] = useState(false);
	const [useCheck, setUseCheck] = useState(false);
	const [personalInfoCheck, setpersonalInfoCheck] = useState(false);
	const [marketingCheck, setMarketingCheck] = useState(false);
	const [necessary, setNecessary] = useState(0);

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);
	setCurrentPage(2);
	const allBtnEvent = () => {
		if (allCheck === false) {
			setAllCheck(true);
			setAgeCheck(true);
			setUseCheck(true);
			setpersonalInfoCheck(true);
			setMarketingCheck(true);
			setNecessary(3);
		} else {
			setAllCheck(false);
			setAgeCheck(false);
			setUseCheck(false);
			setpersonalInfoCheck(false);
			setMarketingCheck(false);
			setNecessary(0);
		}
	};
	const ageBtnEvent = () => {
		if (ageCheck === false) {
			setAgeCheck(true);
			setNecessary(necessary + 1);
		} else {
			setAgeCheck(false);
			setNecessary(necessary - 1);
		}
	};

	const useBtnEvent = () => {
		if (useCheck === false) {
			setUseCheck(true);
			setNecessary(necessary + 1);
		} else {
			setUseCheck(false);
			setNecessary(necessary - 1);
		}
	};

	const personalInfoBtnEvent = () => {
		if (personalInfoCheck === false) {
			setpersonalInfoCheck(true);
			setNecessary(necessary + 1);
		} else {
			setpersonalInfoCheck(false);
			setNecessary(necessary - 1);
		}
	};

	const marketingBtnEvent = () => {
		if (marketingCheck === false) {
			setMarketingCheck(true);
		} else {
			setMarketingCheck(false);
		}
	};

	useEffect(() => {
		if (
			ageCheck === true &&
			useCheck === true &&
			personalInfoCheck === true &&
			marketingCheck === true
		) {
			setAllCheck(true);
			setNecessary(3);
		} else {
			setAllCheck(false);
		}
	}, [necessary, ageCheck, useCheck, marketingCheck, personalInfoCheck]);
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

	// handler functions
	const handlePhoneNumber = e => {
		const regex = /^[0-9\b -]{0,11}$/; //숫자만 포함 11자
		if (regex.test(e.target.value)) {
			setPhoneNumber(e.target.value);
			if (e.target.value.length === 11) {
				setPhoneNumberValid(true);
				setAuthCodeDisabled(false);
			} else {
				setPhoneNumberValid(false);
				setAuthCodeDisabled(true);
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
	const [authSendCnt, setAuthSendCnt] = useState(0);
	const [authCodeDisabled, setAuthCodeDisabled] = useState(true);
	const authCodeInputReset = () => {
		setAuthCode('');
	};

	const handleEmail = e => {
		setEmail(e.target.value);
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
		const regex = /^.{0,15}$/; // 한글 영문 숫자 1글자 이상 regex
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
				setAuthCodeDisabled(false);
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

	// 인증번호 발송 API
	async function handleAuthCodeSendAPI() {
		const url = `/auth/sms?phone=${phoneNumber}`;
		const data = await customApiClient('get', url);
		if (!data) return;
		if (data.isSuccess) {
			setAuthCodeDisabled(true);
			beginTimer();
			setAuthSendCnt(authSendCnt + 1);
		}
	}
	// 인증번호 확인 API
	async function handleAuthCodeCheckAPI() {
		const url = `/auth/sms/validation?phone=${phoneNumber}&certnum=${authCode}`;
		const data = await customApiClient('get', url);
		if (data.isSuccess === true) {
			handleNextClick();
			console.log('인증번호 인증 성공');
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
	// 이메일 비밀번호 확인 API
	async function handleEmailCheckAPI() {
		const url = `/users/email-check?email=${email}`;
		const data = await customApiClient('get', url);
		if (data.isSuccess === true) {
			handleNextClick();
			console.log('이메일 등록 성공');
		} else {
			setEmailValid(false);
			setToastMessageBottomPosition('5.125rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage(data.message);

			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);

			console.log(data.message);
		}
	}
	// 최종 회원가입 용 API
	const onPostLocalSignUp = async () => {
		const body = {
			phoneNumber: phoneNumber,
			email: email,
			pwd: password,
			nickName: nickname,
		};
		const postUserSignupUri = '/auth/signup';
		const data = await customApiClient('post', postUserSignupUri, body);

		if (!data) return;
		if (!data.isSuccess) return;

		console.log(data.result.jwt);
		localStorage.setItem('myUserIdx', data.result.userIdx);
		localStorage.setItem('x-access-token', data.result.jwt);

		handleNextClick();
	};

	const onPatchNickname = async () => {
		console.log(nickname);
		const body = {
			nickName: nickname,
		};
		console.log('구글로그인 후', typeof socialLoginUserIdx);
		console.log(`/users/${socialLoginUserIdx}/nickname`);
		const uri = `/users/${socialLoginUserIdx}/nickname`;
		const data = await customApiClient('patch', uri, body);
		console.log(data);
		if (!data) return;
		if (!data.isSuccess) return;

		handleNextClick();
	};

	async function handleSignUpAPI() {
		const url = `/users/nickname-check?nickname=${nickname}`;
		const data = await customApiClient('get', url);
		if (data.isSuccess) {
			if (localStorage.getItem('x-access-token')) {
				// 소셜로그인 사용자
				// 닉네임 변경 API 호출
				onPatchNickname();
			} else {
				// 최초 사용자
				// 회원가입 API 호출
				console.log('hi');
				onPostLocalSignUp();
			}
		} else if (data.code === 3002) {
			setNicknameValid(false);

			setToastMessageBottomPosition('5.125rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage('이미 존재하는 닉네임이에요');

			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
		}
	}

	return (
		<MainContainer>
			{currentPage !== 5 && (
				<>
					<TopNav>
						<BackButton onClick={handleBackClick} />
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
						<FormWrap>
							<TermsWrap margin="0 0 0.75rem 0">
								{allCheck ? (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={allBtnEvent}
									>
										<CheckOn />
									</IconWrap>
								) : (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={allBtnEvent}
									>
										<CheckOff />
									</IconWrap>
								)}

								<SubText fontweight="bold" fontsize="1rem">
									약관 전체동의
								</SubText>
							</TermsWrap>
							<Line />
							<TermsWrap>
								{ageCheck ? (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={ageBtnEvent}
									>
										<CheckOn />
									</IconWrap>
								) : (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={ageBtnEvent}
									>
										<CheckOff />
									</IconWrap>
								)}
								<SubText fontweight="normal" fontsize="0.875rem">
									<SubText color="#9e30f4" fontsize="0.875rem">
										[필수]{' '}
									</SubText>
									만 14세 이상
								</SubText>
							</TermsWrap>
							<TermsWrap>
								{useCheck ? (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={useBtnEvent}
									>
										<CheckOn />
									</IconWrap>
								) : (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={useBtnEvent}
									>
										<CheckOff />
									</IconWrap>
								)}
								<SubText fontweight="normal" fontsize="0.875rem">
									<SubText color="#9e30f4" fontsize="0.875rem">
										[필수]{' '}
									</SubText>
									이용약관 동의
									<span
										onClick={() => navigate('/settings/terms-of-use')}
										style={{
											marginLeft: '0.5rem',
											fontSize: '0.75rem',
											color: '#b1b1b1',
											textDecoration: 'underline',
										}}
									>
										보기
									</span>
								</SubText>
							</TermsWrap>
							<TermsWrap>
								{personalInfoCheck ? (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={personalInfoBtnEvent}
									>
										<CheckOn />
									</IconWrap>
								) : (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={personalInfoBtnEvent}
									>
										<CheckOff />
									</IconWrap>
								)}
								<SubText fontweight="normal" fontsize="0.875rem">
									<SubText color="#9e30f4" fontsize="0.875rem">
										[필수]{' '}
									</SubText>
									개인정보 처리방침 동의
									<span
										onClick={() => navigate('/settings/privacy')}
										style={{
											marginLeft: '0.5rem',
											fontSize: '0.75rem',
											color: '#b1b1b1',
											textDecoration: 'underline',
										}}
									>
										보기
									</span>
								</SubText>
							</TermsWrap>
							{/* <TermsWrap>
								{marketingCheck ? (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={marketingBtnEvent}
									>
										<CheckOn />
									</IconWrap>
								) : (
									<IconWrap
										button="true"
										margin="0 0.5rem 0 0"
										onClick={marketingBtnEvent}
									>
										<CheckOff />
									</IconWrap>
								)}
								<SubText fontweight="normal" fontsize="0.875rem">
									[선택] 광고성 정보 수신 및 마케팅 활용 동의
								</SubText>
							</TermsWrap> */}
						</FormWrap>
					</TopWrap>
					<BottomWrap>
						{necessary === 3 ? (
							<PurpleButton onClick={handleNextClick}>다음</PurpleButton>
						) : (
							<PurpleButton disabled={true}>다음</PurpleButton>
						)}
					</BottomWrap>
				</ContentWrap>
			)}
			{currentPage === 2 && (
				<ContentWrap>
					<TopWrap>
						<PageLabel>
							<MainText>
								휴대폰 번호 <br />
								인증이 필요해요
							</MainText>
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
											<Check style={{ width: '18px', height: '18px' }} />
										</IconWrap>
									) : (
										<></>
									)}
									{phoneNumber.length !== 0 && !phoneNumberValid ? (
										<IconWrap onClick={phoneInputReset}>
											<Delete style={{ width: '18px', height: '18px' }} />
										</IconWrap>
									) : (
										<></>
									)}
								</InputPhone>
								{authSendCnt === 0 ? (
									<>
										{phoneNumberValid ? (
											<AuthButton
												disabled={authCodeDisabled}
												onClick={handleAuthCodeSendAPI}
											>
												인증하기
											</AuthButton>
										) : (
											<AuthButton disabled={authCodeDisabled}>
												인증하기
											</AuthButton>
										)}
									</>
								) : (
									<>
										{phoneNumberValid ? (
											<AuthButton
												disabled={authCodeDisabled}
												onClick={handleAuthCodeSendAPI}
											>
												재발송
											</AuthButton>
										) : (
											<AuthButton disabled={authCodeDisabled}>
												재발송
											</AuthButton>
										)}
									</>
								)}

								{/* 재발송 버튼 */}
							</InputWrapPhone>
							<ErrorMessage>
								{!phoneNumberValid && phoneNumber.length !== 0 ? (
									<SubText color="#ef0000" fontweight="normal">
										올바른 휴대폰 번호를 입력해주세요
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
										<Delete style={{ width: '18px', height: '18px' }} />
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
										<Check style={{ width: '18px', height: '18px' }} />
									</IconWrap>
								) : (
									<></>
								)}
							</InputWrap>
							<ErrorMessage>
								{!authCodeValid && authCode.length !== 0 ? (
									<SubText color="#ef0000" fontweight="normal">
										올바른 인증번호 형식이 아니에요
									</SubText>
								) : (
									<></>
								)}
							</ErrorMessage>
						</FormWrap>
					</TopWrap>
					<BottomWrap>
						{authCodeValid ? (
							<PurpleButton onClick={handleAuthCodeCheckAPI}>다음</PurpleButton>
						) : (
							<PurpleButton disabled={true}>다음</PurpleButton>
						)}
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
							<SubText margin="0 0 0.5rem 0">이메일 주소</SubText>
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
									<></>
								)}
								{email.length !== 0 && !emailValid ? (
									<IconWrap onClick={emailInputReset}>
										<Delete />
									</IconWrap>
								) : (
									<></>
								)}
							</InputWrap>
							<ErrorMessage>
								{!emailValid && email.length !== 0 ? (
									<SubText color="#ef0000" fontweight="normal">
										올바른 이메일을 입력해주세요
									</SubText>
								) : (
									<></>
								)}
							</ErrorMessage>
						</FormWrap>
						<FormWrap>
							<SubText margin="0 0 0.5rem 0">비밀번호</SubText>
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
									<></>
								)}
								{password.length !== 0 && !passwordValid ? (
									<IconWrap onClick={passwordInputReset}>
										<Delete />
									</IconWrap>
								) : (
									<></>
								)}
							</InputWrap>
							<ErrorMessage>
								{!passwordValid && password.length !== 0 ? (
									<SubText color="#ef0000" fontweight="normal">
										영문, 숫자, 특수문자 포함 8자 이상 입력해주세요
									</SubText>
								) : (
									<></>
								)}
							</ErrorMessage>
						</FormWrap>
					</TopWrap>
					<BottomWrap>
						{emailValid && passwordValid ? (
							<PurpleButton onClick={handleEmailCheckAPI}>다음</PurpleButton>
						) : (
							<PurpleButton disabled={true}>다음</PurpleButton>
						)}
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
							<SubText margin="0 0 0.5rem 0">닉네임</SubText>
							<InputWrap valid={nicknameValid} value={nickname}>
								<Input
									value={nickname}
									onChange={handleNickname}
									type="text"
									placeholder="언제든지 수정이 가능해요"
									maxLength="15"
								/>
								{nicknameValid ? (
									<IconWrap>
										<Check />
									</IconWrap>
								) : (
									<></>
								)}
								{nickname.length !== 0 && !nicknameValid ? (
									<IconWrap onClick={nicknameInputReset}>
										<Delete />
									</IconWrap>
								) : (
									<></>
								)}
							</InputWrap>
							<ErrorMessage>
								{!nicknameValid && nickname.length !== 0 ? (
									<SubText color="#ef0000" fontweight="normal">
										올바른 닉네임을 입력해주세요
									</SubText>
								) : (
									<></>
								)}
							</ErrorMessage>
						</FormWrap>
					</TopWrap>
					<BottomWrap>
						{nicknameValid ? (
							<PurpleButton onClick={handleSignUpAPI}>다음</PurpleButton>
						) : (
							<PurpleButton disabled={true}>다음</PurpleButton>
						)}
					</BottomWrap>
				</ContentWrap>
			)}
			{currentPage === 5 && (
				<ContentWrap>
					<CompleteTopWrap>
						<Congratulation
							style={{ width: '3.75rem', height: '3.75rem' }}
						></Congratulation>
						<NameText color="#9e30f4">
							{nickname}
							<NameText> 님</NameText>
						</NameText>
						<CompletePageLabel>
							<MainText>스럽 회원가입을</MainText>
							<MainText>축하드려요!</MainText>
							<SubText
								fontsize="0.875rem"
								fontweight="regular"
								color="#8D8D8D"
								margin="0.75rem"
							>
								스럽에서 다양한 활동 기대할게요
							</SubText>
						</CompletePageLabel>
					</CompleteTopWrap>
					<BottomWrap>
						<StyledLink
							onClick={() => navigate('/select/celebrity', { state: pathname })}
						>
							<PurpleButton>관심 셀럽 등록하러 가기</PurpleButton>
						</StyledLink>
					</BottomWrap>
				</ContentWrap>
			)}
		</MainContainer>
	);
}

const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.25rem 1.25rem 0 1.25rem;
	height: 100%;
	justify-content: space-between;
`;

const ProgressWrap = styled.div`
	width: 100%;
	height: 0.125rem;
	margin-bottom: 1rem;
	background-color: #fbf6ff;
`;
const ProgressBar = styled.div`
	width: ${props => props.progress}%;
	height: 100%;
	background-color: #9e30f4;
	transition: width 0.5s;
	/* border-radius: 0 10px 10px 0; */
`;

const TopWrap = styled.div`
	display: flex;
	flex-direction: column;
`;

const BottomWrap = styled.div``;

const PageLabel = styled.div`
	margin-bottom: 1.625rem;
`;

const CompleteTopWrap = styled.div`
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const CompletePageLabel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.5rem;
`;

const NameText = styled.span`
	font-size: 1.125rem;
	font-weight: bold;
	font-family: Pretendard;
	margin-top: 1.25rem;
	margin-bottom: 0.75rem;
	color: ${props => props.color || '#262626'};
`;

const FormWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.625rem;
`;

const TermsWrap = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	margin: ${props => props.margin || '12px 0 0 0'};
	.span {
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
	border-radius: 0.5rem;
	padding: 0.875rem;
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

const AuthButton = styled.button`
	box-sizing: border-box;
	font-family: Pretendard;
	border: none;
	height: 3rem;
	flex-shrink: 0;
	color: #262626;
	border-radius: ${props => props.borderradius || '24px'};
	font-weight: bold;
	font-size: 0.875rem;
	background-color: ${props => props.backgroundcolor || '#dadada'};
	padding: 1rem 1.125rem 0.9375rem;
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
		width: 3.0625rem;
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
const StyledLink = styled.div`
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

const Line = styled.div`
	border-bottom: 1px solid #ebebeb;
	margin: 0;
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
