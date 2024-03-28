import React from "react";
import Map from "../Map";
import useMap from "../../hooks/useMap";
import useCurrentStore from "../../hooks/useCurrentStore";
import { NaverMap } from "../../types/map";
import Markers from "../Markers";

const MapSection = () => {
  const { initializeMap } = useMap();
  const { cleartCurrentStore } = useCurrentStore();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, "click", cleartCurrentStore);
  };

  return (
    <div>
      <Map onLoad={onLoadMap} />
      <Markers />
    </div>
  );
};

export default MapSection;
