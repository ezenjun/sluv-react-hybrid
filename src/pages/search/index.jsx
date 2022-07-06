import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { Input } from '../../components/Input';
import Slider from 'react-slick';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ReactComponent as UpArrow } from '../../assets/Icons/upArrow.svg';
import { ReactComponent as DownArrow } from '../../assets/Icons/downArrow.svg';

export default function Search() {
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [searchInput, setSearchInput] = useState('');
	const [isCollapsed, setIsCollapsed] = useState(true);
	const hotSearchList = [
		'아이유 니트',
		'스트레이키즈 모자',
		'방탄소년단',
		'레드벨벳',
		'블랙핑크',
		'트와이스',
		'나연 후드티',
		'리노 모자',
		'미주 스커트',
		'오마이걸',
	];
	const onHandleChangeSearch = e => {
		setSearchInput(e.target.value);

		const value = e.target.value;
	};
	const onClickInputDelete = () => {
		setSearchInput('');
	};
	const settings = {
		dots: true,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		cssEase: 'linear',
		arrows: false,
	};
	const verticalsettings = {
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		swipeToSlide: true,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		cssEase: 'linear',
		arrows: false,
		// beforeChange: function(currentSlide, nextSlide) {
		//   console.log("before change", currentSlide, nextSlide);
		// },
		// afterChange: function(currentSlide) {
		//   console.log("after change", currentSlide);
		// }
	};

	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(true);
	}, []);

	return (
		<MainContainer padding="0 0 3.125rem 0">
			<TopNav>
				<SubText fontsize="18px" fontweight="bold" className="centerText">
					검색
				</SubText>
			</TopNav>
			<div style={{ padding: '0.5rem 1.25rem' }}>
				<InputWrap>
					<IconWrap>
						<SearchIcon />
					</IconWrap>
					<Input
						value={searchInput}
						onChange={onHandleChangeSearch}
						type="text"
						placeholder="셀럽과 아이템을 검색해 보세요"
						margin="0 0 0 0.375rem"
					/>
					{searchInput.length !== 0 ? (
						<IconWrap onClick={onClickInputDelete}>
							<Delete />
						</IconWrap>
					) : (
						<></>
					)}
				</InputWrap>
			</div>
			<FeedContainer>
				{searchInput.length === 0 ? (
					<SearchBottom>
						<HotSearchWrap>
							<HotSearch collapsed={isCollapsed}>
								{isCollapsed ? (
									<CollapsedRow>
										<SubText
											fontsize="0.875rem"
											fontweight="bold"
											margin="0 0.25rem 0 0"
										>
											HOT
										</SubText>
										<div
											style={{
												flexDirection: 'column',
												width: '75%',
												alignItems: 'center',
											}}
										>
											<Slider {...verticalsettings}>
												{hotSearchList.map((rank, index) => (
													<div>
														<SubText
															fontsize="0.875rem"
															fontweight="bold"
															color="#9e30f4"
															margin="0 0.5rem 0 0"
														>
															{index + 1}
														</SubText>
														<SubText
															fontsize="0.875rem"
															fontweight="600"
														>
															{rank}
														</SubText>
													</div>
												))}
											</Slider>
										</div>

										<DownArrow
											onClick={() => setIsCollapsed(!isCollapsed)}
											style={{
												width: '1.125rem',
												height: '1.125rem',
											}}
										></DownArrow>
									</CollapsedRow>
								) : (
									<>
										<CollapsedRow style={{ marginBottom: '0.625rem' }}>
											<div>
												<SubText
													fontsize="0.875rem"
													fontweight="bold"
													margin="0 1rem 0 0"
												>
													HOT 랭킹
												</SubText>
												<SubText fontweight="normal">
													05.15 17:00 기준
												</SubText>
											</div>
											<UpArrow
												onClick={() => setIsCollapsed(!isCollapsed)}
												style={{ width: '1.125rem', height: '1.125rem' }}
											></UpArrow>
										</CollapsedRow>
										<Slider {...settings}>
											<div>
												{hotSearchList.slice(0, 5).map((rank, index) => (
													<EachRank key={index}>
														<SubText
															fontsize="0.875rem"
															fontweight="bold"
															color="#9e30f4"
															margin="1rem 1rem 1rem 0"
														>
															{index + 1}
														</SubText>
														<SubText
															fontsize="0.875rem"
															fontweight="600"
															margin="16px 0"
														>
															{rank}
														</SubText>
													</EachRank>
												))}
											</div>
											<div>
												{hotSearchList.slice(5, 10).map((rank, index) => (
													<EachRank key={index}>
														<SubText
															key={index}
															fontsize="0.875rem"
															fontweight="bold"
															color="#9e30f4"
															margin="1rem 1rem 1rem 0"
														>
															{index + 6}
														</SubText>
														<SubText
															fontsize="0.875rem"
															fontweight="600"
															margin="16px 0"
														>
															{rank}
														</SubText>
													</EachRank>
												))}
											</div>
										</Slider>
									</>
								)}
							</HotSearch>
						</HotSearchWrap>
						<HotKeyword>
							<MainText fontsize="1.25rem" margin="0 0 0.25rem 0">
								인기 검색어
							</MainText>
							<HashTagWrap>
								<HashTag>#아이유 선글라스</HashTag>
								<HashTag>#로제 원피스</HashTag>
								<HashTag>#있지 류진 후드티</HashTag>
								<HashTag>#영케이 안경</HashTag>
								<HashTag>#리노 반팔티</HashTag>
								<HashTag>#효정 모자</HashTag>
								<HashTag>#레드벨벳</HashTag>
								<HashTag>#트와이스 나연 원피스</HashTag>
								<HashTag>#엔시티드림</HashTag>
								<HashTag>#220618 BTS 온라인 콘서트</HashTag>
							</HashTagWrap>
						</HotKeyword>
					</SearchBottom>
				) : (
					<SearchBottom></SearchBottom>
				)}
			</FeedContainer>
		</MainContainer>
	);
}

export const InputWrap = styled.div`
	display: flex;
	align-items: center;
	border-radius: 0.625rem;
	padding: 16px;
	border: solid 1px #c9c9c9;
	margin: ${props => props.margin || '0'};
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
`;
const SearchBottom = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.25rem 0 1.25rem 1.25rem;
`;

const FeedContainer = styled.div`
	height: 100vh;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;

const HotSearchWrap = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 100%;
	padding-right: 1.25rem;
	margin-bottom: 1.25rem;
`;
const HotSearch = styled.div`
	/* display: flex; */
	align-items: center;
	background-color: #fbf6ff;
	box-sizing: border-box;
	border-radius: 1rem;
	height: ${props => (props.collapsed ? '3.5625rem' : '16.4375rem')};
	overflow: hidden;
	padding: 1.25rem;
	transition: all 0.3s ease-out;
	.slick-dots li.slick-active button:before {
		color: #9e30f4;
	}
`;
const CollapsedRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	align-items: center;
`;
const EachRank = styled.div`
	margin: 1rem 0;
`;
const HotKeyword = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1.25rem 0;
`;

const HashTagWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding-top: 0.25rem;
	width: 100%;
`;
const HashTag = styled.div`
	padding: 0.625rem 1rem;
	border: 1px solid #ede4f4;
	border-radius: 8rem;
	margin: 0.375rem 0.5rem 0.375rem 0;
	font-size: 14px;
	font-weight: 600;
	font-family: Pretendard;
	color: #564b5c;
`;

export const IconWrap = styled.div.attrs(props => ({
	className: props.className,
}))`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${props => props.margin || '0'};
	${props =>
		props.button
			? `&:hover {
			cursor: pointer;
		}`
			: ''};
`;
