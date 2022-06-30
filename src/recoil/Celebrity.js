import { atom } from "recoil";

export const TotalCelebListState = atom({
	key: "TotalCelebListState",
	default: [],
})

export const SingerListState = atom({
	key: "SingerListState",
	default: [],
});

export const ActorListState = atom({
	key: 'ActorListState',
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