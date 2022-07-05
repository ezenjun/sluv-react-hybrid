import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BottomNavState } from '../../recoil/BottomNav';
import { ChooseCelebCurrentPageState } from '../../recoil/Celebrity';
import SelectUploadCelebContainer from './SelectUploadCelebContainer';

export default function UploadItem() {
		const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
		const setBottomNavStatus = useSetRecoilState(BottomNavState);

		useEffect(() => {
			setBottomNavStatus(false);
		},[]);

	return (
		<>
			{currentPage === 0 && (
				<SelectUploadCelebContainer />
			)}
		</>
	);
}
