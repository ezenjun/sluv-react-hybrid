import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from '../../../components/Input';
import { IconWrap, InputWrap } from '../../signup/SelectCeleb';

import { ReactComponent as Delete } from '../../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../../assets/Icons/searchIcon.svg';
import { ReactComponent as SelectIcon } from '../../../assets/Icons/icon_select_brand.svg';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BrandListState } from '../../../recoil/Upload';
import { useEffect } from 'react';
import { customApiClient } from '../../../utils/apiClient';
import { BottomMenuStatusState } from '../../../recoil/BottomSlideMenu';

export default function SelectBrandDialog({setBrandObj, setFlag, setBrand}) {

	
	const [brandList, setBrandList] = useRecoilState(BrandListState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const [currentBrandList, setCurrentBrandList] = useState([]);
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		if(brandList.length < 1) {
			getBrandList();
		} else {
			setCurrentBrandList(brandList);
			console.log('brandList : 데이터 있어서 조회 안해!!');
		}
	},[]);

	const getBrandList = async () => {
		const data = await customApiClient('get', '/brands');

		if (!data) return;
		if (!data.isSuccess) return;

		setBrandList(data.result);
		setCurrentBrandList(data.result);
	}

	const onHandleChangeSearch = e => {
		setSearchInput(e.target.value);

		const value = e.target.value;

		const searchResult = brandList.filter(brand => {
			if(brand.brandKr.includes(value)) {
				return brand.brandKr.includes(value);
			} else if (brand.brandEn.includes(value)) {
				return brand.brandEn.includes(value);
			}
		});

		setCurrentBrandList(searchResult);
	};
	const onClickInputDelete = () => {
		setSearchInput('');
		setCurrentBrandList(brandList);
	};

	const onClickBrandItem = (brand) => {
		setFlag(true);
		setBrandObj(brand);
		setBrand(brand.brandKr + ' ' + brand.brandEn);
		setBottomMenuStatusState(false);
	}

	return (
		<SelectBrandDialogContainer>
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
				{searchInput.length !== 0 && (
					<IconWrap onClick={onClickInputDelete}>
						<Delete />
					</IconWrap>
				)}
			</InputWrap>

			<BrandListWrap>
				{currentBrandList.length > 0 &&
					currentBrandList.map(brand => {
						return (
							<BrandListItem onClick={() => onClickBrandItem(brand)} key={brand.brandIdx}>
								<SelectIcon style={{ width: '1.5rem', height: '1.5rem' }} />
								<span className="brandKr">{brand.brandKr}</span>
								<span className="brandEn">{brand.brandEn}</span>
							</BrandListItem>
						);
					})}
			</BrandListWrap>
		</SelectBrandDialogContainer>
	);
}

const SelectBrandDialogContainer = styled.div`
	padding: 1.25rem 1.25rem 0 1.25rem;
`;

const BrandListWrap = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	height: 65vh;

	margin-top: 2.125rem;
`;

const BrandListItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.25rem;

	.brandKr {
		font-size: 1rem;
		font-weight: 600;
		color: #262626;
		margin-left: 0.5rem;
	}
	.brandEn {
		font-size: 0.875rem;
		color: #8d8d8d;
		margin-left: 0.5rem;
	}
`;
