import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { BottomWrap, CelebLeftBottom, CelebLeftTop, CelebRightBottom, CelebRightTop, MembersContainer, NavRight, NextButton, RepeatWrap, TextWrap } from '../../pages/signup/SelectCeleb';
import { ChooseCelebCurrentPageState } from '../../recoil/Celebrity';
import { SpeechBubbleWrap } from '../Bubbles/SpeechBubble';
import { BackButton } from '../Buttons/BackButton';
import { MainText } from '../Texts/MainText';
import { SubText } from '../Texts/SubText';
import { ContentWrap } from './ContentWrap';
import { TopNav } from './TopNav';

export default function SelectMemberContainer({ data }) {

	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);

	const [currentMemberPage, setCurrentMemberPage] = useState(0);
	const [selectedMemberNum, setSelectedMemberNum] = useState(1);

	useEffect(() => {
		console.log(data[currentMemberPage].memberList);
	},[]);

	const onHandleBackButton = () => {
		if(!currentMemberPage) {
			setCurrentPage(0);
		} else {
			setCurrentMemberPage(currentMemberPage - 1);
		}
	};

	const onHandleNextButton = () => {
		if(currentMemberPage === data.length - 1) {
			// API 호출 완료 후
			onPostFavoriteCelebs();
			return;
		} 

		selectedMemberNum && setCurrentMemberPage(currentMemberPage + 1);
	};

	const onSelectMember = (member, e) => {
		console.log(member);
	}

	const onPostFavoriteCelebs = async () => {

		// API 호출

		// API 호출 성공하면 
		navigate('/home');
	}


	return (
		<>
			<TopNav>
				<BackButton onClick={onHandleBackButton} />
				<NavRight>
					{selectedMemberNum > 0 && (
						<SubText margin="0 1rem" color="#9e30f4">
							개 선택
						</SubText>
					)}
					<NextButton status={selectedMemberNum >= 0 ? true : false} onClick={onHandleNextButton}>
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
						<div>{data[currentMemberPage].name}</div>
					</SpeechBubbleWrap>
				</BottomWrap>

				<MembersContainer>
				{(function(){
					let renderList = [];
					for (let i = 0; i < data[currentMemberPage].memberList.length; i += 4) {
						renderList.push(
							<RepeatWrap>
								{data[currentMemberPage].memberList
									.slice(i, i + 4)
									.map((member, index) => (
										<>
											{index % 4 === 0 && (
												<CelebLeftTop
													key={member.memberIdx}
													onClick={e => onSelectMember(member, e)}
												>
													<Image size="9.25rem">
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
												</CelebLeftTop>
											)}
											{index % 4 === 1 && (
												<CelebLeftBottom
													key={member.memberIdx}
													onClick={e => onSelectMember(member, e)}
												>
													<Image size="9.25rem">
														<img
															className="celebImg"
															src={member.memberImgUrl}
															alt="셀럽이미지"
														/>
														<div className="memberName">
															{member.name}
														</div>
													</Image>
												</CelebLeftBottom>
											)}
											{index % 4 === 2 && (
												<CelebRightTop
													key={member.memberIdx}
													onClick={e => onSelectMember(member, e)}
												>
													<Image size="9.25rem">
														<img
															className="celebImg"
															src={member.memberImgUrl}
															alt="셀럽이미지"
														/>
														<div className="memberName">
															{member.name}
														</div>
													</Image>
												</CelebRightTop>
											)}
											{index % 4 === 3 && (
												<CelebRightBottom
													key={member.memberIdx}
													onClick={e => onSelectMember(member, e)}
												>
													<Image size="9.25rem">
														<img
															className="celebImg"
															src={member.memberImgUrl}
															alt="셀럽이미지"
														/>
														<div className="memberName">
															{member.name}
														</div>
													</Image>
												</CelebRightBottom>
											)}
										</>
									))}
							</RepeatWrap>
						);
					}
					return renderList;
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

