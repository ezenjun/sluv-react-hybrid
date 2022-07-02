import { atom } from "recoil";

export const TotalCelebListState = atom({
	key: "TotalCelebListState",
	default: [],
});

export const ChooseCelebCurrentPageState = atom({
	key: 'ChooseCelebCurrentPageState',
	default: 0,
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

// 삭제 예정
export const SingerListState = atom({
	key: 'SingerListState',
	default: [],
});

