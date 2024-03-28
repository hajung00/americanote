"use client";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

// import components
import ContentsLayout from "../../../components/ContentsLayout";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import HorizontalCard from "../../../components/HorizontalCard";
import StoreDetailModal from "../../../components/StoreDetailModal";

// import svg
import Left from "../../../public/assets/left.svg";
import StrengthSVG from "../../../public/assets/strength.svg";
import ScentSVG from "../../../public/assets/scent.svg";
import AciditySVG from "../../../public/assets/acidity.svg";

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
  margin-bottom: 29px;

  &::after {
    content: "";
    display: block;
    height: 1px;
    background: #d8c6b7;
    position: absolute;
    top: 0;
    width: calc(100% - 182px);
    top: 13px;
    left: 170px;
  }
`;

const PageContent = styled.div`
  padding: 0 16px;
  height: calc(100vh - 80px - 78px - 111px);
`;

const NonLikeStoreStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding-top: 13vh;

  .svg-wrapper {
    display: flex;
    height: 50px;
    max-width: 184px;
    gap: 17px;
  }

  .description {
    font-family: "Pretendard";
    font-size: 20px;
    font-weight: 500;
    margin-top: 18px;
    text-align: center;
  }

  & > button {
    border-radius: 8px;
    background: #5d4c21;
    color: #fff;
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 600;
    padding: 14px 93px;
    margin-top: 40px;
    border: none;
    cursor: pointer;
  }
`;

const Like = () => {
  const router = useRouter();

  const [selectStore, setSelectStore] = useState("");
  const [storeDetailModal, setStoreDetailModal] = useState(false);
  const onClickStore = useCallback((name: string) => {
    console.log("click");
    setStoreDetailModal((prev) => !prev);
    setSelectStore(name);
  }, []);

  const onClosedModal = useCallback(() => {
    console.log("closed");
    setStoreDetailModal((prev) => !prev);
  }, []);

  const likeStore = true;

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
            <PageTitle>좋아요 누른 카페</PageTitle>
            <PageContent>
              {likeStore ? (
                <HorizontalCard onClick={onClickStore} />
              ) : (
                <NonLikeStoreStyles>
                  <div className="svg-wrapper">
                    <StrengthSVG width={50} height={50} alt={"strength"} />
                    <ScentSVG width={50} height={50} alt={"scent"} />
                    <AciditySVG width={50} height={50} alt={"acidity"} />
                  </div>
                  <div className="description">
                    좋아요를 누른 카페가 없어요.
                    <br />
                    관심 있는 카페를 찾고 저장해보세요!
                  </div>
                  <button>카페 찾으러 가기</button>
                </NonLikeStoreStyles>
              )}
            </PageContent>
          </PageWrapper>
        </>
      </ContentsLayout>
      {storeDetailModal && (
        <StoreDetailModal name={selectStore} onClosed={onClosedModal} />
      )}
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookie = context.req ? context.req.headers.cookie : "";

  console.log("like");
  // 토큰이 있으면 페이지에 전달
  return {
    props: {
      cookie,
    },
  };
};

export default Like;
