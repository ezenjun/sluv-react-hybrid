import styled from 'styled-components';

// Home 화면 각 셀럽별 구역
export const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: ${props => props.padding || '40px 20px 50px 20px'};
`;
