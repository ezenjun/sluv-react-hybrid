import styled from 'styled-components';

export const LargeViewImage = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	box-sizing: border-box;
	width: 100%;
	height: 14.375rem;
	background-color: lightgrey;
	background-image: linear-gradient(
			to top,
			#000 0%,
			rgba(60, 60, 60, 0.77) 0%,
			rgba(0, 0, 0, 0) 34%
		),
		url(${props => props.src});
	background-size: cover;
	background-position: 50%;

	border-radius: 1rem;
	padding: 0.5rem 0.75rem;
`;
