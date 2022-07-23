import styled from 'styled-components';

export const GridItem = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	box-sizing: border-box;
	.binderImg {
		width: 100%;
		border-radius: 1rem;
		:after {
			content: '';
			display: block;
			padding-bottom: 100%;
		}
	}
`;
