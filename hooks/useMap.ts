import { useCallback } from 'react';
import { Coordinates } from '../types/store';
import { NaverMap } from '../types/map';
import useSWR, { mutate } from 'swr';
export const INITIAL_CENTER: Coordinates = [
  37.55914398432993, 126.92523097076324,
];
export const INITIAL_ZOOM = 16;

export const MAP_KEY = '/map';

const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);

  // 전역에 map 저장
  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map);
  }, []);

  //center, zoom의 값으로 지도 이동
  const resetMapOptions = useCallback(() => {
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  //화면에서의 중심의 위도, 경도, zoom값 가져옴
  const getMapOptions = useCallback(() => {
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);
  return {
    initializeMap,
    resetMapOptions,
    getMapOptions,
  };
};

export default useMap;
