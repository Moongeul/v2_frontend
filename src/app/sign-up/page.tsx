'use client'

import { useState } from 'react'
import TermsAgreementPage from '@/components/sign-up/TermsAgreementPage'
import TagPreferencePage from '@/components/sign-up/TagPreferencePage'
import ProfileSetting from '@/components/sign-up/ProfileSetting'
import { SignUpStepType } from '@/types/sign-up'

export default function SignUp() {
  const [step, setStep] = useState<SignUpStepType>('TermsAgreementPage')
  return (
    <main>
      {step === 'TermsAgreementPage' && <TermsAgreementPage setStep={setStep} />}
      {step === 'TagPreferencePage' && <TagPreferencePage />}
      {step === 'ProfileSetting' && <ProfileSetting />}
    </main>
  )
}
