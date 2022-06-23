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
import { ReactComponent as CheckOff } from '../../assets/Icons/checkbox_off.svg';
import { ReactComponent as CheckOn } from '../../assets/Icons/checkbox_on.svg';

export default function LocalLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [autoLoginCheck, setAutoLoginCheck] = useState(false);
	const [rememberIdCheck, setRememberIdCheck] = useState(false);

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

	const autoLoginBtnEvent = () => {
		if (autoLoginCheck === false) {
			setAutoLoginCheck(true);
		} else {
			setAutoLoginCheck(false);
		}
	};

	const rememberIdBtnEvent = () => {
		if (rememberIdCheck === false) {
			setRememberIdCheck(true);
		} else {
			setRememberIdCheck(false);
		}
	};

	return (
		<MainContainer>
			<TopNav>
				<StyledLink to="/">
					<BackButton>
						<LeftArrow />
					</BackButton>
				</StyledLink>
			</TopNav>
			<ContentWrap>
				<PageLabel>
					<MainText>
						셀럽의 아이템 정보 집합소 <br />
						스럽에서 시작해 보세요!
					</MainText>
				</PageLabel>
				<TopWrap>
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
					</FormWrap>
					<FormWrap marginBottom="16px">
						<SubText margin="0 0 0.5rem 0">비밀번호</SubText>
						<InputWrap valid={passwordValid} value={password}>
							<Input
								value={password}
								onChange={handlePassword}
								type="password"
								placeholder="비밀번호를 입력해주세요."
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
					</FormWrap>
					<LoginOptionWrap>
						<TermsWrap>
							{autoLoginCheck ? (
								<IconWrap
									button="true"
									margin="0 0.5rem 0 0"
									onClick={autoLoginBtnEvent}
								>
									<CheckOn />
								</IconWrap>
							) : (
								<IconWrap
									button="true"
									margin="0 0.5rem 0 0"
									onClick={autoLoginBtnEvent}
								>
									<CheckOff />
								</IconWrap>
							)}
							<SubText fontweight="normal" fontsize="12px" color="#6a6a6a">
								자동 로그인
							</SubText>
						</TermsWrap>
						<TermsWrap>
							{rememberIdCheck ? (
								<IconWrap
									button="true"
									margin="0 0.5rem 0 0"
									onClick={rememberIdBtnEvent}
								>
									<CheckOn />
								</IconWrap>
							) : (
								<IconWrap
									button="true"
									margin="0 0.5rem 0 0"
									onClick={rememberIdBtnEvent}
								>
									<CheckOff />
								</IconWrap>
							)}
							<SubText fontweight="normal" fontsize="12px" color="#6a6a6a">
								아이디 저장
							</SubText>
						</TermsWrap>
					</LoginOptionWrap>
					<PurpleButton marginBottom="26px">로그인</PurpleButton>
					<FindWrap>
						<StyledLink to="/find/email" color="#6a6a6a">
							아이디 찾기
						</StyledLink>
						<Line />
						<StyledLink to="/find/password" color="#6a6a6a">
							비밀번호 찾기
						</StyledLink>
						<Line />
						<StyledLink to="/signup" color="#6a6a6a">
							회원가입
						</StyledLink>
					</FindWrap>
				</TopWrap>
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
	padding: 1.25rem;
	height: 100%;
`;
const TopWrap = styled.div`
	display: flex;
	flex-direction: column;
`;

const PageLabel = styled.div`
	margin-bottom: 1.625rem;
`;
const MainText = styled.span`
	font-size: 1.5rem;
	font-weight: bold;
	color: #262626;
`;
const SubText = styled.span`
	font-family: Pretendard;
	font-size: ${props => props.fontsize || '0.75rem'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => props.color || 'black'};
	margin: ${props => props.margin || '0'};
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${props => props.color || 'black'};
	font-family: Pretendard;
	font-size: ${props => props.fontsize || '0.75rem'};
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
	margin-bottom: ${props => props.marginBottom || '1.625rem'};
`;

const InputWrap = styled.div`
	${props =>
		props.valid || props.value.length === 0
			? 'border: 1px solid #e2e0e0;'
			: 'border: 1px solid #ef0000'};
	display: flex;
	align-items: center;
	border-radius: 0.625rem;
	padding: 1rem;
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
`;
const Input = styled.input`
	align-items: center;
	height: 1.0625rem;
	width: 100%;
	font-size: 0.875rem;
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
const LoginOptionWrap = styled.div`
	display: flex;
	margin-bottom: 1.625rem;
`;

const TermsWrap = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	margin: ${props => props.margin || '0 1.25rem 0 0'};
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
	padding: 0 3.125rem;
	justify-content: space-around;
`;

const Line = styled.div`
	border-right: 1px solid #e2e0e0;
`;
