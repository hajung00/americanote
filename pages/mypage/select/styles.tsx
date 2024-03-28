import { styled } from 'styled-components';

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
export const PageTitle = styled.div`
  display: block;
  padding: 0 16px;
  position: relative;
  color: var(--Brand-Color, #2c2310);
  font-family: 'Pretendard';
  font-size: 22px;
  font-weight: 600;
  margin-top: 57px;

  &::after {
    content: '';
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

export const SelectSection = styled.div`
  padding: 0 16px;
  margin-top: 62px;

  .title-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;

    .title {
      color: var(--Brand-Color, #2c2310);
      font-family: 'Pretendard';
      font-size: 18px;
      font-weight: 600;
    }
    .description {
      color: #636363;
      font-family: 'Pretendard';
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

export const TagItem = styled.div<{ background: string; color: string }>`
  background: ${(props) => (props.background ? props.background : '#fff')};
  color: ${(props) => (props.color ? props.color : '#A5A5A5')};
  font-family: 'Pretendard';
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

export const ButtonSection = styled.div`
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
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: 500;
  }
  .active {
    cursor: pointer;
    background: #5d4c21;
    color: #fff;
  }
`;
