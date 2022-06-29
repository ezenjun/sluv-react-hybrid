import styled from 'styled-components';

// 최상단 네비게이션 bar 용 컨테이너 - 홈(로고+알림버튼) 제외한 거의 모든 페이지 사용
export const TopNav = styled.div`
	display: flex;
	box-sizing: border-box;
	font-weight: 700;
	font-size: 1.125rem;
	width: 100%;
	/* height: 49px; */
	padding: 0.9375rem 1.25rem;
	align-items: center;
	text-align: center;
	// 상단바 중앙 텍스트
	.centerText {
		font-size: 1.125rem;
		color: #262626;
	}

	// 상단바 우측 텍스트
	.rightText {
		font-size: 1rem;
		font-weight: 600;
		/* color는 status 처리 필요 */
	}
`;
