import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

// import components
import ContentsLayout from '../../components/ContentsLayout';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import HorizontalCard from '../../components/HorizontalCard';
import VerticalCard from '../../components/VerticalCard';
import StoreDetailModal from '../../components/StoreDetailModal';
import InduceLogin from '../../components/InduceLogin';

// import svg
import StrengthSVG from '../../public/assets/strength.svg';
import ScentSVG from '../../public/assets/scent.svg';
import AciditySVG from '../../public/assets/acidity.svg';
import Cookies from 'js-cookie';
import { getCookieValue } from '../../func/getCookieValue';

export const PageWrapper = styled.div`
  height: calc(100vh - 80px - 78px);
  overflow-y: auto;
  overflow-x: hidden;

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
export const PageTitle = styled.div<{ after: string; left: string }>`
  display: block;
  padding: 0 16px;
  position: relative;
  color: var(--Brand-Color, #2c2310);
  font-family: 'Pretendard';
  font-size: 22px;
  font-weight: 600;
  margin-top: 57px;
  margin-bottom: 30px;

  &::after {
    content: '';
    display: block;
    height: 1px;
    background: #d8c6b7;
    position: absolute;
    top: 0;
    width: ${(props) => `calc(100% - ${props.after})`};
    top: 13px;
    left: ${(props) => props.left};
  }
`;

export const HeaderContent = styled.div`
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

export const Section = styled.div`
  margin-bottom: 40px;
  min-height: 323px;
`;
export const VerticalCardWarpper = styled.div`
  padding: 0 16px;
  display: flex;
  gap: 20px;
  overflow: hidden;
`;

interface Props {
  user: string;
}

const Home = ({ user }: Props) => {
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
        </Header>
        <PageWrapper>
          <Section>
            {user ? (
              <>
                <PageTitle after={'285px'} left={'268px'}>
                  닉네임님의 취향에 맞는 카페
                </PageTitle>
                <VerticalCardWarpper>
                  <VerticalCard onClick={onClickStore} />
                </VerticalCardWarpper>
              </>
            ) : (
              <InduceLogin />
            )}
          </Section>
          <Section>
            <PageTitle after={'253px'} left={'237px'} style={{ marginTop: 0 }}>
              # 인증샷 맛집
            </PageTitle>
            <div style={{ padding: '0 16px' }}>
              <HorizontalCard onClick={onClickStore} />
              <HorizontalCard onClick={onClickStore} />
              <HorizontalCard onClick={onClickStore} />
            </div>
          </Section>
          <Section>
            <PageTitle after={'329px'} left={'313px'}>
              # 혼자가기 좋은 카페
            </PageTitle>
            <div style={{ padding: '0 16px' }}>
              <HorizontalCard onClick={onClickStore} />
              <HorizontalCard onClick={onClickStore} />
              <HorizontalCard onClick={onClickStore} />
            </div>
          </Section>
          <Section>
            <PageTitle after={'329px'} left={'313px'}>
              # 산미가 강한 카페
            </PageTitle>
            <div style={{ padding: '0 16px' }}>
              <HorizontalCard onClick={onClickStore} />
              <HorizontalCard onClick={onClickStore} />
              <HorizontalCard onClick={onClickStore} />
            </div>
          </Section>
        </PageWrapper>
      </ContentsLayout>
      {storeDetailModal && (
        <StoreDetailModal name={selectStore} onClosed={onClosedModal} />
      )}
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const user = getCookieValue(cookie, 'token');
  console.log('home', user);

  // 내 취향에 맞는 카페 정보 api

  return {
    props: {
      user,
    },
  };
};

export default Home;
