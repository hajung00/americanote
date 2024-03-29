import React from 'react';
import styled from 'styled-components';

// import components
import ScentTag from '../ScentTag';
import { DetailStore } from '../../types/store';

// import svg
import Star from '../../public/assets/star.svg';
import Beans from '../../public/assets/beans.svg';
import Favorite from '../../public/assets/favorite.svg';

const HorizontalCardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  cursor: pointer;
`;
const ImgWrapper = styled.div<{ src: string }>`
  width: 110px;
  height: 110px;
  background: #fff;
  position: relative;

  .img {
    width: 100%;
    height: 100%;
    background-image: ${(props) => props.src && `url(${props.src})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  & > svg {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
const InfoWrapper = styled.div`
  min-width: fit-content;
  width: 59%;
  width: calc(100% - 110px - 14px);
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    padding-right: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #5d4c21;

    .title {
      color: #2c2310;
      font-family: 'Pretendard';
      font-size: 16px;
      font-weight: 600;
    }
    .review {
      color: #2c2310;
      font-family: 'Pretendard';
      font-size: 12px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 2px;
    }
  }

  .scent-wrapper {
    display: flex;
    flex-flow: wrap;
    gap: 6px;
    width: 100%;
    margin-top: 10px;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  height: 24px;
  gap: 8px;
  margin-top: 12px;
  width: 100%;
  flex-flow: wrap;

  .tag {
    width: fit-content;
    background: #fff;
    border-radius: 4px;
    display: flex;
    height: 24px;
    padding: 4px 6px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 500;
  }
  .strength {
    color: #5b4132;
  }
  .acidity {
    color: #8d6949;
  }
`;

interface Props {
  user: string;
  store: DetailStore;
  onClick: (id: number) => void;
  // 카페 정보
}
const HorizontalCard: any = ({ user, store, onClick }: Props) => {
  return (
    <HorizontalCardWrapper
      onClick={() => {
        onClick(store.cafeId);
      }}
    >
      <ImgWrapper src={`${store.imageUrl}`}>
        <div className='img'></div>
        {user && store.isHeart && (
          <Favorite width={28} height={28} alt={'favorite'} color={'#EE5329'} />
        )}
      </ImgWrapper>
      <InfoWrapper>
        <div className='title-wrapper'>
          <div className='title'>{store.cafeName}</div>
          <div className='review'>
            <Star width={12} height={12} color={'#FFBD31'} />
            {store.avgStar}
          </div>
        </div>
        <div className='scent-wrapper'>
          {store.coffeeDetail.flavours.map(
            (scent: { [key: string]: string }, i: number) => (
              <ScentTag key={i} title={scent.flavour} />
            )
          )}
        </div>
        <TagWrapper>
          <div className='tag strength'>
            <Beans width={18} height={18} alt={'beans'} color={`#5B4132`} />
            강도 {store.coffeeDetail.intensity}
          </div>
          <div className='tag acidity'>
            <Beans width={18} height={18} alt={'beans'} color={`#8D6949`} />
            산미 {store.coffeeDetail.acidity}
          </div>
        </TagWrapper>
      </InfoWrapper>
    </HorizontalCardWrapper>
  );
};

export default HorizontalCard;
