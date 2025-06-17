'use client'

import { useState } from 'react'
import { EmptyKidStarIcon, KidStarIcon, OptionIcon } from '@/assets/svgComponents'
import Header from '@/components/common/Header'
import BookInfo from '@/components/mypage/read/BookInfo'
import ReadInfoItem from '@/components/mypage/read/ReadInfoItem'
import OptionModal from '@/components/common/OptionModal'

export default function ReadBookDetail() {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false)
  const rating_average = 4.5
  const tagList = ['행복', '감사', '사랑', '가족', '평화']
  return (
    <main>
      {isOptionModalOpen && (
        <OptionModal onClick={() => setIsOptionModalOpen(false)} title={'나미야 잡화점의 기적'}>
          <>
            <button onClick={() => {}} className="title-medium-16 flex h-[56px] items-center justify-center text-white">
              수정하기
            </button>
            <button
              onClick={() => {}}
              className="title-medium-16 text-brand-color flex h-[56px] items-center justify-center"
            >
              삭제하기
            </button>
          </>
        </OptionModal>
      )}
      <Header
        headerType={'DYNAMIC'}
        rightComponent={
          <OptionIcon
            onClick={() => {
              setIsOptionModalOpen(!isOptionModalOpen)
            }}
            width={6}
            height={12}
          />
        }
      >
        읽은 책
      </Header>
      <div className="mt-[100px] px-5">
        <BookInfo author="히가시노 게이고" title="나미야 잡화점의 기적" pubdate={'2012'} publisher={'현대문학'} />

        <ReadInfoItem title={'읽은 날짜'}>
          <div className="title-regular-14">2024. 09. 12</div>
        </ReadInfoItem>

        <ReadInfoItem title={'책 평점'}>
          <div className="flex items-center">
            {[...Array(5)].map((_, idx) =>
              idx < Math.floor(rating_average as number) ? (
                <KidStarIcon key={idx} width={32} height={32} />
              ) : (
                <EmptyKidStarIcon key={idx} width={32} height={32} />
              )
            )}
            <div className="title-regular-14 ml-3">{rating_average}</div>
          </div>
        </ReadInfoItem>

        <ReadInfoItem title={'한줄평'}>
          <div className="title-regular-14">한줄평입니다.</div>
        </ReadInfoItem>

        <ReadInfoItem title={'책 취향 태그'}>
          <div className="flex gap-x-2">
            {tagList.map((tag) => {
              return (
                <div key={tag} className="text-dark-gray body-regular-14 rounded-full bg-white px-[10px] py-[2px]">
                  #{tag}
                </div>
              )
            })}
          </div>
        </ReadInfoItem>
      </div>
    </main>
  )
}
