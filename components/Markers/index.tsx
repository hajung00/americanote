import React from 'react';
import MarkerItem from '../Marker';
import useSWR from 'swr';
import { MAP_KEY } from '../../hooks/useMap';
import { Store } from '../../types/store';
import useCurrentStore, {
  CURRENT_STORE_KEY,
} from '../..//hooks/useCurrentStore';
import { ImageIcon } from '../../types/map';
import { STORE_KEY } from '../../hooks/useStores';

const Markers = () => {
  const { data: stores } = useSWR<Store[]>(STORE_KEY);
  const { data: map } = useSWR(MAP_KEY);

  const { data: currentstore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, cleartCurrentStore } = useCurrentStore();

  // const { data: current } = useSWR(CURRENT_STORE_KEY);
  // console.log('클릭한 매장 정보', current);

  console.log(stores);
  if (!map || !stores) return null;

  return (
    <div>
      {stores.map((store: any) => {
        return (
          <MarkerItem
            map={map}
            coordinates={[store.latitude, store.longitude]}
            icon={generateStoreMarkerIcon(false)}
            key={store.id}
            onClick={() => {
              setCurrentStore(store);
            }}
          />
        );
      })}
      {
        // 클릭된 store정보가 있는 경우 마커가 최상단에 위치할 수 있도록
        currentstore && (
          <MarkerItem
            map={map}
            coordinates={[currentstore.latitude, currentstore.longitude]}
            icon={generateStoreMarkerIcon(true)}
            key={currentstore.id}
            // onClick={() => {
            //   setCurrentStore(currentstore);
            // }}
            onClick={cleartCurrentStore}
          />
        )
      }
    </div>
  );
};

export default Markers;

//marker icon으로 표시
export function generateStoreMarkerIcon(isSelected: boolean): ImageIcon {
  return {
    url: isSelected ? 'assets/marker-selected.png' : 'assets/marker.png',
    size: isSelected
      ? new naver.maps.Size(48, 48)
      : new naver.maps.Size(36, 36), //아이콘 크기
    origin: new naver.maps.Point(0, 0),
  };
}
