import styled from 'styled-components';

export const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${props => props.padding || '0 1.25rem 1.25rem 1.25rem'};
	height: 100%;
	overflow-y: scroll;
	/* position: relative; */
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
