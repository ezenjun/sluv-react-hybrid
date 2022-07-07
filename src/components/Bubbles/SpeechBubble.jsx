import styled from 'styled-components';

export const SpeechBubbleWrap = styled.div`
	display: inline-block;
	background: ${props => props.backgroundColor || 'white'};
	position: relative;
	padding: 0.9375rem 1.25rem;
	margin-left: 0.5rem;
	border-radius: 13px;
	-moz-border-radius: 13px;
	-webkit-border-radius: 13px;
	border: none;
	font-size: 1rem;
	font-weight: 600;
	color: ${props => props.color || '#262626'};

	::before {
		content: '';
		position: absolute;
		right: 100%;
		top: 20%;
		width: 0;
		height: 0;
		border-bottom: 0.5rem solid transparent;
		border-right: ${props => props.borderRight || '0.5rem solid white'};
	}

	.redStar {
		color: #ff365f;
	}
	.highlight {
		color: #9e30f4;
	}
`;

export const ImgUploadBubbleWrap = styled.div`
	overflow-x: auto;
	float: right;
	display: flex;
	background-color: white;
	position: relative;
	padding: 0.625rem;
	margin-right: 0.5rem;
	margin-top: 1rem;
	border-radius: 13px;
	-moz-border-radius: 13px;
	-webkit-border-radius: 13px;
	border: solid 1px #e5cff6;

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
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;


