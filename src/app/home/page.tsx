'use client'

import NavBar from '@/components/common/NavBar'
import Header from '@/components/common/Header'
import HomeMenu from '@/components/common/HomeMenu'
import { useState } from 'react'
import { HomeMenuType } from '@/types/home'

export default function Home() {
  const [selectedHomeMenuContent, setSelectedHomeMenuContent] = useState<HomeMenuType>('전체')

  return (
    <main>
      <Header headerType={"HOME"}/>
      <HomeMenu selectedHomeMenuContent={selectedHomeMenuContent} setSelectedHomeMenuContent={setSelectedHomeMenuContent}></HomeMenu>
      <div>

      </div>
      <NavBar />
    </main>
  )
}
