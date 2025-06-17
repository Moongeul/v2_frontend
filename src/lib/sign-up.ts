import { TagsType } from '@/types/sign-up'
import { authorizedFetch } from '@/lib/auth'

/**
 * 마케팅 수신 동의 함수
 */
export const getMemberInitialMarketing = async (approve: 'ok' | 'no') => {
  const response = await authorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/initial-marketing?approve=${approve}`,
    {
      method: 'GET',
    }
  )

  const data = await response.json()
  return data
}

/**
 * 사용자 태그 지정
 */
export const postMemberInitialTags = async (tags: TagsType) => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/initial-tags`, {
    method: 'POST',
    body: JSON.stringify(tags),
  })

  const data = await response.json()
  return data
}

/**
 * 닉네임 중복 체크
 */
export const postMemberCheckNickname = async (nickname: string) => {
  const response = await authorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/check-nickname?nickname=${nickname}`,
    {
      method: 'POST',
    }
  )

  const data = await response.json()
  return data
}

/**
 * 닉네임 변경
 */
export const patchMemberChangeNickname = async (nickname: string) => {
  const response = await authorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/change-nickname?nickname=${nickname}`,
    {
      method: 'PATCH',
    }
  )

  const data = await response.json()
  return data
}

/**
 * 이미지 변경
 */
export const patchMemberChangeProfileImage = async (formData: FormData) => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/member/change-profile-image`, {
    method: 'PATCH',
    body: formData,
  })

  const data = await response.json()
  return data
}
