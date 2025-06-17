import { tagList } from '@/utils/common'
import Tag from '@/components/common/Tag'
import { useState } from 'react'

export default function TagField() {
  const [selectedTagList, setSelectedTagList] = useState<string[]>([])
  return (
    <section>
      <section className={'flex flex-col gap-y-2'}>
        <div className="title-medium-16">
          책 취향 태그<span className="text-dark-gray"> (선택)</span>
        </div>
      </section>
      <section className="mt-2 grid w-full grid-cols-4 gap-3">
        {tagList.map((tag) => {
          return (
            <Tag key={tag} selectedTagList={selectedTagList} setSelectedTagList={setSelectedTagList} tagContent={tag} />
          )
        })}
      </section>
    </section>
  )
}
