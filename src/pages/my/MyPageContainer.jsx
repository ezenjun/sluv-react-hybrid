import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import { ReactComponent as GrayArrow } from '../../assets/Icons/icon_mypage_arrow_gray.svg';
import { ReactComponent as RightArrow } from '../../assets/Icons/right_arrow.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import { GridImage } from '../../components/GridItems/GridImage';
import { GridItem } from '../../components/GridItems/GridItem';
import { ImageText } from '../../components/ImageText';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';

export default function MyPageContainer({ uploadInfo }) {
	const navigate = useNavigate();

	const onClickMyUpload = () => {
		navigate('/users/upload-items', {
			state: uploadInfo,
		});
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
						uploadInfo.uploadItemList.slice(0, 10).map(item => (
							<MyPageGridItem key={item.itemIdx}>
								<GridImage>
									<ImageText>
										<SubText
											fontsize="0.8125rem"
											fontweight="bold"
											color="white"
										>
											{item.name}'s
										</SubText>
										<BinderWhite
											style={{
												width: '1.375rem',
												height: '1.375rem',
											}}
										/>
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
	flex: 1;
`;

const MyUploadWrap = styled.div`
	margin-bottom: 1.875rem;

	.titleWrap {
		padding: 0 1.25rem;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.875rem;
	}
	.contentWrap {
		display: flex;
		flex-direction: row;
		padding-left: 1.25rem;

		overflow-x: auto;
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
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 0.6875rem;
`;


