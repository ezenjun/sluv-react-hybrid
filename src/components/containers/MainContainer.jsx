import styled from 'styled-components';
import { palette } from '../../styles/palette';

// Route 마다 들어갈 전체 컨테이너
export const MainContainer = styled.div`
	display: flex;
	height: 100%;
	box-sizing: border-box;
	flex-direction: column;
	background-color: ${palette.white.primary};
	padding: ${props => props.padding || '0'};
	margin: ${props => props.margin || '0'};

	border: 1px solid red;
	/* overflow-y: scroll; */
`;
