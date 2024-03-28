import axios from 'axios';
import { backUrl } from '../config/config';

export const loginAPI = async (accessToken: string) => {
  const result = await axios
    .get(`${backUrl}/api/user/kakao?code=${accessToken}`)
    .then((response: any) => {
      if (response.status == '200') {
        const authorizationHeader = response.headers.get('Authorization');
        if (authorizationHeader) {
          const token = authorizationHeader.split(' ')[1]; // 'Bearer <token>'에서 <token> 추출
          return token;
        }
      }
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('카카오 로그인 API요청 실패');
    });
  console.log('인증 토큰', result);
  return result;
};
