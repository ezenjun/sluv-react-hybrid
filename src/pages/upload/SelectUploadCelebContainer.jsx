import React, { useState } from 'react'
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { IconWrap, InputWrap, SearchTab, TextWrap } from '../signup/SelectCeleb';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { Input } from '../../components/Input';

export default function SelectUploadCelebContainer() {
	const [searchInput, setSearchInput] = useState('');

	const onHandleChangeSearch = e => {
		setSearchInput(e.target.value);

		const value = e.target.value;

		// const searchResult = totalCelebList.filter(data => {
		// 	return data.name.includes(value);
		// });

		// if (searchResult.length > 0) {
		// 	if (searchResult[0].category === 'SINGER') {
		// 		setSelectedCategory(1);
		// 	} else if (searchResult[0].category === 'ACTOR') {
		// 		setSelectedCategory(2);
		// 	}
		// 	setSearchFailStatus(false);
		// } else {
		// 	setSearchFailStatus(true);
		// }

		// setCurrentCelebList(searchResult);
	};

	const onClickInputDelete = () => {
		setSearchInput('');
		// setCurrentCelebList(totalCelebList);
		// setSelectedCategory(1);
		// setSearchFailStatus(false);
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
				</SearchTab>
			</ContentWrap>
		</MainContainer>
	);
}
