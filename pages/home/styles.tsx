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
export const PageTitle = styled.div<{ after: string; left: string }>`
  display: block;
  padding: 0 16px;
  position: relative;
  color: var(--Brand-Color, #2c2310);
  font-family: 'Pretendard';
  font-size: 22px;
  font-weight: 600;
  margin-top: 57px;
  margin-bottom: 30px;

  &::after {
    content: '';
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

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .title {
    color: #2c2310;
    font-family: 'Montserrat';
    font-size: 26px;
    font-weight: 600;
    line-height: 26px;
  }
  .svg-wrapper {
    display: flex;
    gap: 6px;
  }
`;

export const Section = styled.div`
  margin-bottom: 40px;
  min-height: 323px;
`;
export const VerticalCardWarpper = styled.div`
  padding: 0 16px;
  display: flex;
  gap: 20px;
  overflow: hidden;
`;
