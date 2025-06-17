'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import TermsAgreementPage from '@/components/sign-up/TermsAgreementPage'
import TagPreferencePage from '@/components/sign-up/TagPreferencePage'
import ProfileSetting from '@/components/sign-up/ProfileSetting'
import { SignUpStepType } from '@/types/sign-up'
import { getJWTToken, getKaKaoAccessToken } from '@/lib/auth'

export default function SignUp() {
  const [step, setStep] = useState<SignUpStepType>('ProfileSetting')
  const searchParams = useSearchParams()
  const [code, setCode] = useState<string | null>()
  const [isFetching, setIsFetching] = useState(false)
  const [isTrigger, setIsTrigger] = useState(false)
  const router = useRouter()

  // kakao 인가코드 추출
  useEffect(() => {
    const extractedCode = searchParams.get('code')
    setCode(extractedCode)
  }, [searchParams])

  // kakao accessToken 을 받아 login api 연결
  useEffect(() => {
    if (code && !isFetching && !Cookies.get('accessToken') && !Cookies.get('kakaoAccessToken')) {
      setIsFetching(true) // 요청 시작
      getKaKaoAccessToken(code)
        .then((r) => {
          Cookies.set('kakaoAccessToken', r.access_token, { expires: Date.now() + 604800000 })
          console.log('r.access_token', r.access_token)
          getJWTToken(r.access_token).then((res) => {
            console.log(res)
            Cookies.set('accessToken', res.data.tokens.accessToken, { expires: Date.now() + 604800000 })
            Cookies.set('refreshToken', res.data.tokens.refreshToken, { expires: Date.now() + 604800000 })
            Cookies.set('role', res.data.role, { expires: Date.now() + 604800000 })
            setIsTrigger(true)
            setIsFetching(false) // 요청 완료
          })
        })
        .catch(() => {
          setIsFetching(false) // 오류 발생 시 플래그 초기화
        })
    }
  }, [code])

  // 권한에 따른 이동
  useEffect(() => {
    const role = Cookies.get('role')
    if (role && isTrigger) {
      if (role === 'USER' || role === 'ADMIN') {
        setIsTrigger(false)
        router.push('/home')
      } else {
        setIsTrigger(false)
        router.push('/sign-up')
      }
    }
  }, [isTrigger])

  return (
    <main>
      {step === 'TermsAgreementPage' && <TermsAgreementPage setStep={setStep} />}
      {step === 'TagPreferencePage' && <TagPreferencePage setStep={setStep} />}
      {step === 'ProfileSetting' && <ProfileSetting setStep={setStep} />}
    </main>
  )
}
