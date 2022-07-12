import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { customApiClient } from '../../utils/apiClient';
import { FollowingFollowButton, FollowingLeft, FollowingUserImage, FollowingUserInfo, FollowingUserTextWrap } from './Followings';

export default function Followers() {
	const navigate = useNavigate();
	const { idx } = useParams();
	
	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	const [followerList, setFollowerList] = useState([]);

	useEffect(() => {
		setBottomNavStatus(false);

		getFollowers();
	},[]);

	const getFollowers = async () => {
		const data = await customApiClient('get', `/users/${idx}/followers`);

		if(!data) return;
		if(!data.isSuccess) return;

		console.log(data.result);
		setFollowerList(data.result);

	};

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					팔로워
				</MainText>
			</TopNav>
			<ContentWrap padding="0">
				{followerList.length > 0 &&
					followerList.map(follower => (
						<FollowingUserInfo key={follower.userIdx}>
							<FollowingLeft>
								<FollowingUserImage size="3.25rem"></FollowingUserImage>
								<FollowingUserTextWrap>
									<SubText
										font-weight="600"
										font-size="0.875rem"
										margin="0 0 0.25rem 0"
									>
										{follower.nickName}
									</SubText>
									<SubText
										fontweight="normal"
										font-size="0.75rem"
										color="#8d8d8d"
									>
										{follower.id}
									</SubText>
								</FollowingUserTextWrap>
							</FollowingLeft>
							<>
								<FollowingFollowButton>팔로우</FollowingFollowButton>
							</>
						</FollowingUserInfo>
					))}
			</ContentWrap>
		</MainContainer>
	);
}
