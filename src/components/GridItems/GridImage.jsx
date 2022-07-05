import styled from 'styled-components';

export const GridImage = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: ${props => props.backgroundColor || 'blue'};
	background-image: ${props => props.backgroundColor || `url("${props.src}")`};
	background-size: cover;
	background-position: 50%;
	margin-bottom: ${props => props.marginbottom || '1rem'};
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	color: white;
	font-size: 0.8125rem;
	@media screen and (width: 360px) {
		width: 9.5625rem;
		height: 9.5625rem;
	}
	@media screen and (width: 320px) {
		width: 8.4063rem;
		height: 8.4063rem;
	}
	@media screen and (width: 280px) {
		width: 8.125rem;
		height: 8.125rem;
	}
`;
