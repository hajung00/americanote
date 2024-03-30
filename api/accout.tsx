import axios from 'axios';
import { backUrl } from '../config/config';
import Cookies from 'js-cookie';

// 카카오 로그인
export const loginAPI = async (accessToken: string) => {
  const [token, isTaste]: any = await axios
    .get(`${backUrl}/api/user/kakao?code=${accessToken}`)
    .then((response: any) => {
      if (response.status == '200') {
        const authorizationHeader = response.headers.get('Authorization');
        if (authorizationHeader) {
          const token = authorizationHeader.split(' ')[1]; // 'Bearer <token>'에서 <token> 추출
          // 바디에 유저가 선택한 취향 있는지 확인
          return [token, response.data.data];
        }
      }
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('카카오 로그인 API요청 실패', error);
    });
  console.log('인증 토큰', token, isTaste);
  return [token, isTaste];
};

// 로그아웃

export const logoutAPI = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
  };

  const result: any = await axios
    .post(`${backUrl}/api/user/logout`, null, { headers })
    .then((response: any) => {
      if (response.status == '200') {
        Cookies.remove('token');
        return response.status;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('로그아웃 API요청 실패', error);
    });
  console.log('로그아웃');
  return result;
};
