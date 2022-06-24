import styled from 'styled-components';

export const SubText = styled.span`
	font-size: ${props => props.fontsize || '0.75rem'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => props.color || '#262626'};
	margin: ${props => props.margin || '0'};
`;
