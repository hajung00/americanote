import axios from 'axios';
import { backUrl } from '../config/config';

// 내 정보 가져오기
export const getMyProfileAPI = async (user: string | null) => {
  if (user) {
    console.log(user);
    const headers = {
      Authorization: `Bearer ${user}`,
      'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
    };

    const result = await axios
      .get(`${backUrl}/api/mypage`, { headers })
      .then((response: any) => {
        if (response.status == '200') {
          return response.data.data;
        }
      })
      .catch((error: any) => {
        // 에러 처리
        console.error('내 정보 API요청 실패', error);
      });
    console.log('내 정보', result);
    return result;
  }
};

// 내 커피 취향 등록하기
export const postMyTasteAPI = async (
  user: string | null,
  flavours: string[],
  intensity: string,
  acidity: string
) => {
  if (user) {
    const headers = {
      Authorization: `Bearer ${user}`,
      'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
    };
    const params = {
      flavours: flavours,
      intensity: intensity,
      acidity: acidity,
    };
    console.log(user, params);

    const result = await axios
      .put(`${backUrl}/api/mypage/choose-prefer`, params, {
        headers,
      })
      .then((response: any) => {
        if (response.status == '200') {
          return response.status;
        }
      })
      .catch((error: any) => {
        // 에러 처리
        console.error('내 커피 취향 등록 API요청 실패', error);
      });
    console.log('내 커피 취향 등록', result);
    return result;
  }
};
