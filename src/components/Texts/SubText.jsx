import styled from 'styled-components';

// 필터명, 아이템 명 등 bold 아닌 중간 크기 text용
export const SubText = styled.span`
	font-size: ${props => props.fontsize || '0.75rem'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => props.color || '#262626'};
	margin: ${props => props.margin || '0'};
`;
