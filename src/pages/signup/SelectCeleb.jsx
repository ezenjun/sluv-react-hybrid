import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { Input } from '../../components/Input';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ContentWrap } from '../../components/containers/ContentWrap';

export default function SelectCeleb() {
	const [pageComplete, setPageComplete] = useState(false);
	const [selected, setSelected] = useState(0);
	const [searchInput, setSearchInput] = useState('');
	const handleSearchInput = e => {
		setSearchInput(e.target.value);
	};
	const searchInputReset = () => {
		setSearchInput('');
	};

	const [singerTabstatus, setSingerTabstatus] = useState(true);
	const [actorTabstatus, setActorTabstatus] = useState(false);

	const onClickTab = () => {
		setSingerTabstatus(!singerTabstatus);
		setActorTabstatus(!actorTabstatus);
	};

	const selectedArray = [];
	const onSelectCeleb = id => {
		if (selectedArray[id] === false) {
			selectedArray[id] = true;
			setSelected(selected + 1);
		} else {
			if (selected > 0) {
				selectedArray[id] = false;
				setSelected(selected - 1);
			}
		}
		console.log('id=', id);
		console.log('selectedArray[id]=', selectedArray[id]);
		console.log('selected=', selected);
	};

	useEffect(() => {
		if (selected === 3) {
			setPageComplete(true);
		}
	}, [pageComplete]);

	return (
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
					{selected >= 3 ? <SubText>다음</SubText> : <SubText>다음</SubText>}
				</NavRight>
			</TopNav>
			<ContentWrap padding="0">
				<TextWrap>
					<MainText fontsize="24px" margin="11px 0 8px 0">
						좋아하는 셀럽을
						<br />
						최소 3명 선택해주세요
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
					<Celeb>
						<Image id="1" onClick={onSelectCeleb(0)}></Image>
						스트레이키즈
					</Celeb>
					<Celeb>
						<Image id="2" onClick={onSelectCeleb(1)}></Image>
						스트레이키즈
					</Celeb>
					<Celeb>
						<Image id="3" onClick={onSelectCeleb(2)}></Image>
						스트레이키즈
					</Celeb>
				</ListContainer>
			</ContentWrap>
		</MainContainer>
	);
}

const NavRight = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
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
	padding: 0 20px;
`;

const SearchTab = styled.div`
	// position: -webkit-sticky;
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
	font-size: 14px;
	/* border: 1px solid black; */
`;
const Image = styled.div`
	width: 6.25rem;
	height: 6.25rem;
	border-radius: 50%;
	background-color: pink;
	margin-bottom: 8px;
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
