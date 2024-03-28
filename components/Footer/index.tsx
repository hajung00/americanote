import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// import svg
import HashSVG from '../../public/assets/hash.svg';
import SearchSVG from '../../public/assets/search.svg';
import UserSVG from '../../public/assets/user.svg';

const FooterStyle = styled.footer`
  height: 78px;
  background: beige;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 475px;

  & > ul {
    height: 100%;
    list-style: none;
    display: flex;
    background: #2c2310;
  }
`;

const ListStyle = styled.li<{ color: string }>`
  width: calc(100% / 3);
  color: ${(props) => props.color};
  font-size: 12px;
  font-weight: 600;
  font-family: 'Pretendard';
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    gap: 8px;
    text-decoration: none;
    color: ${(props) => props.color};
  }
`;

const Footer = () => {
  const pathname = useRouter().pathname;
  return (
    <FooterStyle>
      <ul>
        <ListStyle
          color={`${pathname.includes('/home') ? 'white' : '#77643C'}`}
        >
          <Link href='/home'>
            <HashSVG
              width={24}
              height={24}
              alt={'hash'}
              color={`${pathname.includes('/home') ? 'white' : '#77643C'}`}
            />
            홈
          </Link>
        </ListStyle>
        <ListStyle
          color={`${pathname.includes('/search') ? 'white' : '#77643C'}`}
        >
          <Link href='/search'>
            <SearchSVG
              width={24}
              height={24}
              alt={'search'}
              color={`${pathname.includes('/search') ? 'white' : '#77643C'}`}
            />
            매장찾기
          </Link>
        </ListStyle>
        <ListStyle
          color={`${pathname.includes('/mypage') ? 'white' : '#77643C'}`}
        >
          <Link href='/mypage'>
            <UserSVG
              width={24}
              height={24}
              alt={'user'}
              color={`${pathname.includes('/mypage') ? 'white' : '#77643C'}`}
            />
            마이페이지
          </Link>
        </ListStyle>
      </ul>
    </FooterStyle>
  );
};

export default Footer;
