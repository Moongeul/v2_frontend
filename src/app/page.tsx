import Link from 'next/link'
import { KakaoLogoIcon, LogoIcon } from '@/assets/svgComponents'

export default function Home() {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`

  return (
    <main className="bg-deep-dark-gray flex min-h-screen items-center justify-center">
      <LogoIcon width={230} height={52}></LogoIcon>
      <div className="fixed bottom-0 w-full px-5 pt-2 pb-[32px]">
        <Link
          href={kakaoAuthUrl}
          className="button flex h-[48px] w-full items-center justify-center gap-x-2 rounded-full bg-white"
        >
          <KakaoLogoIcon width={24} height={24} />
          카카오로 시작하기
        </Link>
      </div>
    </main>
  )
}
