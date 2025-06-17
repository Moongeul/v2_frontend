'use client'

import { Suspense } from 'react'
import SignUp from '@/components/sign-up/SignUp'

export default function Page() {
  return (
    <Suspense fallback={<div>회원가입 페이지를 불러오는 중입니다...</div>}>
      <SignUp />
    </Suspense>
  )
}
