import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { customApiClient } from '../../utils/apiClient';

import { ReactComponent as GrayArrow } from '../../assets/Icons/icon_mypage_arrow_gray.svg';
import { ReactComponent as RightArrow } from '../../assets/Icons/right_arrow.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { GridImage } from '../../components/GridItems/GridImage';
import { ImageText } from '../../components/ImageText';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';

import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import { useSetRecoilState } from 'recoil';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';

export default function MyPageContainer({
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

	const onClickMyUpload = () => {
		navigate('/users/upload-items', {
			state: uploadInfo,
		});
	};

	// 아이템 하단의 추천 아이템 바인더 버튼
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

	return (
		<MyPageContainerWrap>
			<MyUploadWrap>
				<div className="titleWrap">
					<MainText style={{ fontWeight: '600' }} fontsize="1.125rem">
						나의 아이템 업로드
					</MainText>
					<RightArrow
						onClick={onClickMyUpload}
						style={{ width: '1.5rem', height: '1.5rem' }}
					/>
				</div>
				<div className="contentWrap">
					{uploadInfo.uploadItemList.length > 0 &&
						uploadInfo.uploadItemList.slice(0, 10).map((item, index) => (
							<MyPageGridItem
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
												onClick={e => onDeleteBinderClick(e, item.itemIdx)}
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										) : (
											<BinderWhite
												onClick={e => onAddEachBinderClick(e, item.itemIdx)}
												style={{
													width: '1.5rem',
													height: '1.5rem',
												}}
											/>
										)}
									</ImageText>
								</GridImage>
								<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
									{item.brandKr}
								</SubText>
								<SubText
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
										maxWidth: '10.125rem',
									}}
								>
									{item.itemName}
								</SubText>
							</MyPageGridItem>
						))}
				</div>
			</MyUploadWrap>

			{/* 구분선 */}
			<div style={{ height: '0.0625rem', backgroundColor: '#f4f4f4', margin: '0 1.25rem' }} />

			<MyPageContentWrap>
				<MyPageContentItem onClick={() => navigate('/users/viewed-items')}>
					<div className="itemText">최근 본 아이템</div>
					<GrayArrow style={{ width: '1.5rem', height: '1.5rem' }} />
				</MyPageContentItem>
				<MyPageContentItem onClick={() => navigate('/support/notices/')}>
					<div className="itemText">공지사항</div>
					<GrayArrow style={{ width: '1.5rem', height: '1.5rem' }} />
				</MyPageContentItem>
				<MyPageContentItem onClick={() => navigate('/faq')}>
					<div className="itemText">문의하기</div>
					<GrayArrow style={{ width: '1.5rem', height: '1.5rem' }} />
				</MyPageContentItem>
			</MyPageContentWrap>
		</MyPageContainerWrap>
	);
}

const MyPageContainerWrap = styled.div`
	padding: 1.9375rem 0 3.125rem 0;
	display: flex;
	flex-direction: column;
`;

const MyUploadWrap = styled.div`
	margin-bottom: 1.875rem;
	overflow-x: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	.titleWrap {
		padding: 0 1.25rem;
		display: flex;
		justify-content: space-between;
		// margin-bottom: 0.875rem;
	}
	.contentWrap {
		display: flex;
		flex-direction: row;
		padding-left: 1.25rem;
		margin-top: 0.875rem;

		overflow-x: scroll;
		::-webkit-scrollbar {
			display: none; /* for Chrome, Safari, and Opera */
		}
	}
`;

const MyPageContentWrap = styled.div`
	padding: 1.625rem 1.25rem 0 1.25rem;
`;

const MyPageContentItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.875rem;
	.itemText {
		font-size: 1.125rem;
		font-weight: 600;
		color: #262626;
	}
`;

const MyPageGridItem = styled.div`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	white-space: nowrap;
	width: 10.125rem;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 0.6875rem;
`;

const NoItemUploadWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-right: 1.25rem;
	align-items: center;

	border: 1px solid red;
`;
