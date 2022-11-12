import axios from 'axios';

const devServerURL = 'https://dev.cmc-sluv.shop'; //개발 서버
// const prodServerURL = "http://54.180.217.46/"; //실 서버

export const apiClient = axios.create({
	// baseURL: process.env.NODE_ENV !== 'development' ? prodServerURL : devServerURL,
	baseURL: devServerURL,
});

export const HttpMethod = {
	DELETE: 'delete',
	GET: 'get',
	POST: 'post',
	PUT: 'put',
	PATCH: 'patch',
};

export const customApiClient = async (method, url, data, jwtKey) => {
	try {
		const result = await apiClient(url, {
			method: method,
			data: data,
			headers: {
				'X-ACCESS-TOKEN': jwtKey ? jwtKey : localStorage.getItem('x-access-token'),
			},
		});

		return result.data;
	} catch (err) {
		console.log(err.response);
		console.log(err.message);

		if (!err.response) {
			return 'Network Error';
		}

		return null;
	}
};
