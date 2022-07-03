import React, { useState } from 'react';
import styled from 'styled-components';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { LargeViewWrap } from '../../components/LargeViewWrap/LargeViewWrap';
import { LargeViewItem } from '../../components/LargeViewWrap/LargeViewItem';
import { LargeViewImage } from '../../components/LargeViewWrap/LargeViewImage';
import { ImageText } from '../../components/ImageText';
import { ReactComponent as Present } from '../../assets/Icons/Present.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { SubText } from '../../components/Texts/SubText';
import { VerticalLine } from '../../components/Lines/VerticalLine';
import { MainText } from '../../components/Texts/MainText';
export default function Follow() {
	const [followExist, setFollowExist] = useState(true);
	return (
		<FeedContainer>
			{followExist ? (
				<>
					<LargeViewWrap padding="0 20px 40px 20px">
						<LargeViewItem>
							<LargeViewImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										리노's
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</LargeViewImage>
							<ItemTextWrap>
								<SubText fontsize="1rem">마하그리드</SubText>
								<VerticalLine></VerticalLine>
								<SubText fontsize="1rem">Rugby Polo LS TEE BLUE</SubText>
							</ItemTextWrap>
							<SubInfoWrap>
								<ProfileImg></ProfileImg>
								<SubText margin="0 "> 이리노순둥도리</SubText>
								<Dot></Dot>
								<SubText color="#8d8d8d"> 5분 전</SubText>
							</SubInfoWrap>
						</LargeViewItem>
						<HorizontalLine></HorizontalLine>
						<LargeViewItem>
							<LargeViewImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										현진's
									</SubText>
									<BinderRed style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</LargeViewImage>
							<ItemTextWrap>
								<SubText fontsize="1rem">더블유브이프로젝트</SubText>
								<VerticalLine></VerticalLine>
								<SubText fontsize="1rem">Round Lawn Short Shirt...</SubText>
							</ItemTextWrap>
							<SubInfoWrap>
								<ProfileImg></ProfileImg>
								<SubText margin="0 "> 이리노순둥도리</SubText>
								<Dot></Dot>
								<SubText color="#8d8d8d"> 5분 전</SubText>
							</SubInfoWrap>
						</LargeViewItem>
						<HorizontalLine></HorizontalLine>
						<LargeViewItem>
							<LargeViewImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										아이엔's
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</LargeViewImage>
							<ItemTextWrap>
								<SubText fontsize="1rem">우알롱</SubText>
								<VerticalLine></VerticalLine>
								<SubText fontsize="1rem">Signature hood sip-up - ...</SubText>
							</ItemTextWrap>
							<SubInfoWrap>
								<ProfileImg></ProfileImg>
								<SubText margin="0 "> 이리노순둥도리</SubText>
								<Dot></Dot>
								<SubText color="#8d8d8d"> 5분 전</SubText>
							</SubInfoWrap>
						</LargeViewItem>
						<HorizontalLine></HorizontalLine>
						<LargeViewItem>
							<LargeViewImage>
								<ImageText>
									<SubText fontsize="0.8125rem" fontweight="bold" color="white">
										필릭스's
									</SubText>
									<BinderWhite style={{ width: '1.5rem', height: '1.5rem' }} />
								</ImageText>
							</LargeViewImage>
							<ItemTextWrap>
								<SubText fontsize="1rem">마하그리드</SubText>
								<VerticalLine></VerticalLine>
								<SubText fontsize="1rem">Rugby Polo LS TEE BLUE</SubText>
							</ItemTextWrap>
							<SubInfoWrap>
								<ProfileImg></ProfileImg>
								<SubText margin="0 "> 이리노순둥도리</SubText>
								<Dot></Dot>
								<SubText color="#8d8d8d"> 5분 전</SubText>
							</SubInfoWrap>
						</LargeViewItem>
					</LargeViewWrap>
					<RecommendUserWrap>
						<TextWrap>
							<MainText fontsize="1.125rem">같은 셀럽을 좋아하는 스러버</MainText>
						</TextWrap>
						<UserWrap>
							<User>
								<ProfileImg size="62px" marginright="0"></ProfileImg>
								<SubText fontsize="0.875rem" margin="0.5rem 0 0.25rem 0">
									신류땡의 옷장
								</SubText>
								<SubText color="#8d8d8d">@ryujinee</SubText>
								<FollowButton follow={false}>팔로우</FollowButton>
							</User>
							<User>
								<ProfileImg size="62px" marginright="0"></ProfileImg>
								<SubText fontsize="0.875rem" margin="0.5rem 0 0.25rem 0">
									도영이 클로젯12
								</SubText>
								<SubText color="#8d8d8d">@doyoung12</SubText>
								<FollowButton follow={true}>팔로잉</FollowButton>
							</User>
							<User>
								<ProfileImg size="62px" marginright="0"></ProfileImg>
								<SubText fontsize="0.875rem" margin="0.5rem 0 0.25rem 0">
									신류땡의 옷장
								</SubText>
								<SubText color="#8d8d8d">@ryujinee</SubText>
								<FollowButton follow={false}>팔로우</FollowButton>
							</User>
							<User>
								<ProfileImg size="62px" marginright="0"></ProfileImg>
								<SubText fontsize="0.875rem" margin="0.5rem 0 0.25rem 0">
									신류땡의 옷장
								</SubText>
								<SubText color="#8d8d8d">@ryujinee</SubText>
								<FollowButton follow={true}>팔로잉</FollowButton>
							</User>
						</UserWrap>
					</RecommendUserWrap>
				</>
			) : (
				<>
					<NoFollow>
						<Present style={{ width: '3.75rem', height: '3.75rem' }}></Present>
						<SubText></SubText>
						<SubText color="#262626" fontsize="1rem" margin="1rem 0 0.5rem 0">
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
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton width="4.3125rem" height="2.3125rem" marginBottom="0">
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
						<RecommendUser>
							<UserTop>
								<UserInfo>
									<UserImage></UserImage>
									<UserInfoText>
										<SubText margin="0 "> 이리노순둥도리</SubText>
										<SubInfoWrap>
											<SubText color="#8d8d8d">@sluvvv</SubText>
											<Dot></Dot>
											<SubText color="#8d8d8d"> 10개 업로드</SubText>
										</SubInfoWrap>
									</UserInfoText>
								</UserInfo>
								<PurpleButton
									width="4.3125rem"
									height="2.3125rem"
									marginBottom="0"
									style={{ fontWeight: '600' }}
								>
									팔로우
								</PurpleButton>
							</UserTop>
							<UserBottom>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
								<UploadImage></UploadImage>
							</UserBottom>
						</RecommendUser>
					</RecommendFollow>
				</>
			)}
		</FeedContainer>
	);
}

const FeedContainer = styled.div`
	height: 100vh;
	padding: 1.25rem 0 3.125rem 0;
	margin-top: 0.3125rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const ItemTextWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 1rem 0 0.625rem 0;
`;
const ProfileImg = styled.div`
	width: ${props => props.size || '1.375rem'};
	height: ${props => props.size || '1.375rem'};
	/* width: 1.375rem;
	height: 1.375rem; */
	border-radius: 50%;
	background-color: darkturquoise;
	margin-right: ${props => props.marginright || '1.375rem'}; ;
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
	padding-top: 1.25rem;
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
	background-color: #5d3997;
	width: 2.25rem;
	height: 2.25rem;
	border-radius: 50%;
	margin-right: 0.5rem;
`;
const UserInfoText = styled.div`
	display: flex;
	flex-direction: column;
`;
const NickName = styled.div``;

const UserBottom = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 11px;
`;
const UploadImage = styled.div`
	width: 76px;
	height: 76px;
	border-radius: 0.8125rem;
	background-color: #5d3997;
	@media screen and (width: 280px) {
		width: 4.0625rem;
		height: 4.0625rem;
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
	margin-top: 1rem;
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
