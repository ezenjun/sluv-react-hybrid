import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import { ReactComponent as GrayArrow } from '../../assets/Icons/icon_mypage_arrow_gray.svg';
import { ReactComponent as RightArrow } from '../../assets/Icons/right_arrow.svg';
import { MainText } from '../../components/Texts/MainText';

export default function MyPageContainer() {
	const navigate = useNavigate();
	return (
		<MyPageContainerWrap>
			<MyUploadWrap>
				<div className="titleWrap">
					<MainText style={{ fontWeight: '600' }} fontsize="1.125rem">
						인기 스러버 추천
					</MainText>
					<RightArrow style={{ width: '1.5rem', height: '1.5rem' }} />
				</div>
				<div className="contentWrap"></div>
			</MyUploadWrap>

			{/* 구분선 */}
			<div style={{ height: '0.0625rem', backgroundColor: '#f4f4f4', margin: '0 1.25rem' }} />

			<MyPageContentWrap>
				<MyPageContentItem>
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
	border: 1px solid red;

	.titleWrap {
		padding: 0 1.25rem;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.875rem;
	}
	.contentWrap {
		display: flex;

		
	}
`;

const MyPageContentWrap = styled.div`
	padding: 1.625rem 1.25rem 0 1.25rem;

	border: 1px blue solid;
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
