import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Slider from 'react-slick';
import { customApiClient } from '../../utils/apiClient';

import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';

import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import { GridImage } from '../../components/GridItems/GridImage';
import { GridItem } from '../../components/GridItems/GridItem';
import { ImageText } from '../../components/ImageText';

import { ReactComponent as EditButton } from '../../assets/Icons/threedot_Black.svg';
import { ReactComponent as ShareButton } from '../../assets/Icons/Share.svg';
import { ReactComponent as AddItem } from '../../assets/Icons/addItem.svg';
import { ReactComponent as BinderGrey } from '../../assets/Icons/binderGrey.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as LikeButtonGrey } from '../../assets/Icons/likeButton.svg';
import { ReactComponent as LikeButtonRed } from '../../assets/Icons/likeButtonRed.svg';

import { ReactComponent as ItemLinkIcon } from '../../assets/Icons/itemLinkIcon.svg';
import { ReactComponent as PurpleRightArrow } from '../../assets/Icons/purple_rightArrow.svg';
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
	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
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

	const [itemInfo, setItemInfo] = useState([]);
	const [sameCelebItemList, setsameCelebItemList] = useState([]);
	const [otherUserDibItemList, setotherUserDibItemList] = useState([]);
	const [sameBrandItemList, setsameBrandItemList] = useState([]);

	const [isDib, setIsDib] = useState();
	const [dibCnt, setDibCnt] = useState();
	const [isLike, setIsLike] = useState();
	const [likeCnt, setLikeCnt] = useState();
	const [isFollow, setIsFollow] = useState();
	const onClickDib = () => {
		if (isDib) {
			setDibCnt(dibCnt - 1);
		} else {
			setDibCnt(dibCnt + 1);
		}
		setIsDib(!isDib);
	};
	const onClickLike = () => {
		if (isLike) {
			if (likeCnt === 1) {
				setLikeCnt(0);
			} else {
				setLikeCnt(likeCnt - 1);
			}
			UnLikeItem(itemInfo.itemIdx);
		} else {
			setLikeCnt(likeCnt + 1);
			LikeItem(itemInfo.itemIdx);
		}
		setIsLike(!isLike);
	};
	const onClickFollow = () => {
		if (isFollow) {
			//	언팔 API
			UnFollowUser(itemInfo.uploaderIdx);
		} else {
			// 팔로우 API
			FollowUser(itemInfo.uploaderIdx);
		}
		setIsFollow(!isFollow);
	};

	const getItemInfo = async () => {
		const data = await customApiClient('get', `/items/${itemIdx}`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log(data.result);
		setItemInfo(data.result.itemInfo);
		setsameCelebItemList(data.result.sameCelebItemList);
		setotherUserDibItemList(data.result.otherUserDibItemList);
		setsameBrandItemList(data.result.sameBrandItemList);
		if (data.result.itemInfo.isDib === 'Y') setIsDib(true);
		else setIsDib(false);
		if (data.result.itemInfo.isLike === 'Y') setIsLike(true);
		else setIsLike(false);
		if (data.result.itemInfo.isFollow === 'Y') setIsFollow(true);
		else setIsFollow(false);
		setDibCnt(data.result.itemInfo.dibCnt);
		setLikeCnt(data.result.itemInfo.itemLikeCnt);
	};
	const FollowUser = async userIdx => {
		// 팔로우 버튼 클릭
		const data = await customApiClient('post', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('FollowUser', data.message);
		// console.log('userRecommendList', userRecommendList);
	};
	const UnFollowUser = async userIdx => {
		// 팔로잉 버튼 클릭(언팔)
		const data = await customApiClient('delete', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('UnFollowUser', data.message);
	};
	const LikeItem = async itemIdx => {
		// 좋아요 버튼 클릭
		const data = await customApiClient('post', `/items/${itemIdx}/likes`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('LikeItem', data.message);
		// console.log('userRecommendList', userRecommendList);
	};
	const UnLikeItem = async itemIdx => {
		// 좋아요 해제
		const data = await customApiClient('patch', `/items/${itemIdx}/likes`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('UnLikeItem', data.message);
		// console.log('userRecommendList', userRecommendList);
	};
	useEffect(() => {
		// 하단바 띄워주기
		getItemInfo();
		setBottomNavStatus(false);
	}, []);
	return (
		<MainContainer padding="0 0 0 0">
			{itemInfo.isMe === 'Y' ? (
				<BottomSlideMenu>
					<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onReportPost}>
						수정하기
					</SubText>
					<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onReportUser}>
						삭제하기
					</SubText>
				</BottomSlideMenu>
			) : (
				<BottomSlideMenu>
					<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onReportPost}>
						수정 요청하기
					</SubText>
					<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onReportUser}>
						게시글 신고하기
					</SubText>
					<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onReportUser}>
						'{itemInfo.nickName}'님 신고하기
					</SubText>
				</BottomSlideMenu>
			)}

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
			{itemInfo && (
				<FeedContainer>
					<ImageContainer>
						{itemInfo.itemImgList && (
							<Slider {...settings}>
								{itemInfo.itemImgList.map(itemImg => (
									<Image src={itemImg.itemImgUrl}></Image>
								))}
							</Slider>
						)}
					</ImageContainer>

					<ItemInfoContainer>
						<SubText fontsize="1rem" fontweight="bold" color="#9E30F4">
							{itemInfo.celebName}&nbsp;{itemInfo.memberName}
						</SubText>
						<MainText fontsize="1.25rem" margin="0.75rem 0 0.375rem 0">
							{itemInfo.brandKr}
						</MainText>
						<SubText fontsize="1rem" fontweight="600" margin="0 0 0.75rem 0">
							{itemInfo.itemName}
						</SubText>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<SubText fontweight="normal">
								{itemInfo.parentCategory} {'>'} {itemInfo.subCategory}
							</SubText>
							<Dot></Dot>
							<SubText fontweight="normal">{itemInfo.uploadTime}</SubText>
						</div>
					</ItemInfoContainer>
					<ItemInfoContainer backgroundColor="#F8F7FA" padding="2rem">
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<UserImage src={itemInfo.profileImgUrl}></UserImage>
							<SubText fontsize="0.875rem" fontweight="600" margin="0 0 0 0.375rem">
								{itemInfo.nickName}
							</SubText>
						</div>
						<SpeechBubbleWrap
							borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
							backgroundColor="rgba(0, 0, 0, 0.05)"
							style={{ margin: '0.625rem 0 0 0' }}
						>
							{itemInfo.whenDiscovery} 에
						</SpeechBubbleWrap>
						<SpeechBubbleWrap
							borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
							backgroundColor="rgba(0, 0, 0, 0.05)"
							style={{ margin: '0.625rem 0 0 0' }}
						>
							{itemInfo.whereDiscovery}에서 발견하였고
						</SpeechBubbleWrap>
						<SpeechBubbleWrap
							borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
							backgroundColor="rgba(0, 0, 0, 0.05)"
							style={{ margin: '0.625rem 0 0 0' }}
						>
							가격은 대략 {itemInfo.price}에요!
						</SpeechBubbleWrap>
						{itemInfo.content && (
							<SpeechBubbleWrap
								borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
								backgroundColor="rgba(0, 0, 0, 0.05)"
								style={{ margin: '0.625rem 0 0 0' }}
							>
								{itemInfo.content}
							</SpeechBubbleWrap>
						)}
					</ItemInfoContainer>
					{itemInfo.sellerSite && (
						<ItemLInkContainer>
							<ItemLInkWrap>
								<ItemLinkIcon
									style={{ width: '2.875rem', height: '2.875rem' }}
								></ItemLinkIcon>
								<ItemTextWrap>
									<SubText fontsize="0.875rem">
										어디서 구매할 수 있는지 알려드릴게요!
									</SubText>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											marginTop: '6px',
										}}
									>
										<SubText color="#9E30F4">
											해당 아이템 판매 사이트로 이동
										</SubText>
										<PurpleRightArrow
											style={{ width: '0.875rem', height: '0.875rem' }}
										></PurpleRightArrow>
									</div>
								</ItemTextWrap>
							</ItemLInkWrap>
						</ItemLInkContainer>
					)}

					<UserInfo>
						<Left>
							<UserImage size="3.25rem" src={itemInfo.profileImgUrl}></UserImage>
							<UserTextWrap>
								{itemInfo.isMe === 'Y' ? (
									<SubText
										font-weight="600"
										font-size="0.875rem"
										margin="0 0 0.25rem 0"
									>
										{itemInfo.nickName}
										<SubText
											font-weight="600"
											font-size="0.875rem"
											margin="0 0 0.25rem 0"
											color="#8D8D8D"
										>
											(me)
										</SubText>
									</SubText>
								) : (
									<SubText
										font-weight="600"
										font-size="0.875rem"
										margin="0 0 0.25rem 0"
									>
										{itemInfo.nickName}
									</SubText>
								)}

								<SubText font-weight="600" font-size="0.875rem">
									{itemInfo.id}
								</SubText>
							</UserTextWrap>
						</Left>
						{itemInfo.isMe === 'N' ? (
							<>
								{isFollow ? (
									<FollowButton onClick={onClickFollow} follow={isFollow}>
										팔로잉
									</FollowButton>
								) : (
									<FollowButton onClick={onClickFollow} follow={isFollow}>
										팔로우
									</FollowButton>
								)}
							</>
						) : (
							<></>
						)}
					</UserInfo>
					{sameCelebItemList.length > 0 && (
						<MyUploadWrap>
							<div className="titleWrap">
								<MainText style={{ fontWeight: '600' }} fontsize="1.125rem">
									같은 셀럽의 아이템
								</MainText>
							</div>
							<div className="contentWrap">
								{sameCelebItemList.map(item => (
									<MyPageGridItem
										key={item.itemIdx}
										onClick={() => onDetailItemClick(item.itemIdx)}
									>
										<GridImage>
											<ImageText>
												<SubText
													fontsize="0.8125rem"
													fontweight="bold"
													color="white"
												>
													{item.name}'s
												</SubText>
												<BinderWhite
													style={{
														width: '1.375rem',
														height: '1.375rem',
													}}
												/>
											</ImageText>
										</GridImage>
										<SubText
											fontsize="1rem"
											fontweight="bold"
											margin="0 0 0.375rem 0 "
										>
											{item.brandKr}
										</SubText>
										<SubText
											style={{
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												width: '100%',
											}}
										>
											{item.itemName}
										</SubText>
									</MyPageGridItem>
								))}
							</div>
						</MyUploadWrap>
					)}
					{otherUserDibItemList.length > 0 && (
						<MyUploadWrap>
							<div className="titleWrap">
								<MainText style={{ fontWeight: '600' }} fontsize="1.125rem">
									다른 스러버들이 함께 보관한 아이템
								</MainText>
							</div>
							<div className="contentWrap">
								{otherUserDibItemList.map(item => (
									<MyPageGridItem
										key={item.itemIdx}
										onClick={() => onDetailItemClick(item.itemIdx)}
									>
										<GridImage>
											<ImageText>
												<SubText
													fontsize="0.8125rem"
													fontweight="bold"
													color="white"
												>
													{item.name}'s
												</SubText>
												<BinderWhite
													style={{
														width: '1.375rem',
														height: '1.375rem',
													}}
												/>
											</ImageText>
										</GridImage>
										<SubText
											fontsize="1rem"
											fontweight="bold"
											margin="0 0 0.375rem 0 "
										>
											{item.brandKr}
										</SubText>
										<SubText
											style={{
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												width: '100%',
											}}
										>
											{item.itemName}
										</SubText>
									</MyPageGridItem>
								))}
							</div>
						</MyUploadWrap>
					)}
					{sameBrandItemList.length > 0 && (
						<MyUploadWrap>
							<div className="titleWrap">
								<MainText style={{ fontWeight: '600' }} fontsize="1.125rem">
									같은 브랜드의 아이템
								</MainText>
							</div>
							<div className="contentWrap">
								{sameBrandItemList.map(item => (
									<MyPageGridItem
										key={item.itemIdx}
										onClick={() => onDetailItemClick(item.itemIdx)}
									>
										<GridImage src={item.itemImgUrl}>
											<ImageText>
												<SubText
													fontsize="0.8125rem"
													fontweight="bold"
													color="white"
												>
													{item.name}'s
												</SubText>
												<BinderWhite
													style={{
														width: '1.375rem',
														height: '1.375rem',
													}}
												/>
											</ImageText>
										</GridImage>
										<SubText
											fontsize="1rem"
											fontweight="bold"
											margin="0 0 0.375rem 0 "
										>
											{item.brandKr}
										</SubText>
										<SubText
											style={{
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												width: '100%',
											}}
										>
											{item.itemName}
										</SubText>
									</MyPageGridItem>
								))}
							</div>
						</MyUploadWrap>
					)}
				</FeedContainer>
			)}

			<BottomNavWrap openStatus={true}>
				<AlignDiv>
					{isDib ? (
						<BinderRed
							onClick={onClickDib}
							style={{
								width: '1.5rem',
								height: '1.5rem',
								marginRight: '0.375rem',
							}}
						></BinderRed>
					) : (
						<BinderGrey
							onClick={onClickDib}
							style={{
								width: '1.5rem',
								height: '1.5rem',
								marginRight: '0.375rem',
							}}
						></BinderGrey>
					)}
					<SubText fontsize="0.875rem" color="#9E30F4">
						{dibCnt} 명
					</SubText>
					<SubText fontsize="0.875rem">이 바인더에 보관했어요</SubText>
				</AlignDiv>
				<AlignDiv>
					{isLike ? (
						<LikeButtonRed
							onClick={onClickLike}
							style={{
								width: '1.5rem',
								height: '1.5rem',
							}}
						></LikeButtonRed>
					) : (
						<LikeButtonGrey
							onClick={onClickLike}
							style={{
								width: '1.5rem',
								height: '1.5rem',
							}}
						></LikeButtonGrey>
					)}

					<SubText fontsize="0.875rem" margin="0 0 0 0.25rem">
						{likeCnt}
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
	background-image: url(${props => props.src});
	background-size: cover;
	background-position: 50%;
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
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	background-image: url(${props => props.src});
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

const MyUploadWrap = styled.div`
	margin-bottom: 1.875rem;

	.titleWrap {
		padding: 0 1.25rem;
		display: flex;
		justify-content: space-between;
		margin-top: 1.25rem;
		margin-bottom: 0.875rem;
	}
	.contentWrap {
		display: flex;
		flex-direction: row;
		padding-left: 1.25rem;

		overflow-x: auto;
		::-webkit-scrollbar {
			display: none; /* for Chrome, Safari, and Opera */
		}
	}
`;

const ItemLInkContainer = styled.div`
	padding: 1.25rem;
`;
const ItemLInkWrap = styled.div`
	display: flex;
	padding: 1.25rem 1.625rem;
	flex-direction: row;
	justify-content: space-between;
	border: 1px solid #ebebeb;
	border-radius: 1rem;
`;
const ItemTextWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* align-items: center;/ */
`;
const MyPageGridItem = styled.div`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 0.6875rem;
`;
