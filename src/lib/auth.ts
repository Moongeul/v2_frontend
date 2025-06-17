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
 * 기본 api 요청 함수
 * @param input
 * @param init
 * @param retry
 */
export const authorizedFetch = async (input: RequestInfo, init: RequestInit = {}, retry = true): Promise<Response> => {
  const accessToken = Cookies.get('accessToken')
  const isFormData = init.body instanceof FormData

  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string>),
    Authorization: `Bearer ${accessToken}`,
  }

  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  })

  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      return authorizedFetch(input, init, false)
    }
  }

  return response
}

/**
 * refreshToken을 이용해 accessToken 재발급
 */
const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/token-reissue`, {
      method: 'GET',
      credentials: 'include', // refreshToken이 쿠키에 있다고 가정
    })

    if (!res.ok) {
      console.warn('🔐 Refresh token 만료 또는 유효하지 않음')
      Cookies.remove('accessToken') // 로그인 상태 초기화
      Cookies.remove('refreshToken') // 로그인 상태 초기화
      return false
    }

    const newAccessToken = res.headers.get('Authorization')
    const newRefreshToken = res.headers.get('Authorization-Refresh')

    if (newAccessToken && newRefreshToken) {
      Cookies.set('accessToken', newAccessToken)
      Cookies.set('refreshToken', newRefreshToken)
      return true
    }

    return false
  } catch (e) {
    console.error('🚨 토큰 갱신 실패:', e)
    return false
  }
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
    Cookies.set('accessToken', authHeader)
  }

  const data = await response.json()
  console.log('카카오 로그인 성공:', data)

  return data
}
