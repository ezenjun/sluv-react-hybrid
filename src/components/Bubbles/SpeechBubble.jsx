import styled from 'styled-components';

export const SpeechBubbleWrap = styled.div`
	display: inline-block;
	background: white;
	position: relative;
	padding: 15px 20px;
	border-radius: 13px;
	-moz-border-radius: 13px;
	-webkit-border-radius: 13px;
	border: none;
	font-size: 16px;
	font-weight: 600;
	color: #262626;

	::before {
		content: '';
		position: absolute;
		right: 100%;
		top: 20%;
		width: 0;
		height: 0;
		border-bottom: 8px solid transparent;
		border-right: 8px solid white;
	}

	.redStar {
		color: #ff365f;
	}
`;

