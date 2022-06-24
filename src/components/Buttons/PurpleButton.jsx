import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	width: 100%;
	height: 3rem;
	border: none;
	font-family: Pretendard;
	font-weight: bold;
	border-radius: 4rem;
	background-color: #9e30f4;
	margin-bottom: ${props => props.marginBottom || '30px'};
	color: white;
	:disabled {
		background-color: #dadada;
		color: white;
	}
	&:hover {
		cursor: pointer;
		:disabled {
			cursor: not-allowed;
		}
	}
`;

// 회원가입, 바인더에서 쓰일
// (조건 미충족 => disabled = true) 회색 배경 흰색 text 버튼 -> (조건 충족 => disabled = false) 보라색 배경 흰색 text 버튼

export const PurpleButton = ({ children, onClick, disabled }) => {
	return (
		<Button onClick={onClick} disabled={disabled}>
			{children}
		</Button>
	);
};
