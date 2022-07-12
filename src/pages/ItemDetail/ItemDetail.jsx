import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Slider from 'react-slick';

import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';

import { ReactComponent as EditButton } from '../../assets/Icons/threedot_Black.svg';
import { ReactComponent as ShareButton } from '../../assets/Icons/Share.svg';
import { ReactComponent as AddItem } from '../../assets/Icons/addItem.svg';
import { ReactComponent as BinderGrey } from '../../assets/Icons/binderGrey.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as LikeButton } from '../../assets/Icons/likeButton.svg';

import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';

export default function ItemDetail() {
	let { itemIdx } = useParams();
	const navigate = useNavigate();
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
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

	const settings = {
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		cssEase: 'linear',
		arrows: false,
		dotsClass: 'slick-dots line-indicator',
		customPaging: i => <div style={{ position: 'fixed', width: '100%', top: '0' }}></div>,
	};

	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(false);
	}, []);
	return (
		<MainContainer padding="0 0 0 0">
			<BottomSlideMenu>
				<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onReportPost}>
					게시글 신고
				</SubText>
				<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onReportUser}>
					유저 신고
				</SubText>
			</BottomSlideMenu>
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => navigate(-1)} />
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
				<ImageContainer>
					<Slider {...settings}>
						<Image></Image>
						<Image></Image>
						<Image></Image>
						<Image></Image>
						<Image></Image>
					</Slider>
				</ImageContainer>

				<ItemInfoContainer>
					<SubText fontsize="1rem" fontweight="bold" color="#9E30F4">
						스트레이키즈 승민
					</SubText>
					<MainText fontsize="1.25rem" margin="0.75rem 0 0.375rem 0">
						더블유브이 프로젝트
					</MainText>
					<SubText fontsize="1rem" fontweight="600" margin="0 0 0.75rem 0">
						스트레이키즈 승민
					</SubText>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<SubText fontweight="normal">상의 {'>'} 긴소매</SubText>
						<Dot></Dot>
						<SubText fontweight="normal">5분전</SubText>
					</div>
				</ItemInfoContainer>
				<ItemInfoContainer backgroundColor="#F8F7FA" padding="2rem">
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<UserImage></UserImage>
						<SubText fontsize="0.875rem" fontweight="600" margin="0 0 0 0.375rem">
							이리노순둥도리
						</SubText>
					</div>
					<SpeechBubbleWrap
						borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
						backgroundColor="rgba(0, 0, 0, 0.05)"
						style={{ margin: '0.625rem 0 0 0' }}
					>
						<div>2022년 5월 22일에</div>
					</SpeechBubbleWrap>
					<SpeechBubbleWrap
						borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
						backgroundColor="rgba(0, 0, 0, 0.05)"
						style={{ margin: '0.625rem 0 0 0' }}
					>
						<div>2022년 5월 22일에</div>
					</SpeechBubbleWrap>
					<SpeechBubbleWrap
						borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
						backgroundColor="rgba(0, 0, 0, 0.05)"
						style={{ margin: '0.625rem 0 0 0' }}
					>
						<div>2022년 5월 22일에</div>
					</SpeechBubbleWrap>
					<SpeechBubbleWrap
						borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
						backgroundColor="rgba(0, 0, 0, 0.05)"
						style={{ margin: '0.625rem 0 0 0' }}
					>
						<div>2022년 5월 22일에</div>
					</SpeechBubbleWrap>
				</ItemInfoContainer>
				<UserInfo>
					<Left>
						<UserImage size="3.25rem"></UserImage>
						<UserTextWrap>
							<SubText font-weight="600" font-size="0.875rem" margin="0 0 0.25rem 0">
								이리노순둥도리
							</SubText>
							<SubText font-weight="600" font-size="0.875rem">
								@sluvv
							</SubText>
						</UserTextWrap>
					</Left>
					<>
						<FollowButton>팔로우</FollowButton>
					</>
				</UserInfo>
			</FeedContainer>

			<BottomNavWrap openStatus={true}>
				<AlignDiv>
					<BinderGrey
						style={{
							width: '1.5rem',
							height: '1.5rem',
							marginRight: '0.375rem',
							color: 'red',
						}}
					></BinderGrey>
					<SubText fontsize="0.875rem" color="#9E30F4">
						2명
					</SubText>
					<SubText fontsize="0.875rem">이 바인더에 보관했어요</SubText>
				</AlignDiv>
				<AlignDiv>
					<LikeButton></LikeButton>
					<SubText fontsize="0.875rem" margin="0 0 0 0.25rem">
						6
					</SubText>
				</AlignDiv>
			</BottomNavWrap>
		</MainContainer>
	);
}
const Image = styled.div`
	background-color: pink;
	width: 23.4375rem;
	height: 23.4375rem;
	/* background-image: url(${props => props.src}); */
`;
const ImageContainer = styled.div`
	.slick-dots {
		position: absolute;
		bottom: 1.25rem;
	}
	.line-indicator li {
		height: 0.125rem;
		width: 1.875rem;
		background: #f0f0f0;
		opacity: 50%;
		border-radius: 5px;
		margin: 0;
	}
	.line-indicator li:hover {
		background: #c3c3c3;
	}
	.line-indicator li.slick-active {
		background: #fff;
		opacity: 100%;
		transition: 0.3s ease-in-out;
	}
`;

const BottomNavWrap = styled.div`
	z-index: 50;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-top: 0.0625rem solid #ebebeb;
	background-color: white;
	height: 4.0625rem;
	bottom: ${props => (props.openStatus ? '0' : '-2.9063rem')};
	display: ${props => (props.openStatus ? 'flex' : 'none')};
	justify-content: space-between;
	align-items: center;
	transition: bottom 300ms ease-in-out;
	box-sizing: border-box;
	padding: 0.9375rem 1.25rem;
`;
const AlignDiv = styled.div`
	display: flex;
	align-items: center;
`;
const ItemInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: ${props => props.padding || '1.25rem'};
	background-color: ${props => props.backgroundColor || 'white'};
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
const UserImage = styled.div`
	width: ${props => props.size || '1.5rem'};
	height: ${props => props.size || '1.5rem'};
	border-radius: 50%;
	background-color: darkgoldenrod;
`;
const FeedContainer = styled.div`
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	width: 100%;
	padding-bottom: 4.0625rem;
`;
const UserInfo = styled.div`
	padding: 1.25rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	border-top: 1px solid #f4f4f4;
	border-bottom: 1px solid #f4f4f4;
	margin-top: 1rem;
`;
const UserTextWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 0.625rem;
`;
const FollowButton = styled.div`
	padding: 10px 16px;
	border-radius: 30.4px;
	border: solid 1px #9e30f4;
	background-color: ${props => (props.follow ? '#fff' : '#9e30f4')};
	color: ${props => (props.follow ? '#9e30f4' : '#fff')};
	font-size: 0.875rem;
	font-weight: 600;
`;
const Left = styled.div`
	display: flex;
	align-items: center;
`;
