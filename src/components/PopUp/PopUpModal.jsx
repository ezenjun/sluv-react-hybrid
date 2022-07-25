import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ReactComponent as Close } from '../../assets/Icons/CloseX262626.svg';
import { PopUpModalState } from '../../recoil/PopUpModal';
import { MainText } from '../Texts/MainText';
import { SubText } from '../Texts/SubText';

export function PopUpModal({ children, closeButton, closeFunction }) {
	const popUpModalStatusState = useRecoilValue(PopUpModalState);
	const setPopUpModalState = useSetRecoilState(PopUpModalState);
	const closeDialog = () => {
		setPopUpModalState(false);
		closeFunction();
		console.log(PopUpModalState);
	};
	return (
		<WholePage openStatus={popUpModalStatusState}>
			<ModalWrap>
				{closeButton === true ? (
					<CloseWrap>
						<Close
							style={{ width: '1.5rem', height: '1.5rem' }}
							onClick={closeDialog}
						></Close>
					</CloseWrap>
				) : (
					<></>
				)}
				{children}
			</ModalWrap>
		</WholePage>
	);
}

export const WholePage = styled.div`
	display: ${props => (props.openStatus ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	z-index: 10000;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	padding: 1.25rem;
`;
export const ModalWrap = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
	/* /justify-content: center; */
	text-align: center;
	align-items: center;
	box-sizing: border-box;
	background-color: white;
	padding: 1.25rem;
	width: 100%;
	border-radius: 1rem;
`;
const CloseWrap = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
`;

export const ButtonWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;
export const Button = styled.div`
	background-color: ${props => props.backgroundColor};
	box-sizing: border-box;
	width: 47%;
	height: 3rem;
	padding: 0.9375rem 0;
	font-family: Pretendard;
	font-size: 1rem;
	font-weight: bold;
	border-radius: 1.9rem;
	color: #fff;
`;
