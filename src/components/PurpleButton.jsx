import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	width: 100%;
	height: 48px;
	border: none;
	font-family: Pretendard;
	font-weight: bold;
	border-radius: 64px;
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

export const PurpleButton = ({ children, onClick, disabled }) => {
	return (
		<Button onClick={onClick} disabled={disabled}>
			{children}
		</Button>
	);
};
