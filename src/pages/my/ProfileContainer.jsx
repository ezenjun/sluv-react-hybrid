import React from 'react';
import styled from 'styled-components';
import { GridImage } from '../../components/GridItems/GridImage';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { ImageText } from '../../components/ImageText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { customApiClient } from '../../utils/apiClient';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import { useSetRecoilState } from 'recoil';
import { BottomNavState, UploadPopupState } from '../../recoil/BottomNav';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { useNavigate } from 'react-router-dom';

export default function ProfileContainer({
	uploadInfo,
	getSelectedItemIdx,
	myUploadIsDibList,
	getMyUpLoadDibList,
}) {
	const navigate = useNavigate();
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const onAddEachBinderClick = (e, itemIdx) => {
		e.stopPropagation();
		getSelectedItemIdx(itemIdx);
		setBottomMenuStatusState(true);
	};

	const onDeleteBinderClick = (e, itemIdx) => {
		e.stopPropagation();
		DeleteFromBinderAPI(itemIdx);
	};
	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
		// window.location.reload();
	};
	async function DeleteFromBinderAPI(itemIdx) {
		const Uri = `/dibs/${itemIdx}`;
		const data = await customApiClient('delete', Uri);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('바인더에서 삭제 data.isSuccess', data.isSuccess);
		var tmp = myUploadIsDibList;
		for (var i = 0; i < myUploadIsDibList.length; i++) {
			if (uploadInfo.uploadItemList[i]) {
				if (uploadInfo.uploadItemList[i].itemIdx === itemIdx) {
					tmp[i] = !tmp[i];
					getMyUpLoadDibList([...tmp]);
				}
			}
		}

		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`아이템이 바인더에서 삭제됐어요`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	}
	console.log(uploadInfo);
	return (
		<ProfileContainerWrap>
			{uploadInfo.uploadCnt > 0 && (
				<>
					<div
						style={{
							fontSize: '1.125rem',
							fontWeight: 'bold',
							color: '#262626',
							marginBottom: '1rem',
						}}
					>
						<span>아이템</span>
						<span style={{ marginLeft: '0.25rem', color: '#9e30f4' }}>
							{uploadInfo.uploadCnt}
						</span>
					</div>
					<GridItemWrap>
						{uploadInfo.uploadItemList.length > 0 &&
							uploadInfo.uploadItemList.map((item, index) => (
								<GridItem
									key={item.itemIdx}
									onClick={() => onDetailItemClick(item.itemIdx)}
								>
									<GridImage src={item.itemImgUrl}>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												{item.name}'s
											</SubText>
											{myUploadIsDibList[index] === true ? (
												<BinderRed
													onClick={e =>
														onDeleteBinderClick(e, item.itemIdx)
													}
													style={{
														width: '1.5rem',
														height: '1.5rem',
														zIndex: '900',
													}}
												/>
											) : (
												<BinderWhite
													onClick={e =>
														onAddEachBinderClick(e, item.itemIdx)
													}
													style={{
														width: '1.5rem',
														height: '1.5rem',
														zIndex: '900',
													}}
												/>
											)}
										</ImageText>
									</GridImage>
									<SubText
										fontsize="1rem"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										{item.brandKr}
									</SubText>
									<SubText
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										{item.itemName}
									</SubText>
								</GridItem>
							))}
					</GridItemWrap>
				</>
			)}
		</ProfileContainerWrap>
	);
}

const ProfileContainerWrap = styled.div`
	padding: 1.875rem 1.25rem 0 1.25rem;
`;
