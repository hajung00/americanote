import React, { useCallback, useState } from "react";
import styled from "styled-components";

// import components
import ContentsLayout from "../../components/ContentsLayout";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import HorizontalCard from "../../components/HorizontalCard";
import VerticalCard from "../../components/VerticalCard";
import StoreDetailModal from "../../components/StoreDetailModal";

// import svg
import StrengthSVG from "../../public/assets/strength.svg";
import ScentSVG from "../../public/assets/scent.svg";
import AciditySVG from "../../public/assets/acidity.svg";

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
const PageTitle = styled.div<{ after: string; left: string }>`
  display: block;
  padding: 0 16px;
  position: relative;
  color: var(--Brand-Color, #2c2310);
  font-family: "Pretendard";
  font-size: 22px;
  font-weight: 600;
  margin-top: 57px;
  margin-bottom: 30px;

  &::after {
    content: "";
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

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .title {
    color: #2c2310;
    font-family: "Montserrat";
    font-size: 26px;
    font-weight: 600;
    line-height: 26px;
  }
  .svg-wrapper {
    display: flex;
    gap: 6px;
  }
`;

const LoginDescription = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background: #e6d8ba;
  margin: 40px 16px;
  & > div {
    color: #443718;
    font-family: "Pretendard";
  }

  & > div:first-child {
    font-size: 16px;
    font-weight: 600;
  }

  & > div:last-child {
    font-size: 14px;
    font-weight: 500;
    text-decoration-line: underline;
  }
`;

const Section = styled.div`
  margin-bottom: 57px;
`;
const VerticalCardWarpper = styled.div`
  padding: 0 16px;
  display: flex;
  gap: 20px;
  overflow: hidden;
`;

const Home = () => {
  const user = true;

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

  return (
    <Layout>
      <ContentsLayout>
        <Header>
          <HeaderContent>
            <div className="title">Americanote</div>
            <div className="svg-wrapper">
              <StrengthSVG width={24} height={24} alt={"strength"} />
              <ScentSVG width={24} height={24} alt={"scent"} />
              <AciditySVG width={24} height={24} alt={"acidity"} />
            </div>
          </HeaderContent>
        </Header>
        <PageWrapper>
          <Section>
            <PageTitle after={"285px"} left={"268px"}>
              # 다른 유저들이 좋아한 카페
            </PageTitle>
            <VerticalCardWarpper>
              <VerticalCard onClick={onClickStore} />
            </VerticalCardWarpper>
          </Section>

          {!user && (
            <LoginDescription style={{ transform: "translateY(-10px)" }}>
              <div>로그인 후 커피취향을 등록하면 맞춤 카페를 찾아드려요.</div>
              <div>로그인 하러 가기!</div>
            </LoginDescription>
          )}
          <Section>
            <PageTitle after={"253px"} left={"237px"} style={{ marginTop: 0 }}>
              # 난 카페인만 있으면 돼.
            </PageTitle>
            <div style={{ padding: "0 16px" }}>
              <HorizontalCard onClick={onClickStore} />
              <HorizontalCard onClick={onClickStore} />
              <HorizontalCard onClick={onClickStore} />
            </div>
          </Section>
          <Section>
            <PageTitle after={"329px"} left={"313px"}>
              # 안락한 의자가 있는 편안한 카페
            </PageTitle>
            <div style={{ padding: "0 16px" }}>
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
  const cookie = context.req ? context.req.headers.cookie : "";

  console.log("home");
  // 토큰이 있으면 페이지에 전달
  return {
    props: {
      cookie,
    },
  };
};

export default Home;
