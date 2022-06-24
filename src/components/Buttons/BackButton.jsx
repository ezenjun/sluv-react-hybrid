import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from '../../assets/Icons/left_arrow.svg';

const ButtonWrap = styled.div`
	display: flex;
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
export const BackButton = ({ onClick }) => {
	return (
		<ButtonWrap onClick={onClick}>
			<LeftArrow />
		</ButtonWrap>
	);
};
