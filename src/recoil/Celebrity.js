import { atom } from "recoil";

export const TotalCelebListState = atom({
	key: "TotalCelebListState",
	default: [],
});

export const PopularCelebListState = atom({
	key: 'PopularCelebListState',
	default: [],
});

export const FavoriteCelebListState = atom({
	key: 'FavoriteCelebListState',
	default: [],
});

export const ChooseCelebCurrentPageState = atom({
	key: 'ChooseCelebCurrentPageState',
	default: 0,
});

// 확정된 관심셀럽 인덱스 리스트(전역적으로 사용)
export const UserFavoriteCelebIdxListState = atom({
	key: 'UserFavoriteCelebIdxListState',
	default: [],
});




export const celebCategoryList = [
	{
		idx: 1,
		name: '가수'
	},
	{
		idx: 2,
		name: '배우'
	},
]



