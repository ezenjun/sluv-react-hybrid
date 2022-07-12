import React, { useState } from 'react'
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

	const [followingList, setFollowingList] = useState([]);

	useEffect(() => {
		setBottomNavStatus(false);

		getFollowings();
	},[]);

	const getFollowings = async () => {
		const data = await customApiClient('get', `/users/${idx}/followings`);

		if (!data) return;
		if (!data.isSuccess) return;

		console.log(data.result);
		setFollowingList(data.result);

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
					followingList.map(following => (
						<FollowingUserInfo key={following.userIdx}>
							<FollowingLeft>
								<FollowingUserImage size="3.25rem"></FollowingUserImage>
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
							<>
								<FollowingFollowButton>팔로우</FollowingFollowButton>
							</>
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
	background-color: darkgoldenrod;
`;
