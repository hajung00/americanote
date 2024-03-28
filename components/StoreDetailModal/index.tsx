import React, { useCallback } from "react";
import ModalLayout from "../ModalLayout";
import styled from "styled-components";
import { useRouter } from "next/router";

// import svg
import Star from "../../public/assets/star.svg";
import Beans from "../../public/assets/beans.svg";
import Close from "../../public/assets/close.svg";
import Favorite from "../../public/assets/favorite.svg";

// import conponents
import ScentTag from "../ScentTag";
import ReviewContent from "../ReviewContent";

const StoreDetailModalStyle = styled.div`
  //   height: calc(100vh - 283px);
  //   height: calc(100vh - 74px);

  //   min-height: calc(100vh - 74px);
  background: #f5efea;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 99;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-width: 475px;
  max-height: 80vh;

  //   &::before {
  //     display: flex;
  //     content: '';
  //     width: 70px;
  //     height: 4px;
  //     background: #fff;
  //     margin: 0 auto;
  //     transform: translateY(-14px);
  //     border-radius: 100px;
  //     cursor: pointer;
  //   }
`;

const ImgWrapper = styled.div`
  height: 178px;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;

  .img {
    width: 100%;
    height: 100%;
    background-image: url(https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231025_172%2F1698225900521i9cxE_JPEG%2F1.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  & > svg {
    position: absolute;
    top: 22px;
    right: 22px;
    cursor: pointer;
  }
`;
const InfoWrapper = styled.div`
  padding: 16px;
  overflow: auto;
  height: calc(80vh - 178px);

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

  .store-header {
    display: flex;
    gap: 8px;
    padding: 8px 0;
    align-items: center;
    border-bottom: 1px solid #2c2310;

    .store-name {
      color: #2c2310;
      font-family: "Pretendard";
      font-size: 16px;
      font-weight: 600;
    }
    .store-star {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2px;
      color: #2c2310;
      font-family: "Pretendard";
      font-size: 12px;
      font-weight: 500;
      padding: 5px 0;
    }
  }

  .title {
    color: #2c2310;

    font-family: "Pretendard";
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
  }
`;

const TagWrapper = styled.div`
  padding: 14px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .scent {
    display: flex;
    width: 100%;
    flex-flow: wrap;
    gap: 6px;
  }
  .strength {
    display: flex;
    gap: 6px;
  }

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
    font-family: "Pretendard";
    font-size: 12px;
    font-weight: 500;
  }
  .strength {
    color: #5b4132;
  }
  .acidity {
    color: #8d6949;
  }
`;

const MenuWrapper = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #2c2310;
  border-top: 1px solid #2c2310;

  .menu-wrapper {
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .menu-name {
      color: #2c2310;
      font-family: "Pretendard";
      font-size: 14px;
      font-weight: 500;
    }
    .menu-price {
      color: #2c2310;
      font-family: "Pretendard";
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const ReviewWrapper = styled.div`
  padding: 12px 0;
  .review-container {
  }
`;

const ButtonWrapper = styled.div<{ type: string }>`
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  //   padding: 16px;
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: space-between;

  & > button {
    height: 100%;
    font-family: "Pretendard";
    font-size: 14px;
    font-weight: 600;
  }

  & > button:first-child {
    width: ${(props) => (props.type === "search" ? "100%" : "120px")};
    border-radius: 8px;
    border: 1px solid #5d4c21;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: #5d4c21;

    & > svg {
      transform: translateY(3px);
    }
  }

  & > button:last-child {
    display: ${(props) => (props.type === "search" ? "none" : "flex")};
    width: calc(100% - 120px - 13px);
    padding: 4px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    background: var(--Brand-400, #5d4c21);
    color: #fff;
    border: none;
  }
`;

interface Props {
  name: string;
  onClosed: () => void;
}

const StoreDetailModal = ({ name, onClosed }: Props) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  console.log("StoreDetailModal", name);
  const reviews = [
    { content: "a", star: 4 },
    { content: "b", star: 3 },
    { content: "c", star: 4 },
    { content: "d", star: 3 },
  ];
  const scents = ["카라멜향", "초콜릿향", "과일향", "맥아향", "견과류향"];
  const strength = "강도 강함";
  const acidity = "산미 약함";

  const pathname = useRouter().pathname;

  return (
    <ModalLayout onClosed={onClosed}>
      <StoreDetailModalStyle onClick={stopPropagation}>
        <ImgWrapper>
          <div className="img"></div>
          <Close width={24} height={24} onClick={onClosed} />
        </ImgWrapper>
        <InfoWrapper>
          <div className="store-header">
            <div className="store-name">{name}</div>
            <div className="store-star">
              <Star width={12} height={12} alt={"star"} color={"#FFBD31"} />
              4.5
            </div>
          </div>
          <TagWrapper>
            <div className="scent">
              {scents.map((scent, i) => (
                <ScentTag key={i} title={scent} />
              ))}
            </div>
            <div className="strength">
              <div className="tag strength">
                <Beans width={18} height={18} alt={"beans"} color={`#5B4132`} />
                {strength}
              </div>
              <div className="tag acidity">
                <Beans width={18} height={18} alt={"beans"} color={`#8D6949`} />
                {acidity}
              </div>
            </div>
          </TagWrapper>
          <MenuWrapper>
            <div className="title">메뉴</div>
            <div className="menu-wrapper">
              <div className="menu-name">아메리카노</div>
              <div className="menu-price">4.500원</div>
            </div>
          </MenuWrapper>
          <ReviewWrapper>
            <div className="title">리뷰</div>
            <div className="review-container">
              {reviews.map((review, i) => (
                <ReviewContent key={i} review={review} />
              ))}
            </div>
          </ReviewWrapper>
          <ButtonWrapper
            type={`${pathname === "/search" ? "search" : "normal"}`}
          >
            <button>
              <Favorite
                width={20}
                height={18}
                alt={"favorite"}
                color={"#EDEDED"}
              />
              좋아요
            </button>
            <button>지도로 이동하기</button>
          </ButtonWrapper>
        </InfoWrapper>
      </StoreDetailModalStyle>
    </ModalLayout>
  );
};

export default StoreDetailModal;
