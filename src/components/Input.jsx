import styled from 'styled-components';

// 로그인, 회원가입용 input 창 - disabled=true면 커서 block
export const Input = styled.input`
	align-items: center;
	height: 1.0625rem;
	width: 100%;
	font-size: 14px;
	font-weight: 400;
	font-family: Pretendard;
	outline: none;
	border: none;
	margin: ${props => props.margin || '0'};
	background-color: white;
	&:disabled {
		::placeholder {
			color: #dadada;
		}
		cursor: not-allowed;
	}
	::placeholder {
		color: #dadada;
	}

	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 30px #fff inset;
		-webkit-text-fill-color: #000;
	}
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		transition: background-color 5000s ease-in-out 0s;
	}
	&:focus {
		background-color: white;
	}
`;
