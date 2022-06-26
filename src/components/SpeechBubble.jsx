import React from 'react'
import styled from 'styled-components';


export default function SpeechBubble({ children }) {
	return (
		<SpeechBubbleWrap>
			{children}
		</SpeechBubbleWrap>
	)
}

const SpeechBubbleWrap = styled.div`
	box-sizing: border-box;
	padding: 15px 0 15px 28px;
	background-image: url('data:image/svg+xml,%3Csvg width="auto" height="auto" viewBox="0 0 auto auto" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M8 17.152.934 12.724c-1.552-.973-1.076-3.353.734-3.667l7.426-1.285C11.106 3.196 15.68 0 21 0h265c7.18 0 13 5.82 13 13v22c0 7.18-5.82 13-13 13H21c-7.18 0-13-5.82-13-13V17.152z" fill="%23fff"/%3E%3C/svg%3E%0A');
`;