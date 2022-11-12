import { customApiClient, HttpMethod } from "../utils/apiClient";

/**
 * 특정 유저 페이지 조회(GET) API
 */
export const getUserPageApi = (userIdx) => customApiClient(HttpMethod.GET, `/users/${userIdx}/page`);

