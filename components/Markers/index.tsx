import React from "react";
import MarkerItem from "../Marker";
import useSWR from "swr";
import { MAP_KEY } from "../../hooks/useMap";
import { Store } from "../../types/store";
import useCurrentStore, {
  CURRENT_STORE_KEY,
} from "../..//hooks/useCurrentStore";
import { ImageIcon } from "../../types/map";

const Markers = () => {
  const stores = [
    {
      nid: 921173728,
      season: 1,
      episode: 1,
      characteristic: "마트식당",
      name: "test1",
      coordinates: [37.6632778, 127.1184593],
      foodKind: "육류,고기요리",
      address: "경기 남양주시 별내3로 285 현대아이파크 상가 101호",
      phone: "031-529-6614",
      images: [
        "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200806_209%2F1596715795514pShOx_JPEG%2F10RMJ6Jg_vNVXO62NBXxZOwP.jpg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190128_234%2F15486734277742miJS_JPEG%2FEj2MjgQQ75Vb7dbMnspaYImb.jpg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w278_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190123_170%2F15482414191151X1te_JPEG%2FUGCarY_iUhKY_L4DBCnfv8TJ.jpg",
      ],
      description:
        "마트가격으로 모든 상품을 구매하여 바로 옆 식당에서 먹는다는 상상을 해보셨습니까? 돼지고기 소고기를 비롯하여 햄, 베이컨, 오리 훈제는 물론 마트에서 판매하는 모든상품을 조리가 가능한 정말 간편한 식당입니다.",
      menus: [{ name: "정육점 모든상품 마트가격 판매", price: "변동" }],
    },
    {
      nid: 1126233571,
      season: 1,
      episode: 3,
      characteristic: "로봇치킨",
      name: "test2",
      coordinates: [37.50948837278171, 127.03812595602298],
      foodKind: "치킨,닭강정",
      address: "서울 강남구 언주로 604 아크로힐스논현 상가 103호",
      phone: "02-543-0557",
      images: [
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200103_286%2F1578039052981HylC5_JPEG%2Fimage.jpg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w278_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200925_4%2F1600998675292TD3MG_JPEG%2FjJeR0u2McrGIIZL-CjSfTZOz.jpg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w278_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200130_253%2F1580370364620GPRJL_JPEG%2FVFd9FkblIC7AC5qwdanYqa6O.JPG.jpg",
      ],
      description:
        "치킨로봇 롸버트가 조리하는 롸버트치킨 강남 1호기 입니다. 롸버트치킨은 로봇이 정확하고 균일하게 조리한 맛있는 치킨을 배달/테이크아웃으로 판매합니다.",
      menus: [
        { name: "롸버트 후라이드", price: "16,900원" },
        { name: "후추를 후추후추치킨", price: "17,900원" },
        { name: "롸버트 양념치킨", price: "17,900원" },
        { name: "롸버트 후라이드 + 첫사랑 IPA", price: "19,900원" },
        { name: "(반반) 양념/후추후추 + 옥수수 튀김", price: "20,800원" },
      ],
    },
    {
      nid: 18708805,
      season: 1,
      episode: 3,
      characteristic: "초코치킨",
      name: "test3",
      coordinates: [37.4792346, 126.9598625],
      foodKind: "치킨,닭강정",
      address: "서울 관악구 행운2길 16 강수빌딩",
      phone: "02-872-0029",
      images: [
        "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210816_34%2F1629114919941flul5_JPEG%2FRRBhcOMY1ZF8ZRXvBBbyWVII.jpg",
        "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210816_109%2F1629113687181npaK6_JPEG%2FyXlMVc6kCoSFTGGlgkYURKac.jpg",
        "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200806_187%2F15966849833366LMIG_JPEG%2FIt7I0K1BSsmGuXSGiGqgYmpM.jpeg.jpg",
      ],
      description: "낙성대 양이 너무 많은 치킨",
      menus: [
        { name: "충성치(아저씨충성치킨)", price: "29,500원" },
        { name: "초코치킨", price: "26,000원" },
        { name: "치킨& 친구들", price: "19,000원" },
        { name: "치즈범벅", price: "25,000원" },
        { name: "아정차(아저씨정성치킨)", price: "29,500원" },
        { name: "아사치(아저씨사랑치킨)", price: "29,500원" },
        { name: "클레이지 초코치킨", price: "30,000원" },
        { name: "감자튀김", price: "10,000원" },
        { name: "감자&새우튀김", price: "1,400원" },
        { name: "왕새우튀김", price: "20,000원" },
      ],
    },
  ];

  const { data: map } = useSWR(MAP_KEY);

  const { data: currentstore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, cleartCurrentStore } = useCurrentStore();

  const { data: current } = useSWR(CURRENT_STORE_KEY);
  console.log("클릭한 매장 정보", current);

  if (!map || !stores) return null;

  return (
    <div>
      {stores.map((store: any) => {
        return (
          <MarkerItem
            map={map}
            coordinates={store.coordinates}
            icon={generateStoreMarkerIcon(false)}
            key={store.nid}
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
            coordinates={currentstore.coordinates}
            icon={generateStoreMarkerIcon(true)}
            key={currentstore.nid}
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
    url: isSelected ? "assets/marker-selected.png" : "assets/marker.png",
    size: isSelected
      ? new naver.maps.Size(48, 48)
      : new naver.maps.Size(36, 36), //아이콘 크기
    origin: new naver.maps.Point(0, 0),
  };
}
