import React from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.div`
  height: 80px;
  padding: 16px;
  padding-top: 47px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  -webkit-box-pack: justify;
  position: sticky;
  top: 0px;
  z-index: 9999;
  background: #f5efea;
  .title {
    color: var(--Brand-Color, #2c2310);
    font-family: 'Pretendard';
    font-size: 26px;
    font-weight: 600;
  }
  .logout {
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 500;
  }

  .search {
    cursor: pointer;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Header = ({ children }: Props) => {
  return <HeaderStyle>{children}</HeaderStyle>;
};

export default Header;
