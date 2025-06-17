import { Dispatch, SetStateAction, useState } from 'react'
import { tagList } from '@/utils/common'
import Header from '@/components/common/Header'
import Tag from '@/components/common/Tag'
import Button from '@/components/common/Button'
import { SignUpStepType } from '@/types/sign-up'
import { postMemberInitialTags } from '@/lib/sign-up'

interface TagPreferencePageProps {
  setStep: Dispatch<SetStateAction<SignUpStepType>>
}

export default function TagPreferencePage({ setStep }: TagPreferencePageProps) {
  const [selectedTagList, setSelectedTagList] = useState<string[]>([])

  const handleSubmit = () => {
    const tags = {
      tag1: selectedTagList[0],
      tag2: selectedTagList[1],
      tag3: selectedTagList[2],
      tag4: selectedTagList[3],
      tag5: selectedTagList[4],
    }
    postMemberInitialTags(tags).then((res) => {
      console.log('책 태그 생성 성공', res)
      setStep('ProfileSetting')
    })
  }

  return (
    <main>
      <Header
        onBack={() => {
          setStep('TermsAgreementPage')
        }}
        headerType={'DYNAMIC'}
      >
        책 취향 선택
      </Header>
      <section className="mt-[90px] px-5 py-3">
        <h2 className="heading-bold-22">어떤 책을 좋아하시나요?</h2>
        <p className="body-regular-16 text-dark-gray">
          좋아하는 책 취향을 선택하고 추천받아보세요.
          <br />
          (5개 선택 필수)
        </p>
      </section>
      <section className="mb-[90px] grid grid-cols-4 gap-3 px-5 py-3">
        {tagList.map((tag) => {
          return (
            <Tag key={tag} selectedTagList={selectedTagList} setSelectedTagList={setSelectedTagList} tagContent={tag} />
          )
        })}
      </section>

      <div className="bg-background fixed bottom-0 w-full px-5 pt-2 pb-[32px]">
        <Button
          disabled={selectedTagList.length !== 5}
          onClick={handleSubmit}
          size={'large'}
          state={selectedTagList.length === 5 ? 'active' : 'disabled'}
          customClassName={'w-full'}
        >
          다음
        </Button>
      </div>
    </main>
  )
}
