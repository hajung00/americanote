import React, { useEffect, useState } from 'react';
import { Marker } from '../../types/map';

const MarkerItem = ({ map, coordinates, icon, onClick }: Marker): null => {
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);

  useEffect(() => {
    //지도에 store marker로 표시
    let marker: naver.maps.Marker | null = null;
    if (map) {
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(...coordinates),
        icon,
      });

      setMarker(marker);
      const handleMouseOver = () => {
        setMarker((prevMarker: any) => {
          prevMarker.setIcon('assets/marker-selected.png');
          return prevMarker;
        });
      };

      const handleMouseOut = () => {
        setMarker((prevMarker: any) => {
          prevMarker.setIcon('assets/marker.png');
          return prevMarker;
        });
      };

      //marker 클릭하면 event
      if (onClick) {
        naver.maps.Event.addListener(marker, 'click', onClick);
      }
      // naver.maps.Event.addListener(marker, 'mouseover', handleMouseOver);
      // naver.maps.Event.addListener(marker, 'mouseout', handleMouseOut);
    }
    return () => {
      marker?.setMap(null);
    };
  }, [map]);

  return null;
};

export default MarkerItem;
