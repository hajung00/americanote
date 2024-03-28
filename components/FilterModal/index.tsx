import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

// import component
import ModalLayout from "../ModalLayout";

// import svg
import Beans from "../../public/assets/beans.svg";
import Close from "../../public/assets/close.svg";

const FilterWrapper = styled.div`
  background: #f5efea;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 99;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-width: 475px;
  // max-height: 50vh;
  padding: 16px;

  .modal-header {
    padding-top: 4px;
    padding-bottom: 8px;
    color: var(--Brand-Color, #2c2310);
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #efe3d8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > svg {
      cursor: pointer;
    }
  }
  .filter-item {
    padding: 10px 0;
    border-bottom: 1px solid #efe3d8;
    .title {
      padding: 8px 0;
      color: var(--Brand-Color, #2c2310);
      font-family: "Pretendard";
      font-size: 14px;
      font-weight: 500;
      display: flex;
      gap: 8px;
      align-items: center;

      & > div {
        color: var(--Gray-300, #636363);
        font-family: "Pretendard";
        font-size: 12px;
        font-weight: 400;
      }
    }
    .tag-wrapper {
      padding: 8px 0;
      display: flex;
      flex-flow: wrap;
      gap: 10px;
    }
  }
  .border {
    border: none;
  }
  & > button {
    padding: 19px 0;
    width: 100%;
    border-radius: 8px;
    background: #5d4c21;
    color: #fff;
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    cursor: pointer;
    border: none;
  }
`;

const TagItem = styled.div<{ background: string; color: string }>`
  background: ${(props) => (props.background ? props.background : "#fff")};
  color: ${(props) => (props.color ? props.color : "#A5A5A5")};
  font-family: "Pretendard";
  font-size: 12px;
  font-weight: 500;
  padding: 6px 9px;
  border-radius: 6px;
  width: fit-content;
  min-width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

interface Props {
  onClosed: () => void;
  selected: { [key: string]: any };
  handleSaveFilter: (
    value1: any,
    value2: any,
    value3: any,
    value4: any
  ) => void;
}
const FilterModal = ({ onClosed, selected, handleSaveFilter }: Props) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

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

  const price = ["가격 낮은순", "가격 높은순"];
  const strength = ["강도 약함", "강도 중간", "강도 강함"];
  const acidity = ["산미 약함", "산미 중간", "산미 강함"];

  const [selectPrice, setSelectPrice] = useState<string>();
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

  const handleSelectPrice = useCallback(
    (price: string) => {
      if (selectPrice !== price) {
        setSelectPrice(price);
      } else {
        setSelectPrice("");
      }
    },
    [price]
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

  const onClickSave = useCallback(() => {
    console.log(
      "적용하기",
      selectPrice,
      selectScent,
      selectStrength,
      selectAcidty
    );
    handleSaveFilter(selectPrice, selectScent, selectStrength, selectAcidty);
    onClosed();
  }, [selectPrice, selectScent, selectStrength, selectAcidty]);

  useEffect(() => {
    console.log(selected.scent);
    setSelectPrice(selected.price);
    setSelectScent([...selected.scent]);
    setSelectStrength(selected.strength);
    setSelectAcidty(selected.acidity);
  }, [selected]);

  return (
    <ModalLayout onClosed={onClosed}>
      <FilterWrapper onClick={stopPropagation}>
        <div className="modal-header">
          <div>필터</div>
          <Close width={24} height={24} onClick={onClosed} />
        </div>
        <div className="filter-item">
          <div className="title">가격</div>
          <div className="tag-wrapper">
            {price.map((item: string, i: number) => (
              <TagItem
                key={i}
                background={`#fff`}
                color={`${selectPrice === item ? `#5B4132` : "#a5a5a5"}`}
                onClick={() => {
                  handleSelectPrice(item);
                }}
              >
                {item}
              </TagItem>
            ))}
          </div>
        </div>
        <div className="filter-item">
          <div className="title">
            향 <div>최대 3개까지 선택 가능합니다.</div>
          </div>
          <div className="tag-wrapper">
            {scent.map((item: { [key: string]: string }, i: number) => (
              <TagItem
                key={i}
                background={`${
                  selectScent.includes(item.name)
                    ? `${item.background}`
                    : "#fff"
                }`}
                color={`${
                  selectScent.includes(item.name) ? `${item.color}` : "#a5a5a5"
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
        <div className="filter-item">
          <div className="title">강도</div>
          <div className="tag-wrapper">
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
                  color={`${selectStrength === item ? `#5B4132` : "#a5a5a5"}`}
                />
                {item}
              </TagItem>
            ))}
          </div>
        </div>
        <div className="filter-item border">
          <div className="title ">산미</div>
          <div className="tag-wrapper">
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
        </div>
        <button onClick={onClickSave}>적용하기</button>
      </FilterWrapper>
    </ModalLayout>
  );
};

export default FilterModal;
