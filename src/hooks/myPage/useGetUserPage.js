import { getUserPageApi } from '../../apis/myPageApi';
import { useQuery } from '@tanstack/react-query';

const useGetUserPage = ( userIdx, {onSuccess} ) => {
	return useQuery(['getUserPage', userIdx], () => getUserPageApi(userIdx), {
		onSuccess
	});
};

export default useGetUserPage;
