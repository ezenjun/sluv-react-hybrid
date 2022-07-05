import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { MainContainer } from '../components/containers/MainContainer';
import { TopNav } from '../components/containers/TopNav';
import { BackButton } from '../components/Buttons/BackButton';
import { Input } from '../components/Input';
import { SubText } from '../components/Texts/SubText';
import { ReactComponent as EditButton } from '../assets/Icons/threedot_Black.svg';
import { ReactComponent as ShareButton } from '../assets/Icons/Share.svg';
import { ReactComponent as AddItem } from '../assets/Icons/addItem.svg';
import { ReactComponent as UploadComment } from '../assets/Icons/uploadComment.svg';
import { ReactComponent as LikeIcon } from '../assets/Icons/likeButton.svg';
import { ReactComponent as ComentIcon } from '../assets/Icons/commentIcon.svg';
import { ReactComponent as Present } from '../assets/Icons/Present.svg';
import { MainText } from '../components/Texts/MainText';

import { BottomMenuStatusState } from '../recoil/BottomSlideMenu';
import { BottomSlideMenu } from '../components/containers/BottomSlideMenu';

const QuestionDetail = () => {
	const navigate = useNavigate();
	const [commentList, setCommentList] = useState([]);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const onReport = () => {
		setBottomMenuStatusState(true);
	};
	const onReportPost = () => {
		setBottomMenuStatusState(false);
		navigate('/report/post');
	};
	const onReportUser = () => {
		setBottomMenuStatusState(false);
		navigate('/report/user');
	};
	const comment = 0;
	return (
		<MainContainer padding="0 0 0 0">
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => navigate(-1)} />
				<div className="centerText">질문</div>
				<div className="rightText">
					<ShareButton
						style={{ width: '1.5rem', height: '1.5rem', marginRight: '1.25rem' }}
					></ShareButton>
					<EditButton
						onClick={onReport}
						style={{ width: '1.5rem', height: '1.5rem' }}
					></EditButton>
				</div>
			</TopNav>
			<FeedContainer>
				<QuestionWrap>
					<UserWrap>
						<UserImage></UserImage>
						<TextWrap>
							<SubText margin="0 0 0.125rem 0">이리노순둥도리</SubText>
							<SubText fontweight="400" color="#8D8D8D">
								5분전
							</SubText>
						</TextWrap>
					</UserWrap>
					<SubText fontweight="700" fontsize="16px" color="#9E30F4">
						스트레이키즈 리노
					</SubText>
					<TextWrap>
						<MainText fontsize="1.25rem" margin="0.75rem 0 1rem 0">
							220520 리노리방 반팔, 가디건 정보가 궁금해요
						</MainText>
						<SubText
							fontweight="400"
							fontsize="0.875rem"
							style={{ lineHeight: '1.1875rem' }}
							// margin="0 0.9375rem 0 0"
						>
							오늘 브이앱 리노가 입은 발팔이랑 가디건 너무 손민수 하고 싶은데, 어디
							제품인지 알 수 있을까요? 정보 아시는 분!
						</SubText>
					</TextWrap>

					<ImageWrap>
						<Image></Image>
						<Image></Image>
						<Image></Image>
						<Image></Image>
					</ImageWrap>
					<ButtonWrap>
						<LikeIcon style={{ marginRight: '0.25rem' }}></LikeIcon>
						<SubText margin="0 0.75rem 0 0">0</SubText>
						<ComentIcon style={{ marginRight: '0.25rem' }}></ComentIcon>
						<SubText margin="0 0.75rem 0 0">3</SubText>
					</ButtonWrap>
				</QuestionWrap>
				<CommentWrap>
					<Present></Present>
					<SubText fontsize="1rem" fontweight="bold" margin="1rem 0 0.75rem 0">
						아직 댓글이 없어요
					</SubText>
					<SubText
						fontsize="0.875rem"
						fontweight="normal"
						margin="0 0 0.125rem 0"
						color="#8d8d8d"
					>
						스러버를 위해
					</SubText>
					<SubText fontsize="0.875rem" fontweight="normal" color="#8d8d8d">
						첫 댓글을 남겨보세요
					</SubText>
				</CommentWrap>
			</FeedContainer>

			<BottomNavWrap openStatus={true}>
				<AddItem
					style={{ width: '2rem', height: '2rem', marginRight: '0.375rem' }}
				></AddItem>
				<InputWrap>
					<Input
						placeholder="댓글을 입력해 주세요"
						style={{ placeholderColor: '#c9c9c9' }}
					></Input>
					<UploadComment
						style={{ width: '2rem', height: '2rem', marginLeft: '0.5rem' }}
					></UploadComment>
				</InputWrap>
			</BottomNavWrap>
			<BottomSlideMenu>
				<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onReportPost}>
					게시글 신고
				</SubText>
				<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onReportUser}>
					유저 신고
				</SubText>
			</BottomSlideMenu>
		</MainContainer>
	);
};

const FeedContainer = styled.div`
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	align-items: center;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	padding-bottom: 4.875rem;
`;
const BottomNavWrap = styled.div`
	z-index: 50;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-top: 0.0625rem solid #ebebeb;
	background-color: white;
	height: 4.875rem;
	bottom: ${props => (props.openStatus ? '0' : '-2.9063rem')};
	display: ${props => (props.openStatus ? 'flex' : 'none')};
	justify-content: space-between;
	align-items: center;
	transition: bottom 300ms ease-in-out;
	box-sizing: border-box;
	padding: 0.9375rem 1.25rem;
`;

const InputWrap = styled.div`
	border: 1px solid #c9c9c9;
	display: flex;
	width: 18.5625rem;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	border-radius: 1.5rem;
	padding: 0.5rem 0.4375rem 0.5rem 1.25rem;
`;

const QuestionWrap = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	box-sizing: border-box;
	padding: 1.25rem 0 1.25rem 1.25rem;
	width: 100%;
`;
const UserWrap = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 1.625rem;
`;
const UserImage = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	margin-right: 0.75rem;
	background-color: pink;
`;
const TextWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-right: 1.25rem;
`;
const CommentWrap = styled.div`
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	background: linear-gradient(180deg, #f8f8fb 0%, rgba(255, 255, 255, 0) 38.46%);
	width: 100%;
	height: 21.9375rem;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
`;
const ImageWrap = styled.div`
	overflow-x: scroll;
	white-space: nowrap;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const Image = styled.div`
	display: inline-block;
	box-sizing: border-box;
	width: 10.125rem;
	height: 10.125rem;
	background-color: purple;
	margin-top: 1rem;
	margin-right: 0.6875rem;
	border-radius: 0.5rem;
`;
const ButtonWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 1.1875rem;
`;
export default QuestionDetail;
