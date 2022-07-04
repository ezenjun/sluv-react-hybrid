import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { Input } from '../../components/Input';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { customApiClient } from '../../utils/apiClient';
import { useRecoilState } from 'recoil';
import { celebCategoryList, ChooseCelebCurrentPageState, TotalCelebListState } from '../../recoil/Celebrity';
import SelectMemberContainer from '../../components/containers/SelectMemberContainer';

export default function SelectCeleb() {

	const navigate = useNavigate();

	const [checkStatusList, setCheckStatusList] = useState([]);
	const [selectedGroups, setSelectedGroups] = useState([]);
	const [selectedCelebIdxArray, setSelectedCelebIdxArray] = useState([]);
	
	const [isCelebConfirm, setIsCelebConfirm] = useState(false);
	const [selectedNum, setSelectedNum] = useState(0);

	const [searchInput, setSearchInput] = useState('');
	const [currentCelebList, setCurrentCelebList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(1);
	
	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const [totalCelebList, setTotalCelebList] = useRecoilState(TotalCelebListState);
	
	
	
	useEffect(() => {
		// 선택한 관심셀럽 수 초기화
		setSelectedNum(0);
		// 셀럽 및 멤버 목록 조회 API 호출
		getCelebList();
	}, []);

	useEffect(() => {
		console.log(`선택한 셀럽 수 : ${selectedNum}`);
		console.log(selectedGroups);
		console.log(selectedCelebIdxArray);

		if (selectedNum < 3) {
			setIsCelebConfirm(false);
			return;
		}
		setIsCelebConfirm(true);
	}, [selectedNum]);

	const getCelebList = async () => {
		const data = await customApiClient('get', '/celebs/members');
		
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setTotalCelebList(data.result);
		setCurrentCelebList(data.result.filter(item => item.category === 'SINGER'));

		let temp;
		(temp = []).length = data.result.length;
		temp.fill(false);
		setCheckStatusList(temp);
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

	const onSelectCeleb = (celeb, e) => {
		let tempGroup = [];
		let tempWholeCeleb = [];
		if (!checkStatusList[celeb.celebIdx - 1]) {
			setSelectedNum(selectedNum + 1);

			if (celeb.isGroup === 1) {
				tempGroup = selectedGroups;
				tempGroup.push(celeb);
				setSelectedGroups(tempGroup);
			}
			tempWholeCeleb = selectedCelebIdxArray;
			tempWholeCeleb.push({celebIdx: celeb.celebIdx});
			setSelectedCelebIdxArray(tempWholeCeleb);

		} else {
			setSelectedNum(selectedNum - 1);

			if (celeb.isGroup === 1) {
				tempGroup = selectedGroups;
				setSelectedGroups(tempGroup.filter(item => item.celebIdx !== celeb.celebIdx));
			}
			tempWholeCeleb = selectedCelebIdxArray;
			setSelectedCelebIdxArray(
				tempWholeCeleb.filter(item => item.celebIdx !== celeb.celebIdx)
			);
		}
		let tempCheckList = checkStatusList;
		tempCheckList[celeb.celebIdx - 1] = !tempCheckList[celeb.celebIdx - 1];
		setCheckStatusList(tempCheckList);

		e.preventDefault();
	};

	const onPostFavoriteCelebs = async () => {
		const body = {
			celebMemberList: selectedCelebIdxArray
		};
		const data = await customApiClient('post', '/interest', body);

		if(!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log(data.message);
		navigate('/home');
	}

	const onHandleNextButton = () => {
		
		if(isCelebConfirm) {
			if(selectedGroups.length === 0) {
				onPostFavoriteCelebs();
				
			} else {
				setCurrentPage(currentPage + 1);
			}
		}
	}


	return (
		<>
			{currentPage === 0 && (
				<MainContainer>
					<TopNav>
						<NavRight>
							{selectedNum > 0 && (
								<SubText margin="0 1rem" color="#9e30f4">
									{selectedNum}개 선택
								</SubText>
							)}
							<NextButton status={isCelebConfirm} onClick={onHandleNextButton}>
								다음
							</NextButton>
						</NavRight>
					</TopNav>

					<ContentWrap padding="0">
						<TextWrap>
							<MainText fontsize="1.5rem" margin="1.625rem 0 0.5rem 0">
								좋아하는 셀럽 태그를
								<br />
								3개 이상 선택해주세요
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

						<SearchTab>
							<InputWrap>
								<IconWrap>
									<SearchIcon />
								</IconWrap>
								<Input
									value={searchInput}
									onChange={e => setSearchInput(e.target.value)}
									type="text"
									placeholder="활동명을 한글로 검색해주세요"
									margin="0 0 0 0.375rem"
								/>
								{searchInput.length !== 0 ? (
									<IconWrap onClick={() => setSearchInput('')}>
										<Delete />
									</IconWrap>
								) : (
									<></>
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

						<ListContainer>
							{currentCelebList.length > 0 &&
								currentCelebList.map(celeb => (
									<Celeb
										key={celeb.celebIdx}
										onClick={e => onSelectCeleb(celeb, e)}
									>
										<Image
											size="6.25rem"
											key={celeb.id}
											border={checkStatusList[celeb.celebIdx - 1]}
										>
											<img
												className="celebImg"
												src={celeb.celebImgUrl}
												alt="셀럽이미지"
											/>
										</Image>
										{celeb.name}
										<CountBadge status={checkStatusList[celeb.celebIdx - 1]}>
											<span className="badgeItem">{selectedNum}</span>
										</CountBadge>
									</Celeb>
								))}
						</ListContainer>

						<RequsetWrap>
							<RequestButton>
								<PurpleButton
									boxshadow="0 0.25rem 0.625rem 0 rgba(111, 32, 173, 0.3)"
									marginBottom="0"
									onClick={() => navigate('../../request/celebrity')}
								>
									셀럽 추가 요청하기
								</PurpleButton>
							</RequestButton>
						</RequsetWrap>
					</ContentWrap>
				</MainContainer>
			)}

			{currentPage === 1 && (
				<MainContainer>
					<SelectMemberContainer data={selectedGroups} postIdxArray={selectedCelebIdxArray} setPostIdxArray={setSelectedCelebIdxArray}  />
				</MainContainer>
			)}
		</>
	);
}

const RequsetWrap = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 1rem;
`;
const RequestButton = styled.div`
	width: 156px;
	margin: 0;
`;

export const BottomWrap = styled.div`
	box-sizing: border-box;
	padding: 0 20px;
`;
export const MembersContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	box-sizing: border-box;
	padding-right: 1.25rem;
	margin-top: 55px;
	overflow-x: scroll;
	overflow-y: hidden;
	height: 100%;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
export const RepeatWrap = styled.div`
	display: flex;
	position: relative;
	height: 370px;
`;

export const NavRight = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;
export const NextButton = styled.span`
	font-size: ${props => props.fontsize || '0.75rem'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => props.status ? '#262626' : '#b1b1b1'};
	margin: ${props => props.margin || '0'};
	&:hover {
		cursor: pointer;
	}
`;

const ListContainer = styled.div`
	display: grid;
	padding: 1rem 1.25rem 5.5rem;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: minmax(auto, auto);
	justify-content: center;
	gap: 16px 11px;
`;

export const TextWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${props => props.padding || '0 1.25rem'};
`;

const SearchTab = styled.div`
	padding: 0 20px;
	background-color: white;
	position: sticky;
	top: 0;
	z-index: 10000;
`;
const Celeb = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	font-size: 0.8125rem;
	font-weight: 700;
	color: #262626;
`;
export const CelebLeftTop = styled.div`
	position: relative;
	left: 1.25rem;
	font-size: 1rem;
`;
export const CelebRightTop = styled.div`
	position: relative;
	top: 4.6875rem;
	left: 1.125rem;
	font-size: 1rem;
`;
export const CelebLeftBottom = styled.div`
	position: absolute;
	left: 1.25rem;
	top: 10rem;
	font-size: 1rem;
`;
export const CelebRightBottom = styled.div`
	position: absolute;
	left: 10.625rem;
	top: 14.6875rem;
	font-size: 1rem;
`;
export const CelebNextLeftBottom = styled.div`
	position: relative;
	top: 10rem;
	left: 1.125rem;
	font-size: 1rem;
`;
export const CelebNextLeftTop = styled.div`
	position: absolute;
	left: 20rem;
	font-size: 1rem;
`;
export const CelebNextRightTop = styled.div`
	position: relative;
	left: 1.125rem;
	top: 4.6875rem;
	font-size: 1rem;
`;
export const CelebNextRightBottom = styled.div`
	position: absolute;
	top: 14.6875rem;
	left: 29.375rem;
	font-size: 1rem;
`;

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
	@media screen and (max-width: 350px) {
		width: 5.3125rem;
		height: 5.3125rem;
		margin-bottom: 0.375rem;
	}
	@media screen and (max-width: 320px) {
		width: 4.375rem;
		height: 4.375rem;
		margin-bottom: 0.3125rem;
	}
	.celebImg {
		position: absolute;
		top: -9999px;
		left: -9999px;
		right: -9999px;
		bottom: -9999px;
		margin: auto;
	}
`;

export const CountBadge = styled.span`
	border: 1px solid black;
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	display: ${props => (props.status ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	background-color: #9e30f4;
	border: none;
	color: #ffffff;
	font-size: 0.8125rem;
	font-weight: 700;
	border-radius: 50%;
	width: 1.5rem;
	height: 1.5rem;
	z-index: 20000;
`;

const InputWrap = styled.div`
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
const IconWrap = styled.div.attrs(props => ({
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

const TabWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1rem 0 0.75rem;
`;

const Tab = styled.div`
	background-color: ${props => (props.status ? '#2b1e34' : 'white')};
	color: ${props => (props.status ? 'white' : '#2b1e34')};
	border: ${props => (props.status ? 'none' : '1px solid #E2E0E0')};
	border-radius: 30px;
	font-size: 14px;
	padding: 10px 16px;
	margin: 0 6px;
	&:hover {
		cursor: pointer;
	}
`;
