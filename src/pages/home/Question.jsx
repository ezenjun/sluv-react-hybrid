import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Chip } from '../../components/Chip/Chip';
import { ChipWrap } from '../../components/Chip/ChipWrap';

import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../components/Lines/VerticalLine';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';

import { ReactComponent as QuestionIcon } from '../../assets/Icons/question.svg';
import { ReactComponent as Present } from '../../assets/Icons/Present.svg';
export default function Question() {
	const navigate = useNavigate();
	const onUploadQuestion = () => {
		navigate(' /upload/question');
	};

	const [questionList, setQuestionList] = useState([]);
	return (
		<>
			{questionList.length != 0 ? (
				<NoQuestion>
					<Present style={{ width: '3.75rem', height: '3.75rem' }}></Present>
					<SubText></SubText>
					<SubText color="#262626" fontsize="1rem" margin="1rem 0 0.5rem 0">
						아직 올라온 질문이 없어요
					</SubText>
					<SubText color="#8d8d8d" fontweight="normal" fontsize="0.875rem">
						셀럽의 궁금한 아이템이 있다면
					</SubText>
					<SubText color="#8d8d8d" fontweight="normal" fontsize="0.875rem">
						스럽에 질문해 보세요!
					</SubText>
					<QuestionButton onClick={onUploadQuestion}>
						<SubText color="#9e30f4" fontweight="600" fontsize="0.875rem">
							질문하러가기
						</SubText>
					</QuestionButton>
				</NoQuestion>
			) : (
				<>
					<QuestionContainer>
						<AddQuestionButton onClick={onUploadQuestion}>질문하기</AddQuestionButton>
						<TextWrap padding="0 20px 0 0">
							<MainText fontsize="1.125rem">스러버들의 답변을 기다려요!</MainText>
						</TextWrap>
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
												<SubText
													fontweight="noraml"
													fontsize="0.75rem"
													color="#8d8d8d"
												>
													빵짱
												</SubText>
												<Dot></Dot>

												<SubText
													fontweight="noraml"
													fontsize="0.75rem"
													color="#8d8d8d"
												>
													1분전
												</SubText>
												<Dot></Dot>

												<SubText
													fontweight="noraml"
													fontsize="0.75rem"
													color="#8d8d8d"
												>
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
												<SubText
													fontweight="noraml"
													fontsize="0.75rem"
													color="#8d8d8d"
												>
													빵짱
												</SubText>
												<Dot></Dot>

												<SubText
													fontweight="noraml"
													fontsize="0.75rem"
													color="#8d8d8d"
												>
													1분전
												</SubText>
												<Dot></Dot>

												<SubText
													fontweight="noraml"
													fontsize="0.75rem"
													color="#8d8d8d"
												>
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
					<QuestionFeedContainer>
						<ChipWrap>
							<Chip selected={true}>스트레이키즈</Chip>
							<Chip>리노</Chip>
							<Chip>현진</Chip>
							<Chip>아이엔</Chip>
							<Chip>필릭스</Chip>
						</ChipWrap>
						<HorizontalLine></HorizontalLine>
						<RealTimeItem margin="0 0 0.75rem 0" width="100%">
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
											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												빵짱
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												1분전
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												댓글 0
											</SubText>
										</UploadInfo>
									</QuestionText>
								</Bottom>
							</ItemText>
							<ItemImage></ItemImage>
						</RealTimeItem>
						<RealTimeItem margin="0 0 0.75rem 0" width="100%">
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
											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												빵짱
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												1분전
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												댓글 0
											</SubText>
										</UploadInfo>
									</QuestionText>
								</Bottom>
							</ItemText>
							<ItemImage></ItemImage>
						</RealTimeItem>
						<RealTimeItem margin="0 0 0.75rem 0" width="100%">
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
											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												빵짱
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												1분전
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												댓글 0
											</SubText>
										</UploadInfo>
									</QuestionText>
								</Bottom>
							</ItemText>
							<ItemImage></ItemImage>
						</RealTimeItem>
						<RealTimeItem margin="0 0 0.75rem 0" width="100%">
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
											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												빵짱
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												1분전
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												댓글 0
											</SubText>
										</UploadInfo>
									</QuestionText>
								</Bottom>
							</ItemText>
							<ItemImage></ItemImage>
						</RealTimeItem>
						<RealTimeItem margin="0 0 0.75rem 0" width="100%">
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
											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												빵짱
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												1분전
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												댓글 0
											</SubText>
										</UploadInfo>
									</QuestionText>
								</Bottom>
							</ItemText>
							<ItemImage></ItemImage>
						</RealTimeItem>
						<RealTimeItem margin="0 0 0.75rem 0" width="100%">
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
											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												빵짱
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												1분전
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												댓글 0
											</SubText>
										</UploadInfo>
									</QuestionText>
								</Bottom>
							</ItemText>
							<ItemImage></ItemImage>
						</RealTimeItem>
						<RealTimeItem margin="0 0 0.75rem 0" width="100%">
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
											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												빵짱
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												1분전
											</SubText>
											<Dot></Dot>

											<SubText
												fontweight="noraml"
												fontsize="0.75rem"
												color="#8d8d8d"
											>
												댓글 0
											</SubText>
										</UploadInfo>
									</QuestionText>
								</Bottom>
							</ItemText>
							<ItemImage></ItemImage>
						</RealTimeItem>
					</QuestionFeedContainer>
				</>
			)}
		</>
	);
}

const NoQuestion = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 25.625rem;
	text-align: center;
	padding: 1.25rem;
`;
const QuestionButton = styled.div`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	justify-content: center;
	width: 8rem;
	height: 2.3125rem;
	border-radius: 2.1625rem;
	background-color: #f5eafe;
	color: #9e30f4;
	padding: 0.625rem 0;
	margin-top: 1.25rem;
`;
const QuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 40px 0 50px 20px;
	background: linear-gradient(180deg, #f0fff4 -26.91%, #f8f7fa 100%);
`;
const TextWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: ${props => props.marginbottom || '20px'};
	padding: ${props => props.padding};
`;
const QuestionWrap = styled.div`
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	align-content: space-between;
	overflow-x: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const RealTimeItem = styled.div`
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	justify-content: space-between;
	box-sizing: border-box;
	width: ${props => props.width || '19.6875rem'};
	/* width: 19.6875rem; */
	height: 8.125rem;
	margin: ${props => props.margin || '0 0.6875rem  0.5rem 0'};
	/* margin-bottom: 0.5rem;
	margin-right: 0.6875rem; */
	padding: 1.25rem;
	border-radius: 16px;
	background-color: #fff;
	box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.05);
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
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

const QuestionFeedContainer = styled.div`
	box-sizing: border-box;
	padding: 1.25rem 1.25rem 1.25rem 1.25rem;
`;
const AddQuestionButton = styled.div`
	position: fixed;
	box-sizing: border-box;
	right: 1.25rem;
	bottom: 4.375rem;
	width: 6.3125rem;
	height: 3rem;
	padding: 0.9375rem 0;
	color: white;
	background-color: #9e30f4;
	text-align: center;
	border-radius: 1.875rem;
	font-weight: bold;
`;
