import Header from '@/components/common/Header'
import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import Input from '@/components/common/Input'
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react'
import { CameraIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import { SignUpStepType } from '@/types/sign-up'
import { patchMemberChangeNickname, patchMemberChangeProfileImage, postMemberCheckNickname } from '@/lib/sign-up'
import { ApiResponse } from '@/types/common'

interface ProfileSettingProps {
  setStep: Dispatch<SetStateAction<SignUpStepType>>
}

export default function ProfileSetting({ setStep }: ProfileSettingProps) {
  const router = useRouter()
  //닉네임
  const [nickname, setNickName] = useState<string>('')
  const [isNicknameChecking, setIsNicknameChecking] = useState(false)
  const [isNicknameFieldTouched, setIsNicknameFieldTouched] = useState(false) //사용자가 한 번이라도 해당 input에 진입 후 빠져나간(blur) 적이 있는 상태
  const [isNicknameFieldFocused, setIsNicknameFieldFocused] = useState(false) //현재 커서가 해당 input에 위치해 있는 상태
  const [nickNameValidationResult, setNickNameValidationResult] = useState<boolean | null>(null) // true: 중복된게 잇는거,
  const [isInvalidModalOpen, setIsInvalidModalOpen] = useState(false)
  //이미지
  const imgRef = useRef<HTMLInputElement>(null)
  const [uploadImage, setUploadImage] = useState<string | ArrayBuffer | null>()

  /**
   * 이미지 미리보기 설정
   */
  const handleImagePreview = async () => {
    const files = imgRef.current?.files
    const reader = new FileReader()
    if (files) {
      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        setUploadImage(reader.result)
      }
    }
  }

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() // 새로고침 방지

    const formData = new FormData()

    if (imgRef.current && imgRef.current.files && imgRef.current.files[0]) {
      formData.append('image', imgRef.current.files[0]) // 이미지 첨부
    }

    await patchMemberChangeNickname(nickname)
    await patchMemberChangeProfileImage(formData)

    router.push('/home')
  }

  // 닉네임 필드 안내 문구 함수
  const getNicknameValidationMessage = (): string | null => {
    if (isNicknameChecking) return null
    if (!isNicknameFieldTouched || isNicknameFieldFocused) return null

    if (nickname === '') return '* 닉네임을 입력해주세요.'
    if (nickNameValidationResult === null) {
      return isInvalidModalOpen ? '* 닉네임 중복 확인을 해주세요.' : null
    }
    return nickNameValidationResult ? '* 사용 가능한 닉네임 입니다.' : '* 이미 존재하는 닉네임입니다.'
  }

  return (
    <form onSubmit={handleSubmit}>
      <Header
        onBack={() => {
          setStep('TagPreferencePage')
        }}
        headerType={'DYNAMIC'}
      >
        내 정보 설정
      </Header>
      <section className="mt-[100px] flex flex-col gap-y-[32px] px-5 py-4">
        <section className="flex w-full items-center justify-center">
          <div onClick={() => imgRef.current?.click()} className="relative h-[80px] w-[80px]">
            <Image
              src={typeof uploadImage === 'string' ? uploadImage : '/profile.jpg'}
              alt="cake"
              fill
              className="rounded-full object-cover"
            />
            <div className="bg-dark-gray absolute right-0 bottom-0 flex h-[32px] w-[32px] items-center justify-center rounded-full border border-white">
              <CameraIcon width={16} height={14} />
            </div>
            <input
              type="file"
              id={'input-file'}
              ref={imgRef}
              name="input-file"
              onChange={handleImagePreview}
              className="hidden"
            />
          </div>
        </section>

        <section className="flex flex-col gap-y-2">
          <section className="flex flex-col gap-y-1">
            <p className="title-medium-16">
              닉네임<span className="text-brand-color"> *</span>
            </p>
            <div className="flex gap-x-1">
              <Input
                inputValue={nickname}
                onChange={() => {
                  setNickNameValidationResult(null)
                  setIsInvalidModalOpen(false)
                }}
                onFocus={() => {
                  setIsNicknameFieldFocused(true)
                }}
                onBlur={() => {
                  setIsNicknameFieldFocused(false)
                  setIsNicknameFieldTouched(true)
                  if (nickname === '') {
                    setIsInvalidModalOpen(true)
                  } else if (nickNameValidationResult === null) {
                    setIsInvalidModalOpen(true)
                  }
                }}
                setInputValue={setNickName}
                type={'round'}
                customClassName={'border-light-gray w-full'}
                placeholder={'닉네임을 입력해주세요.'}
              />
              <Button
                onClick={async () => {
                  if (nickname !== '') {
                    setIsNicknameChecking(true)
                    const result: ApiResponse<void> = await postMemberCheckNickname(nickname)
                    console.log('res', result)
                    setNickNameValidationResult(result.success)
                    setIsInvalidModalOpen(false)
                    setIsNicknameChecking(false)
                  }
                }}
                state={nickname ? 'active' : 'disabled'}
                disabled={!nickname}
                buttonType={'button'}
                customClassName={'px-5 whitespace-nowrap'}
              >
                중복확인
              </Button>
            </div>
          </section>
          <div
            className={
              (!nickNameValidationResult || isInvalidModalOpen) && !isNicknameChecking
                ? 'body-regular-14 text-brand-color'
                : 'body-regular-14 text-dark-gray'
            }
          >
            {getNicknameValidationMessage()}
          </div>
        </section>
      </section>

      <div className="bg-background fixed bottom-0 w-full px-5 pt-2 pb-[32px]">
        <Button
          buttonType={'submit'}
          disabled={!nickNameValidationResult}
          state={nickNameValidationResult ? 'active' : 'disabled'}
          customClassName={'w-full'}
        >
          완료
        </Button>
      </div>
    </form>
  )
}
