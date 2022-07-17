import React, { useEffect, useState, useRef } from 'react';
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
import { GridImage } from '../../components/GridItems/GridImage';
import { GridItem } from '../../components/GridItems/GridItem';
import { ImageText } from '../../components/ImageText';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { ReactComponent as UserBasicProfileImg } from '../../assets/Icons/user_basic_profile_img.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import { ReactComponent as EditButton } from '../../assets/Icons/threedot_Black.svg';
import { ReactComponent as ShareButton } from '../../assets/Icons/Share.svg';
import { ReactComponent as PlusButton } from '../../assets/Icons/plusButton.svg';
import { ReactComponent as BinderGrey } from '../../assets/Icons/binderGrey.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as LikeButtonGrey } from '../../assets/Icons/likeButton.svg';
import { ReactComponent as LikeButtonRed } from '../../assets/Icons/likeButtonRed.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';

import { ReactComponent as ItemLinkIcon } from '../../assets/Icons/itemLinkIcon.svg';
import { ReactComponent as PurpleRightArrow } from '../../assets/Icons/purple_rightArrow.svg';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import {
	BottomDialogDiv,
	BottomDialogWrap,
	BottomSlideMenu,
	CloseWrap,
} from '../../components/containers/BottomSlideMenu';
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import Loading from '../../components/Loading';
import CopyToClipboard from 'react-copy-to-clipboard';

export default function ItemDetail() {
	let { itemIdx } = useParams();
	const navigate = useNavigate();
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);
	const [myUserIdx, setMyUserIdx] = useState(false);

	const [reportDialogStatus, setReportDialogStatus] = useState(false);

	const onReportPost = () => {
		navigate('/report/post');
	};
	const onReportUser = () => {
		navigate('/report/user');
	};
	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
		// window.location.reload();
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

	const [sameCelebItemIsDibList, setSameCelebItemIsDibList] = useState([]);
	const [otherUserDibItemIsDibList, setOtherUserDibItemIsDibList] = useState([]);
	const [sameBrandItemIsDibList, setSameBrandItemIsDibList] = useState([]);

	const [isDib, setIsDib] = useState();
	const [dibCnt, setDibCnt] = useState();
	const [isLike, setIsLike] = useState();
	const [likeCnt, setLikeCnt] = useState();
	const [isFollow, setIsFollow] = useState();

	// const myRef = useRef(null);
	// const scrollToRef = ref => ref.current.scrollIntoView({ behavior: 'smooth' });
	// const executeScroll = () => scrollToRef(myRef);
	const onClickUserProfile = idx => {
		navigate(`/users/${idx}`);
	};
	const [openState, setOpenState] = useState(false); // 바인더 클릭 시 하단바 status
	const [binderList, setBinderList] = useState([]);
	const getBinderList = async () => {
		const data = await customApiClient('get', '/binders');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setBinderList(data.result);
		console.log('바인더 리스트', data.result);
	};
	const onCreateBinder = itemIdx => {
		navigate('/binder/add', {
			state: { item: itemIdx },
		});
		setBottomMenuStatusState(false);
	};
	const getOpenStatus = input => {
		setOpenState(input);
	};

	// 아이템 하단의 추천 아이템 바인더 버튼
	const [selectedItemIdx, setSelectedItemIdx] = useState(0);
	const onAddEachBinderClick = (e, itemIdx) => {
		e.stopPropagation();
		getBinderList();
		setOpenState(true);
		setSelectedItemIdx(itemIdx);
	};
	// 하단바 바인더 버튼
	const onAddBinderClick = () => {
		getBinderList();
		setOpenState(true);
		setSelectedItemIdx(itemInfo.itemIdx);
	};
	const onSelectBinder = (binderIdx, itemIdx) => {
		console.log('셀렉트 바인더', itemIdx);
		for (var i = 0; i < binderList.length; i++) {
			if (binderList[i].binderIdx === binderIdx) {
				if (itemIdx === itemInfo.itemIdx) {
					console.log('해당 아이템');
					addToBinderAPI(itemInfo.itemIdx, binderIdx, binderList[i].name);
				} else {
					console.log('추천된 아이템');
					addToBinderAPI(itemIdx, binderIdx, binderList[i].name);
				}
			}
		}
	};

	const onDeleteBinderClick = (e, itemIdx) => {
		e.stopPropagation();
		DeleteFromBinderAPI(itemIdx);
	};

	async function addToBinderAPI(itemIdx, binderIdx, binderName) {
		const body = {
			itemIdx: itemIdx,
			binderIdx: binderIdx,
		};
		console.log(body);
		const Uri = '/dibs';
		const data = await customApiClient('post', Uri, body);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		var tmp = sameCelebItemIsDibList;
		for (var i = 0; i < sameCelebItemIsDibList.length; i++) {
			if (sameCelebItemList[i]) {
				if (sameCelebItemList[i].itemIdx === itemIdx) {
					tmp[i] = !tmp[i];
					setSameCelebItemIsDibList([...tmp]);
				}
			}
		}
		tmp = otherUserDibItemIsDibList;
		for (var j = 0; j < otherUserDibItemIsDibList.length; j++) {
			if (otherUserDibItemList[j]) {
				if (otherUserDibItemList[j].itemIdx === itemIdx) {
					tmp[j] = !tmp[j];
					setOtherUserDibItemIsDibList([...tmp]);
				}
			}
		}
		tmp = sameBrandItemIsDibList;
		for (var k = 0; k < sameBrandItemIsDibList.length; k++) {
			if (sameBrandItemList[k]) {
				if (sameBrandItemList[k].itemIdx === itemIdx) {
					tmp[k] = !tmp[k];
					setSameBrandItemIsDibList([...tmp]);
				}
			}
		}
		setIsDib(!isDib);
		setDibCnt(dibCnt + 1);
		setOpenState(false);
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`아이템이 ${binderName} 바인더에 저장됐어요`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	}
	async function DeleteFromBinderAPI(itemIdx) {
		const Uri = `/dibs/${itemIdx}`;
		const data = await customApiClient('delete', Uri);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('바인더에서 삭제 data.isSuccess', data.isSuccess);
		var tmp = sameCelebItemIsDibList;
		for (var i = 0; i < sameCelebItemIsDibList.length; i++) {
			if (sameCelebItemList[i]) {
				if (sameCelebItemList[i].itemIdx === itemIdx) {
					tmp[i] = !tmp[i];
					setSameCelebItemIsDibList([...tmp]);
				}
			}
		}
		tmp = otherUserDibItemIsDibList;
		for (var j = 0; j < otherUserDibItemIsDibList.length; j++) {
			if (otherUserDibItemList[j]) {
				if (otherUserDibItemList[j].itemIdx === itemIdx) {
					tmp[j] = !tmp[j];
					setOtherUserDibItemIsDibList([...tmp]);
				}
			}
		}
		tmp = sameBrandItemIsDibList;
		for (var k = 0; k < sameBrandItemIsDibList.length; k++) {
			if (sameBrandItemList[k]) {
				if (sameBrandItemList[k].itemIdx === itemIdx) {
					tmp[k] = !tmp[k];
					setSameBrandItemIsDibList([...tmp]);
				}
			}
		}

		setIsDib(!isDib);
		setDibCnt(dibCnt - 1);
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`아이템이 바인더에서 삭제됐어요`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	}

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
		let uri = ``;
		if (myUserIdx) {
			uri = `/items/${itemIdx}?userIdx=${myUserIdx}`;
		} else {
			uri = `/items/${itemIdx}`;
		}
		const data = await customApiClient('get', uri);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		// 아이템 정보 저장
		setItemInfo(data.result.itemInfo);
		// 아이템 바인더 저장 여부
		if (data.result.itemInfo.isDib === 'Y') setIsDib(true);
		else setIsDib(false);
		// 아이템 좋아요 여부
		if (data.result.itemInfo.isLike === 'Y') setIsLike(true);
		else setIsLike(false);
		// 아이템 작성자 팔로우 여부
		if (data.result.itemInfo.isFollow === 'Y') setIsFollow(true);
		else setIsFollow(false);
		// 아이템 바인더 저장 횟수
		setDibCnt(data.result.itemInfo.dibCnt);
		// 아이템 좋아요 횟수
		setLikeCnt(data.result.itemInfo.itemLikeCnt);

		// 같은 셀럽의 아이템 저장 / 바인더 저장 여부 isDib
		setsameCelebItemList(data.result.sameCelebItemList);
		var tmp = [];
		for (var i = 0; i < data.result.sameCelebItemList.length; i++) {
			if (data.result.sameCelebItemList[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		setSameCelebItemIsDibList([...tmp]);
		// 다른 스러버들이 함께 보관한 아이템 저장 / 바인더 저장 여부 isDib
		setotherUserDibItemList(data.result.otherUserDibItemList);
		tmp = [];
		for (var j = 0; j < data.result.otherUserDibItemList.length; j++) {
			if (data.result.otherUserDibItemList[j].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		setOtherUserDibItemIsDibList([...tmp]);
		// 같은 브랜드의 아이템 저장 / 바인더 저장 여부 isDib
		setsameBrandItemList(data.result.sameBrandItemList);
		tmp = [];
		for (var k = 0; k < data.result.sameBrandItemList.length; k++) {
			if (data.result.sameBrandItemList[k].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		setSameBrandItemIsDibList([...tmp]);
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
	const onClickShareButton = e => {
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`해당 게시글 링크를 복사했어요. 널리널리 퍼뜨려주세요!`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	};
	useEffect(() => {
		setMyUserIdx(localStorage.getItem('myUserIdx'));
	}, []);

	useEffect(() => {
		// 하단바 띄워주기
		
		getItemInfo();
		setBottomNavStatus(false);
	}, [itemIdx, myUserIdx]);

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

			<TopNav
				style={{
					justifyContent: 'space-between',
				}}
			>
				<BackButton onClick={() => navigate(-1)} />
				<div className="rightText">
					<CopyToClipboard text={`https://www.sluv.co.kr/item/detail/${itemIdx}`}>
						<ShareButton
							onClick={onClickShareButton}
							style={{ width: '1.5rem', height: '1.5rem', marginRight: '1.25rem' }}
						></ShareButton>
					</CopyToClipboard>
					<EditButton
						onClick={() => setReportDialogStatus(true)}
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
									<Image key={itemImg} src={itemImg.itemImgUrl}></Image>
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
					<ItemInfoContainer
						style={{ display: 'block' }}
						backgroundColor="#F8F7FA"
						padding="2rem"
					>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							{itemInfo.profileImgUrl ? (
								<UserImage src={itemInfo.profileImgUrl}></UserImage>
							) : (
								<UserBasicProfileImg
									style={{ width: '1.5rem', height: '1.5rem' }}
								></UserBasicProfileImg>
							)}

							<SubText fontsize="0.875rem" fontweight="600" margin="0 0 0 0.375rem">
								{itemInfo.nickName}
							</SubText>
						</div>
						<div>
							<SpeechBubbleWrap
								borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
								backgroundColor="rgba(0, 0, 0, 0.05)"
								style={{ margin: '0.625rem 0 0 0' }}
							>
								<div className="itemDetailText">
									<span className="itemDetailTextBold">
										{itemInfo.whenDiscovery}
									</span>
									에
								</div>
							</SpeechBubbleWrap>
						</div>
						<div>
							<SpeechBubbleWrap
								borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
								backgroundColor="rgba(0, 0, 0, 0.05)"
								style={{ margin: '0.625rem 0 0 0' }}
							>
								<div className="itemDetailText">
									<span className="itemDetailTextBold">
										{itemInfo.whereDiscovery}
									</span>
									에서 발견하였고
								</div>
							</SpeechBubbleWrap>
						</div>
						<div>
							<SpeechBubbleWrap
								borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
								backgroundColor="rgba(0, 0, 0, 0.05)"
								style={{ margin: '0.625rem 0 0 0' }}
							>
								<div className="itemDetailText">
									가격은 대략
									<span className="itemDetailTextBold"> {itemInfo.price}</span>
									에요!
								</div>
							</SpeechBubbleWrap>
						</div>
						<div>
							{itemInfo.content && (
								<SpeechBubbleWrap
									borderRight="0.5rem solid rgba(0, 0, 0, 0.05)"
									backgroundColor="rgba(0, 0, 0, 0.05)"
									style={{ margin: '0.625rem 0 0 0' }}
								>
									<div className="itemDetailText">
										그리고
										<span className="itemDetailTextBold">
											{' '}
											{itemInfo.content}
										</span>
									</div>
								</SpeechBubbleWrap>
							)}
						</div>
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
						<Left onClick={() => onClickUserProfile(itemInfo.uploaderIdx)}>
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
								{sameCelebItemList.map((item, index) => (
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
												{sameCelebItemIsDibList[index] === true ? (
													<BinderRed
														onClick={e =>
															onDeleteBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												) : (
													<BinderWhite
														onClick={e =>
															onAddEachBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												)}
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
								{otherUserDibItemList.map((item, index) => (
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
												{otherUserDibItemIsDibList[index] === true ? (
													<BinderRed
														onClick={e =>
															onDeleteBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												) : (
													<BinderWhite
														onClick={e =>
															onAddEachBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												)}
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
								{sameBrandItemList.map((item, index) => (
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
												{sameBrandItemIsDibList[index] === true ? (
													<BinderRed
														onClick={e =>
															onDeleteBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												) : (
													<BinderWhite
														onClick={e =>
															onAddEachBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												)}
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
							onClick={e => onDeleteBinderClick(e, itemInfo.itemIdx)}
							style={{
								width: '1.5rem',
								height: '1.5rem',
								marginRight: '0.375rem',
							}}
						></BinderRed>
					) : (
						<BinderGrey
							onClick={() => onAddBinderClick(itemInfo.itemIdx)}
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
			<BottomSlideMenu open={openState} getOpenStatus={getOpenStatus}>
				<RowWrap onClick={() => onCreateBinder(selectedItemIdx)}>
					<ImageWrap>
						<PlusButton></PlusButton>
					</ImageWrap>
					<SubText fontsize="1rem" margin="0.9375rem 0">
						바인더 만들기
					</SubText>
				</RowWrap>
				<HorizontalLine></HorizontalLine>
				{binderList.map(binder => (
					<RowWrap
						key={binder.name}
						onClick={() => onSelectBinder(binder.binderIdx, selectedItemIdx)}
					>
						<ImageWrap></ImageWrap>
						<SubText fontsize="1rem" margin="0.9375rem 0">
							{binder.name}
						</SubText>
						<SubText fontweight="normal" fontsize="1rem" color="#8d8d8d">
							&nbsp;({binder.dibCount})
						</SubText>
					</RowWrap>
				))}
			</BottomSlideMenu>

			<BottomDialogWrap openStatus={reportDialogStatus}>
				<div
					onClick={() => setReportDialogStatus(false)}
					style={{ height: '100%', width: '100%' }}
				></div>
				<BottomDialogDiv openStatus={reportDialogStatus}>
					<CloseWrap>
						<Close
							style={{
								width: '1.5rem',
								height: '1.5rem',
								position: 'absolute',
								right: '1.25rem',
							}}
							onClick={() => setReportDialogStatus(false)}
						></Close>
					</CloseWrap>
					<div style={{ fontSize: '1rem', padding: '1.5rem 1.25rem' }}>
						<div
							style={{ paddingBottom: '1.875rem' }}
							onClick={() => navigate(`/report/comment/${itemIdx}`)}
						>
							수정 요청하기
						</div>
						<div
							style={{ paddingBottom: '1.875rem' }}
							onClick={() => navigate(`/report/post/${itemIdx}`)}
						>
							게시글 신고하기
						</div>
						<div onClick={() => navigate(`/report/user/${itemInfo.uploaderIdx}`)}>
							'{itemInfo.nickName}'님 신고하기
						</div>
					</div>
				</BottomDialogDiv>
			</BottomDialogWrap>
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
	position: relative;
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
const RowWrap = styled.div`
	display: flex;
	width: 100%;
	padding: 0 1.25rem;
	margin-bottom: 1rem;
	box-sizing: border-box;
	text-align: center;
	align-items: center;
`;
const ImageWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.75rem;
	height: 3.75rem;
	background-color: #f6f6f6;
	border-radius: 0.8125rem;
	margin-right: 1.25rem;
`;
