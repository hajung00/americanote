import { useCallback } from 'react';
import { DetailStore, Store } from '../types/store';
import { mutate } from 'swr';

export const CURRENT_STORE_KEY = '/current-store';

// store 마크업 클릭 했을 때, 전역으로 관리
const useCurrentStore = () => {
  //현재 클릭한 store 전역으로 지정
  const setCurrentStore = useCallback((store: any) => {
    mutate(CURRENT_STORE_KEY, store);
  }, []);

  //전역으로 지정된 store null로 초기화
  const cleartCurrentStore = useCallback(() => {
    mutate(CURRENT_STORE_KEY, null);
  }, []);

  return {
    setCurrentStore,
    cleartCurrentStore,
  };
};
export default useCurrentStore;
