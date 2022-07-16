import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { EventComponent } from './CustomComponents/Event';
import { CelebsLuvItem } from './CustomComponents/CelebsLuvItem';
import { BannerComponent } from './CustomComponents/Banner';
import { RecommendUserComponent } from './CustomComponents/RecommendUserComponent';
import { HotItemComponent } from './CustomComponents/HotItemComponent';
import { HotKeyword } from './CustomComponents/HotKeyword';
import { ReactComponent as SpeakerPhone } from '../../assets/Icons/speakerphone.svg';
import { ReactComponent as BubbleHeart } from '../../assets/Icons/bubbleHeart.svg';

import { FavoriteCelebListState } from '../../recoil/Celebrity';

import { customApiClient } from '../../utils/apiClient';

export default function Custom() {
	// 해당 유저 관심셀럽 리스트 //
	const favoriteCelebList = useRecoilValue(FavoriteCelebListState);
	console.log(favoriteCelebList);

	return (
		<>
			{favoriteCelebList.length > 0 && (
				<>
					<EventComponent></EventComponent>
					<CelebsLuvItem celeb={favoriteCelebList[0]}></CelebsLuvItem>
					<RecommendUserComponent></RecommendUserComponent>
					<BannerComponent color="#ff006b" icon={SpeakerPhone}></BannerComponent>
					<CelebsLuvItem celeb={favoriteCelebList[1]}></CelebsLuvItem>
					{/* <BannerComponent color="#7000ff" icon={BubbleHeart}></BannerComponent> */}
					<CelebsLuvItem celeb={favoriteCelebList[2]}></CelebsLuvItem>
					{favoriteCelebList[3] && (
						<CelebsLuvItem celeb={favoriteCelebList[3]}></CelebsLuvItem>
					)}
					{favoriteCelebList[4] && (
						<CelebsLuvItem celeb={favoriteCelebList[4]}></CelebsLuvItem>
					)}
					<HotItemComponent></HotItemComponent>
					<HotKeyword></HotKeyword>
				</>
			)}
		</>
	);
}
