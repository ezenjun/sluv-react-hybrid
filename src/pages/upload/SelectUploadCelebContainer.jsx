import React, { useEffect, useState, useRef } from 'react';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as RequestCelebIcon } from '../../assets/Icons/RequestCeleb.svg';
import { ReactComponent as RequestBubble } from '../../assets/Icons/RequestBubble.svg';
import {
	Celeb,
	CountBadge,
	IconWrap,
	Image,
	ImgCircle,
	InputWrap,
	ListContainer,
	PopularCelebContainer,
	RequestButton,
	RequestWrap,
	SearchFailContainer,
	SearchFailDiv,
	SearchTab,
	Tab,
	TabWrap,
	TextWrap,
} from '../signup/SelectCeleb';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import { ReactComponent as FavoriteHeart } from '../../assets/Icons/icon_favorite_celeb_heart.svg';
import { Input } from '../../components/Input';
import {
	celebCategoryList,
	ChooseCelebCurrentPageState,
	FavoriteCelebListState,
	PopularCelebListState,
	TotalCelebListState,
} from '../../recoil/Celebrity';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { customApiClient } from '../../utils/apiClient';
import { useNavigate } from 'react-router-dom';
import { UploadCelebState, UploadMemberState } from '../../recoil/Upload';
import { UploadPopupState } from '../../recoil/BottomNav';

export default function SelectUploadCelebContainer() {
	const navigate = useNavigate();

	const [searchInput, setSearchInput] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(1);
	const [searchFailStatus, setSearchFailStatus] = useState(false);
	const [currentCelebList, setCurrentCelebList] = useState([]);

	const [totalCelebList, setTotalCelebList] = useRecoilState(TotalCelebListState);
	const [popularCelebList, setPopularCelebList] = useRecoilState(PopularCelebListState);
	const [favoriteCelebList, setFavoriteCelebList] = useRecoilState(FavoriteCelebListState);
	const setSelectedCeleb = useSetRecoilState(UploadCelebState);
	const setSelectedMember = useSetRecoilState(UploadMemberState);
	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const setUploadPopupStatus = useSetRecoilState(UploadPopupState);
	const [reachedBottom, setReachedBottom] = useState(false);
	const listInnerRef = useRef();
	const onScroll = () => {
		if (listInnerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
			if (scrollTop + clientHeight >= scrollHeight) {
				setReachedBottom(true);
			} else {
				setReachedBottom(false);
			}
		}
	};
	useEffect(() => {
		setSelectedCeleb({});
		setSelectedMember({});

		if (totalCelebList.length < 1) {
			getCelebList();
			console.log('data');
		} else {
			setCurrentCelebList(totalCelebList.filter(item => item.category === 'SINGER'));
		}

		// 다른 스러버들이 많이 추가한 셀럽 API 호출
		if (popularCelebList.length < 1) {
			getPopularCelebList();
		}
	}, []);

	const getCelebList = async () => {
		const favoriteList = localStorage.getItem('favoriteCeleb');
		const data = await customApiClient('get', '/celebs/members');

		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}

		let temp = [];
		setFavoriteCelebList(JSON.parse(favoriteList));
		JSON.parse(favoriteList).map((favorite, index) => {
			let favoriteTemp = data.result.find(item => item.celebIdx === favorite.celebIdx);
			favoriteTemp.isFavorite = true;
			temp.push(favoriteTemp);
		});
		let tempSet = new Set(temp.concat(data.result));

		setTotalCelebList(Array.from(tempSet));
		setCurrentCelebList(Array.from(tempSet).filter(item => item.category === 'SINGER'));
	};
	const getPopularCelebList = async () => {
		const data = await customApiClient('get', '/interest/top-choice');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setPopularCelebList(data.result);
	};

	const onHandleChangeSearch = e => {
		setSearchInput(e.target.value);

		const value = e.target.value;

		const searchResult = totalCelebList.filter(data => {
			return data.name.includes(value);
		});

		if (searchResult.length > 0) {
			if (searchResult[0].category === 'SINGER') {
				setSelectedCategory(1);
			} else if (searchResult[0].category === 'ACTOR') {
				setSelectedCategory(2);
			}
			setSearchFailStatus(false);
		} else {
			setSearchFailStatus(true);
		}

		setCurrentCelebList(searchResult);
	};

	const onClickInputDelete = () => {
		setSearchInput('');
		setSelectedCategory(1);
		setCurrentCelebList(totalCelebList.filter(item => item.category === 'SINGER'));
		setSearchFailStatus(false);
	};

	const onClickTab = (idx, name) => {
		let tempArr = [];
		if (idx === 1) {
			setSelectedCategory(1);
			tempArr = totalCelebList.filter(item => item.category === 'SINGER');
			setCurrentCelebList(tempArr);
		} else if (idx === 2) {
			setSelectedCategory(2);
			tempArr = totalCelebList.filter(item => item.category === 'ACTOR');
			setCurrentCelebList(tempArr);
		}
	};

	const onClickUploadCeleb = (celeb, e) => {
		setSelectedCeleb(celeb);
		if (celeb.isGroup === 1) {
			setCurrentPage(1);
		} else if (celeb.isGroup === 0) {
			setCurrentPage(2);
		}

		e.preventDefault();
	};

	const onClickClose = () => {
		setUploadPopupStatus(false);
		navigate(-1);
	};

	return (
		<MainContainer>
			<TopNav>
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					정보 공유하기
				</MainText>
				<div style={{ flex: '1' }}></div>
				<Close onClick={onClickClose} style={{ width: '24px', height: '24px' }} />
			</TopNav>

			<ContentWrap padding="0" onScroll={onScroll} ref={listInnerRef}>
				<TextWrap>
					<MainText fontsize="1.5rem" margin="1.625rem 0 0.5rem 0">
						누구의 아이템 정보를
						<br />
						공유하실건가요?
					</MainText>
					<SubText
						color="#8d8d8d"
						fontsize="0.875rem"
						fontweight="regular"
						margin="0 0 1.25rem 0"
					>
						한 번에 한 명의 멤버 정보만 공유할 수 있어요!
					</SubText>
				</TextWrap>

				<SearchTab>
					<InputWrap>
						<SearchIcon
							style={{
								width: '1.125rem',
								height: '1.125rem',
								flexShrink: '0',
							}}
						/>
						<Input
							value={searchInput}
							type="text"
							placeholder="활동명을 한글로 검색해주세요"
							margin="0 0 0 0.375rem"
							onChange={onHandleChangeSearch}
						/>
						{searchInput.length !== 0 && (
							<IconWrap onClick={onClickInputDelete}>
								<Delete style={{ width: '1.125rem', height: '1.125rem' }} />
							</IconWrap>
						)}
					</InputWrap>

					<TabWrap>
						{celebCategoryList.map(item => {
							return (
								<Tab
									key={item.idx}
									onClick={() => onClickTab(item.idx, item.name)}
									status={selectedCategory === item.idx}
								>
									{item.name}
								</Tab>
							);
						})}
					</TabWrap>
				</SearchTab>

				{!searchFailStatus && (
					<ListContainer>
						{currentCelebList.length > 0 &&
							currentCelebList.map((celeb, index) => (
								<Celeb
									key={celeb.celebIdx}
									onClick={e => onClickUploadCeleb(celeb, e)}
								>
									<ImgCircle key={celeb.id} src={celeb.celebImgUrl} />
									{celeb.name}
									<CountBadge status={celeb.isFavorite ? true : false}>
										<FavoriteHeart
											style={{ width: '1.5rem', height: '1.5rem' }}
										/>
									</CountBadge>
								</Celeb>
							))}
					</ListContainer>
				)}

				{searchFailStatus && (
					<SearchFailContainer>
						<SearchFailDiv>
							<SubText
								color="#262626"
								fontsize="1rem"
								style={{ marginBottom: '0.5rem' }}
							>
								등록된 셀럽이 없어요
							</SubText>
							<SubText
								color="#8d8d8d"
								fontsize="0.875rem"
								fontweight="regular"
								style={{ textAlign: 'center', marginBottom: '1.25rem' }}
							>
								스럽에 추가 되었으면 하는
								<br />
								셀럽을 요청해 주세요!
							</SubText>

							<div
								className="requestCelebBtn"
								onClick={() => navigate('../../request/celebrity')}
							>
								셀럽 추가 요청하기
							</div>
						</SearchFailDiv>
						<PopularCelebContainer>
							<MainText fontsize="1.125rem" margin="0 0 0 1.25rem">
								스러버들이 많이 선택한 셀럽
							</MainText>
							<div className="popularCelebDiv">
								{popularCelebList.length > 0 &&
									popularCelebList.map((popular, index) => (
										<Celeb
											key={popular.celebIdx}
											onClick={undefined}
											style={{ marginLeft: '0.6875rem' }}
										>
											<ImgCircle key={index} src={popular.celebImgUrl} />
											{popular.name}
										</Celeb>
									))}
							</div>
						</PopularCelebContainer>
					</SearchFailContainer>
				)}

				{!searchFailStatus && (
					<>
						<RequestWrap>
							{reachedBottom ? (
								<RequestBubble
									style={{
										visibility: 'hidden',
										transition: 'visibility 0s linear 300ms, opacity 300ms',
										opacity: '0',
									}}
								></RequestBubble>
							) : (
								<RequestBubble
									style={{
										visibility: 'visible',
										transition: 'visibility 0s linear 0s, opacity 300ms',
										opacity: '1',
									}}
								></RequestBubble>
							)}

							<RequestButton onClick={() => navigate('../../request/celebrity')}>
								<RequestCelebIcon
									style={{ width: '1.5rem', height: '1.5rem' }}
								></RequestCelebIcon>
							</RequestButton>
						</RequestWrap>
					</>
				)}
			</ContentWrap>
		</MainContainer>
	);
}
