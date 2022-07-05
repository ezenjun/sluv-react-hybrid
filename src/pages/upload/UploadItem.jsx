import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { BottomNavState } from '../../recoil/BottomNav';
import { ChooseCelebCurrentPageState } from '../../recoil/Celebrity';
import SelectUploadCelebContainer from './SelectUploadCelebContainer';
import SelectUploadMemberContainer from './SelectUploadMemberContainer';

export default function UploadItem() {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	useEffect(() => {
		setBottomNavStatus(false);
		setCurrentPage(0);
	},[]);

	const onClickUploadItem = () => {

	}

	return (
		<>
			{currentPage === 0 && <SelectUploadCelebContainer />}
			{currentPage === 1 && <SelectUploadMemberContainer />}
			{currentPage === 2 && (
				<MainContainer>
					<TopNav style={{ justifyContent: 'space-between' }}>
						<BackButton onClick={() => navigate(-1)} />
						<MainText style={{ fontSize: '1.125rem' }} className="centerText">
							정보 공유하기
						</MainText>
						<div
							className="rightText"
							onClick={onClickUploadItem}
						>
							등록
						</div>
					</TopNav>
				</MainContainer>
			)}
		</>
	);
}
