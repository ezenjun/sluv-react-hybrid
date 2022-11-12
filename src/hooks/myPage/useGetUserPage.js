import { getUserPageApi } from '../../apis/myPageApi';
import { useQuery } from '@tanstack/react-query';

const useGetUserPage = (userIdx, { onSuccessGetUserPage }) => {
	return useQuery(['getUserPage', userIdx], () => getUserPageApi(userIdx), {
		onSuccess: onSuccessGetUserPage,
	});
};

export default useGetUserPage;
