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
export const getStoreDetailAPI = async (
  user: string | undefined,
  id: number
) => {
  if (user) {
    const headers = {
      Authorization: `Bearer ${user}`,
      'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
    };

    const result = await axios
      .get(`${backUrl}/api/cafe/info?id=${id}`, { headers })
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
  } else {
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
  }
};

// 내 취향에 맞는 카페 정보 가져오기
export const getMyTasteStoreAPI = async (user: string | null) => {
  if (user) {
    console.log(user);
    const headers = {
      Authorization: `Bearer ${user}`,
      'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
    };

    const result = await axios
      .get(`${backUrl}/api/cafe/recommend`, { headers })
      .then((response: any) => {
        if (response.status == '200') {
          return response.data.data;
        }
      })
      .catch((error: any) => {
        // 에러 처리
        console.error('내 취향에 맞는 카페 정보 API요청 실패', error);
      });
    console.log('내 취향에 맞는 카페 정보', result);
    return result;
  }
};

// 좋아요 누른 카페 정보 가져오기
export const getPreferStoreAPI = async (user: string | null) => {
  if (user) {
    const headers = {
      Authorization: `Bearer ${user}`,
      'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
    };

    const result = await axios
      .get(`${backUrl}/api/mypage/like`, { headers })
      .then((response: any) => {
        if (response.status == '200') {
          return response.data.data;
        }
      })
      .catch((error: any) => {
        // 에러 처리
        console.error('좋아요 누른 카페 정보 API요청 실패', error);
      });
    console.log('좋아요 누른 카페 정보', result);
    return result;
  }
};

// 카페 좋아요 요청 보내기
export const postPreferStoreAPI = async (user: string | null, id: number) => {
  if (user) {
    const headers = {
      Authorization: `Bearer ${user}`,
      'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
    };

    const result = await axios
      .post(`${backUrl}/api/like?cafeId=${id}`, '', { headers })
      .then((response: any) => {
        if (response.status == '200') {
          return response.status;
        }
      })
      .catch((error: any) => {
        // 에러 처리
        console.error('카페 좋아요 API 요청 실패', error);
      });
    console.log('카페 좋아요 요청', result);
    return result;
  }
};

// 최근 검색어 가져오기
export const getRecentKeywordAPI = async (user: string | null) => {
  if (user) {
    const headers = {
      Authorization: `Bearer ${user}`,
      'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
    };

    const result = await axios
      .get(`${backUrl}/api/cafe/recent`, { headers })
      .then((response: any) => {
        if (response.status == '200') {
          return response.data.data;
        }
      })
      .catch((error: any) => {
        // 에러 처리
        console.error('최근 검색어 가져오기 API 요청 실패', error);
      });
    console.log('최근 검색어 가져오기 요청', result);
    return result;
  }
};

// 최근 검색어 삭제
export const DeleteRecentKeywordAPI = async (user: string, keyword: string) => {
  if (user) {
    const headers = {
      Authorization: `Bearer ${user}`,
      'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
    };

    const result = await axios
      .delete(`${backUrl}/api/cafe/research?keyword=${keyword}`, { headers })
      .then((response: any) => {
        if (response.status == '200') {
          return response.data.data;
        }
      })
      .catch((error: any) => {
        // 에러 처리
        console.error('최근 검색어 삭제 API 요청 실패', error);
      });
    console.log('최근 검색어 삭제 요청', result);
    return result;
  }
};

// 카페 필터링
export const getFilteredStoreAPI = async (
  price: string[],
  flavours: string[],
  intensity: string[],
  acidity: string[]
) => {
  const params = {
    priceRanges: price.length === 0 ? null : price,
    flavours: flavours.length === 0 ? null : flavours,
    intensitys: intensity.length === 0 ? null : intensity,
    aciditys: acidity.length === 0 ? null : acidity,
  };
  const result = await axios
    .post(`${backUrl}/api/cafe/filter`, params)
    .then((response: any) => {
      if (response.status == '200') {
        return response.data.data;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('카페 필터링 API 요청 실패', error);
    });
  console.log('카페 필터링 요청', result);
  return result;
};

// 카페 검색
export const getSearchStoreAPI = async (
  user: string | undefined,
  keyword: string
) => {
  if (user) {
    const headers = {
      Authorization: `Bearer ${user}`,
      'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
    };

    const result = await axios
      .get(`${backUrl}/api/cafe/search?keyword=${keyword}`, { headers })
      .then((response: any) => {
        if (response.status == '200') {
          return response.data.data;
        }
      })
      .catch((error: any) => {
        // 에러 처리
        console.error('카페 검색 API요청 실패', error);
      });
    console.log('카페 검색', result);
    return result;
  } else {
    const result = await axios
      .get(`${backUrl}/api/cafe/search?keyword=${keyword}`)
      .then((response: any) => {
        if (response.status == '200') {
          return response.data.data;
        }
      })
      .catch((error: any) => {
        // 에러 처리
        console.error('카페 검색 API요청 실패', error);
      });
    console.log('카페 검색', result);
    return result;
  }
};
