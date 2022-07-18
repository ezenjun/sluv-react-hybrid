import styled from 'styled-components';

export const PurpleButton = styled.button`
	/* width: 100%; */
	height: ${props => props.height || '3rem'};
	width: ${props => props.width || '100%'};
	border: none;
	font-family: Pretendard;
	font-size: 1rem;
	font-weight: bold;
	border-radius: 4rem;
	background-color: #9e30f4;
	margin-bottom: ${props => props.marginBottom || '1rem'};
	color: white;
	box-shadow: ${props => props.boxshadow || 'none'};
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

// export const PurpleButton = ({ children, onClick, disabled, props }) => {
// 	return (
// 		<Button onClick={onClick} disabled={disabled} style={props}>
// 			{children}
// 		</Button>
// 	);
// };
