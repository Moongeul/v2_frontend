import TermsOfService from '@/components/sign-up/terms/TermsOfService'
import PersonalInformation from '@/components/sign-up/terms/PersonalInformation'
import MarketingInformation from '@/components/sign-up/terms/MarketingInformation'
import { useEffect } from 'react'
import { useTermsStore } from '@/store/termsStore'
import { CheckIcon, RightArrowIcon, UncheckIcon } from '@/assets/svgComponents'

export default function TermsOfUseCheckbox() {
  const allOptions = useTermsStore((state) => state.allOptions)
  const termsOfServiceOptions = useTermsStore((state) => state.termsOfServiceOptions)
  const personalInformation = useTermsStore((state) => state.personalInformation)
  const marketingInformation = useTermsStore((state) => state.marketingInformation)
  const setTermsState = useTermsStore((state) => state.setTermsState)

  const termsOfUseContents = [
    {
      content: '서비스 이용약관 동의(필수)',
      component: TermsOfService,
      state: termsOfServiceOptions,
      key: 'termsOfServiceOptions',
    },
    {
      content: '개인 정보 수집 및 이용 동의(필수)',
      component: PersonalInformation,
      state: personalInformation,
      key: 'personalInformation',
    },
    {
      content: '마케팅 정보 수신 동의(선택)',
      component: MarketingInformation,
      state: marketingInformation,
      key: 'marketingInformation',
    },
  ]

  /**
   * 개별 상태가 하나라도 false이면 allOptions를 false로 설정
   */
  useEffect(() => {
    if (termsOfServiceOptions && personalInformation && marketingInformation) {
      setTermsState({ allOptions: true }) // 모두 true일 경우 allOptions도 true
    } else {
      setTermsState({ allOptions: false }) // 하나라도 false면 allOptions는 false
    }
  }, [termsOfServiceOptions, personalInformation, marketingInformation, setTermsState])

  const handleAllOptionsClick = () => {
    const newAllOptions = !allOptions
    setTermsState({
      allOptions: newAllOptions,
      termsOfServiceOptions: newAllOptions,
      personalInformation: newAllOptions,
      marketingInformation: newAllOptions,
    })
  }

  const handleIndividualOptionClick = (key: string, currentState: boolean) => {
    setTermsState({ [key]: !currentState })
  }

  return (
    <div className={'absolute bottom-20 flex w-full flex-col gap-y-3 px-5 py-2'}>
      {/* 전체 동의 */}
      <div
        className={'flex items-center gap-x-1'}
        onClick={() => {
          handleAllOptionsClick()
        }}
      >
        <div className={'flex h-[24px] w-[24px] items-center'}>
          {allOptions ? <CheckIcon width={24} height={24} /> : <UncheckIcon width={24} height={24} />}
        </div>
        <div className={allOptions ? 'title2 text-black' : 'title2 text-darkGray'}>전체 동의</div>
      </div>

      {/* 부분 동의 */}
      <div className={'flex flex-col gap-y-1 border-t pt-2'}>
        {termsOfUseContents.map((termsOfUseContent) => {
          return (
            <div
              key={termsOfUseContent.key}
              className={'flex justify-between py-3'}
              onClick={() => {
                handleIndividualOptionClick(termsOfUseContent.key, termsOfUseContent.state)
              }}
            >
              <div className={'flex items-center gap-x-1'}>
                <div className={'flex h-[24px] w-[24px] items-center'}>
                  {termsOfUseContent.state ? (
                    <CheckIcon width={24} height={24} />
                  ) : (
                    <UncheckIcon width={24} height={24} />
                  )}
                </div>
                <div className={termsOfUseContent.state ? 'body1 text-black' : 'body1 text-darkGray'}>
                  {termsOfUseContent.content}
                </div>
              </div>
              <div className={'flex h-[32px] w-[32px] items-center'}>
                <RightArrowIcon direction="right" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
