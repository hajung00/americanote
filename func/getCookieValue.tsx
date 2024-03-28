export const getCookieValue = (cookieString: string, name: string) => {
  const cookies = cookieString.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // 쿠키가 찾고자 하는 이름으로 시작하는지 확인
    if (cookie.startsWith(`${name}=`)) {
      // 쿠키 값을 반환
      return cookie.substring(name.length + 1);
    }
  }
  // 해당하는 이름의 쿠키를 찾지 못했을 경우 null 반환
  return null;
};
