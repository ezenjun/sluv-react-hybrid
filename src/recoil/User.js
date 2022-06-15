import { atom } from 'recoil';

export const GoogleUserInfoState = atom({
	key: 'GoogleUserInfoState',
	default: [],
});

export const SignupProgressState = atom({
	key: 'SignupProgressState',
	default: 1,
});
