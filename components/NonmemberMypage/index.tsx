import styled from 'styled-components';

// import svg
import StrengthSVG from '../../public/assets/strength.svg';
import ScentSVG from '../../public/assets/scent.svg';
import AciditySVG from '../../public/assets/acidity.svg';
import NaverSVG from '../../public/assets/naver.svg';

// import conponent
import SocialKakao from '../../components/SocialKakao';

const MypageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 78px);

  .description {
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 500;
    margin-top: 18px;
    text-align: center;
  }
`;

const SVGWrapper = styled.div`
  display: flex;
  height: 50px;
  max-width: 184px;
  gap: 17px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  min-width: 292px;
  margin-top: 62px;
  flex-direction: column;
  gap: 12px;
  position: relative;
  & > button {
    display: flex;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 12px !important;
    border: none;
    font-family: 'Pretendard' !important;
    font-size: 14px !important;
    font-style: normal;
    font-weight: 600 !important;
    cursor: pointer;
  }
  .naver {
    background: #03c75a;
    gap: 15px;
    padding: 0px 35px;
    color: #fff;
  }
  & > svg {
    position: absolute;
    top: 17px;
    left: 65px;
  }
`;

interface Props {
  setTasteRgModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const NonMember = ({ setTasteRgModal }: Props) => {
  return (
    <MypageWrapper>
      <SVGWrapper>
        <StrengthSVG width={50} height={50} alt={'strength'} />
        <ScentSVG width={50} height={50} alt={'scent'} />
        <AciditySVG width={50} height={50} alt={'acidity'} />
      </SVGWrapper>
      <div className='description'>
        로그인 하시면 더 많은 기능을
        <br />
        사용할 수 있어요!
      </div>
      <ButtonWrapper>
        <SocialKakao setTasteRgModal={setTasteRgModal} />
        {/* <button className='naver'>
          <NaverSVG width={16} height={16} alt={'naver'} />
          네이버 로그인
        </button> */}
      </ButtonWrapper>
    </MypageWrapper>
  );
};

export default NonMember;
