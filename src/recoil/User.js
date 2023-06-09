import { atom } from 'recoil';

export const SignupProgressState = atom({
	key: 'SignupProgressState',
	default: 1,
});

export const SocialLoginCompleteState = atom({
	key: 'SocialLoginCompleteState',
	default: false,
});

export const SocialLoginUserIdxState = atom({
	key: 'SocialLoginUserIdxState',
	default: -1,
});

export const AutoLoginState = atom({
	key: 'AutoLoginState',
	default: false,
});
