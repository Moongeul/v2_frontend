'use client'

import Button from '@/components/common/Button'
import Header from '@/components/common/Header'

export default function Write() {
  return (
    <main>
      <Header headerType={'DYNAMIC'}>글 작성</Header>
      <div className="bg-background fixed bottom-0 w-full px-5 pt-2 pb-[32px]">
        <Button size={'large'} state={'active'} customClassName={'w-full'}>
          완료하기
        </Button>
      </div>
    </main>
  )
}
