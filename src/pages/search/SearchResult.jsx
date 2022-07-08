import React from 'react';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ItemFilter from '../../components/Filters/ItemFilter';

export default function SearchResult() {
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	setBottomMenuStatusState(true);
	return (
		<BottomSlideMenu menu="종류">
			<ItemFilter></ItemFilter>
		</BottomSlideMenu>
	);
}
