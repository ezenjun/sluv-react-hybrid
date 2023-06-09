import styled from 'styled-components';

// 최상단 네비게이션 bar 용 컨테이너 - 홈(로고+알림버튼) 제외한 거의 모든 페이지 사용
export const TopNav = styled.div`
	display: flex;
	flex-shrink: 0;
	position: relative;
	box-sizing: border-box;
	font-weight: 700;
	font-size: 1.125rem;
	width: 100%;
	height: 3.0625rem;
	padding: 0.9375rem 1.25rem;
	align-items: center;
	text-align: center;

	// 상단바 중앙 텍스트
	.centerText {
		display: flex;
		align-items: center;
		font-size: 1.125rem;
		color: #262626;
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		white-space: nowrap;
	}

	// 상단바 우측 텍스트
	.rightText {
		display: flex;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
		/* color는 status 처리 필요 */
	}
`;
