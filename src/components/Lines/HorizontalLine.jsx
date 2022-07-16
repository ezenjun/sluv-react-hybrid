import styled from 'styled-components';

export const HorizontalLine = styled.div`
	box-sizing: border-box;
	margin: ${props => props.margin || '12px 0'};
	border-top: ${props => props.color || '1px solid #f4f4f4'};
`;
