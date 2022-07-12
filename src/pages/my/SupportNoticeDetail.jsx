import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { customApiClient } from '../../utils/apiClient';

export default function SupportNoticeDetail() {
	const navigate = useNavigate();

	const { idx } = useParams();

	const [supportNoticeData, setSupportNoticeData] = useState({});
	

	useEffect(() => {
		getSupportNoticeDetail();

	},[]);

	const getSupportNoticeDetail = async () => {
		const data = await customApiClient('get', `/notices/${idx}`);

		if(!data) return;
		if(!data.isSuccess) return;

		setSupportNoticeData(data.result);
		console.log(data.result);
	};

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
			</TopNav>
			<ContentWrap>
				<div
					style={{
						fontSize: '1.125rem',
						fontWeight: 'bold',
						color: '#262626',
						marginTop: '1.625rem',
					}}
				>
					{supportNoticeData.title}
				</div>
				<div style={{ fontSize: '0.75rem', color: '#8d8d8d', marginTop: '0.375rem' }}>
					{supportNoticeData.createDate}
				</div>
				<div
					dangerouslySetInnerHTML={{ __html: `<p>${supportNoticeData.content}</p>` }}
					style={{
						marginTop: '26px',
						wordBreak: 'keep-all',
						lineHeight: '1.29',
						color: '#262626',
						fontSize: '0.875rem'

					}}
				/>
			</ContentWrap>
		</MainContainer>
	);
}
