import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'styled-components';

export const InduceLoginStyle = styled.div`
  padding: 0 16px;
  position: relative;
  min-height: 323px;
`;

export const LoginDescription = styled.div`
  padding-top: 112px;
  padding-left: 15px;
  z-index: 99;
  position: relative;
  backdrop-filter: blur(2px);
  min-height: 323px;
  & > div {
    color: var(--Brand-Color, #2c2310);
    font-family: 'Pretendard';
    font-size: 22px;
    font-weight: 600;
    line-height: 130%;
  }

  & > button {
    padding: 12px;
    border-radius: 8px;
    background: var(--Brand-200, #8d6949);
    border: none;
    color: #fff;
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 500;
    line-height: 130%; /* 18.2px */
    margin-top: 23px;
    cursor: pointer;
  }
`;

export const SkeletonScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 32px 16px;
  width: calc((175px * 10) + (20px * 9));
  display: flex;
  gap: 20px;
  animation: autoPlay 18s linear infinite;

  @keyframes autoPlay {
    0% {
      transition: translateX(0);
    }
    100% {
      transform: translateX(calc((-175px * 6) + (20px * 2)));
    }
  }

  .skeletion-wrapper {
    width: 172px;
  }
  .img-content {
    width: 172px;
    height: 172px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }
  .tag-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 14px;

    .first-tag-wrapper {
      width: 100%;
      height: 24px;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 4px;
    }
    .second-tag-wrapper {
      display: flex;
      gap: 6px;
      & > div {
        width: calc(100% / 3);
        height: 24px;
        background: rgba(0, 0, 0, 0.08);
        border-radius: 4px;
      }
    }
    .third-tag-wrapper {
      width: calc(100% - 17px);
      display: flex;
      gap: 7px;
      & > div {
        width: calc(100% / 2);
        height: 24px;
        background: rgba(0, 0, 0, 0.08);
        border-radius: 4px;
      }
    }
  }
`;

const InduceLogin = () => {
  const stores = Array(5).fill(0);
  const router = useRouter();

  return (
    <InduceLoginStyle>
      <LoginDescription>
        <div>
          로그인 후 커피취향을 등록하면 <br />
          맞춤 카페를 찾아드려요.
        </div>
        <button
          onClick={() => {
            router.push('/mypage');
          }}
        >
          로그인 하러 가기!
        </button>
      </LoginDescription>
      <SkeletonScreen>
        {stores.concat(stores).map(() => (
          <div className='skeletion-wrapper'>
            <div className='img-content'></div>
            <div className='tag-wrapper'>
              <div className='first-tag-wrapper'></div>
              <div className='second-tag-wrapper'>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className='third-tag-wrapper'>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ))}
      </SkeletonScreen>
    </InduceLoginStyle>
  );
};

export default InduceLogin;
