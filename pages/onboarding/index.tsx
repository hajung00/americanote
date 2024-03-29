'use client';
import Image from 'next/image';
import Layout from '../../components/Layout';
import React, { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import OnBoarding1 from '../../public/assets/onboarding_1.png';
import OnBoarding2 from '../../public/assets/onboarding_2.png';
import OnBoarding3 from '../../public/assets/onboarding_3.png';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from 'styled-components';

const SwiperCustom = styled(Swiper)`
  .swiper-scrollbar,
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }

  .swiper-slide {
    height: calc(100vh - 74px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 40%;
    overflow: auto;
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
  }

  .swiper-pagination-horizontal {
    top: 8%;
    height: 30px;
  }
  .swiper-pagination-bullet-active {
    background: #5d4c21;
  }
  color: #2c2310;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 22px;
  font-weight: 500;

  .img-wrapper {
    width: 80%;
    height: 100%;
    margin-top: 47px;

    & > img {
      width: 100%;
    }
  }
`;

const StartButton = styled.button<{ active: string }>`
  width: 100%;
  border-radius: 8px;
  background: ${(props) =>
    props.active == 'active'
      ? 'var(--Brand-400, #5d4c21)'
      : 'var(--Gray-100, #ccc)'};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 58px;
  border: none;
  color: #fff;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 600;
  position: absolute;
  width: calc(100% - 32px);
  bottom: 16px;
  left: 16px;
  cursor: ${(props) => props.active == 'active' && 'pointer'};
`;
const OnBoarding = () => {
  const router = useRouter();

  useEffect(() => {
    const onboardingVisited = Cookies.get('onboarding_visited');
    if (!onboardingVisited) {
      Cookies.set('onboarding_visited', 'true', { expires: 30 }); // 만료 날짜를 30일로 설정
    }
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
    console.log(swiper.activeIndex);
  };

  const onClickHandler = useCallback(() => {
    if (activeIndex == 2) {
      router.push('/home');
    }
  }, [activeIndex]);
  return (
    <Layout>
      <SwiperCustom
        // install Swiper modules
        modules={[Pagination]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          아메리카노트로
          <br />
          나의 커피 취향을 발견해보세요.
          <div className='img-wrapper'>
            <Image src={OnBoarding1} alt='onboarding-img' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          카페에 방문하지 않아도
          <br />
          커피의 향, 강도, 산미를 알 수 있어요.
          <div className='img-wrapper'>
            <Image src={OnBoarding2} alt='onboarding-img' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          다양한 사람들의
          <br />
          리뷰도 함께 확인할 수 있어요.
          <div className='img-wrapper'>
            <Image src={OnBoarding3} alt='onboarding-img' />
          </div>
        </SwiperSlide>
      </SwiperCustom>
      <StartButton
        onClick={onClickHandler}
        active={activeIndex === 2 ? 'active' : ''}
      >
        시작하기
      </StartButton>
    </Layout>
  );
};

export default OnBoarding;
