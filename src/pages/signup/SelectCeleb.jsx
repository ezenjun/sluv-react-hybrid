import React, { useState, useEffect } from 'react';
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

export default function SelectCeleb() {
	const [currentPage, setCurrentPage] = useState(0);
	const [pageComplete, setPageComplete] = useState(false);
	const [selected, setSelected] = useState(0);
	const [groupPage, setGroupPage] = useState(0);
	const [searchInput, setSearchInput] = useState('');
	const handleSearchInput = e => {
		setSearchInput(e.target.value);
	};
	const searchInputReset = () => {
		setSearchInput('');
	};
	const navigate = useNavigate();
	const handleRequestCeleb = () => {
		navigate('../../request/celebrity');
	};
	const [singerTabstatus, setSingerTabstatus] = useState(true);
	const [actorTabstatus, setActorTabstatus] = useState(false);

	const onClickTab = () => {
		setSingerTabstatus(!singerTabstatus);
		setActorTabstatus(!actorTabstatus);
	};

	// 관심셀럽 선택
	const [celebList, setCelebList] = useState([
		{
			id: 1,
			celebname: 'velopert',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 2,
			celebname: 'tester',
			img: 'tester@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 3,
			celebname: 'liz',
			img: 'liz@example.com',
			selected: false,
			isGroup: false,
		},
		{
			id: 4,
			celebname: 'velopert',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 5,
			celebname: 'tester',
			img: 'tester@example.com',
			selected: false,
			isGroup: false,
		},
		{
			id: 6,
			celebname: 'liz',
			img: 'liz@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 7,
			celebname: 'velopert',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 8,
			celebname: 'tester',
			img: 'tester@example.com',
			selected: false,
			isGroup: false,
		},
		{
			id: 9,
			celebname: 'liz',
			img: 'liz@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 10,
			celebname: 'velopert',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 11,
			celebname: 'tester',
			img: 'tester@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 12,
			celebname: 'liz',
			img: 'liz@example.com',
			selected: false,
			isGroup: false,
		},
		{
			id: 13,
			celebname: 'velopert',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 14,
			celebname: 'tester',
			img: 'tester@example.com',
			selected: false,
			isGroup: false,
		},
		{
			id: 15,
			celebname: 'liz',
			img: 'liz@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 16,
			celebname: 'velopert',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 17,
			celebname: 'tester',
			img: 'tester@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 18,
			celebname: 'liz',
			img: 'liz@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 19,
			celebname: 'velopert',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: false,
		},
		{
			id: 20,
			celebname: 'tester',
			img: 'tester@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 21,
			celebname: 'liz',
			img: 'liz@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 22,
			celebname: 'velopert',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 23,
			celebname: 'tester',
			img: 'tester@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 24,
			celebname: 'liz',
			img: 'liz@example.com',
			selected: false,
			isGroup: true,
		},
	]);

	const [selectedCelebsArray, setSelectedCelebsArray] = useState([]);
	const handleRemoveItem = celeb => {
		setSelectedCelebsArray(selectedCelebsArray.filter(item => item !== celeb));
	};
	const onSelectCeleb = (celeb, e) => {
		if (celeb.selected === false) {
			setSelectedCelebsArray(selectedCelebsArray => [...selectedCelebsArray, celeb]);
			setSelected(selected + 1);
			celeb.selected = true;
			setCelebList([...celebList]);
		} else {
			handleRemoveItem(celeb);
			setSelected(selected - 1);
			celeb.selected = false;
			setCelebList([...celebList]);
		}
		e.preventDefault();
	};

	// 관심 멤버 선택
	const [memberList, setMemberList] = useState([
		{
			id: 1,
			celebname: '지수',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 2,
			celebname: '제니',
			img: 'tester@example.com',
			selected: false,
			isGroup: true,
		},
		{
			id: 3,
			celebname: '로제',
			img: 'liz@example.com',
			selected: false,
			isGroup: false,
		},
		{
			id: 4,
			celebname: '리사',
			img: 'public.velopert@gmail.com',
			selected: false,
			isGroup: true,
		},
	]);

	const groupList = [];
	const countGroup = array => {
		for (let i = 0; i < array.length; i++) {
			if (array[i].isGroup === true) {
				const member = selectedCelebsArray[i];
				groupList.push(member);
			}
		}
		console.log('groupList length: ', groupList.length);
		setGroupPage(groupList.length);
		console.log(groupPage);
	};

	const handleBackClick = () => {
		setCurrentPage(currentPage - 1);
	};
	const handleNextClick = () => {
		countGroup(selectedCelebsArray);
		setGroupPage(groupList.length);
		setCurrentPage(0);
		if (groupPage === 0) navigate('../..//home');
	};
	useEffect(() => {
		if (selected === 3) {
			setPageComplete(true);
		}
	}, [pageComplete]);

	return (
		<>
			{currentPage === 0 && (
				<MainContainer>
					<TopNav>
						<NavRight>
							{selected > 0 ? (
								<SubText margin="0 16px" color="#9e30f4">
									{selected}개 선택
								</SubText>
							) : (
								<></>
							)}
							{selected >= 3 ? (
								<NextButton onClick={handleNextClick}>다음</NextButton>
							) : (
								<SubText color="#b1b1b1">다음</SubText>
							)}
						</NavRight>
					</TopNav>
					<ContentWrap padding="0">
						<TextWrap>
							<MainText fontsize="24px" margin="15px 0 8px 0">
								좋아하는 셀럽 태그를
								<br />
								3개 이상 선택해주세요
							</MainText>
							<SubText
								color="#8d8d8d"
								fontsize="14px"
								fontweight="regular"
								margin="0 0 20px 0"
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
									onChange={handleSearchInput}
									type="text"
									placeholder="활동명을 한글로 검색해주세요"
									margin="0 0 0 6px"
								/>
								{searchInput.length !== 0 ? (
									<IconWrap onClick={searchInputReset}>
										<Delete />
									</IconWrap>
								) : (
									<></>
								)}
							</InputWrap>
							<TabWrap>
								<Tab status={singerTabstatus} onClick={onClickTab}>
									가수
								</Tab>
								<Tab status={actorTabstatus} onClick={onClickTab}>
									배우
								</Tab>
							</TabWrap>
						</SearchTab>
						<ListContainer>
							{celebList.map(celeb => (
								<Celeb key={celeb.id} onClick={e => onSelectCeleb(celeb, e)}>
									<Image
										size="100px"
										key={celeb.id}
										border={celeb.selected}
									></Image>
									{celeb.celebname}
								</Celeb>
							))}
						</ListContainer>
						{selectedCelebsArray.map(celeb => (
							<div key={celeb.id}>{celeb.celebname}</div>
						))}
						<RequsetWrap>
							<RequestButton>
								<PurpleButton
									boxshadow="0 0.25rem 0.625rem 0 rgba(111, 32, 173, 0.3)"
									marginBottom="0"
									onClick={handleRequestCeleb}
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
					<TopNav>
						<BackButton onClick={handleBackClick} />
						<NavRight>
							{selected > 0 ? (
								<SubText margin="0 16px" color="#9e30f4">
									{selected}개 선택
								</SubText>
							) : (
								<></>
							)}
							{selected >= 3 ? (
								<NextButton onClick={handleNextClick}>다음</NextButton>
							) : (
								<SubText color="#b1b1b1">다음</SubText>
							)}
						</NavRight>
					</TopNav>
					<ContentWrap padding="0">
						<TextWrap padding="0 1.25rem">
							<MainText fontsize="24px" margin="15px 0 8px 0">
								좋아하는 멤버를
								<br />
								자유롭게 선택해주세요
							</MainText>
							<SubText
								color="#8d8d8d"
								fontsize="14px"
								fontweight="regular"
								margin="0 0 20px 0"
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
								<div>스트레이키즈</div>
							</SpeechBubbleWrap>
						</BottomWrap>
						<MembersContainer>
							{(function () {
								let renderList = [];
								for (let i = 0; i < celebList.length; i += 4) {
									renderList.push(
										<RepeatWrap>
											{celebList.slice(i, i + 4).map((celeb, index) => (
												<>
													{index % 4 === 0 ? (
														<CelebLeftTop
															key={celeb.id}
															onClick={e => onSelectCeleb(celeb, e)}
														>
															<Image size="9.25rem" key={celeb.id}>
																{celeb.celebname}
															</Image>
														</CelebLeftTop>
													) : (
														<></>
													)}
													{index % 4 === 1 ? (
														<CelebLeftBottom
															key={celeb.id}
															onClick={e => onSelectCeleb(celeb, e)}
														>
															<Image size="9.25rem" key={celeb.id}>
																{celeb.celebname}
															</Image>
														</CelebLeftBottom>
													) : (
														<></>
													)}
													{index % 4 === 2 ? (
														<CelebRightTop
															key={celeb.id}
															onClick={e => onSelectCeleb(celeb, e)}
														>
															<Image size="9.25rem" key={celeb.id}>
																{celeb.celebname}
															</Image>
														</CelebRightTop>
													) : (
														<></>
													)}
													{index % 4 === 3 ? (
														<CelebRightBottom
															key={celeb.id}
															onClick={e => onSelectCeleb(celeb, e)}
														>
															<Image size="9.25rem" key={celeb.id}>
																{celeb.celebname}
															</Image>
														</CelebRightBottom>
													) : (
														<></>
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

const BottomWrap = styled.div`
	box-sizing: border-box;
	padding: 0 20px;
`;
const MembersContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	box-sizing: border-box;
	padding-right: 1.25rem;
	margin-top: 55px;
	overflow-x: scroll;
	height: 100%;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const RepeatWrap = styled.div`
	display: flex;
	position: relative;
	height: 370px;
	width: 370px;
`;

const NavRight = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;
const NextButton = styled.span`
	font-size: ${props => props.fontsize || '0.75rem'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => props.color || '#262626'};
	margin: ${props => props.margin || '0'};
	&:hover {
		cursor: pointer;
	}
`;

const ListContainer = styled.div`
	display: grid;
	padding: 1.25rem;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: minmax(120px, auto);
	justify-content: center;
	gap: 16px 11px;
`;

const TextWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${props => props.padding || '0 1.25rem'};
`;

const SearchTab = styled.div`
	padding: 0 20px;
	background-color: white;
	position: sticky;
	top: 0;
`;
const Celeb = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	font-size: 0.875rem;
	/* border: 1px solid black; */
`;
const CelebLeftTop = styled.div`
	position: relative;
	left: 1.25rem;
	font-size: 1rem;
`;
const CelebLeftBottom = styled.div`
	position: absolute;
	left: 1.25rem;
	top: 10rem;
	font-size: 1rem;
`;
const CelebRightTop = styled.div`
	position: relative;
	top: 4.6875rem;
	left: 1.125rem;
	font-size: 1rem;
`;
const CelebRightBottom = styled.div`
	position: absolute;
	left: 10.625rem;
	top: 14.6875rem;
	font-size: 1rem;
`;
const Image = styled.div`
	display: flex;
	width: ${props => props.size || '6.25rem'};
	height: ${props => props.size || '6.25rem'};
	justify-content: center;
	align-items: flex-end;
	padding-bottom: 12px;
	color: white;
	border-radius: 50%;
	background-color: pink;
	margin-bottom: 8px;
	box-sizing: border-box;
	border: ${props => (props.border ? '2px solid #9e30f4' : 'none')};
	&:hover {
		cursor: pointer;
	}
`;

const InputWrap = styled.div`
	display: flex;
	align-items: center;
	border-radius: 0.625rem;
	padding: 16px;
	border: 1px solid #e2e0e0;
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
	margin: 16px 0;
`;

const Tab = styled.div`
	background-color: ${props => (props.status ? '#2b1e34' : 'white')};
	color: ${props => (props.status ? 'white' : '#2b1e34')};
	border: ${props => (props.status ? 'none' : '1px solid #E2E0E0')};
	border-radius: 30px;
	font-size: 14px;
	padding: 10px 16px;
	margin: 0 12px;
	&:hover {
		cursor: pointer;
	}
`;
