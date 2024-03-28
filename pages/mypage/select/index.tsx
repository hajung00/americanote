"use client";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

// import svg
import Beans from "../../../public/assets/beans.svg";
import Left from "../../../public/assets/left.svg";

// import conponent
import Header from "../../../components/Header";
import ContentsLayout from "../../../components/ContentsLayout";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";

const PageWrapper = styled.div`
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
const PageTitle = styled.div`
  display: block;
  padding: 0 16px;
  position: relative;
  color: var(--Brand-Color, #2c2310);
  font-family: "Pretendard";
  font-size: 22px;
  font-weight: 600;
  margin-top: 57px;

  &::after {
    content: "";
    display: block;
    height: 1px;
    background: #d8c6b7;
    position: absolute;
    top: 0;
    width: calc(100% - 210px);
    top: 13px;
    left: 193px;
  }
`;

const SelectSection = styled.div`
  padding: 0 16px;
  margin-top: 62px;

  .title-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;

    .title {
      color: var(--Brand-Color, #2c2310);
      font-family: "Pretendard";
      font-size: 18px;
      font-weight: 600;
    }
    .description {
      color: #636363;
      font-family: "Pretendard";
      font-size: 12px;
      font-weight: 500;
    }
  }

  .tag-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .column {
      display: flex;
      flex-flow: wrap;
      gap: 12px;
    }
  }
  .flex {
    flex-direction: row;
    flex-flow: wrap;
  }
`;

const TagItem = styled.div<{ background: string; color: string }>`
  background: ${(props) => (props.background ? props.background : "#fff")};
  color: ${(props) => (props.color ? props.color : "#A5A5A5")};
  font-family: "Pretendard";
  font-size: 18px;
  font-weight: 500;
  padding: 6px 9px;
  border-radius: 6px;
  width: fit-content;
  min-width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ButtonSection = styled.div`
  padding: 0 16px;
  height: 58px;
  margin-top: 62px;
  margin-bottom: 30px;

  & > button {
    height: 58px;
    border: none;
    border-radius: 8px;
    color: #fff;
    background: var(--Gray-100, #ccc);
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 500;
  }
  .active {
    cursor: pointer;
    background: #5d4c21;
    color: #fff;
  }
`;

const Select = () => {
  const scent = [
    {
      name: "카라멜향",
      background: "#F3D3A3",
      color: "#735C38",
    },
    {
      name: "초콜릿향",
      background: "#D6A298",
      color: "#592015",
    },
    {
      name: "와인향",
      background: "#D6B1E3",
      color: "#6F4B7D",
    },
    {
      name: "과일향",
      background: "#FFDD86",
      color: "#A87812",
    },
    {
      name: "스모키향",
      background: "#FF9375",
      color: "#8C3219",
    },
    {
      name: "허브향",
      background: "#C1D49E",
      color: "#697553",
    },
    {
      name: "맥아향",
      background: "#A6B9CF",
      color: "#194A86",
    },
    {
      name: "견과류향",
      background: "#CDA88D",
      color: "#3E2410",
    },
    {
      name: "꽃향",
      background: "#F0C0DD",
      color: "#AE3B81",
    },
  ];

  const strength = ["강도 약함", "강도 중간", "강도 강함"];
  const acidity = ["산미 약함", "산미 중간", "산미 강함"];

  const router = useRouter();

  const [selectScent, setSelectScent] = useState<string[]>([]);
  const [selectStrength, setSelectStrength] = useState<string>();
  const [selectAcidty, setSelectAcidty] = useState<string>();

  const handleSelectScent = useCallback(
    (scent: string) => {
      if (!selectScent.includes(scent)) {
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
        setSelectStrength("");
      }
    },
    [strength]
  );

  const handleSelectAcidity = useCallback(
    (acidity: string) => {
      if (selectAcidty !== acidity) {
        setSelectAcidty(acidity);
      } else {
        setSelectAcidty("");
      }
    },
    [acidity]
  );

  const [buttonActivation, setButtonActivation] = useState(false);

  useEffect(() => {
    console.log(selectScent, selectStrength, selectAcidty);
    if (selectScent.length >= 1 && selectStrength && selectAcidty) {
      setButtonActivation(true);
    } else {
      setButtonActivation(false);
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
              alt={"left"}
              onClick={() => {
                router.back();
              }}
              style={{ cursor: "pointer", transform: "translateX(-10px)" }}
            />
          </Header>
          <PageWrapper>
            <PageTitle>내 취향 커피 고르기</PageTitle>
            <SelectSection>
              <div className="title-wrapper">
                <div className="title">선호하는 향</div>
                <div className="description">
                  최소 1개,최대 3개 선택 가능해요.
                </div>
              </div>
              <div className="tag-wrapper">
                <div className="column">
                  {scent.map((item: { [key: string]: string }, i: number) => (
                    <TagItem
                      key={i}
                      background={`${
                        selectScent.includes(item.name)
                          ? `${item.background}`
                          : "#fff"
                      }`}
                      color={`${
                        selectScent.includes(item.name)
                          ? `${item.color}`
                          : "#a5a5a5"
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
              <div className="title-wrapper">
                <div className="title">선호하는 강도</div>
                <div className="description">
                  바디감,쓴맛,로스팅향을 고려한 맛의 강도입니다.
                </div>
              </div>
              <div className="tag-wrapper flex">
                {strength.map((item: string, i: number) => (
                  <TagItem
                    key={i}
                    background={`#fff`}
                    color={`${selectStrength === item ? `#5B4132` : "#a5a5a5"}`}
                    onClick={() => {
                      handleSelectStrength(item);
                    }}
                  >
                    <Beans
                      width={21}
                      height={21}
                      alt={"beans"}
                      color={`${
                        selectStrength === item ? `#5B4132` : "#a5a5a5"
                      }`}
                    />
                    {item}
                  </TagItem>
                ))}
              </div>
            </SelectSection>
            <SelectSection>
              <div className="title-wrapper">
                <div className="title">선호하는 산미</div>
                <div className="description">
                  풍미가 느껴지는 신선한 신맛을 의미합니다.
                </div>
              </div>
              <div className="tag-wrapper flex">
                {acidity.map((item: string, i: number) => (
                  <TagItem
                    key={i}
                    background={`#fff`}
                    color={`${selectAcidty === item ? `#8D6949` : "#a5a5a5"}`}
                    onClick={() => {
                      handleSelectAcidity(item);
                    }}
                  >
                    <Beans
                      width={21}
                      height={21}
                      alt={"beans"}
                      color={`${selectAcidty === item ? `#8D6949` : "#a5a5a5"}`}
                    />
                    {item}
                  </TagItem>
                ))}
              </div>
            </SelectSection>
            <ButtonSection>
              <button className={`${buttonActivation && "active"}`}>
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
  const cookie = context.req ? context.req.headers.cookie : "";

  console.log("select");
  // 토큰이 있으면 페이지에 전달
  return {
    props: {
      cookie,
    },
  };
};

export default Select;
