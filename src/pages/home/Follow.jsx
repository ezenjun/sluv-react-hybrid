import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { customApiClient } from '../../utils/apiClient';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { LargeViewWrap } from '../../components/LargeViewWrap/LargeViewWrap';
import { LargeViewItem } from '../../components/LargeViewWrap/LargeViewItem';
import { LargeViewImage } from '../../components/LargeViewWrap/LargeViewImage';
import { ImageText } from '../../components/ImageText';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { ReactComponent as UserBasicProfileImg } from '../../assets/Icons/user_basic_profile_img.svg';
import { ReactComponent as PlusButton } from '../../assets/Icons/plusButton.svg';
import { ReactComponent as NoFollowerIcon } from '../../assets/Icons/noFollower.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';

import { ReactComponent as PinkBinder } from '../../assets/Binder/PinkBinder.svg';
import { ReactComponent as YellowBinder } from '../../assets/Binder/YellowBinder.svg';
import { ReactComponent as GreenBinder } from '../../assets/Binder/GreenBinder.svg';
import { ReactComponent as BlueBinder } from '../../assets/Binder/BlueBinder.svg';
import { ReactComponent as ScrollTop } from '../../assets/Icons/scrollToTop.svg';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../components/Lines/VerticalLine';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import Loading from '../../components/Loading';
export default function Follow() {
	const navigate = useNavigate();
	const [followItemList, setFollowItemList] = useState([]);
	const [sameFollowSluverList, setSameFollowSluverList] = useState([]);

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const onClickUserProfile = idx => {
		navigate(`/users/${idx}`);
	};
	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
		// window.location.reload();
	};
	const [binderList, setBinderList] = useState([]);
	const getBinderList = async () => {
		const data = await customApiClient('get', '/binders');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setBinderList(data.result);
	};
	const [openState, setOpenState] = useState(false);
	const onCreateBinder = itemIdx => {
		navigate('/binder/add', {
			state: { item: itemIdx },
		});
	};
	const [selectedItemIdx, setSelectedItemIdx] = useState(0);

	const [latestIsBinderList, setLatestIsBinderList] = useState([]);
	const onAddBinderClick = (e, itemIdx) => {
		e.stopPropagation();
		getBinderList();
		setOpenState(true);
		setSelectedItemIdx(itemIdx);
		// setBottomMenuStatusState(true);
	};
	const getOpenStatus = input => {
		setOpenState(input);
	};
	// console.log('셀렉트아이템인덱스', selectedItemIdx);
	const onSelectBinder = binderIdx => {
		for (var i = 0; i < binderList.length; i++) {
			if (binderList[i].binderIdx === binderIdx) {
				addToBinderAPI(selectedItemIdx, binderIdx, binderList[i].name);
			}
		}
	};
	const onDeleteBinderClick = (itemIdx, e) => {
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
		console.log('latestIsBinderList', latestIsBinderList);
		let tempLatest = latestIsBinderList;
		for (var i = 0; i < latestIsBinderList.length; i++) {
			if (followItemList[i]) {
				if (followItemList[i].itemIdx === selectedItemIdx) {
					tempLatest[i] = !tempLatest[i];
					setLatestIsBinderList([...tempLatest]);
				}
			}
		}
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
		let tempLatest = latestIsBinderList;
		for (var i = 0; i < latestIsBinderList.length; i++) {
			if (followItemList[i]) {
				if (followItemList[i].itemIdx === itemIdx) {
					tempLatest[i] = !tempLatest[i];
					setLatestIsBinderList([...tempLatest]);
					console.log('clicked');
				}
			}
		}
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
	const [loading, setLoading] = useState(true);
	const getFollowItemList = async () => {
		const data = await customApiClient('get', `/homes/items/followers?page=1&pageSize=20`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			setLoading(false);
			return;
		}
		let temp = data.result;
		setFollowItemList([...temp]);
		var tmp = [];
		for (var i = 0; i < data.result.length; i++) {
			if (data.result[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		setLatestIsBinderList([...tmp]);
		setLoading(false);
	};
	const getSameFollowSluverList = async () => {
		const data = await customApiClient('get', `/homes/similar-users`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		let temp = data.result;
		setSameFollowSluverList([...temp]);
	};
	const onFollow = userIdx => {
		FollowUser(userIdx);
		let tempList = sameFollowSluverList;
		// let length = userRecommendList.length;
		for (var i = 0; i < tempList.length; i++) {
			if (tempList[i].userIdx === userIdx) {
				if (tempList[i].isFollow === 'N') {
					tempList[i].isFollow = 'Y';
					setSameFollowSluverList([...tempList]);
				}
			}
		}
	};
	const onUnFollow = userIdx => {
		UnFollowUser(userIdx);
		let tempList = sameFollowSluverList;
		for (var i = 0; i < tempList.length; i++) {
			if (tempList[i].userIdx === userIdx) {
				console.log('tempList[i].isFollow', tempList[i].isFollow);
				if (tempList[i].isFollow === 'Y') {
					tempList[i].isFollow = 'N';
					setSameFollowSluverList([...tempList]);
				}
			}
		}
		// setSameFollowSluverList([...tempList]);
	};
	const FollowUser = async userIdx => {
		// 팔로우 버튼 클릭
		const data = await customApiClient('post', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
	};
	const UnFollowUser = async userIdx => {
		// 팔로잉 버튼 클릭(언팔)
		const data = await customApiClient('delete', `/users/${userIdx}/follow`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
	};
	const scrollRef = useRef();
	const scrollToRef = ref =>
		ref.current.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	const executeScroll = () => {
		scrollToRef(scrollRef);
	};
	const [showTopBtn, setShowTopBtn] = useState(false);

	useEffect(() => {
		getSameFollowSluverList();
		getFollowItemList();
		scrollRef.current.addEventListener('scroll', () => {
			if (scrollRef.current.scrollTop > 100) {
				setShowTopBtn(true);
			} else {
				setShowTopBtn(false);
			}
		});
	}, []);

	return (
		<FeedContainer ref={scrollRef}>
			<>
				{!loading ? (
					<>
						{followItemList.length > 0 ? (
							<>
								<LargeViewWrap padding="0 20px 40px 20px">
									{showTopBtn ? (
										<ScrollTop
											onClick={executeScroll}
											style={{
												position: 'fixed',
												bottom: '4.375rem',
												right: '0.75rem',
												width: '3.125rem',
												height: '3.125rem',
												visibility: 'visible',
												transition:
													'visibility 0s linear 0s, opacity 300ms',
												opacity: '1',
											}}
										></ScrollTop>
									) : (
										<ScrollTop
											onClick={executeScroll}
											style={{
												position: 'fixed',
												bottom: '4.375rem',
												right: '0.75rem',
												width: '3.125rem',
												height: '3.125rem',
												visibility: 'hidden',
												transition:
													'visibility 0s linear 300ms, opacity 300ms',
												opacity: '0',
											}}
										></ScrollTop>
									)}

									{followItemList.map((item, index) => (
										<div
											key={item.itemIdx}
											onClick={() => onDetailItemClick(item.itemIdx)}
										>
											<LargeViewItem>
												<LargeViewImage src={item.itemImgUrl}>
													<ImageText>
														<SubText
															fontsize="0.8125rem"
															fontweight="bold"
															color="white"
														>
															{item.name}'s
														</SubText>
														{latestIsBinderList && (
															<>
																{latestIsBinderList[index] ===
																true ? (
																	<BinderRed
																		onClick={e =>
																			onDeleteBinderClick(
																				item.itemIdx,
																				e
																			)
																		}
																		style={{
																			width: '1.5rem',
																			height: '1.5rem',
																		}}
																	/>
																) : (
																	<BinderWhite
																		onClick={e =>
																			onAddBinderClick(
																				e,
																				item.itemIdx
																			)
																		}
																		style={{
																			width: '1.5rem',
																			height: '1.5rem',
																		}}
																	/>
																)}
															</>
														)}
													</ImageText>
												</LargeViewImage>
												<ItemTextWrap>
													<div
														style={{
															maxWidth: '30%',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
														}}
													>
														<SubText fontsize="1rem">
															{item.brandKr}
														</SubText>
													</div>

													<VerticalLine></VerticalLine>
													<div
														style={{
															maxWidth: '65%',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
														}}
													>
														<SubText fontsize="1rem">
															{item.ItemName}
														</SubText>
													</div>
												</ItemTextWrap>
												<SubInfoWrap>
													{item.profileImgUrl ? (
														<ProfileImg
															src={item.profileImgUrl}
														></ProfileImg>
													) : (
														<UserBasicProfileImg
															style={{
																width: '1.5rem',
																height: '1.5rem',
																marginRight: '0.5rem',
															}}
														></UserBasicProfileImg>
													)}
													<SubText margin="0 "> {item.nickName}</SubText>
													<Dot></Dot>
													<SubText color="#8d8d8d">
														{' '}
														{item.uploadTime}
													</SubText>
												</SubInfoWrap>
											</LargeViewItem>
											<HorizontalLine></HorizontalLine>
										</div>
									))}
								</LargeViewWrap>
								<RecommendUserWrap>
									<TextWrap>
										<MainText fontsize="1.125rem">
											같은 셀럽을 좋아하는 스러버
										</MainText>
									</TextWrap>
									<UserWrap>
										{sameFollowSluverList &&
											sameFollowSluverList.map(sluver => (
												<User
													onClick={() =>
														onClickUserProfile(sluver.userIdx)
													}
													key={sluver.userIdx}
												>
													{sluver.profileImgUrl ? (
														<ProfileImg
															src={sluver.profileImgUrl}
															size="3.875rem"
														></ProfileImg>
													) : (
														<UserBasicProfileImg
															style={{
																width: '3.875rem',
																height: '3.875rem',
																marginRight: '0.5rem',
															}}
														></UserBasicProfileImg>
													)}
													<SubText
														fontsize="0.875rem"
														margin="0.5rem 0 0.25rem 0"
													>
														{sluver.nickName}
													</SubText>
													<SubText color="#8d8d8d">@{sluver.id}</SubText>
													{sluver.isFollow === 'Y' ? (
														<FollowButton
															follow={sluver.isFollow === 'Y'}
															onClick={() =>
																onUnFollow(sluver.userIdx)
															}
														>
															팔로잉
														</FollowButton>
													) : (
														<FollowButton
															follow={sluver.isFollow === 'Y'}
															onClick={() => onFollow(sluver.userIdx)}
														>
															팔로우
														</FollowButton>
													)}
												</User>
											))}
									</UserWrap>
								</RecommendUserWrap>
							</>
						) : (
							<>
								<NoFollow>
									<NoFollowerIcon
										style={{ width: '3.75rem', height: '3.75rem' }}
									></NoFollowerIcon>
									<SubText></SubText>
									<SubText
										color="#262626"
										fontsize="1rem"
										margin="1rem 0 0.5rem 0"
									>
										아직 팔로잉한 스러버가 없네요
									</SubText>
									<SubText color="#8d8d8d" fontsize="0.875rem">
										소통하고 싶은 스러버를 찾아봐요
									</SubText>
								</NoFollow>
								<RecommendFollow>
									<MainText fontsize="18px" margin="0 0 1.625rem 0">
										같은 셀럽을 좋아하는 스러버
									</MainText>
									{sameFollowSluverList ? (
										<>
											{sameFollowSluverList.map(sluver => (
												<RecommendUser key={sluver.userIdx}>
													<UserTop>
														<UserInfo
															onClick={() =>
																onClickUserProfile(sluver.userIdx)
															}
														>
															{sluver.profileImgUrl ? (
																<UserImage
																	src={sluver.profileImgUrl}
																></UserImage>
															) : (
																<UserBasicProfileImg
																	style={{
																		width: '2.25rem',
																		height: '2.25rem',
																		marginRight: '0.5rem',
																	}}
																></UserBasicProfileImg>
															)}
															<UserInfoText>
																<SubText margin="0 ">
																	{' '}
																	{sluver.nickName}
																</SubText>
																<SubInfoWrap>
																	<SubText color="#8d8d8d">
																		@{sluver.id}
																	</SubText>
																	<Dot></Dot>
																	<SubText color="#8d8d8d">
																		{sluver.uploadCnt}개 업로드
																	</SubText>
																</SubInfoWrap>
															</UserInfoText>
														</UserInfo>
														{sluver.isFollow === 'Y' ? (
															<FollowButton
																follow={sluver.isFollow === 'Y'}
																onClick={() =>
																	onUnFollow(sluver.userIdx)
																}
																margintop="0"
															>
																팔로잉
															</FollowButton>
														) : (
															<FollowButton
																follow={sluver.isFollow === 'Y'}
																onClick={() =>
																	onFollow(sluver.userIdx)
																}
																margintop="0"
															>
																팔로우
															</FollowButton>
														)}
													</UserTop>
													<UserBottom
														onClick={() =>
															onClickUserProfile(sluver.userIdx)
														}
													>
														{sluver.itemList && (
															<>
																{sluver.itemList.map(item => (
																	<UploadImage
																		key={item.itemIdx}
																		src={item.itemImgUrl}
																	></UploadImage>
																))}
															</>
														)}
													</UserBottom>
												</RecommendUser>
											))}
										</>
									) : (
										<></>
									)}
								</RecommendFollow>
							</>
						)}
					</>
				) : (
					<div style={{ height: '5rem' }}>
						<Loading></Loading>
					</div>
				)}
			</>

			<BottomSlideMenu open={openState} getOpenStatus={getOpenStatus}>
				<RowWrap
					style={{ marginBottom: '0' }}
					onClick={() => onCreateBinder(selectedItemIdx)}
				>
					<ImageWrap>
						<PlusButton></PlusButton>
					</ImageWrap>
					<SubText fontsize="1rem" margin="0.9375rem 0">
						바인더 만들기
					</SubText>
				</RowWrap>
				<HorizontalLine
					style={{ marginLeft: '1.25rem', marginRight: '1.25rem' }}
				></HorizontalLine>
				<BinderOverflow>
					{binderList.map(binder => (
						<RowWrap key={binder.name} onClick={() => onSelectBinder(binder.binderIdx)}>
							{binder.coverImgUrl ? (
								<ImageWrap src={binder.coverImgUrl}></ImageWrap>
							) : (
								<>
									{!binder.isBasic ? (
										<PinkBinder
											style={{
												width: '3.75rem',
												height: '3.75rem',
												marginRight: '1.25rem',
												borderRadius: '1rem',
											}}
										></PinkBinder>
									) : (
										<>
											{binder.binderIdx % 3 === 0 ? (
												<YellowBinder
													style={{
														width: '3.75rem',
														height: '3.75rem',
														marginRight: '1.25rem',
														borderRadius: '1rem',
													}}
												></YellowBinder>
											) : (
												<>
													{binder.binderIdx % 3 === 1 ? (
														<GreenBinder
															style={{
																width: '3.75rem',
																height: '3.75rem',
																marginRight: '1.25rem',
																borderRadius: '1rem',
															}}
														></GreenBinder>
													) : (
														<BlueBinder
															style={{
																width: '3.75rem',
																height: '3.75rem',
																marginRight: '1.25rem',
																borderRadius: '1rem',
															}}
														></BlueBinder>
													)}
												</>
											)}
										</>
									)}
								</>
							)}
							<SubText fontsize="1rem" margin="0.9375rem 0">
								{binder.name}
							</SubText>
							<SubText fontweight="normal" fontsize="1rem" color="#8d8d8d">
								&nbsp;({binder.dibCount})
							</SubText>
						</RowWrap>
					))}
				</BinderOverflow>
			</BottomSlideMenu>
		</FeedContainer>
	);
}

const FeedContainer = styled.div`
	height: 100%;
	padding: 1.25rem 0 0 0;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const ItemTextWrap = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 1rem 0 0.625rem 0;
	white-space: nowrap;
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const ProfileImg = styled.div`
	width: ${props => props.size || '1.375rem'};
	height: ${props => props.size || '1.375rem'};
	/* width: 1.375rem;
	height: 1.375rem; */
	border-radius: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	background-image: url(${props => props.src});
	margin-right: ${props => props.marginright || '0.5rem'}; ;
`;
const Dot = styled.div`
	width: 0.125rem;
	height: 0.125rem;
	border-radius: 50%;
	background-color: #8d8d8d;
	margin: 0 0.375rem;
`;
const SubInfoWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const NoFollow = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 25.625rem;
`;
const RecommendFollow = styled.div`
	display: flex;
	padding: 0 1.25rem;
	flex-direction: column;
`;
const RecommendUser = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2.25rem;
`;
const UserTop = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
const UserInfo = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const UserImage = styled.div`
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	background-image: url(${props => props.src});
	width: 2.25rem;
	height: 2.25rem;
	border-radius: 50%;
	margin-right: 0.5rem;
`;
const UserInfoText = styled.div`
	display: flex;
	flex-direction: column;
`;

const UserBottom = styled.div`
	overflow-x: scroll;
	white-space: nowrap;
	justify-content: space-between;
	margin-top: 11px;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const UploadImage = styled.div`
	display: inline-block;
	width: 4.75rem;
	height: 4.75rem;
	border-radius: 0.8125rem;
	margin-right: 0.6875rem;
	background-color: pink;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-position: 50%;
	background-size: cover;
	@media screen and (width: 280px) {
		width: 4.1875rem;
		height: 4.1875rem;
	}
`;

const RecommendUserWrap = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 40px 20px 50px 20px;
	background-color: #f8f7fa;
`;
const UserWrap = styled.div`
	display: flex;
	overflow-x: auto;
	margin-top: 20px;
	flex-direction: row;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const User = styled.div`
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	justify-content: center;
	box-sizing: border-box;
	align-items: center;
	width: 9.0625rem;
	height: 12.375rem;
	padding: 20px;
	margin-right: 11px;
	border-radius: 16px;
	box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.05);
	background-color: rgba(255, 255, 255, 0.4);
`;

const FollowButton = styled.div`
	padding: 10px 16px;
	border-radius: 30.4px;
	border: solid 1px #9e30f4;
	margin-top: ${props => props.margintop || '1rem'};
	background-color: ${props => (props.follow ? '#fff' : '#9e30f4')};
	color: ${props => (props.follow ? '#9e30f4' : '#fff')};
	font-size: 0.875rem;
	font-weight: 600;
`;
const TextWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: ${props => props.marginbottom || '20px'};
	padding: ${props => props.padding};
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
	background: url(${props => props.src});
	background-position: 50%;
	background-size: cover;
	background-color: #f6f6f6;
	border-radius: 0.8125rem;
	margin-right: 1.25rem;
`;
const BinderOverflow = styled.div`
	max-height: 24.6875rem;
	overflow-y: scroll;
	/* padding-bottom: 1.25rem; */
	::-webkit-scrollbar {
		display: none;
	}
`;
