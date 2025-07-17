'use client'

import Header from '@/components/common/Header'
import { useState } from 'react'
import Button from '@/components/common/Button'
import WishBookShelfItem from '@/components/mypage/wish/WishBookShelfItem'

export default function Wish() {
  const [isMiddleModalOpen, setIsMiddleModalOpen] = useState(false)
  return (
    <main>
      <Header
        headerType={'DYNAMIC'}
        rightComponent={
          <Button onClick={() => {}} customClassName={'w-[48px]'} size={'large'} state={'main'}>
            추가
          </Button>
        }
      >
        내가 읽고 싶은 책
      </Header>
      <div className="">
        <WishBookShelfItem title={'sdf'} bookImage={'/book.png'} author={'작가'} reason={'아ㅓㅇ란'} />
      </div>
    </main>
  )
}
