import styled from 'styled-components';

// 회원가입, 관심셀럽 설정, 페이지 레이블 등 bold, 20px 이상 텍스트용
export const MainText = styled.span`
	font-size: ${props => props.fontsize || '1.625rem'};
	font-weight: ${props => props.fontweight || 'bold'};
	color: ${props => props.color || '#262626'};
	margin: ${props => props.margin || '0'};
`;
