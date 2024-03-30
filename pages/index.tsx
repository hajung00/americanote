'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';

// import svg
import StrengthSVG from '../public/assets/strength.svg';
import ScentSVG from '../public/assets/scent.svg';
import AciditySVG from '../public/assets/acidity.svg';
import styled from 'styled-components';
import logo from '../public/assets/americanote.png';

interface Props {
  opacity: number;
}

const SplashStyle = styled.div<Props>`
  width: 100%;
  height: 100vh;
  background: #f5efea;
  opacity: ${(props) => `${props.opacity}%`};

  .top-section {
    height: 50%;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    & > div {
      color: var(--Brand-500, #5b4132);
      font-family: 'Pretendard';
    }
    .title {
      font-size: 34px;
      font-weight: 300;
      margin-bottom: 24px;
    }
    .focus {
      font-size: 35px;
      font-weight: 600;
      line-height: 140%;
    }

    &::after {
      content: '';
      display: block;
      width: calc(100% - 50px);
      height: 1px;
      background: var(--Brand-100, #d8c6b7);
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  .bottom-section {
    height: 50%;
    display: flex;
    gap: 10px;
    padding-bottom: 74px;
    align-items: end;
    justify-content: center;
    .title {
      color: #2c2310;
      font-family: 'Montserrat';
      font-size: 26px;
      font-weight: 600;
      line-height: 26px;

      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .svg-wrapper {
      display: flex;
      gap: 6px;
    }
  }
`;

const Splash = () => {
  const router = useRouter();
  const [opacity, setOpacity] = useState(105);

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   const onboardingVisited = Cookies.get('onboarding_visited');
    //   setOpacity(opacity - 1);
    //   if (onboardingVisited) {

    //     // router.push('/home');
    //   } else {
    //     // router.push('/onboarding');
    //   }
    // }, 2000);

    const onboardingVisited = Cookies.get('onboarding_visited');

    // if (opacity > 96) {
    //   const timer1 = setTimeout(() => {
    //     console.log('dd');
    //     setOpacity(opacity - 1);
    //     clearTimeout(timer1);
    //   }, 100);
    // } else if (opacity > 5) {
    //   const timer2 = setTimeout(() => {
    //     setOpacity(opacity - 8);
    //     clearTimeout(timer2);
    //   }, 70);
    // }

    // if (opacity == 0) {
    //   if (onboardingVisited) {
    //     router.push('/home');
    //   } else {
    //     router.push('/onboarding');
    //   }
    // }
    // return () => clearTimeout(timer);
  }, [opacity]);

  return (
    <Layout>
      <SplashStyle opacity={opacity}>
        <div className='top-section'>
          <div className='title'>카페를 방문하지 않고도</div>
          <div className='focus'>
            커피의 <br />
            향, 강도, 산미를
            <br />
            알고싶을 땐?
          </div>
        </div>

        <div className='bottom-section'>
          <div className='title'>
            <Image src={logo} width={174} height={32} alt={'logo'} />
          </div>
          <div className='svg-wrapper'>
            <StrengthSVG width={24} height={24} alt={'strength'} />
            <ScentSVG width={24} height={24} alt={'scent'} />
            <AciditySVG width={24} height={24} alt={'acidity'} />
          </div>
        </div>
      </SplashStyle>
    </Layout>
  );
};

export default Splash;
