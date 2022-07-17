import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { customApiClient } from '../../utils/apiClient';
import {
	FollowingFollowButton,
	FollowingLeft,
	FollowingUserImage,
	FollowingUserInfo,
	FollowingUserTextWrap,
	NoFollowWrap,
} from './Followings';
import { ReactComponent as NoFollowerIcon } from '../../assets/Icons/noFollower.svg';

export default function Followers() {
	const navigate = useNavigate();
	const { idx } = useParams();
	const onClickUserProfile = idx => {
		navigate(`/users/${idx}`);
	};
	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	const [followerList, setFollowerList] = useState([]);
	const [isFollowList, setIsFollowList] = useState([]);

	useEffect(() => {
		setBottomNavStatus(false);

		getFollowers();
	}, []);

	const getFollowers = async () => {
		const data = await customApiClient('get', `/users/${idx}/followers`);

		if (!data) return;
		if (!data.isSuccess) return;

		console.log(data.result);
		setFollowerList(data.result);
		var tmp = [];
		for (var i = 0; i < data.result.length; i++) {
			if (data.result[i].isFollow === 'Y') {
				tmp[i] = true;
			} else {
				tmp[i] = false;
			}
		}
		setIsFollowList([...tmp]);
	};
	const onFollow = (e, userIdx, index) => {
		e.stopPropagation();
		FollowUser(userIdx, index);
	};
	const onUnFollow = (e, userIdx, index) => {
		e.stopPropagation();
		UnFollowUser(userIdx, index);
	};
	const FollowUser = async (userIdx, index) => {
		// 팔로우 버튼 클릭
		const data = await customApiClient('post', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('FollowUser', data.message);
		var tmp = isFollowList;
		tmp[index] = !tmp[index];
		setIsFollowList([...tmp]);
		// console.log('userRecommendList', userRecommendList);
	};
	const UnFollowUser = async (userIdx, index) => {
		// 팔로잉 버튼 클릭(언팔)
		const data = await customApiClient('delete', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('UnFollowUser', data.message);
		var tmp = isFollowList;
		tmp[index] = !tmp[index];
		setIsFollowList([...tmp]);
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
				{followerList.length > 0 ? (
					followerList.map((follower, index) => (
						<FollowingUserInfo
							key={follower.userIdx}
							onClick={() => {
								onClickUserProfile(follower.userIdx);
							}}
						>
							<FollowingLeft>
								<FollowingUserImage
									size="3.25rem"
									src={follower.profileImgUrl}
								></FollowingUserImage>
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
							{follower.isMe === 'N' && (
								<>
									{isFollowList[index] ? (
										<FollowButton
											onClick={e => onUnFollow(e, follower.userIdx, index)}
											follow={isFollowList[index]}
										>
											팔로잉
										</FollowButton>
									) : (
										<FollowButton
											onClick={e => onFollow(e, follower.userIdx, index)}
											follow={isFollowList[index]}
										>
											팔로우
										</FollowButton>
									)}
								</>
							)}
						</FollowingUserInfo>
					))
				) : (
					<NoFollowWrap>
						<NoFollowerIcon
							style={{ width: '3.75rem', height: '3.75rem' }}
						></NoFollowerIcon>
						<SubText></SubText>
						<SubText color="#262626" fontsize="1rem" margin="1rem 0 0.5rem 0">
							아직 팔로우한 스러버가 없네요
						</SubText>
						<SubText color="#8d8d8d" fontsize="0.875rem">
							더 열심히 소통해봐요!
						</SubText>
					</NoFollowWrap>
				)}
			</ContentWrap>
		</MainContainer>
	);
}
const FollowButton = styled.div`
	padding: 10px 16px;
	border-radius: 30.4px;
	border: solid 1px #9e30f4;
	background-color: ${props => (props.follow ? '#fff' : '#9e30f4')};
	color: ${props => (props.follow ? '#9e30f4' : '#fff')};
	font-size: 0.875rem;
	font-weight: 600;
	position: relative;
	z-index: '900';
`;
