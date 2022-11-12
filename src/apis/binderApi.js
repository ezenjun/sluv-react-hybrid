import { customApiClient, HttpMethod } from "../utils/apiClient";

// 바인더 목록 조회(GET) API
export const getBinderApi = () => customApiClient(HttpMethod.GET, '/binders');

