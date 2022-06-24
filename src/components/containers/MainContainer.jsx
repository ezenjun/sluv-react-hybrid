import styled from 'styled-components';
import { palette } from '../../styles/palette';

export const MainContainer = styled.div`
	display: flex;
	height: 100%;
	box-sizing: border-box;
	flex-direction: column;
	background-color: ${palette.white.primary};
`;
