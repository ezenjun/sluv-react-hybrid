import React, { useState, useEffect } from 'react';

import { EventComponent } from './CustomComponents/Event';
import { CelebsLuvItem } from './CustomComponents/CelebsLuvItem';
import { BannerComponent } from './CustomComponents/Banner';
import { RecommendUserComponent } from './CustomComponents/RecommendUserComponent';
import { HotItemComponent } from './CustomComponents/HotItemComponent';

import { ReactComponent as SpeakerPhone } from '../../assets/Icons/speakerphone.svg';
import { ReactComponent as BubbleHeart } from '../../assets/Icons/bubbleHeart.svg';

import { customApiClient } from '../../utils/apiClient';

export default function Custom() {
	// 해당 유저 관심셀럽 리스트 //
	const [userInterestList, setUserInterestList] = useState([]);
	const getUserInterestList = async () => {
		const data = await customApiClient('get', '/interest');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setUserInterestList(data.result);
		console.log(data.result);
	};

	useEffect(() => {
		getUserInterestList();
	}, []);
	return (
		<>
			<EventComponent></EventComponent>
			<CelebsLuvItem></CelebsLuvItem>
			<RecommendUserComponent userInterestList={userInterestList}></RecommendUserComponent>
			<BannerComponent color="#ff006b" icon={SpeakerPhone}></BannerComponent>
			<CelebsLuvItem></CelebsLuvItem>
			<BannerComponent color="#7000ff" icon={BubbleHeart}></BannerComponent>

			<CelebsLuvItem></CelebsLuvItem>
			<HotItemComponent></HotItemComponent>
		</>
	);
}
