import Header from '@/components/common/Header'
import Button from '@/components/common/Button'
import { SignUpStepType } from '@/types/sign-up'
import { Dispatch, SetStateAction } from 'react'
import TermsOfUseCheckbox from '@/components/sign-up/TermsOfUseCheckbox'

interface TermsAgreementPageProps {
  setStep: Dispatch<SetStateAction<SignUpStepType>>
}

export default function TermsAgreementPage({ setStep }: TermsAgreementPageProps) {
  return (
    <main className="min-h-screen">
      <Header headerType={'DYNAMIC'}>이용 약관동의</Header>
      <div className="h-[90px]" />
      <div className="flex w-full flex-col justify-between">
        <section className="flex flex-col gap-y-1 px-5 py-3">
          <h2 className="head-bold-22">약관동의가 필요해요.</h2>
          <p className="body-regular-16 text-dark-gray">
            Moongeul 서비스 시작 및 가입을 위해
            <br />
            먼저 정보제공 및 필수 약관에 동의해주세요.
          </p>
        </section>
        <TermsOfUseCheckbox />
      </div>

      <div className="bg-background fixed bottom-0 w-full px-5 pt-2 pb-[32px]">
        <Button
          onClick={() => {
            setStep('TagPreferencePage')
          }}
          className="button bg-deep-dark-gray flex h-[48px] w-full items-center justify-center gap-x-2 rounded-full text-white"
        >
          다음
        </Button>
      </div>
    </main>
  )
}
