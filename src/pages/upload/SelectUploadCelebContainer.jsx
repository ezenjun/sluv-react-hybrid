import React, { useEffect, useState } from 'react'
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { Celeb, IconWrap, Image, InputWrap, ListContainer, SearchTab, Tab, TabWrap, TextWrap } from '../signup/SelectCeleb';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { Input } from '../../components/Input';
import { celebCategoryList, PopularCelebListState, TotalCelebListState } from '../../recoil/Celebrity';
import { useRecoilState } from 'recoil';
import { customApiClient } from '../../utils/apiClient';

export default function SelectUploadCelebContainer() {
	const [searchInput, setSearchInput] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(1);
	const [searchFailStatus, setSearchFailStatus] = useState(false);
	const [currentCelebList, setCurrentCelebList] = useState([]);

	const [totalCelebList, setTotalCelebList] = useRecoilState(TotalCelebListState);
	const [popularCelebList, setPopularCelebList] = useRecoilState(PopularCelebListState);

	useEffect(() => {
		// 셀럽 및 멤버 목록 조회 API 호출
		if (totalCelebList.length < 1) {
			getCelebList();
		} else {
			setCurrentCelebList(totalCelebList.filter(item => item.category === 'SINGER'));

			// 1개 선택이니까 체크리스트 필요없어! 
		}
		// 다른 스러버들이 많이 추가한 셀럽 API 호출
		if (popularCelebList.length < 1) {
			getPopularCelebList();
		}
	},[]);

	const getCelebList = async () => {
		const data = await customApiClient('get', '/celebs/members');

		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setTotalCelebList(data.result);
		setCurrentCelebList(data.result.filter(item => item.category === 'SINGER'));

		// 1개 선택이니까 체크리스트 필요없어!
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
		setCurrentCelebList(totalCelebList);
		setSelectedCategory(1);
		setSearchFailStatus(false);
	};

	const onClickTab = (idx, name) => {
		let tempArr = [];
		if (idx === 1) {
			setSelectedCategory(1);
			// tempArr = totalCelebList.filter(item => item.category === 'SINGER');
			// setCurrentCelebList(tempArr);
		} else if (idx === 2) {
			setSelectedCategory(2);
			// tempArr = totalCelebList.filter(item => item.category === 'ACTOR');
			// setCurrentCelebList(tempArr);
		}
	};


	return (
		<MainContainer>
			<TopNav>
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					정보 공유하기
				</MainText>
			</TopNav>

			<ContentWrap padding="0">
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
						<IconWrap>
							<SearchIcon />
						</IconWrap>
						<Input
							value={searchInput}
							type="text"
							placeholder="활동명을 한글로 검색해주세요"
							margin="0 0 0 0.375rem"
							onChange={onHandleChangeSearch}
						/>
						{searchInput.length !== 0 && (
							<IconWrap onClick={onClickInputDelete}>
								<Delete />
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
							currentCelebList.map(celeb => (
								<Celeb key={celeb.celebIdx} onClick={undefined}>
									<Image
										size="6.25rem"
										key={celeb.id}
									>
										<img
											className="celebImg"
											src={celeb.celebImgUrl}
											alt="셀럽이미지"
										/>
									</Image>
									{celeb.name}
								</Celeb>
							))}
					</ListContainer>
				)}
			</ContentWrap>
		</MainContainer>
	);
}
