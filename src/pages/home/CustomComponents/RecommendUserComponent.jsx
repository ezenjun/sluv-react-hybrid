import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { customApiClient } from '../../../utils/apiClient';
import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';

export function RecommendUserComponent(props) {
	const [selected, setSelected] = useState(0);
	const onChipClick = idx => {
		setSelected(idx);
	};

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
		<RecommendUserWrap>
			<TextWrap>
				<MainText fontsize="1.5rem">인기 스러버 추천</MainText>
			</TextWrap>
			<ChipWrap>
				<Chip selected={selected === 0} onClick={() => onChipClick(0)}>
					전체 셀럽
				</Chip>
				{props.userInterestList.map((celeb, idx) => (
					<Chip
						key={celeb.idx}
						selected={selected === idx + 1}
						onClick={() => onChipClick(idx + 1, celeb.idx)}
					>
						{celeb.name}
					</Chip>
				))}
			</ChipWrap>
			<UserWrap>
				<User>
					<ProfileImg></ProfileImg>
					<SubText fontsize="0.875rem" margin="0.5rem 0 0.25rem 0">
						신류땡의 옷장
					</SubText>
					<SubText color="#8d8d8d">@ryujinee</SubText>
					<FollowButton follow={false}>팔로우</FollowButton>
				</User>
				<User>
					<ProfileImg></ProfileImg>
					<SubText fontsize="0.875rem" margin="0.5rem 0 0.25rem 0">
						도영이 클로젯12
					</SubText>
					<SubText color="#8d8d8d">@doyoung12</SubText>
					<FollowButton follow={true}>팔로잉</FollowButton>
				</User>
				<User>
					<ProfileImg></ProfileImg>
					<SubText fontsize="0.875rem" margin="0.5rem 0 0.25rem 0">
						신류땡의 옷장
					</SubText>
					<SubText color="#8d8d8d">@ryujinee</SubText>
					<FollowButton follow={false}>팔로우</FollowButton>
				</User>
				<User>
					<ProfileImg></ProfileImg>
					<SubText fontsize="0.875rem" margin="0.5rem 0 0.25rem 0">
						신류땡의 옷장
					</SubText>
					<SubText color="#8d8d8d">@ryujinee</SubText>
					<FollowButton follow={true}>팔로잉</FollowButton>
				</User>
			</UserWrap>
		</RecommendUserWrap>
	);
}

const RecommendUserWrap = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 40px 20px 50px 20px;
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
`;
const User = styled.div`
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	justify-content: center;
	box-sizing: border-box;
	align-items: center;
	width: 9.0625rem;
	height: 12.375rem;
	padding: 20px;
	margin-right: 11px;
	border-radius: 16px;
	box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.05);
	background-color: rgba(255, 255, 255, 0.4);
`;
const ProfileImg = styled.div`
	width: 3.875rem;
	height: 3.875rem;
	border-radius: 50%;
	background-color: chocolate;
`;
const FollowButton = styled.div`
	padding: 10px 16px;
	border-radius: 30.4px;
	border: solid 1px #9e30f4;
	margin-top: 1rem;
	background-color: ${props => (props.follow ? '#fff' : '#9e30f4')};
	color: ${props => (props.follow ? '#9e30f4' : '#fff')};
	font-size: 0.875rem;
	font-weight: 600;
`;
const TextWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: ${props => props.marginbottom || '20px'};
	padding: ${props => props.padding};
`;
const ChipWrap = styled.div`
	overflow-x: scroll;
	white-space: nowrap;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
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
