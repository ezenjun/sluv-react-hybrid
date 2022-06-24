import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from '../../assets/Icons/left_arrow.svg';

const ButtonWrap = styled.div`
	border: none;
	background-color: transparent;
	padding: none;
	margin: none;
	&:hover {
		cursor: pointer;
	}
`;

export const BackButton = ({ onClick }) => {
	return (
		<ButtonWrap onClick={onClick}>
			<LeftArrow />
		</ButtonWrap>
	);
};
