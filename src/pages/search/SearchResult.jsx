import React from 'react';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AlignFilter from '../../components/Filters/AlignFilter';
import ColorFilter from '../../components/Filters/ColorFilter';
import ItemFilter from '../../components/Filters/ItemFilter';
import PriceFilter from '../../components/Filters/PriceFilter';

export default function SearchResult() {
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	setBottomMenuStatusState(true);
	return (
		<BottomSlideMenu menu="종류">
			{/* <AlignFilter></AlignFilter> */}
			<ColorFilter></ColorFilter>
			{/* <ItemFilter></ItemFilter> */}
			{/* <PriceFilter></PriceFilter> */}
		</BottomSlideMenu>
	);
}
