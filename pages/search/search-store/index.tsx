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
import { getCookieValue } from '../../../func/getCookieValue';
import {
  DeleteRecentKeywordAPI,
  getRecentKeywordAPI,
  getSearchStoreAPI,
  getStoreDetailAPI,
} from '../../../api/store';
import useCurrentStore from '../../../hooks/useCurrentStore';

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
    align-items: center;

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
      width: 87%;
    }

    & > div {
      cursor: pointer;
      display: flex;
    }

    .remove-icon {
      width: 16px;
      height: 16px;
      background: #a5a5a5;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
  }

  & > svg {
    cursor: pointer;
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

const SearchStoreWrapper = styled.div`
  padding-top: 19px;

  .title {
    color: var(--Brand-Color, #2c2310);
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: 600;
    padding: 10px 0;
  }
  .stores-wrapper {
    margin-top: 12px;
    padding: 0 11px;
  }

  .no-store-description {
    padding-top: 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: #000;
      font-family: 'Pretendard';
      font-size: 14px;
      font-weight: 500;
    }
    .content {
      color: var(--Gray-300, #636363);
      font-family: 'Pretendard';
      font-size: 12px;
      font-weight: 500;
    }
  }
`;
interface Props {
  user: string;
  recentSearch: string[];
}

const SearchStore = ({ user, recentSearch }: Props) => {
  const router = useRouter();

  const { setCurrentStore } = useCurrentStore();

  const onClickStore = useCallback(async (id: number) => {
    const currentStore = await getStoreDetailAPI(user, id);
    console.log(currentStore);
    setCurrentStore(currentStore);
    router.push(
      `/search/?zoom=15&lat=${currentStore.latitude}&lng=${currentStore.longitude}`
    );
  }, []);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // 입력 상자에 포커스되었을 때 호출되는 함수
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  // 입력 상자에서 포커스가 벗어났을 때 호출되는 함수
  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const onClickRecentSearch = useCallback((e: any) => {
    setSearchKeyword(e.target.innerText);
  }, []);

  const onChangeHandler = useCallback((e: any) => {
    setSearchKeyword(e.target.value);
  }, []);

  const resetKeyword = useCallback(() => {
    console.log('reset');
    setSearchKeyword('');
  }, [searchKeyword]);

  const [searchStore, setSearchStore] = useState([]);
  const [recentSearchKeyword, setRecentSearchKeyword] = useState(recentSearch);

  // 검색 요청
  const searchRequestHandler = useCallback(async () => {
    if (user) {
      setSearchStore(await getSearchStoreAPI(user, searchKeyword));
    } else {
      setSearchStore(await getSearchStoreAPI(undefined, searchKeyword));
    }
  }, [searchKeyword, user]);

  // 검색어 삭제
  const deleteSearchKeyword = useCallback(
    async (item: string) => {
      if (user) {
        await DeleteRecentKeywordAPI(user, item);
        setRecentSearchKeyword(await getRecentKeywordAPI(user));
      }
    },
    [recentSearchKeyword]
  );

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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder='카페 이름을 검색해보세요.'
            />
            {
              <div className='remove-icon'>
                <XSVG
                  width={16}
                  height={16}
                  alt={'remove'}
                  color={'#fff'}
                  onClick={resetKeyword}
                />
              </div>
            }
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
              {recentSearchKeyword?.map((item, i) => (
                <div
                  key={i}
                  className='item'
                  onClick={(e) => {
                    onClickRecentSearch(e);
                  }}
                >
                  {item}
                  <XSVG
                    width={24}
                    height={24}
                    alt={'x'}
                    color={'#636363'}
                    onClick={() => {
                      deleteSearchKeyword(item);
                    }}
                  />
                </div>
              ))}
            </ScrollContainer>
          </RecentSerach>
          <SearchStoreWrapper>
            <div className='title'>검색 결과</div>
            <div className='stores-wrapper'>
              {searchStore.length !== 0 ? (
                searchStore?.map((store, i) => (
                  <HorizontalCard
                    key={i}
                    user={user}
                    store={store}
                    onClick={onClickStore}
                  />
                ))
              ) : (
                <div className='no-store-description'>
                  <div className='title'>검색 결과가 없습니다.</div>
                  <div className='content'>
                    저희 서비스는 현재 연남동 일대 카페 100곳만 운영중이에요!
                  </div>
                </div>
              )}
            </div>
          </SearchStoreWrapper>
        </PageWrapper>
      </ContentsLayout>
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  let user = null;
  if (cookie) {
    user = getCookieValue(cookie, 'token');
    console.log('home', user);
  }

  // 최근 검색 기록 api 요청
  let recentSearch = [];

  if (user) {
    recentSearch = await getRecentKeywordAPI(user);
  }
  return {
    props: {
      user,
      recentSearch,
    },
  };
};

export default SearchStore;
