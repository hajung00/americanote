import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TagItem = styled.div<{ background: string; color: string }>`
  background: ${(props) => (props.background ? props.background : '#fff')};
  color: ${(props) => (props.color ? props.color : '#A5A5A5')};
  font-family: 'Pretendard';
  font-size: 12px;
  font-weight: 500;
  padding: 4px 6px;
  border-radius: 6px;
  width: fit-content;
  min-width: fit-content;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
`;

interface Props {
  title: string;
}

const ScentTag = ({ title }: Props) => {
  const scent = [
    {
      name: '카라멜향',
      background: '#F3D3A3',
      color: '#735C38',
    },
    {
      name: '초콜릿향',
      background: '#D6A298',
      color: '#592015',
    },
    {
      name: '와인향',
      background: '#D6B1E3',
      color: '#6F4B7D',
    },
    {
      name: '과일향',
      background: '#FFDD86',
      color: '#A87812',
    },
    {
      name: '스모키향',
      background: '#FF9375',
      color: '#8C3219',
    },
    {
      name: '허브향',
      background: '#C1D49E',
      color: '#697553',
    },
    {
      name: '맥아향',
      background: '#A6B9CF',
      color: '#194A86',
    },
    {
      name: '견과류향',
      background: '#CDA88D',
      color: '#3E2410',
    },
    {
      name: '꽃향',
      background: '#F0C0DD',
      color: '#AE3B81',
    },
  ];

  const [selectScent, setSelectScent] = useState<{ [key: string]: string }>();

  useEffect(() => {
    scent.forEach((item, i) => {
      if (item.name === title) {
        setSelectScent(item);
      }
    });
  }, []);

  return (
    <TagItem
      background={`${selectScent?.background}`}
      color={`${selectScent?.color}`}
    >
      {title}
    </TagItem>
  );
};

export default ScentTag;
