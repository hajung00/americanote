type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng]; //지도 좌표

export type Menu = { name: string; price: string }; //메뉴

//매장 위치
export type Store = {
  id: number;
  latitude: number;
  longitude: number;
};

//매장 상세 정보
export type DetailStore = {
  cafeId: number;
  imageUrl: string;
  cafeName: string;
  avgStar: number;
  coffeeDetail: {
    name: string;
    flavours: [{ [key: string]: string }];
    intensity: string;
    acidity: string;
    price: number;
  };
  reviews: [{ [key: string]: any }];
  isHeart: boolean;
};
