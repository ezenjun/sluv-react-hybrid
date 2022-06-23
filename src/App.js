import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import BottomNav from './containers/BottomNav';
import Pages from './containers/Pages';

import './App.scss';

import { palette } from './styles/palette';

export default function App() {
	return (
		<RootWrap>
			<BrowserRouter>
				<Pages />
				{/* 하단바 */}
				<BottomNav />
			</BrowserRouter>
		</RootWrap>
	);
}

// 모바일 맞춤 RootWrap 스타일
const RootWrap = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	max-width: 500px;

	left: 50%;
	transform: translate(-50%, 0);

	font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
		'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
	/* (!!!임시 컬러)  background color는 확정되면 변경하기 */
	background-color: ${palette.white.secondary};

	overflow: hidden;
`;
