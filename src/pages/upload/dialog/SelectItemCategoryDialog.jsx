import React from 'react'
import { useState } from 'react';
import { BottomDialogDiv, BottomDialogWrap, CloseWrap } from '../../../components/containers/BottomSlideMenu';
import { filterList } from '../../../components/containers/SearchBottomSlideMenu'
import { BottomWrap, Filter, FilterContainer, TopWrap } from '../../../components/Filters/ItemFilter'
import { HorizontalLine } from '../../../components/Lines/HorizontalLine';
import { ReactComponent as Close } from '../../../assets/Icons/CloseX.svg';
import { useRecoilState } from 'recoil';
import { BottomMenuStatusState } from '../../../recoil/BottomSlideMenu';

export default function SelectItemCategoryDialog(props) {

	const [bottomMenuStatusState,setBottomMenuStatusState] = useRecoilState(BottomMenuStatusState);

	const closeDialog = () => {
		if (props.selectedMainFilter) {
			if (props.selectedSubFilter) {
				props.setCategory(
					filterList[props.selectedMainFilter - 1].name + ' > ' + props.selectedSubFilter
				);
			} else {
				props.getSelectedSubFilter('기타');
				props.setCategory(
					filterList[props.selectedMainFilter - 1].name);
			}
			props.setIsCategory(true);
		}
		setBottomMenuStatusState(false);
	};

	const setSelectedMainFilter = input => {
		props.getSelectedMainFilter(input);
	};
	const setSelectedSubFilter = input => {
		props.getSelectedSubFilter(input);
	};

	const onMainSelect = idx => {
		if (props.selectedMainFilter === idx) {
			setSelectedMainFilter(0);
			props.setCategory('');
			props.setIsCategory(false);
			setSelectedSubFilter('');
		} else {
			setSelectedMainFilter(idx);
			setSelectedSubFilter(filterList[idx-1].list[0]);
			
		}
	};

	const onSubSelect = (subfilter, index) => {
		if (props.selectedSubFilter === subfilter) {
			setSelectedSubFilter('');
		} else {
			setSelectedSubFilter(subfilter);
		}
		
	}

	return (
		<BottomDialogWrap openStatus={bottomMenuStatusState}>
			<div onClick={closeDialog} style={{ height: '100%', width: '100%' }}></div>
			<BottomDialogDiv openStatus={bottomMenuStatusState}>
				<CloseWrap>
					<div
						style={{
							display: 'flex',
							position: 'relative',
							left: '50%',
							transform: 'translate(-50%)',
							height: '1.5rem',
							alignItems: 'center',
							fontSize: '1.125rem',
							fontWeight: 'bold',
						}}
					>
						아이템 종류
					</div>

					<Close
						style={{
							width: '1.5rem',
							height: '1.5rem',
							position: 'absolute',
							right: '1.25rem',
						}}
						onClick={closeDialog}
					></Close>
				</CloseWrap>
				<FilterContainer>
					<TopWrap>
						{filterList.map(filter => (
							<Filter
								key={filter.idx}
								selected={props.selectedMainFilter === filter.idx}
								onClick={() => onMainSelect(filter.idx)}
							>
								{filter.name}
							</Filter>
						))}
					</TopWrap>
					<HorizontalLine margin="0.5rem 0 1.25rem"></HorizontalLine>
					<BottomWrap>
						{props.selectedMainFilter > 0 && (
							<>
								{filterList[props.selectedMainFilter - 1].list.map(
									(subfilter, index) => (
										<Filter
											key={subfilter}
											selected={props.selectedSubFilter === subfilter}
											onClick={() => onSubSelect(subfilter, index)}
										>
											{subfilter}
										</Filter>
									)
								)}
							</>
						)}
					</BottomWrap>
				</FilterContainer>
			</BottomDialogDiv>
		</BottomDialogWrap>
	);
}
