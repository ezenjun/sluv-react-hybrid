import styled from "styled-components";

export const LoginSpeechBubble = styled.div`
	background-color: #9e30f4;
	color: #fff;
	font-size: 0.6875rem;
	padding: 0.75rem 1.125rem;
	margin-bottom: 1.375rem;
	position: relative;
	border-radius: 0.8125rem;
	text-align: center;
	display: inline-block;

	::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 17%;
		height: 0;
		border: 6px solid transparent;
		border-top-color: #9e30f4;
		border-bottom: 0;
		border-right: 0;
		margin-bottom: -6px;
	}
	.boldText {
		font-weight: 600;
	}
`;