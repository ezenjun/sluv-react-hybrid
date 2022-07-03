import React from 'react';
import styled from 'styled-components';

export const Grid = styled.div`
	width: 100%;
	display: flex;
	justify-content: start;
	flex-wrap: wrap;
`;

export const GridImage = styled.div`
	flex-grow: 1;
	border: 1px solid white;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: ${props => `url("${props.src}")`};
	background-size: cover;
	background-position: 50%;
	border-radius: 1rem;
`;

const GridItemWrapper = styled.div`
	flex: 0 0 45%;
	margin: 0.5rem;
	height: 12.5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
	box-sizing: border-box;
`;

export const GridItem = ({ forwardedRef, ...props }) => (
	<GridItemWrapper ref={forwardedRef} {...props} />
);
