import { atom } from 'recoil';

export const BottomMenuStatusState = atom({
	key: 'BottomMenuStatusState',
	default: false,
});

// 선택한 모든 필터 합치는 용
export const TotalSelectedFilterState = atom({
	key: 'TotalSelectedFilterState',
	default: false,
});

// 아이템
export const ItemCategorySelectedState = atom({
	key: 'ItemCategorySelectedState',
	default: 0,
});
export const ItemSubStatusState = atom({
	key: 'ItemSubStatusState',
	default: [],
});
export const ItemSubListState = atom({
	key: 'ItemSubListState',
	default: [],
});
// 가격대
export const PriceSelectedState = atom({
	key: 'PriceSelectedState',
	default: 0,
});
// 정렬
export const AlignSelectedState = atom({
	key: 'AlignSelectedState',
	default: 0,
});
// 색상
export const ColorListState = atom({
	key: 'ColorListState',
	default: [],
});
export const ColorStatusState = atom({
	key: 'ColorStatusState',
	default: [],
});
