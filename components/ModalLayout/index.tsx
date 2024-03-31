import React from 'react';
import styled from 'styled-components';

const ModalLayoutStyle = styled.div`
  width: 100%;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  z-index: 99;
`;

interface Props {
  children: React.ReactNode;
  onClosed: () => void;
}

const ModalLayout = ({ children, onClosed }: Props) => {
  return <ModalLayoutStyle onClick={onClosed}>{children}</ModalLayoutStyle>;
};

export default ModalLayout;
