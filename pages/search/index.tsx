'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { CURRENT_STORE_KEY } from '../../hooks/useCurrentStore';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// import components
import ContentsLayout from '../../components/ContentsLayout';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import MapSection from '../../components/MapSection';
import StoreDetailModal from '../../components/StoreDetailModal';
import FilterModal from '../../components/FilterModal';

// import svg
import StrengthSVG from '../../public/assets/strength.svg';
import ScentSVG from '../../public/assets/scent.svg';
import AciditySVG from '../../public/assets/acidity.svg';
import SearchSVG from '../../public/assets/search.svg';
import ArrowSVG from '../../public/assets/arrow_down.svg';
import FilterSVG from '../../public/assets/filter.svg';
import XSVG from '../../public/assets/x.svg';
import useStores from '../../hooks/useStores';
import { getAllStoreAPI } from '../../api/store';
import { Store } from '../../types/store';
import { getCookieValue } from '../../func/getCookieValue';

const PageWrapper = styled.div`
  height: calc(100vh - 80px - 78px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }

  // naver 로고 제거
  img[alt~='NAVER'] {
    display: none !important;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .title {
    color: #2c2310;
    font-family: 'Montserrat';
    font-size: 26px;
    font-weight: 600;
    line-height: 26px;
  }
  .svg-wrapper {
    display: flex;
    gap: 6px;
  }
`;

const FilterSection = styled.div`
  position: absolute;
  top: 36px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  gap: 16px;

  .filter-item-wrapper {
    display: flex;
    gap: 10px;
    overflow: scroll;
    // max-width: 306px;
    &::-webkit-scrollbar {
      display: none;
    }

    .filter-item {
      padding: 6px 12px;
      border-radius: 100px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      color: var(--Brand-Color, #2c2310);
      font-family: 'Pretendard';
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
      min-width: fit-content;
    }

    .select {
      color: #fff;
      background: var(--Brand-500, #5b4132);
    }
  }
  .filter-icon {
    width: 38px;
    height: 38px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  }
  .color {
    border: 1px solid #5b4132;
  }
`;

interface Props {
  user: string;
  stores: Store[];
}

const Search = ({ user, stores }: Props) => {
  const router = useRouter();
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  const { data: current } = useSWR(CURRENT_STORE_KEY);

  const [storeDetailModal, setStoreDetailModal] = useState(false);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const onClosedDetailModal = useCallback(() => {
    setStoreDetailModal((prev) => !prev);
  }, []);

  useEffect(() => {
    if (current) {
      setStoreDetailModal((prev) => !prev);
    }
  }, [current]);

  const [price, setPrice] = useState<any>();
  const [scent, setScent] = useState<any>([]);
  const [strength, setStrength] = useState<any>();
  const [acidity, setAcidity] = useState<any>();

  const [filterModal, setfilterModal] = useState(false);
  const filterModalHandler = useCallback(() => {
    setfilterModal((prev) => !prev);
  }, []);

  const handleSaveFilter = useCallback((a: any, b: any, c: any, d: any) => {
    setPrice(a);
    setScent([...b]);
    setStrength(c);
    setAcidity(d);
  }, []);

  useEffect(() => {
    // 필터에 해당하는 매장 다시 요청
    console.log('필터', price, scent, strength, acidity);
  }, [price, scent, strength, acidity]);

  return (
    <Layout>
      <ContentsLayout>
        <Header>
          <HeaderContent>
            <div className='title'>Americanote</div>
            <div className='svg-wrapper'>
              <StrengthSVG width={24} height={24} alt={'strength'} />
              <ScentSVG width={24} height={24} alt={'scent'} />
              <AciditySVG width={24} height={24} alt={'acidity'} />
            </div>
          </HeaderContent>
          <div>
            <SearchSVG
              width={24}
              height={24}
              alt={'search'}
              className={'search'}
              onClick={() => {
                router.push('/search/search-store');
              }}
            />
          </div>
        </Header>
        <PageWrapper>
          <MapSection />
          <FilterSection>
            <ScrollContainer className='filter-item-wrapper'>
              {/* 가격 */}
              {price ? (
                <div
                  className='filter-item select'
                  onClick={filterModalHandler}
                >
                  {price}
                  <XSVG
                    width={24}
                    height={24}
                    alt={'x'}
                    color={'#fff'}
                    onClick={(e: any) => {
                      stopPropagation(e);
                      setPrice('');
                    }}
                  />
                </div>
              ) : (
                <div className='filter-item' onClick={filterModalHandler}>
                  가격
                  <ArrowSVG width={24} height={24} alt={'arrow'} />
                </div>
              )}

              {/* 향 */}
              {scent.length !== 0 ? (
                <div
                  className='filter-item select'
                  onClick={filterModalHandler}
                >
                  {scent.join(', ')}
                  <XSVG
                    width={24}
                    height={24}
                    alt={'x'}
                    color={'#fff'}
                    onClick={(e: any) => {
                      stopPropagation(e);
                      setScent('');
                    }}
                  />
                </div>
              ) : (
                <div className='filter-item' onClick={filterModalHandler}>
                  향
                  <ArrowSVG width={24} height={24} alt={'arrow'} />
                </div>
              )}

              {/* 강도 */}
              {strength ? (
                <div
                  className='filter-item select'
                  onClick={filterModalHandler}
                >
                  {strength}
                  <XSVG
                    width={24}
                    height={24}
                    alt={'x'}
                    color={'#fff'}
                    onClick={(e: any) => {
                      stopPropagation(e);
                      setStrength('');
                    }}
                  />
                </div>
              ) : (
                <div className='filter-item' onClick={filterModalHandler}>
                  강도 <ArrowSVG width={24} height={24} alt={'arrow'} />
                </div>
              )}

              {/* 산미 */}
              {acidity ? (
                <div
                  className='filter-item select'
                  onClick={filterModalHandler}
                >
                  {acidity}
                  <XSVG
                    width={24}
                    height={24}
                    alt={'x'}
                    color={'#fff'}
                    onClick={(e: any) => {
                      stopPropagation(e);
                      setAcidity('');
                    }}
                  />
                </div>
              ) : (
                <div className='filter-item' onClick={filterModalHandler}>
                  산미 <ArrowSVG width={24} height={24} alt={'arrow'} />
                </div>
              )}
            </ScrollContainer>
            <div
              className={`filter-icon ${
                (price || scent.length !== 0 || strength || acidity) && 'color'
              }`}
              onClick={filterModalHandler}
            >
              <FilterSVG
                width={24}
                height={24}
                alt={'filter'}
                color={`${
                  price || scent.length !== 0 || strength || acidity
                    ? '#5D4C21'
                    : '#CCCCCC'
                }`}
              />
            </div>
          </FilterSection>
        </PageWrapper>
      </ContentsLayout>
      {storeDetailModal && (
        <StoreDetailModal
          id={current.id}
          user={user}
          onClosed={onClosedDetailModal}
        />
      )}
      {filterModal && (
        <FilterModal
          onClosed={filterModalHandler}
          selected={{
            price: price,
            scent: scent,
            strength: strength,
            acidity: acidity,
          }}
          handleSaveFilter={handleSaveFilter}
        />
      )}
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const stores = await getAllStoreAPI();
  const user = getCookieValue(cookie, 'token');
  console.log('search');
  // 토큰이 있으면 페이지에 전달
  return {
    props: {
      user,
      stores,
    },
  };
};

export default Search;
