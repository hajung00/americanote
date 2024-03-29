import axios from 'axios';
import { backUrl } from '../config/config';

// 모든 매장 정보 가져오기
export const getAllStoreAPI = async () => {
  const result = await axios
    .get(`${backUrl}/api/cafe/all`)
    .then((response: any) => {
      if (response.status == '200') {
        return response.data.data;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('모든 매장 정보  API요청 실패', error);
    });
  console.log('모든 매장 정보 ', result);
  return result;
};

// 매장 상세 정보 가져오기
export const getStoreDetailAPI = async (id: number) => {
  const result = await axios
    .get(`${backUrl}/api/cafe/info?id=${id}`)
    .then((response: any) => {
      if (response.status == '200') {
        return response.data.data;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('매장 상세 정보 API요청 실패', error);
    });
  console.log('매장 상세 정보', result);
  return result;
};
