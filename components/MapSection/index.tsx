import React, { useMemo } from 'react';
import Map from '../Map';
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from '../../hooks/useMap';
import useCurrentStore from '../../hooks/useCurrentStore';
import { NaverMap } from '../../types/map';
import Markers from '../Markers';
import { useRouter } from 'next/router';
import { Coordinates } from '../../types/store';

const MapSection = () => {
  const { initializeMap } = useMap();
  const { cleartCurrentStore } = useCurrentStore();

  const router = useRouter();
  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const initialZoom = useMemo(
    () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
    [query]
  );

  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get('lat') && query.get('lng')
        ? [Number(query.get('lat')), Number(query.get('lng'))]
        : INITIAL_CENTER,
    [query]
  );

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, 'click', cleartCurrentStore);
  };

  return (
    <div>
      <Map
        onLoad={onLoadMap}
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      />
      <Markers />
    </div>
  );
};

export default MapSection;
