import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import BottomNav from './containers/BottomNav';
import Pages from './containers/Pages';

import './App.scss';
import { palette } from './styles/palette';


import { useRecoilValue } from 'recoil';
import { ToastMessageBottomPositionState, ToastMessageState, ToastMessageStatusState, ToastMessageWrapStatusState } from './recoil/ToastMessage';

export default function App() {
	const toastMessageStatus = useRecoilValue(ToastMessageStatusState);
	const toastMessageWrapStatus = useRecoilValue(ToastMessageWrapStatusState);
	const message = useRecoilValue(ToastMessageState);
	const bottomPosition = useRecoilValue(ToastMessageBottomPositionState);

	return (
		<RootWrap>
			<BrowserRouter>
				<Pages />
				{/* 하단바 */}
				<BottomNav />
			</BrowserRouter>

			{/* 토스트 메세지 */}
			<ToastMessageWrap openStatus={toastMessageWrapStatus}>
				<ToastMessage openStatus={toastMessageStatus} bottomPosition={bottomPosition}>
					{message}
				</ToastMessage>
			</ToastMessageWrap>
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

const ToastMessageWrap = styled.div`
	display: ${props => (props.openStatus ? 'block' : 'none')};
`;

const ToastMessage = styled.div`
	z-index: 10000;

	position: fixed;
	left: 0;
	right: 0;
	bottom: ${props => (props.bottomPosition)};

	padding: 0.625rem 0;
	margin: 0 1.25rem;

	border-radius: 1.625rem;

	background-color: rgba(38, 38, 38, 0.8);
	color: #ffffff;

	font-size: 0.75rem;

	text-align: center;

	/* 애니메이션 적용 */
	transition: opacity 300ms ease-out;
	opacity: ${props => (props.openStatus ? '1' : '0')};
`;