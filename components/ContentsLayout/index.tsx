import React from 'react';
import styled from 'styled-components';

const ContentsLayoutStyle = styled.div`
  width: 100%;
  height: 100vh;
  background: #f5efea;
  // overflow: auto;
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

interface Props {
  children: React.ReactNode;
}

const ContentsLayout = ({ children }: Props) => {
  return <ContentsLayoutStyle>{children}</ContentsLayoutStyle>;
};

export default ContentsLayout;
