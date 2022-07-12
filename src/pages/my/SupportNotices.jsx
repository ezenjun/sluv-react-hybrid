import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { BottomNavState } from '../../recoil/BottomNav';

export default function SupportNotices() {
	const navigate = useNavigate();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	useEffect(() => {
		setBottomNavStatus(false);
		// 공지사항 API 호출
	},[]);

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					공지사항
				</MainText>
			</TopNav>
			<ContentWrap>
				
			
			</ContentWrap>
		</MainContainer>
	);
}

const NoticeContent = props => {
	return (
		<div
			className="notoMedium"
			onClick={props.action}
			style={{ padding: '0 1.25rem 0 1.25rem' }}
		>
			<div
				style={{
					padding: '0.9688rem 0 1.0313rem 0',
					borderBottom: '0.0437rem solid rgba(0,0,0,0.06)',
				}}
			>
				<div style={{ fontSize: '0.8125rem', marginBottom: '0.3125rem' }}>
					{props.title}
				</div>
				<div
					style={{
						fontSize: '0.75rem',
						lineHeight: '1.3125rem',
						color: 'rgba(49,49,49,0.4)',
					}}
				>
					{props.createdAt.substr(0, 10)}
				</div>
			</div>
		</div>
	);
};
