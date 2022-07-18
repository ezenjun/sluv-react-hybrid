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
					<CelebsLuvItem celeb={favoriteCelebList[0]} ComponentIndex={0}></CelebsLuvItem>
					<RecommendUserComponent></RecommendUserComponent>
					<BannerComponent color="#ff006b" icon={SpeakerPhone}></BannerComponent>
					<CelebsLuvItem celeb={favoriteCelebList[1]} ComponentIndex={1}></CelebsLuvItem>
					{/* <BannerComponent color="#7000ff" icon={BubbleHeart}></BannerComponent> */}
					<CelebsLuvItem celeb={favoriteCelebList[2]} ComponentIndex={2}></CelebsLuvItem>
					{favoriteCelebList[3] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[3]}
							ComponentIndex={3}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[4] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[4]}
							ComponentIndex={4}
						></CelebsLuvItem>
					)}
					<HotItemComponent></HotItemComponent>

					{favoriteCelebList[5] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[5]}
							ComponentIndex={5}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[6] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[6]}
							ComponentIndex={6}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[7] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[7]}
							ComponentIndex={7}
						></CelebsLuvItem>
					)}

					<HotKeyword></HotKeyword>

					{favoriteCelebList[8] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[8]}
							ComponentIndex={8}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[9] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[9]}
							ComponentIndex={9}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[10] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[10]}
							ComponentIndex={10}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[11] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[11]}
							ComponentIndex={11}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[12] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[12]}
							ComponentIndex={12}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[13] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[13]}
							ComponentIndex={13}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[14] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[14]}
							ComponentIndex={14}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[15] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[15]}
							ComponentIndex={15}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[16] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[16]}
							ComponentIndex={16}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[17] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[17]}
							ComponentIndex={17}
						></CelebsLuvItem>
					)}
					{favoriteCelebList[18] && (
						<CelebsLuvItem
							celeb={favoriteCelebList[18]}
							ComponentIndex={18}
						></CelebsLuvItem>
					)}
				</>
			)}
		</>
	);
}
