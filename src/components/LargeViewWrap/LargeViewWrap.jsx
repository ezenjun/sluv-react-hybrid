import styled from 'styled-components';

export const LargeViewWrap = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	align-content: space-between;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
