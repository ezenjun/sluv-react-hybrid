import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import Slider from 'react-slick';

import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { Input } from '../../components/Input';
import { InputWrap, IconWrap, FeedContainer } from '.';

import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../assets/Icons/searchIcon.svg';
import { ReactComponent as UpArrow } from '../../assets/Icons/upArrow.svg';
import { ReactComponent as DownArrow } from '../../assets/Icons/downArrow.svg';
import { ReactComponent as X } from '../../assets/Icons/TagDeleteX.svg';

export default function SearchResult() {
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [searchInput, setSearchInput] = useState('');
	const [isCollapsed, setIsCollapsed] = useState(true);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	setBottomMenuStatusState(true);
	const onHandleChangeSearch = e => {
		setSearchInput(e.target.value);
		const value = e.target.value;
	};
	const onClickInputDelete = () => {
		setSearchInput('');
	};
	return (
		<MainContainer padding="0 0 3.125rem 0">
			<TopNav>
				<BackButton></BackButton>
				<SubText fontsize="18px" fontweight="bold" className="centerText">
					검색 결과
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
			<FeedContainer></FeedContainer>
		</MainContainer>

		// <BottomSlideMenu menu="종류">
		// 	<AlignFilter></AlignFilter>
		// 	<ColorFilter></ColorFilter>
		// 	<ItemFilter></ItemFilter>
		// 	<PriceFilter></PriceFilter>
		// </BottomSlideMenu>
	);
}
