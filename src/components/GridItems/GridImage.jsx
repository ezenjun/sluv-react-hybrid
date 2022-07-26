import styled from 'styled-components';

export const GridImage = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	width: 100%;
	border-radius: 1rem;
	/* background-color: ${props => props.backgroundColor || '#f6f6f6'}; */
	background-image: linear-gradient(
			to top,
			#000 0%,
			rgba(60, 60, 60, 0.77) 0%,
			rgba(0, 0, 0, 0) 34%
		),
		url(${props => props.src});
	background-size: cover;
	background-position: 50%;
	margin-bottom: ${props => props.marginbottom || '1rem'};
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	color: white;
	font-size: 0.8125rem;

	:after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	@keyframes loadingAnimation {
		//배경색 위치 이동하는 애니메이션
		0% {
			background-position: -20rem 0;
		}
		100% {
			background-position: 20rem 0;
		}
	}
	:empty {
		background: linear-gradient(to right, #eeeeee 10%, #dddddd 28%, #eeeeee 53%);
		background-size: 100%;
		animation: 2s loadingAnimation forwards infinite linear; //애니메이션 적용
	}
`;
