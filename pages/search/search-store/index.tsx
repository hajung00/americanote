'use client';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ScrollContainer from 'react-indiana-drag-scroll';

// import component
import ContentsLayout from '../../../components/ContentsLayout';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import HorizontalCard from '../../../components/HorizontalCard';
import StoreDetailModal from '../../../components/StoreDetailModal';

// import svg
import SearchSVG from '../../../public/assets/search.svg';
import LeftSVG from '../../../public/assets/left.svg';
import XSVG from '../../../public/assets/x.svg';

const Header = styled.div`
  display: flex;
  padding: 0 16px;
  padding-top: 32px;
  align-items: center;
  gap: 15px;

  .search-wrapper {
    padding: 16px 12px;
    display: flex;
    border-radius: 10px;
    background: #fff;
    width: -webkit-fill-available;
    justify-content: space-between;

    & > input {
      border: none;
      color: var(--Gray-200, #a5a5a5);
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      outline: none;
      background: #fff;
    }

    & > div {
      cursor: pointer;
    }
  }
`;

const PageWrapper = styled.div`
  height: calc(100vh - 85px - 78px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding: 0 16px;
  padding-top: 23px;
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
`;

const RecentSerach = styled.div`
  margin-bottom: 19px;
  border-bottom: 1px solid #d8c6b7;

  .title {
    color: var(--Brand-Color, #2c2310);
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: 600;
    padding: 10px 0;
  }

  .item-wrapper {
    padding: 10px 0;
    display: flex;
    gap: 8px;
    margin-bottom: 19px;

    .item {
      padding: 8px 14px;
      display: flex;
      border-radius: 100px;
      border: 1px solid var(--Gray-100, #ccc);
      background: #fff;
      color: var(--Gray-300, #636363);
      font-family: 'Pretendard';
      font-size: 14px;
      font-weight: 500;
      min-width: max-content;
      align-items: center;
      gap: 2px;
      cursor: pointer;
    }
  }
`;

const SearchStore = () => {
  const recentSearch = [
    '연남동 하나 베이커리',
    '치플레',
    '코코로카라',
    '코코로카라',
  ];
  const router = useRouter();

  const [selectStore, setSelectStore] = useState('');
  const [storeDetailModal, setStoreDetailModal] = useState(false);

  const onClickStore = useCallback((name: string) => {
    console.log('click');
    setStoreDetailModal((prev) => !prev);
    setSelectStore(name);
  }, []);

  const onClosedModal = useCallback(() => {
    console.log('closed');
    setStoreDetailModal((prev) => !prev);
  }, []);

  const [searchKeyword, setSearchKeyword] = useState('');

  const onClickRecentSearch = useCallback((e: any) => {
    setSearchKeyword(e.target.innerText);
  }, []);

  const onChangeHandler = useCallback((e: any) => {
    setSearchKeyword(e.target.value);
  }, []);

  // 검색 요청
  const searchRequestHandler = useCallback(() => {
    console.log('검색어', searchKeyword);
  }, [searchKeyword]);
  return (
    <Layout>
      <ContentsLayout>
        <Header>
          <LeftSVG
            width={36}
            height={36}
            alt={'prev'}
            className={'prev'}
            onClick={() => {
              router.back();
            }}
          />
          <div className='search-wrapper'>
            <input
              type='text'
              value={searchKeyword}
              onChange={onChangeHandler}
              placeholder='카페 이름을 검색해보세요.'
            />
            <div>
              <SearchSVG
                width={16}
                height={16}
                alt={'search'}
                className={'search'}
                color={'#A5A5A5'}
                onClick={searchRequestHandler}
              />
            </div>
          </div>
        </Header>
        <PageWrapper>
          <RecentSerach>
            <div className='title'>최근 검색어</div>
            <ScrollContainer className='item-wrapper'>
              {recentSearch.map((item, i) => (
                <div
                  key={i}
                  className='item'
                  onClick={(e) => {
                    onClickRecentSearch(e);
                  }}
                >
                  {item}
                  <XSVG width={24} height={24} alt={'x'} color={'#636363'} />
                </div>
              ))}
            </ScrollContainer>
          </RecentSerach>
          <div>
            <HorizontalCard onClick={onClickStore} />
          </div>
        </PageWrapper>
      </ContentsLayout>
      {/* {storeDetailModal && (
        <StoreDetailModal name={selectStore} onClosed={onClosedModal} />
      )} */}
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  console.log('search-store');
  // 토큰이 있으면 페이지에 전달
  return {
    props: {
      cookie,
    },
  };
};

export default SearchStore;
