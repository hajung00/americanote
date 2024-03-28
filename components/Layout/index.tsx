import React from 'react';
import styled from 'styled-components';

const LayoutStyle = styled.div`
  width: 100%;
  max-width: 475px;
  margin: auto;
  min-height: 100vh;
  max-height: fit-content;
  background: #f5efea;
  position: relative;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <LayoutStyle>{children}</LayoutStyle>;
};

export default Layout;
