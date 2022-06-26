import styled from 'styled-components';

export const InputSpeechBubbleWrap = styled.div`
	background: white;
	position: relative;
	padding: 15px 20px;
	border-radius: 13px;
	-moz-border-radius: 13px;
	-webkit-border-radius: 13px;
	border: 1px solid #e5cff6;

	color: #262626;
	margin-top: 16px;

	.speechBubbleInput {
		width: 100%;
		height: 100%;
		border: none;
		caret-color: #9e30f4;
		font-size: 14px;
	}

	.speechBubbleInput:focus {
		outline: none;
	}
	.speechBubbleInput::placeholder {
		color: #c9c9c9;
	}

	::before {
		content: '';
		position: absolute;
		left: 100%;
		top: 20%;
		width: 0;
		height: 0;
		border-bottom: 8px solid transparent;
		border-left: 8px solid white;
	}
`;
