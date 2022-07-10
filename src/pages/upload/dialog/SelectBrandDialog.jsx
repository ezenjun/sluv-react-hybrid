import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from '../../../components/Input';
import { IconWrap, InputWrap } from '../../signup/SelectCeleb';

import { ReactComponent as Delete } from '../../../assets/Icons/delete_input.svg';
import { ReactComponent as SearchIcon } from '../../../assets/Icons/searchIcon.svg';
import { ReactComponent as SelectIcon } from '../../../assets/Icons/icon_select_brand.svg';
import { useRecoilState } from 'recoil';
import { BrandListState } from '../../../recoil/Upload';
import { useEffect } from 'react';
import { customApiClient } from '../../../utils/apiClient';

export default function SelectBrandDialog() {

	const [searchInput, setSearchInput] = useState('');
	const [brandList, setBrandList] = useRecoilState(BrandListState);

	useEffect(() => {
		if(brandList.length < 1) {
			getBrandList();
		} else {
			console.log('brandList : 데이터 있어서 조회 안해!!');
		}
	},[]);
	const getBrandList = async () => {
		const data = await customApiClient('get', '/brands');

		if (!data) return;
		if (!data.isSuccess) return;

		console.log(data.result);
		setBrandList(data.result);
	}
	const onHandleChangeSearch = e => {
		setSearchInput(e.target.value);
	};
	const onClickInputDelete = () => {
		setSearchInput('');
	};

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
			{brandList.length > 0 && brandList.map((brand) => {
				return (
					<BrandListItem key={brand.brandIdx}>
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
