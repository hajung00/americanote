import React from 'react';
import styled, { keyframes } from 'styled-components';
import Layout from '../Layout';

// 커피콩 회전 애니메이션 키프레임 생성
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 999;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  padding-bottom: 78px;
`;

const SpinnerStyle = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid #f2e6d9; /* 커피콩 색상 */
  border-left-color: #6f4e37; /* 커피콩 그림자 색상 */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite; /* 회전 애니메이션 적용 */
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerStyle />
    </SpinnerContainer>
  );
};

export default Spinner;
