'use client'
import Header from '@/components/common/Header'
import NavBar from '@/components/common/NavBar'
import MyPageHeader from '@/components/mypage/MyPageHeader'
import { BlackRightArrowIcon } from '@/assets/svgComponents'

export default function Mypage() {
  const mypageContents = [
    { content: '내가 쓴 글', path: '/mypage/post' },
    { content: '내가 쓴 댓글', component: '/mypage/comment' },
    { content: '좋아요 누른 게시글', component: '/mypage/like' },
    { content: '인용된 글', component: '/mypage/quote' },
    { content: '정보 공개 여부 설정', component: '/mypage/privacy' },
  ]

  return (
    <main>
      <Header headerType={'HOME'} />
      <MyPageHeader />
      <div className="h-[320px]" />
      <section className="mt-[320px] mb-[80px] flex flex-col gap-y-2 px-5 pt-[10px]">
        {mypageContents.map((content) => {
          return (
            <div className="border-light-gray flex justify-between border-b py-3 pr-2">
              <p className="title-regular-16">{content.content}</p>
              <BlackRightArrowIcon width={18} height={18} />
            </div>
          )
        })}
        <div className="border-light-gray flex justify-between border-b py-3 pr-2">
          <p className="title-regular-16">로그아웃</p>
          <BlackRightArrowIcon width={18} height={18} />
        </div>
      </section>
      <NavBar />
    </main>
  )
}
