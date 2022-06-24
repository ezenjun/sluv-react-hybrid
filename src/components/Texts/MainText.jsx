import styled from 'styled-components';

export const MainText = styled.span`
	font-size: ${props => props.fontsize || '1.625rem'};
	font-weight: ${props => props.fontweight || 'bold'};
	color: ${props => props.color || '#262626'};
	margin: ${props => props.margin || '0'};
`;
