import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { customApiClient } from '../../utils/apiClient';

export default function Followings() {
	const navigate = useNavigate();
	const { idx } = useParams();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const onClickUserProfile = idx => {
		navigate(`/users/${idx}`);
	};
	const [followingList, setFollowingList] = useState([]);
	const [isFollowList, setIsFollowList] = useState([]);

	useEffect(() => {
		setBottomNavStatus(false);

		getFollowings();
	}, []);

	const getFollowings = async () => {
		const data = await customApiClient('get', `/users/${idx}/followings`);

		if (!data) return;
		if (!data.isSuccess) return;

		console.log(data.result);
		setFollowingList(data.result);
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
					팔로잉
				</MainText>
			</TopNav>
			<ContentWrap padding="0">
				{followingList.length > 0 &&
					followingList.map((following, index) => (
						<FollowingUserInfo
							key={following.userIdx}
							onClick={() => {
								onClickUserProfile(following.userIdx);
							}}
						>
							<FollowingLeft>
								<FollowingUserImage
									size="3.25rem"
									src={following.profileImgUrl}
								></FollowingUserImage>
								<FollowingUserTextWrap>
									<SubText
										font-weight="600"
										font-size="0.875rem"
										margin="0 0 0.25rem 0"
									>
										{following.nickName}
									</SubText>
									<SubText
										fontweight="normal"
										font-size="0.75rem"
										color="#8d8d8d"
									>
										{following.id}
									</SubText>
								</FollowingUserTextWrap>
							</FollowingLeft>
							{following.isMe === 'N' && (
								<>
									{isFollowList[index] ? (
										<FollowButton
											onClick={e => onUnFollow(e, following.userIdx, index)}
											follow={isFollowList[index]}
										>
											팔로잉
										</FollowButton>
									) : (
										<FollowButton
											onClick={e => onFollow(e, following.userIdx, index)}
											follow={isFollowList[index]}
										>
											팔로우
										</FollowButton>
									)}
								</>
							)}
						</FollowingUserInfo>
					))}
			</ContentWrap>
		</MainContainer>
	);
}

export const FollowingUserInfo = styled.div`
	padding: 1.375rem 1.25rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	border-bottom: 1px solid #f4f4f4;
`;
export const FollowingUserTextWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 0.625rem;
`;
export const FollowingFollowButton = styled.div`
	padding: 0.625rem 1rem;
	border-radius: 30.4px;
	border: solid 1px #9e30f4;
	background-color: ${props => (props.follow ? '#fff' : '#9e30f4')};
	color: ${props => (props.follow ? '#9e30f4' : '#fff')};
	font-size: 0.875rem;
	font-weight: 600;
`;
export const FollowingLeft = styled.div`
	display: flex;
	align-items: center;
`;

export const FollowingUserImage = styled.div`
	width: ${props => props.size || '1.5rem'};
	height: ${props => props.size || '1.5rem'};
	border-radius: 50%;
	background: url(${props => props.src});
	background-position: 50%;
	background-size: cover;
	background-repeat: no-repeat;
`;
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
