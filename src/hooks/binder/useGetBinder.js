import { useQuery } from "@tanstack/react-query"
import { getBinderApi } from "../../apis/binderApi"

const useGetBinder = ({onSuccessGetBinder}) => {
	return useQuery(['getBinder'], getBinderApi, {
		onSuccess: onSuccessGetBinder
	})
}

export default useGetBinder;