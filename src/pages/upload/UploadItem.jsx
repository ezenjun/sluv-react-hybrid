import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { BottomNavState } from '../../recoil/BottomNav';
import { ChooseCelebCurrentPageState } from '../../recoil/Celebrity';
import { CelebIndexState, UploadCelebState } from '../../recoil/Upload';
import SelectUploadCelebContainer from './SelectUploadCelebContainer';
import SelectUploadMemberContainer from './SelectUploadMemberContainer';

export default function UploadItem() {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const selectedCeleb = useRecoilValue(UploadCelebState);

	useEffect(() => {
		setBottomNavStatus(false);
		setCurrentPage(0);
	},[]);

	const onClickUploadItem = () => {
		const body = {
			celebIdx: selectedCeleb.celebIdx,
			memberIdx: 1,
			parentCategory: '상의',
			subCategory: '반소매',
			brandIdx: 1,
			name: '어느브랜드의 어느옷',
			whenDiscovery: '2022-06-30',
			price: 1,
			content: '아 추가 정보에요~',
			sellerSite: 'https://sellerSite.test',
			itemUrlList: [
				{
					isRepresent: 1,
					itemImgUrl: 'https://test-image-01',
				},
				{
					isRepresent: 0,
					itemImgUrl: 'https://test-image-02',
				},
				{
					isRepresent: 0,
					itemImgUrl: 'https://test-image-03',
				},
			],
		};

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
