import styled from 'styled-components';

export const InputSpeechBubbleWrap = styled.div`
	background: ${props => (props.notEmpty ? '#fbf6ff' : 'white')};
	position: relative;
	padding: 0.9375rem 1.125rem;
	margin-right: 0.5rem;
	border-radius: 13px;
	-moz-border-radius: 13px;
	-webkit-border-radius: 13px;
	border: 1px solid #e5cff6;

	color: #262626;
	margin-top: 1rem;

	::before {
		content: '';
		position: absolute;
		left: 100%;
		top: 20%;
		width: 0;
		height: 0;
		border-bottom: 0.5rem solid transparent;
		border-left: 0.5rem solid white;
	}
`;

export const SpeechBubbleInput = styled.input`
	width: 100%;
	height: 100%;
	border: none;
	caret-color: #9e30f4;
	font-size: 0.875rem;
	background: ${props => (props.notEmpty ? '#fbf6ff' : 'white')};

	:focus {
		outline: none;
	}
	::placeholder {
		color: #c9c9c9;
	}
`;

export const SpeechBubbleTextArea = styled.textarea`
	width: 100%;
	height: 100%;
	border: none;
	caret-color: #9e30f4;
	font-size: 0.875rem;
	background: ${props => (props.notEmpty ? '#fbf6ff' : 'white')};
	font-family: pretendard;

	:focus {
		outline: none;
	}
	::placeholder {
		color: #c9c9c9;
	}
`;

export const SpeechBubbleNoInput = styled.div`
	caret-color: #9e30f4;
	font-size: 0.875rem;
	color: #c9c9c9;
`;