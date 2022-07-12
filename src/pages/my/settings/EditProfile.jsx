import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackButton } from '../../../components/Buttons/BackButton';
import { ContentWrap } from '../../../components/containers/ContentWrap';
import { MainContainer } from '../../../components/containers/MainContainer'
import { TopNav } from '../../../components/containers/TopNav'
import { Input } from '../../../components/Input';
import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';
import { ReactComponent as Delete } from '../../../assets/Icons/delete_input.svg';
import { ReactComponent as Check } from '../../../assets/Icons/check_validation.svg';
import { PurpleButton } from '../../../components/Buttons/PurpleButton';

export default function EditProfile() {
	const navigate = useNavigate();

	const [nickname, setNickname] = useState('');
	const [nicknameValid, setNicknameValid] = useState(false);

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

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					프로필 수정
				</MainText>
			</TopNav>
			<ContentWrap style={{ flex: '1', border: '1px solid black' }}>
				<div style={{marginTop:'2.5rem'}}>
					
				</div>
				<FormWrap>
					<SubText margin="0 0 0.5rem 0">닉네임</SubText>
					<InputWrap valid={nicknameValid} value={nickname}>
						<Input
							value={nickname}
							onChange={handleNickname}
							type="text"
							placeholder="언제든지 수정이 가능해요"
						/>
						{nicknameValid && (
							<IconWrap>
								<Check />
							</IconWrap>
						)}
						{nickname.length !== 0 && !nicknameValid && (
							<IconWrap onClick={nicknameInputReset}>
								<Delete />
							</IconWrap>
						)}
					</InputWrap>
					<ErrorMessage>
						{!nicknameValid && nickname.length !== 0 && (
							<SubText color="#ef0000" fontweight="normal">
								올바른 닉네임을 입력해주세요
							</SubText>
						)}
					</ErrorMessage>
				</FormWrap>
			</ContentWrap>
			<div style={{margin:'0 1.25rem'}}>
				<PurpleButton>수정 완료</PurpleButton>
			</div>
		</MainContainer>
	);
}

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
	padding: 1rem;
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
`;

const ErrorMessage = styled.div`
	display: flex;
	margin-top: 0.5rem;
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