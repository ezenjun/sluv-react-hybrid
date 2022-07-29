import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { customApiClient } from '../../../utils/apiClient';
import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';
import { ReactComponent as UserBasicProfileImg } from '../../../assets/Icons/user_basic_profile_img.svg';
import { ReactComponent as Icon } from '../../../assets/Custom/Custom_fire.svg';
import { FavoriteCelebListState } from '../../../recoil/Celebrity';

export function RecommendUserComponent() {
	const navigate = useNavigate();

	const favoriteCelebList = useRecoilValue(FavoriteCelebListState);

	const [selected, setSelected] = useState(0);
	const [selectedCelebIdx, setSelectedCelebIdx] = useState(0);

	const onClickUserProfile = idx => {
		navigate(`/users/${idx}`);
	};

	const onChipClick = (idx, celebIdx) => {
		setSelected(idx);

		setSelectedCelebIdx(celebIdx);

		if (!userRecommendList[idx]) {
			//userRecommendList[chip의 셀럽 위치 dix]가 존재하지 않을 때
			getEachCelebRecommendList(celebIdx, idx); // 셀럽별 인기 스러버 요청API ㅎ
		}
	};

	const onFollow = (e, userIdx) => {
		e.stopPropagation();
		FollowUser(userIdx);
		let tempList = userRecommendList;

		// let length = userRecommendList.length;
		for (var i = 0; i < tempList.length; i++) {
			//	userRecommendList 전체를 돌면서 팔로잉 플래그 변환(팔로잉 -> 팔로우)
			if (tempList[i]) {
				for (var j = 0; j < tempList[i].length; j++) {
					if (tempList[i][j].userIdx === userIdx) {
						if (tempList[i][j].isFollow === 'N') {
							tempList[i][j].isFollow = 'Y';
						}
					}
				}
			}
		}

		// console.log('tempList', tempList);
		setUserRecommendList([...tempList]);
		// console.log(userRecommendList);
	};
	const onUnFollow = (e, userIdx) => {
		e.stopPropagation();
		UnFollowUser(userIdx);
		let tempList = userRecommendList;

		for (var i = 0; i < tempList.length; i++) {
			//	userRecommendList 전체를 돌면서 팔로잉 플래그 변환(팔로우 -> 팔로잉)
			if (tempList[i]) {
				for (var j = 0; j < tempList[i].length; j++) {
					if (tempList[i][j].userIdx === userIdx) {
						if (tempList[i][j].isFollow === 'Y') {
							tempList[i][j].isFollow = 'N';
						}
					}
				}
			}
		}

		// console.log('tempList', tempList);
		setUserRecommendList([...tempList]);
		// console.log(userRecommendList);
	};
	const FollowUser = async userIdx => {
		// 팔로우 버튼 클릭
		const data = await customApiClient('post', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}

		// console.log('userRecommendList', userRecommendList);
	};
	const UnFollowUser = async userIdx => {
		// 팔로잉 버튼 클릭(언팔)
		const data = await customApiClient('delete', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
	};

	const [userRecommendList, setUserRecommendList] = useState([]);

	// 전체 인기 스러버
	const getTotalCelebRecommendList = async () => {
		const data = await customApiClient('get', '/homes/hot-users');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setUserRecommendList([...userRecommendList, data.result]); //useEffect에서 처음에 userRecommendList[0]에 전체 인기 스러버 들어감
	};
	// 각 셀럽별 인기 스러버
	const getEachCelebRecommendList = async (celedIdx, idx) => {
		const data = await customApiClient('get', `/homes/hot-users?celebIdx=${celedIdx}`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		let temp = userRecommendList;
		temp[idx] = data.result;
		setUserRecommendList([...temp]); // userRecommendList[클릭한 관심셀럽 이름 위치 idx] 에 셀럽별 인기 스러버 저장
	};
	useEffect(() => {
		getTotalCelebRecommendList();
	}, []);

	return (
		<RecommendUserWrap>
			<TextWrap>
				<MainText fontsize="1.5rem" margin="0 0 0 1.25rem">
					인기 스러버 추천
				</MainText>
				<Icon style={{ width: '1.5rem', height: '1.5rem', marginLeft: '0.3125rem' }}></Icon>
			</TextWrap>
			<ChipWrap>
				<Chip selected={selected === 0} onClick={() => onChipClick(0)}>
					전체 셀럽
				</Chip>
				{favoriteCelebList.map((celeb, idx) => (
					<Chip
						key={celeb.idx}
						selected={selected === idx + 1}
						onClick={() => onChipClick(idx + 1, celeb.celebIdx)}
					>
						{celeb.name}
					</Chip>
				))}
			</ChipWrap>
			<UserWrap>
				{userRecommendList[selected] ? (
					<>
						{userRecommendList[selected].map(user => (
							<User
								onClick={() => onClickUserProfile(user.userIdx)}
								key={user.userIdx}
							>
								{user.profileImgUrl ? (
									<ProfileImg src={user.profileImgUrl}></ProfileImg>
								) : (
									<UserBasicProfileImg
										style={{ width: '3.875rem', height: '3.875rem' }}
									></UserBasicProfileImg>
								)}

								<SubText
									fontsize="0.875rem"
									margin="0.5rem 0 0.1875rem 0"
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										width: '100%',
										textAlign: 'center',
									}}
								>
									{user.nickName}
								</SubText>
								<SubText color="#8d8d8d">@{user.id}</SubText>
								{user.isFollow === 'Y' ? (
									<FollowButton
										onClick={e => onUnFollow(e, user.userIdx)}
										follow={user.isFollow === 'Y'}
									>
										팔로잉
									</FollowButton>
								) : (
									<FollowButton
										onClick={e => onFollow(e, user.userIdx)}
										follow={user.isFollow === 'Y'}
									>
										팔로우
									</FollowButton>
								)}
							</User>
						))}
					</>
				) : (
					<>
						<User></User>
						<User></User>
						<User></User>
						<User></User>
					</>
				)}
			</UserWrap>
		</RecommendUserWrap>
	);
}

const RecommendUserWrap = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 40px 0px 50px 0px;
	background-color: #f8f7fa;
`;
const UserWrap = styled.div`
	display: flex;
	overflow-x: auto;
	margin-top: 20px;
	flex-direction: row;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	padding-left: 1.25rem;
`;
const User = styled.div`
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	justify-content: center;
	box-sizing: border-box;
	align-items: center;
	width: 9.0625rem;
	height: 13.125rem;
	padding: 1.25rem;
	margin-right: 0.6875rem;
	border-radius: 1rem;
	box-shadow: 0 0.125rem 1rem 0 rgba(0, 0, 0, 0.05);
	background-color: rgba(255, 255, 255, 0.4);
`;
const ProfileImg = styled.div`
	width: 3.875rem;
	height: 3.875rem;
	border-radius: 50%;
	flex-shrink: 0;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	background-image: url(${props => props.src});
`;
const FollowButton = styled.div`
	padding: 10px 16px;
	border-radius: 30.4px;
	border: solid 1px #9e30f4;
	margin-top: 0.75rem;
	background-color: ${props => (props.follow ? '#fff' : '#9e30f4')};
	color: ${props => (props.follow ? '#9e30f4' : '#fff')};
	font-size: 0.875rem;
	font-weight: 600;
	position: relative;
	z-index: '900';
`;
const TextWrap = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: ${props => props.marginbottom || '20px'};
	padding: ${props => props.padding};
`;
const ChipWrap = styled.div`
	overflow-x: scroll;
	white-space: nowrap;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	padding: 0 0 0 1.25rem;
`;
const Chip = styled.div`
	display: inline-block;
	box-sizing: border-box;
	padding: 0.625rem 1rem;
	margin-right: 0.5rem;
	border-radius: 1.9rem;
	border: solid 1px #e2e0e0;
	background-color: ${props => (props.selected ? '#2b1e34' : '#fff')};
	color: ${props => (props.selected ? '#fff' : '#2b1e34')};
	font-size: 0.875rem;
	font-weight: 600;
`;
