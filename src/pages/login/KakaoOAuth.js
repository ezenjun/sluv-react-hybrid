const CLIENT_ID = '203e7070b221e304d3ea7500a88f9475';
const REDIRECT_URI = 'https://sluv.co.kr/auth/kakao-login';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
