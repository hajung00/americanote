'use client';
import Image from 'next/image';
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
import { getMyProfileAPI } from '../../api/user';
import { UserInfo } from '../../types/user';
import ProFile from '../../public/assets/profile.svg';
import { logoutAPI } from '../../api/accout';
import MyNote from '../../public/assets/mynote.png';

export const MypageWrapper = styled.div`
  .sub-title {
    color: var(--Brand-Color, #2c2310);
    font-family: 'Pretendard';
    font-size: 22px;
    font-weight: 600;
  }
  .logout {
    cursor: pointer;
  }
  .title {
    & > img {
      height: 100%;
    }
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

export const User = styled.div<{ src: string }>`
  padding: 16px;
  padding-top: 57px;
  .img-wrapper {
    width: 74px;
    height: 74px;
    background: #fff;
    border-radius: 50%;
    background-image: ${(props) => props.src && `url(${props.src})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
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
        font-size: 12px;
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
export const UserInfoStyle = styled.div`
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
  userInfo: UserInfo;
}

const Mypage = ({ user, userInfo }: Props) => {
  const router = useRouter();

  const [tasteRgModal, setTasteRgModal] = useState(false);

  const tasteRgModalHandler = useCallback(() => {
    setTasteRgModal((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    if (user) {
      const result = await logoutAPI(user);
      if (result === 200) {
        router.reload();
      }
    }
  }, [user]);

  return (
    <Layout>
      <ContentsLayout>
        {!user ? (
          <NonMember setTasteRgModal={setTasteRgModal} />
        ) : (
          <MypageWrapper>
            <Header>
              <div className='title' style={{ fontFamily: 'Montserrat' }}>
                <Image src={MyNote} width={115} height={32} alt={'logo'} />
              </div>
              <div className='logout' onClick={handleLogout}>
                로그아웃
              </div>
            </Header>
            <PageWrapper>
              <User src={`${userInfo.profileImageUrl}`}>
                <div className='img-wrapper'>
                  {!userInfo.profileImageUrl && (
                    <ProFile width={50} height={50} alt={'profile-img'} />
                  )}
                </div>
                <div className='sub-title nickname'>{userInfo.nickname}</div>
                <div className='taste-wrapper'>
                  {userInfo.flavours.length !== 0 &&
                  userInfo.intensity &&
                  userInfo.acidity ? (
                    <>
                      <div className='text content'>나의 취향</div>
                      <div className='tag-wrapper'>
                        {userInfo.flavours.map(
                          (scent: { [key: string]: string }, i: number) => (
                            <ScentTag key={i} title={scent.flavour} />
                          )
                        )}
                        {userInfo.intensity && (
                          <div className='tag strength'>
                            <Beans
                              width={18}
                              height={18}
                              alt={'beans'}
                              color={`#5B4132`}
                            />
                            강도 {userInfo.intensity}
                          </div>
                        )}
                        {userInfo.acidity && (
                          <div className='tag acidity'>
                            <Beans
                              width={18}
                              height={18}
                              alt={'beans'}
                              color={`#8D6949`}
                            />
                            산미 {userInfo.acidity}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className='text non-content'>
                      아직 등록된 취향이 없어요.
                    </div>
                  )}
                </div>
              </User>
              <UserInfoStyle>
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
              </UserInfoStyle>
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

  let user = null;
  let userInfo = null;

  if (cookie) {
    user = getCookieValue(cookie, 'token');
    console.log('mypage', user);
  }

  if (user) {
    userInfo = await getMyProfileAPI(user);
  }

  // 유저 정보 요청 api 작성

  return {
    props: {
      user,
      userInfo,
    },
  };
};

export default Mypage;
