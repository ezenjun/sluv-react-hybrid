import styled from 'styled-components';

export const Input = styled.input`
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
