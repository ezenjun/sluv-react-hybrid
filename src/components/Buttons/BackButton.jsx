import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from '../../assets/Icons/left_arrow.svg';
import { SocialLoginCompleteState } from '../../recoil/User';

const ButtonWrap = styled.div`
	display: ${props => (props.openStatus ? 'none' : 'flex')};
	border: none;
	background-color: transparent;
	padding: none;
	margin: none;
	align-items: center;
	justify-content: center;
	&:hover {
		cursor: pointer;
	}
`;

// 뒤로가기 버튼 -> 상단바에서 사용, onClick 함수 props로 받아 button으로 사용
export const BackButton = ({ openStatus, onClick }) => {
	const socialLoginComplete = useRecoilValue(SocialLoginCompleteState);

	return (
		<ButtonWrap openStatus={socialLoginComplete} onClick={onClick}>
			<LeftArrow style={{ width: '1.5rem', height: '1.5rem' }} />
		</ButtonWrap>
	);
};
