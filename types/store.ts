type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng]; //지도 좌표

export type Menu = { name: string; price: string }; //메뉴

//매장 정보
export type Store = {
  nid: number;
  name: string;
  description: string;
  season: number;
  episode: number;
  coordinates: Coordinates;
  images: string[];
  characteristic: string;
  foodKind: string;
  address: string;
  phone: string;
  menus: Menu[];
};
