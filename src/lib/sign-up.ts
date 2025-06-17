import Cookies from 'js-cookie'
import { TagsType } from '@/types/sign-up'

/**
 * 마케팅 수신 동의 함수
 */
export const getMemberInitialMarketing = async (approve: 'ok' | 'no') => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/initial-marketing?approve=${approve}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    }
  )

  const data = await response.json()
  return data
}

/**
 * 사용자 태그 지정
 */
export const postMemberInitialTags = async (tags: TagsType) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/initial-tags`, {
    method: 'POST',
    body: JSON.stringify(tags),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 닉네임 중복 체크
 */
export const postMemberCheckNickname = async (nickname: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/check-nickname?nickname=${nickname}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    }
  )

  const data = await response.json()
  return data
}

/**
 * 닉네임 변경
 */
export const patchMemberChangeNickname = async (nickname: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/change-nickname?nickname=${nickname}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    }
  )

  const data = await response.json()
  return data
}

/**
 * 이미지 변경
 */
export const patchMemberChangeProfileImage = async (formData: FormData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/change-profile-image`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
  })

  const data = await response.json()
  return data
}
