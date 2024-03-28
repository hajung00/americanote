'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// import svg
import Beans from '../../../public/assets/beans.svg';
import Left from '../../../public/assets/left.svg';

// import conponent
import Header from '../../../components/Header';
import ContentsLayout from '../../../components/ContentsLayout';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import { getCookieValue } from '../../../func/getCookieValue';

//import styles
import { PageWrapper } from '../styles';
import { ButtonSection, PageTitle, SelectSection, TagItem } from './styles';

interface Props {
  user: string;
  userTaste: { [key: string]: any };
}

const Select = ({ user, userTaste }: Props) => {
  const scent = [
    {
      name: '카라멜향',
      background: '#F3D3A3',
      color: '#735C38',
    },
    {
      name: '초콜릿향',
      background: '#D6A298',
      color: '#592015',
    },
    {
      name: '와인향',
      background: '#D6B1E3',
      color: '#6F4B7D',
    },
    {
      name: '과일향',
      background: '#FFDD86',
      color: '#A87812',
    },
    {
      name: '스모키향',
      background: '#FF9375',
      color: '#8C3219',
    },
    {
      name: '허브향',
      background: '#C1D49E',
      color: '#697553',
    },
    {
      name: '맥아향',
      background: '#A6B9CF',
      color: '#194A86',
    },
    {
      name: '견과류향',
      background: '#CDA88D',
      color: '#3E2410',
    },
    {
      name: '꽃향',
      background: '#F0C0DD',
      color: '#AE3B81',
    },
  ];

  const strength = ['강도 약함', '강도 중간', '강도 강함'];
  const acidity = ['산미 약함', '산미 중간', '산미 강함'];

  const router = useRouter();

  const [selectScent, setSelectScent] = useState<string[]>([
    ...userTaste?.scent,
  ]);
  const [selectStrength, setSelectStrength] = useState<string>(
    userTaste?.strength
  );
  const [selectAcidty, setSelectAcidty] = useState<string>(userTaste?.acidity);

  const handleSelectScent = useCallback(
    (scent: string) => {
      if (!selectScent.includes(scent) && selectScent.length < 3) {
        setSelectScent([...selectScent, scent]);
      } else {
        const newList = selectScent.filter((data: string) => data !== scent);
        setSelectScent(newList);
      }
    },
    [scent]
  );

  const handleSelectStrength = useCallback(
    (strength: string) => {
      if (selectStrength !== strength) {
        setSelectStrength(strength);
      } else {
        setSelectStrength('');
      }
    },
    [strength]
  );

  const handleSelectAcidity = useCallback(
    (acidity: string) => {
      if (selectAcidty !== acidity) {
        setSelectAcidty(acidity);
      } else {
        setSelectAcidty('');
      }
    },
    [acidity]
  );

  // 취향 선택 시 마다 버튼 활성화 체크
  const [buttonActivation, setButtonActivation] = useState(false);

  useEffect(() => {
    console.log(selectScent, selectStrength, selectAcidty);
    if (selectScent.length >= 1 && selectStrength && selectAcidty) {
      setButtonActivation(true);
    } else {
      setButtonActivation(false);
    }
  }, [scent, strength, acidity]);

  // 취향 등록
  const saveUserTaste = useCallback(() => {
    if (scent.length >= 1 && strength && acidity) {
      // 취향 등록 api 작성
    }
  }, [scent, strength, acidity]);

  return (
    <Layout>
      <ContentsLayout>
        <>
          <Header>
            <Left
              width={36}
              height={36}
              alt={'left'}
              onClick={() => {
                router.back();
              }}
              style={{ cursor: 'pointer', transform: 'translateX(-10px)' }}
            />
          </Header>
          <PageWrapper>
            <PageTitle>내 취향 커피 고르기</PageTitle>
            <SelectSection>
              <div className='title-wrapper'>
                <div className='title'>선호하는 향</div>
                <div className='description'>
                  최소 1개,최대 3개 선택 가능해요.
                </div>
              </div>
              <div className='tag-wrapper'>
                <div className='column'>
                  {scent.map((item: { [key: string]: string }, i: number) => (
                    <TagItem
                      key={i}
                      background={`${
                        selectScent.includes(item.name)
                          ? `${item.background}`
                          : '#fff'
                      }`}
                      color={`${
                        selectScent.includes(item.name)
                          ? `${item.color}`
                          : '#a5a5a5'
                      }`}
                      onClick={() => {
                        handleSelectScent(item.name);
                      }}
                    >
                      {item.name}
                    </TagItem>
                  ))}
                </div>
              </div>
            </SelectSection>
            <SelectSection>
              <div className='title-wrapper'>
                <div className='title'>선호하는 강도</div>
                <div className='description'>
                  바디감,쓴맛,로스팅향을 고려한 맛의 강도입니다.
                </div>
              </div>
              <div className='tag-wrapper flex'>
                {strength.map((item: string, i: number) => (
                  <TagItem
                    key={i}
                    background={`#fff`}
                    color={`${selectStrength === item ? `#5B4132` : '#a5a5a5'}`}
                    onClick={() => {
                      handleSelectStrength(item);
                    }}
                  >
                    <Beans
                      width={21}
                      height={21}
                      alt={'beans'}
                      color={`${
                        selectStrength === item ? `#5B4132` : '#a5a5a5'
                      }`}
                    />
                    {item}
                  </TagItem>
                ))}
              </div>
            </SelectSection>
            <SelectSection>
              <div className='title-wrapper'>
                <div className='title'>선호하는 산미</div>
                <div className='description'>
                  풍미가 느껴지는 신선한 신맛을 의미합니다.
                </div>
              </div>
              <div className='tag-wrapper flex'>
                {acidity.map((item: string, i: number) => (
                  <TagItem
                    key={i}
                    background={`#fff`}
                    color={`${selectAcidty === item ? `#8D6949` : '#a5a5a5'}`}
                    onClick={() => {
                      handleSelectAcidity(item);
                    }}
                  >
                    <Beans
                      width={21}
                      height={21}
                      alt={'beans'}
                      color={`${selectAcidty === item ? `#8D6949` : '#a5a5a5'}`}
                    />
                    {item}
                  </TagItem>
                ))}
              </div>
            </SelectSection>
            <ButtonSection>
              <button
                className={`${buttonActivation && 'active'}`}
                onClick={saveUserTaste}
              >
                나의 취향 등록하기
              </button>
            </ButtonSection>
          </PageWrapper>
        </>
      </ContentsLayout>
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const user = getCookieValue(cookie, 'token');

  console.log('select', user);
  // 해당 유저의 취향 가져오는 api 작성
  const userTaste = { scent: [], strength: '강도 강함', acidity: '산미 약함' };

  return {
    props: {
      user,
      userTaste,
    },
  };
};

export default Select;
