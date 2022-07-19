import { TemporaryCredentials } from 'aws-sdk';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { BottomWrap, CelebLeftBottom, CelebLeftTop, CelebNextLeftBottom, CelebNextLeftTop, CelebNextRightBottom, CelebNextRightTop, CelebRightBottom, CelebRightTop, CountBadge, MembersContainer, NavRight, NextButton, RepeatWrap, TextWrap } from '../../pages/signup/SelectCeleb';
import { ChooseCelebCurrentPageState, FavoriteCelebListState, UserFavoriteCelebIdxListState } from '../../recoil/Celebrity';
import { customApiClient } from '../../utils/apiClient';
import { SpeechBubbleWrap } from '../Bubbles/SpeechBubble';
import { BackButton } from '../Buttons/BackButton';
import { MainText } from '../Texts/MainText';
import { SubText } from '../Texts/SubText';
import { ContentWrap } from './ContentWrap';
import { TopNav } from './TopNav';

export default function SelectMemberContainer({ data, postIdxArray, setPostIdxArray }) {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const setFavoriteCelebList = useSetRecoilState(FavoriteCelebListState);

	const [currentMemberPage, setCurrentMemberPage] = useState(0);
	const [selectedMemberNum, setSelectedMemberNum] = useState(0);
	const [checkStatusList, setCheckStatusList] = useState([]);
	const [badgeNumList, setBadgeNumList] = useState([]);
	const [selectedMemberIdxArray, setSelectedMemberIdxArray] = useState([]);
	const [isGroupIdxList, setIsGroupIdxList] = useState([]);

	useEffect(() => {
		console.log('넘겨받은 셀럽 리스트 : ', postIdxArray);
		console.log('넘겨받은 데이터', data);

		
		postIdxArray.map((celeb, index) => {
			data.map((group, idx) => {
				if(group.celebIdx === celeb.celebIdx) {
					let temp = [];
					temp = isGroupIdxList;
					temp.push(index);
					setIsGroupIdxList([...temp]);
				}
			})
		})
	}, []);

	useEffect(() => {
		let temp;
		let temp2;
		(temp = []).length = data[currentMemberPage].memberList.length;
		(temp2 = []).length = data[currentMemberPage].memberList.length;
		temp.fill(false);
		temp2.fill(0);
		setCheckStatusList(temp);
		setBadgeNumList(temp2);

		setSelectedMemberNum(0);
		setSelectedMemberIdxArray([]);
	}, [currentMemberPage]);

	const onHandleBackButton = () => {
		if (!currentMemberPage) {
			setCurrentPage(0);
		} else {
			let temp = [];
			temp = postIdxArray
			temp[currentMemberPage - 1].memberList = [];
			setPostIdxArray(temp)

			setCurrentMemberPage(currentMemberPage - 1);
		}
	};

	const onHandleNextButton = () => {
		if (selectedMemberNum) {
			let temp = [];
			temp = postIdxArray;

			let idx = isGroupIdxList[currentMemberPage]
			console.log('인덱스', idx);
			


			temp[idx].memberList = selectedMemberIdxArray;



			setPostIdxArray(temp);

			console.log('멤버선택테스트', temp);

			if (currentMemberPage === data.length - 1) {
				onPostFavoriteCelebs();
			} else {
				setCurrentMemberPage(currentMemberPage + 1);
			}
		} 
	};

	const onSelectMember = (member, e, index) => {
		console.log(member);

		let tempWholeMember = [];
		let tempBadgeNumList = [];
		if (!checkStatusList[member.memberIdx - 1]) {
			setSelectedMemberNum(selectedMemberNum + 1);

			tempWholeMember = selectedMemberIdxArray;
			tempWholeMember.push({ memberIdx: member.memberIdx });
			setSelectedMemberIdxArray(tempWholeMember);

			tempBadgeNumList = badgeNumList;
			tempBadgeNumList[index] = selectedMemberNum + 1;
			setBadgeNumList(tempBadgeNumList);
		} else {
			setSelectedMemberNum(selectedMemberNum - 1);

			tempWholeMember = selectedMemberIdxArray;
			setSelectedMemberIdxArray(tempWholeMember.filter(item => item.memberIdx !== member.memberIdx));

			tempBadgeNumList = badgeNumList;
			tempBadgeNumList.map((badgeNum, _index) => {
				if (badgeNum > tempBadgeNumList[index]) {
					tempBadgeNumList[_index] = tempBadgeNumList[_index] - 1;
				}
			});
			setBadgeNumList(tempBadgeNumList);
		}
		let tempCheckList = checkStatusList;
		tempCheckList[member.memberIdx - 1] = !tempCheckList[member.memberIdx - 1];
		setCheckStatusList(tempCheckList);

		e.preventDefault();
	};

	const onPostFavoriteCelebs = async () => {
		// API 호출
		const body = {
			celebMemberList: postIdxArray,
		};
		const data = await customApiClient('post', '/interest', body);

		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}

		// API 호출 성공하면
		setFavoriteCelebList([]);
		console.log(data.message);
		navigate('/home');
	};

	return (
		<>
			<TopNav>
				<BackButton onClick={onHandleBackButton} />
				<NavRight>
					{selectedMemberNum > 0 && (
						<SubText margin="0 1rem" color="#9e30f4">
							{selectedMemberNum}개 선택
						</SubText>
					)}
					<NextButton
						status={selectedMemberNum > 0 ? true : false}
						onClick={onHandleNextButton}
					>
						다음
					</NextButton>
				</NavRight>
			</TopNav>

			<ContentWrap padding="0">
				<TextWrap>
					<MainText fontsize="1.5rem" margin="1.625rem 0 0.5rem 0">
						좋아하는 멤버를
						<br />
						자유롭게 선택해주세요
					</MainText>
					<SubText
						color="#8d8d8d"
						fontsize="0.875rem"
						fontweight="regular"
						margin="0 0 1.25rem 0"
					>
						선택한 순서대로 더 빠른 정보를 제공받을 수 있어요!
					</SubText>
				</TextWrap>

				<BottomWrap>
					<SpeechBubbleWrap
						backgroundColor="#9e30f4"
						color="white"
						borderRight="8px solid #9e30f4"
					>
						<div>{data[currentMemberPage].name && data[currentMemberPage].name}</div>
					</SpeechBubbleWrap>
				</BottomWrap>

				<MembersContainer>
					{(function () {
						if(data[currentMemberPage].memberList.length > 0) {
							let renderList = [];
							for (let i = 0; i < data[currentMemberPage].memberList.length; i += 8) {
								renderList.push(
									<RepeatWrap>
										{data[currentMemberPage].memberList
											.slice(i, i + 8)
											.map((member, index) => (
												<>
													{index % 8 === 0 && (
														<CelebLeftTop
															key={member.memberIdx}
															onClick={e =>
																onSelectMember(member, e, index)
															}
														>
															<Image
																size="9.25rem"
																border={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div className="dim"></div>
																<div className="memberName">
																	{member.name}
																</div>
															</Image>
															<CountBadge
																status={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<span className="badgeItem">
																	{badgeNumList[index]}
																</span>
															</CountBadge>
														</CelebLeftTop>
													)}
													{index % 8 === 1 && (
														<CelebRightTop
															key={member.memberIdx}
															onClick={e =>
																onSelectMember(member, e, index)
															}
														>
															<Image
																size="9.25rem"
																border={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div className="memberName">
																	{member.name}
																</div>
															</Image>
															<CountBadge
																status={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<span className="badgeItem">
																	{badgeNumList[index]}
																</span>
															</CountBadge>
														</CelebRightTop>
													)}
													{index % 8 === 2 && (
														<CelebLeftBottom
															key={member.memberIdx}
															onClick={e =>
																onSelectMember(member, e, index)
															}
														>
															<Image
																size="9.25rem"
																border={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div className="memberName">
																	{member.name}
																</div>
															</Image>
															<CountBadge
																status={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<span className="badgeItem">
																	{badgeNumList[index]}
																</span>
															</CountBadge>
														</CelebLeftBottom>
													)}
													{index % 8 === 3 && (
														<CelebRightBottom
															key={member.memberIdx}
															onClick={e =>
																onSelectMember(member, e, index)
															}
														>
															<Image
																size="9.25rem"
																border={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div className="memberName">
																	{member.name}
																</div>
															</Image>
															<CountBadge
																status={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<span className="badgeItem">
																	{badgeNumList[index]}
																</span>
															</CountBadge>
														</CelebRightBottom>
													)}
													{index % 8 === 4 && (
														<CelebNextLeftBottom
															key={member.memberIdx}
															onClick={e =>
																onSelectMember(member, e, index)
															}
														>
															<Image
																size="9.25rem"
																border={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div className="memberName">
																	{member.name}
																</div>
															</Image>
															<CountBadge
																status={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<span className="badgeItem">
																	{badgeNumList[index]}
																</span>
															</CountBadge>
														</CelebNextLeftBottom>
													)}
													{index % 8 === 5 && (
														<CelebNextLeftTop
															key={member.memberIdx}
															onClick={e =>
																onSelectMember(member, e, index)
															}
														>
															<Image
																size="9.25rem"
																border={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div className="memberName">
																	{member.name}
																</div>
															</Image>
															<CountBadge
																status={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<span className="badgeItem">
																	{badgeNumList[index]}
																</span>
															</CountBadge>
														</CelebNextLeftTop>
													)}
													{index % 8 === 6 && (
														<CelebNextRightTop
															key={member.memberIdx}
															onClick={e =>
																onSelectMember(member, e, index)
															}
														>
															<Image
																size="9.25rem"
																border={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div className="memberName">
																	{member.name}
																</div>
															</Image>
															<CountBadge
																status={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<span className="badgeItem">
																	{badgeNumList[index]}
																</span>
															</CountBadge>
														</CelebNextRightTop>
													)}
													{index % 8 === 7 && (
														<CelebNextRightBottom
															key={member.memberIdx}
															onClick={e =>
																onSelectMember(member, e, index)
															}
														>
															<Image
																size="9.25rem"
																border={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div className="memberName">
																	{member.name}
																</div>
															</Image>
															<CountBadge
																status={
																	checkStatusList[
																		member.memberIdx - 1
																	]
																}
															>
																<span className="badgeItem">
																	{badgeNumList[index]}
																</span>
															</CountBadge>
														</CelebNextRightBottom>
													)}
												</>
											))}
									</RepeatWrap>
								);
							}
							return renderList;

						}
						
					})()}
				</MembersContainer>
			</ContentWrap>
		</>
	);
}

const Image = styled.div`
	position: relative;
	width: ${props => props.size || '6.25rem'};
	height: ${props => props.size || '6.25rem'};
	overflow: hidden;

	display: flex;

	justify-content: center;
	align-items: flex-end;
	color: white;
	border-radius: 50%;
	margin-bottom: 0.5rem;
	box-sizing: border-box;
	border: ${props => (props.border ? '0.1875rem solid #9e30f4' : 'none')};

	&:hover {
		cursor: pointer;
	}

	.celebImg {
		position: absolute;
		top: -9999px;
		left: -9999px;
		right: -9999px;
		bottom: -9999px;
		margin: auto;
		z-index: 1;
	}

	.dim {
		position: absolute;
		top: -9999px;
		left: -9999px;
		right: -9999px;
		bottom: -9999px;
		margin: auto;
		z-index: 999;
		/* dim 넣어야함.... */
	}

	.memberName {
		z-index: 1000;
		margin-bottom: 0.75rem;
		font-size: 1rem;
		font-weight: 700;
	}
`;

