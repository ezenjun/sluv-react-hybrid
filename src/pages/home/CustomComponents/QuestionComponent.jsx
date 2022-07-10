import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';

import { ReactComponent as RightArrow } from '../../assets/Icons/right_arrow.svg';
import { ReactComponent as QuestionIcon } from '../../assets/Icons/question.svg';
export function QuestionComponent() {
	const navigate = useNavigate();
	const onRealtimeQuestionClick = () => {
		navigate('/question/realtime');
	};
	return (
		<QuestionContainer>
			<TextWrap padding="0 20px 0 0">
				<MainText fontsize="1.5rem">실시간 아이템 질문</MainText>
				<RightArrow onClick={onRealtimeQuestionClick}></RightArrow>
			</TextWrap>
			<ChipWrap>
				<Chip selected={true}>전체 Best</Chip>
				<Chip>스트레이키즈</Chip>
				<Chip>있지</Chip>
				<Chip>최우식</Chip>
				<Chip>블랙핑크</Chip>
			</ChipWrap>
			<QuestionWrap>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
				<RealTimeItem>
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
								<QuestionInfo>
									<SubText fontsize="1rem">
										220520 리노리방 반팔 가디건 정보가 궁금해요!
									</SubText>
								</QuestionInfo>
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
				</RealTimeItem>
			</QuestionWrap>
		</QuestionContainer>
	);
}

const QuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 2.5rem 0 3.125rem 1.25rem;
	background: linear-gradient(#f0fff4 -1.86%, #f8f7fa 100%);
`;
const QuestionWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	box-sizing: border-box;
	align-content: space-between;
	height: 17.25rem;
	overflow-x: scroll;
	margin-top: 20px;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const RealTimeItem = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	box-sizing: border-box;
	width: 19.6875rem;
	height: 8.125rem;
	margin-bottom: 0.5rem;
	margin-right: 0.6875rem;
	padding: 1.25rem;
	border-radius: 16px;
	background-color: #fff;
	box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.05);
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
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
const QuestionInfo = styled.div`
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
