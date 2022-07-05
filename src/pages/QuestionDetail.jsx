import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MainContainer } from '../components/containers/MainContainer';
import { TopNav } from '../components/containers/TopNav';
import { BackButton } from '../components/Buttons/BackButton';
import { Input } from '../components/Input';
import { ReactComponent as EditButton } from '../assets/Icons/threedot_Black.svg';
import { ReactComponent as ShareButton } from '../assets/Icons/Share.svg';
import { ReactComponent as AddItem } from '../assets/Icons/addItem.svg';
import { ReactComponent as UploadComment } from '../assets/Icons/uploadComment.svg';
const QuestionDetail = () => {
	const navigate = useNavigate();
	return (
		<MainContainer padding="0 0 0 0">
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => navigate(-1)} />
				<div className="centerText">질문</div>
				<div className="rightText">
					<ShareButton
						style={{ width: '1.5rem', height: '1.5rem', marginRight: '1.25rem' }}
					></ShareButton>
					<EditButton style={{ width: '1.5rem', height: '1.5rem' }}></EditButton>
				</div>
			</TopNav>
			<FeedContainer></FeedContainer>
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
		</MainContainer>
	);
};

const FeedContainer = styled.div`
	height: 100vh;
	padding: 4.375rem 1.25rem 1.25rem 1.25rem;
	/* border: 1px solid black; */
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const BottomNavWrap = styled.div`
	z-index: 50;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-top: 0.0625rem solid #ebebeb;
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

export default QuestionDetail;
