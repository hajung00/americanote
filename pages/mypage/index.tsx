'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { styled } from 'styled-components';

// import svg
import Beans from '../../public/assets/beans.svg';

// import conponent
import Header from '../../components/Header';
import ScentTag from '../../components/ScentTag';
import TasteRegisterModal from '../../components/TasteRegisterModal';
import NonMember from '../../components/NonmemberMypage';
import ContentsLayout from '../../components/ContentsLayout';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import { getCookieValue } from '../../func/getCookieValue';

export const MypageWrapper = styled.div`
  .sub-title {
    color: var(--Brand-Color, #2c2310);
    font-family: 'Pretendard';
    font-size: 22px;
    font-weight: 600;
  }
`;

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

export const User = styled.div`
  padding: 16px;
  padding-top: 57px;
  .img-wrapper {
    width: 74px;
    height: 74px;
    background: #fff;
    border-radius: 50%;
  }
  .nickname {
    margin-top: 24px;
    display: block;
    position: relative;

    &::after {
      content: '';
      display: block;
      height: 1px;
      background: #d8c6b7;
      position: absolute;
      top: 0;
      width: calc(100% - 105px);
      top: 13px;
      left: 102px;
    }
  }

  .taste-wrapper {
    .text {
      color: var(--Brand-Color, #2c2310);
      font-family: 'Pretendard';
      font-size: 14px;
      font-weight: 500;
    }
    .content {
      margin-top: 22px;
    }
    .non-content {
      margin-top: 30px;
    }
    .tag-wrapper {
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
    }
  }
`;
export const UserInfo = styled.div`
  padding: 16px;
  margin-bottom: 38px;
  .info {
    margin-top: 38px;
    padding: 18px 0;
    border-bottom: 4px solid #2c2310;
  }

  .select-list-wrapper {
    .list {
      color: var(--Brand-Color, #2c2310);
      font-family: 'Pretendard';
      font-size: 16px;
      font-weight: 500;
      padding: 21px 0;
      border-bottom: 1px solid #d4d4d4;
      cursor: pointer;

      &:hover {
        background: var(--Brand-50, #efe3d8);
      }
    }
    .list:last-child {
      border-bottom: none;
    }
  }
`;

interface Props {
  user: string;
  userTaste: { [key: string]: any };
}

const Mypage = ({ user, userTaste }: Props) => {
  const router = useRouter();

  const [tasteRgModal, setTasteRgModal] = useState(false);

  const tasteRgModalHandler = useCallback(() => {
    setTasteRgModal((prev) => !prev);
  }, []);

  return (
    <Layout>
      <ContentsLayout>
        {!user ? (
          <NonMember setTasteRgModal={setTasteRgModal} />
        ) : (
          <MypageWrapper>
            <Header>
              <div className='title'>My note.</div>
              <div className='logout'>로그아웃</div>
            </Header>
            <PageWrapper>
              <User>
                <div className='img-wrapper'>
                  {/* <img src={''} alt='프로필' /> */}
                </div>
                <div className='sub-title nickname'>유저닉네임</div>
                <div className='taste-wrapper'>
                  {userTaste.scent.length !== 0 ? (
                    <>
                      <div className='text content'>나의 취향</div>
                      <div className='tag-wrapper'>
                        {userTaste.scent.map((scent: string, i: number) => (
                          <ScentTag key={i} title={scent} />
                        ))}
                        <div className='tag strength'>
                          <Beans
                            width={18}
                            height={18}
                            alt={'beans'}
                            color={`#5B4132`}
                          />
                          {userTaste.strength}
                        </div>
                        <div className='tag acidity'>
                          <Beans
                            width={18}
                            height={18}
                            alt={'beans'}
                            color={`#8D6949`}
                          />
                          {userTaste.acidity}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className='text non-content'>
                      아직 등록된 취향이 없어요.
                    </div>
                  )}
                </div>
              </User>
              <UserInfo>
                <div className='sub-title info'>내 정보</div>
                <div className='select-list-wrapper'>
                  <div
                    className='list'
                    onClick={() => {
                      router.push('/mypage/select');
                    }}
                  >
                    내 취향 커피 고르기
                  </div>
                  <div
                    className='list'
                    onClick={() => {
                      router.push('/mypage/like');
                    }}
                  >
                    좋아요 누른 카페
                  </div>
                </div>
              </UserInfo>
            </PageWrapper>
          </MypageWrapper>
        )}
      </ContentsLayout>
      {tasteRgModal && <TasteRegisterModal onClosed={tasteRgModalHandler} />}
      <Footer />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const user = getCookieValue(cookie, 'token');

  console.log('mypage', user);
  // 유저 정보 요청 api 작성

  // 해당 유저의 취향 가져오는 api 작성
  const userTaste = {
    scent: ['맥아향', '허브향'],
    strength: '강도 강함',
    acidity: '산미 약함',
  };

  return {
    props: {
      user,
      userTaste,
    },
  };
};

export default Mypage;
