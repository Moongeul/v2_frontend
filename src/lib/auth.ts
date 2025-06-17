import Cookies from 'js-cookie'

/**
 * 카카오 로그인 accessToken 을 불러오는 함수
 * @param code 카카오톡에서 받은 인가코드
 */
export async function getKaKaoAccessToken(code: string | null) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? '',
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '',
    code: code ?? '',
    client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET ?? '',
  })

  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: body.toString(),
  })

  return await response.json()
}

/**
 * 카카오톡으로 받은 accessToken 을 보내고, userInfo 와 Token 을 받는 함수
 * @param accessToken 카카오톡 accessToken
 */
export const getJWTToken = async (accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 쿠키 포함
    body: JSON.stringify({ accessToken: accessToken }),
  })

  // 응답 헤더에서 accessToken 을 추출하여 쿠키에 저장
  const authHeader = response.headers.get('Authorization')
  if (authHeader !== null) {
    Cookies.set('ACCESS_TOKEN', authHeader)
  }

  const data = await response.json()
  console.log('카카오 로그인 성공:', data)

  return data
}
