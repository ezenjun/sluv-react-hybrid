import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { customApiClient } from '../../utils/apiClient';
import { TopNav } from '../../components/containers/TopNav';
import { MainContainer } from '../../components/containers/MainContainer';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { Input } from '../../components/Input';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as Check } from '../../assets/Icons/check_validation.svg';

export default function FindPassword() {
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(false);
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
	async function handleFindPasswordAPI(email) {
		const url = `/auth/forget-pwd`;
		const body = { email: email };
		const data = await customApiClient('post', url, body);
		if (!data) return;
		console.log(data);
		if (data.isSuccess) {
			navigate('/find/password/result', { state: { email: email } });
		}
		if (data.code === 5002) {
			navigate('/find/password/result', { state: { email: '' } });
		}
	}
	const emailInputReset = () => {
		setEmail('');
	};

	const navigate = useNavigate();
	const handleNextClick = () => {
		handleFindPasswordAPI(email);
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
						<MainText fontsize="1.5rem">비밀번호 찾기</MainText>
					</PageLabel>
					<FormWrap>
						<SubText margin="0 0 0.5rem 0">이메일 주소</SubText>
						<InputWrap valid={emailValid} value={email}>
							<Input
								value={email}
								onChange={handleEmail}
								type="email"
								placeholder="sluv@email.com"
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
									올바른 이메일을 입력해주세요.
								</SubText>
							) : (
								<></>
							)}
						</ErrorMessage>
					</FormWrap>
				</TopWrap>
				<BottomWrap>
					{emailValid ? (
						<PurpleButton onClick={handleNextClick}>확인</PurpleButton>
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
