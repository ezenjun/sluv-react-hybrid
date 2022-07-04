import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';

export function BottomSlideMenu({ children }) {
	const bottomMenuStatusState = useRecoilValue(BottomMenuStatusState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const closeDialog = () => {
		setBottomMenuStatusState(false);
		console.log(BottomMenuStatusState);
	};

	return (
		<BottomDialogWrap openStatus={bottomMenuStatusState}>
			<div onClick={closeDialog} style={{ height: '100%', width: '100%' }}></div>
			<BottomDialogDiv>
				<CloseWrap>
					<Close style={{ width: '1.5rem', height: '1.5rem' }} onClick={closeDialog}>
						취소
					</Close>
				</CloseWrap>
				{children}
			</BottomDialogDiv>
		</BottomDialogWrap>
	);
}

const BottomDialogWrap = styled.div`
	display: ${props => (props.openStatus ? 'block' : 'none')};
	z-index: 10000;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(110, 110, 110, 0.35);
`;

const BottomDialogDiv = styled.div`
	position: absolute;
	bottom: 0;
	display: flex;
	flex-direction: column;
	background-color: white;
	text-align: center;
	font-size: 0.875rem;
	font-family: 'Pretendard';
	font-weight: 600;
	color: #000000;
	width: 100%;
	min-height: 8rem;
	border-radius: 1rem 1rem 0 0;
	padding: 1.25rem 1.25rem 1.25rem 1.25rem;
	box-sizing: border-box;
`;
const CloseWrap = styled.div`
	display: flex;
	justify-content: flex-end;
`;