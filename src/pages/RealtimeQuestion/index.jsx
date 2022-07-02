import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { SubText } from '../../components/Texts/SubText';

import { ChipWrap } from '../../components/Chip/ChipWrap';
import { Chip } from '../../components/Chip/Chip';
import { ReactComponent as QuestionIcon } from '../../assets/Icons/question.svg';

export default function RealtimeQuestion() {
	const navigate = useNavigate();
	const membersList = [
		{
			idx: 1,
			name: '스트레이키즈',
		},
		{
			idx: 2,
			name: '리노',
		},
		{
			idx: 3,
			name: '현진',
		},
		{
			idx: 4,
			name: '아이엔',
		},
		{
			idx: 5,
			name: '필릭스',
		},
		{
			idx: 6,
			name: '한',
		},
		{
			idx: 7,
			name: '창빈',
		},
		{
			idx: 8,
			name: '승민',
		},
		{
			idx: 9,
			name: '우진',
		},
	];
	const backClick = () => {
		navigate(-1);
	};
	const [currentItemList, setCurrentItemList] = useState([]);
	const [selectedChip, setSelectedChip] = useState(1);
	const onClickTab = (idx, name) => {
		setSelectedChip(idx);
		let tempArr = [];
		tempArr = currentItemList.filter(item => item.name === name); //item 리스트와 chip 이름 비교
		setCurrentItemList(tempArr);
	};
	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={backClick} />
				<div style={{ fontSize: '1.125rem' }} className="centerText">
					실시간 아이템 질문
				</div>
			</TopNav>
			<FeedContainer>
				<ChipWrap>
					{membersList.map(item => {
						return (
							<Chip
								key={item.idx}
								onClick={() => onClickTab(item.idx, item.name)}
								selected={selectedChip === item.idx}
							>
								{item.name}
							</Chip>
						);
					})}
				</ChipWrap>
				<HotItemsWrap>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
					<HotItem>
						<ItemText>
							<Top>
								<SubText fontsize="0.875rem" color="#9e30f4">
									스트레이키즈 리노
								</SubText>
							</Top>
							<Bottom>
								<QuestionIcon
									style={{
										marginRight: '0.5rem',
										width: '1.125rem',
										height: '1.125rem',
									}}
								></QuestionIcon>
								<QuestionText>
									<Question>
										<SubText fontsize="1rem">
											220520 리노리방 반팔 가디건 정보가 궁금해요!
										</SubText>
									</Question>
									<UploadInfo>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											빵짱
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											1분전
										</SubText>
										<Dot></Dot>
										<SubText fontsize="0.75rem" color="#8d8d8d">
											댓글 0
										</SubText>
									</UploadInfo>
								</QuestionText>
							</Bottom>
						</ItemText>
						<ItemImage></ItemImage>
					</HotItem>
				</HotItemsWrap>
			</FeedContainer>
		</MainContainer>
	);
}

const FeedContainer = styled.div`
	height: 100vh;
	padding: 0 1.25rem 1.25rem 1.25rem;
	margin-top: 0.3125rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const HotItemsWrap = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	align-content: space-between;
	overflow-y: scroll;
	margin-top: 1.25rem;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const HotItem = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	box-sizing: border-box;
	height: 8.125rem;
	padding: 1.25rem 1.125rem;
	border-radius: 1rem;
	border: solid 1px #ebebeb;
	margin-bottom: 0.75rem;
`;
const ItemText = styled.div`
	display: flex;
	flex-direction: column;
`;
const Top = styled.div``;
const Bottom = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 0.5rem;
`;
const QuestionText = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 1rem;
`;
const Question = styled.div`
	margin-bottom: 0.75rem;
`;
const UploadInfo = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const ItemImage = styled.div`
	width: 4.125rem;
	height: 5.625rem;
	background-color: brown;
	border-radius: 0.5rem;
	box-sizing: border-box;
	flex-shrink: 0;
`;

const Dot = styled.div`
	width: 2px;
	height: 2px;
	border-radius: 50%;
	background-color: #8d8d8d;
	margin: 0 6px;
	flex-grow: 0;
	display: flex;
`;
