import React, { useCallback } from 'react';
import ModalLayout from '../ModalLayout';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const InduceLoginModalStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-content {
    width: 80%;
    min-width: fit-content;
    height: 168px;
    padding: 16px;
    border-radius: 20px;
    background: #fff;
    padding-top: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f5efea;
  }

  .title {
    color: var(--Brand-Color, #2c2310);
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: 600;
  }

  .description {
    margin-top: 8px;
    color: var(--Gray-300, #636363);
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 500;
  }
  .button-section {
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    & > button {
      width: calc(100% / 2);
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      font-family: 'Pretendard';
      font-size: 14px;
      font-weight: 500;
      border: none;
      cursor: pointer;
    }

    & > button:first-child {
      background: #fff;
      color: var(--Brand-400, #5d4c21);
    }
    & > button:last-child {
      background: var(--Brand-400, #5d4c21);
      color: #fff;
    }
  }
`;

interface Props {
  onClosed: () => void;
}

const InduceLoginModal = ({ onClosed }: Props) => {
  const router = useRouter();

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <ModalLayout onClosed={onClosed}>
      <InduceLoginModalStyle onClick={stopPropagation}>
        <div className='modal-content'>
          <div className='title'>로그인 후 좋아하는 카페를 등록해보세요!</div>
          <div className='description'>
            이동하기를 누르면 로그인 페이지로 이동됩니다.
          </div>
          <div className='button-section'>
            <button
              onClick={() => {
                onClosed();
              }}
            >
              취소
            </button>
            <button
              onClick={() => {
                router.push('/mypage');
              }}
            >
              이동하기
            </button>
          </div>
        </div>
      </InduceLoginModalStyle>
    </ModalLayout>
  );
};

export default InduceLoginModal;
