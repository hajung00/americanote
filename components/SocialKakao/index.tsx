import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import KaKaoSVG from '../../public/assets/kakao.svg';
import Cookies from 'js-cookie';
import { loginAPI } from '../../api/accout';

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
    const [jwtToken, isTaste] = await loginAPI(data.response.access_token);
    if (jwtToken!) {
      Cookies.set('token', jwtToken, { expires: 14 }); // 만료 날짜를 30일로 설정
      if (!isTaste) {
        setTasteRgModal(true);
      }
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
