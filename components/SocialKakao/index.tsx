import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import KaKaoSVG from '../../public/assets/kakao.svg';
// import { setCookie } from '../../../utils/Cookies';
import Cookies from 'js-cookie';

const KaKaoButton = styled(KakaoLogin)`
  background: #fee500;
  gap: 4px;
  padding: 0px 16px;
  color: rgba(0, 0, 0, 0.85);
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  padding-left: 38px !important;
`;

interface Props {
  setTasteRgModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SocialKakao = ({ setTasteRgModal }: Props) => {
  const kakaoClientId = 'c1f31e371b5892bd16b99aaca06afd70';
  const kakaoOnSuccess = async (data: any) => {
    // console.log(data);
    const idToken =
      'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcxMTU0ODI1OSwiZXhwIjo0ODY1MTQ4MjU5fQ.oiT_4LWI5g1ifSP2MtMgXiVHegvq33kxTIv7HjsBu_P1-3TEZHYdxyGzqZHmznra'; // 엑세스 토큰 백엔드로 전달

    // 백엔드 응답 확인 후 -> 토큰 확인 -> 해당 유저의 취향이 없으면 취향 등록 모달 오픈
    if (idToken) {
      // 쿠키 설정 예시
      // setCookie(null, 'token', idToken, {
      //   maxAge: 30 * 24 * 60 * 60, // 30일
      //   path: '/', // 모든 경로에서 접근 가능
      // });
      Cookies.set('token', idToken, { expires: 1 }); // 만료 날짜를 30일로 설정
      setTasteRgModal(true);
    }
  };
  const kakaoOnFailure = (error: any) => {
    console.log(error);
  };
  return (
    <>
      <KaKaoSVG width={20} height={18} alt={'kakao'} />
      <KaKaoButton
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      >
        카카오 계정으로 로그인
      </KaKaoButton>
    </>
  );
};

export default SocialKakao;
