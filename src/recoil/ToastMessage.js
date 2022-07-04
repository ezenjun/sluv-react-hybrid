import { atom } from 'recoil';

export const ToastMessageStatusState = atom({
	key: 'ToastMessageStatusState',
	default: false,
});

export const ToastMessageWrapStatusState = atom({
	key: 'ToastMessageWrapStatusState',
	default: false,
});

export const ToastMessageState = atom({
	key: 'ToastMessageState',
	default: '',
});

export const ToastMessageBottomPositionState = atom({
	key: 'ToastMessageBottomPositionState',
	default: '',
});
