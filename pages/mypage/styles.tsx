import { styled } from 'styled-components';

export const MypageWrapper = styled.div`
  .sub-title {
    color: var(--Brand-Color, #2c2310);
    font-family: 'Pretendard';
    font-size: 22px;
    font-weight: 600;
  }
`;

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

export const User = styled.div`
  padding: 16px;
  padding-top: 57px;
  .img-wrapper {
    width: 74px;
    height: 74px;
    background: #fff;
    border-radius: 50%;
  }
  .nickname {
    margin-top: 24px;
    display: block;
    position: relative;

    &::after {
      content: '';
      display: block;
      height: 1px;
      background: #d8c6b7;
      position: absolute;
      top: 0;
      width: calc(100% - 105px);
      top: 13px;
      left: 102px;
    }
  }

  .taste-wrapper {
    .text {
      color: var(--Brand-Color, #2c2310);
      font-family: 'Pretendard';
      font-size: 14px;
      font-weight: 500;
    }
    .content {
      margin-top: 22px;
    }
    .non-content {
      margin-top: 30px;
    }
    .tag-wrapper {
      display: flex;
      height: 24px;
      gap: 8px;
      margin-top: 12px;
      width: 100%;
      flex-flow: wrap;

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
        font-family: 'Pretendard';
        font-size: 14px;
        font-weight: 500;
      }
      .strength {
        color: #5b4132;
      }
      .acidity {
        color: #8d6949;
      }
    }
  }
`;
export const UserInfo = styled.div`
  padding: 16px;
  margin-bottom: 38px;
  .info {
    margin-top: 38px;
    padding: 18px 0;
    border-bottom: 4px solid #2c2310;
  }

  .select-list-wrapper {
    .list {
      color: var(--Brand-Color, #2c2310);
      font-family: 'Pretendard';
      font-size: 16px;
      font-weight: 500;
      padding: 21px 0;
      border-bottom: 1px solid #d4d4d4;
      cursor: pointer;

      &:hover {
        background: var(--Brand-50, #efe3d8);
      }
    }
    .list:last-child {
      border-bottom: none;
    }
  }
`;
