import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { BottomNavState } from '../../recoil/BottomNav';
import { customApiClient } from '../../utils/apiClient';

export default function SupportNotices() {
	const navigate = useNavigate();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	const [supportNoticeList, setSupportNoticeList] = useState([]);

	useEffect(() => {
		setBottomNavStatus(false);
		// 공지사항 API 호출
		getSupportNotices();
	},[]);

	const getSupportNotices = async () => {
		const data = await customApiClient('get', '/notices');

		if(!data) return;
		if(!data.isSuccess) return;

		console.log(data.result);
		setSupportNoticeList(data.result);
	}
	const onClickSupportNotice = idx => {
		navigate(`/support/notices/page/${idx}`);
	}

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					공지사항
				</MainText>
			</TopNav>
			<ContentWrap>
				{supportNoticeList.length > 0 &&
					supportNoticeList.map(item => (
						<div>
							<div
								onClick={() => onClickSupportNotice(item.noticeIdx)}
								style={{
									padding: '1.25rem 0 1.3125rem 0',
									borderBottom: '0.0437rem solid rgba(0,0,0,0.06)',
								}}
							>
								<div
									style={{
										fontSize: '1rem',
										marginBottom: '0.375rem',
										color: '#262626',
										fontWeight: '600',
									}}
								>
									{item.title}
								</div>
								<div
									style={{
										fontSize: '0.75rem',
										color: '#8d8d8d',
									}}
								>
									{item.createDate}
								</div>
							</div>
						</div>
					))}
			</ContentWrap>
		</MainContainer>
	);
}

