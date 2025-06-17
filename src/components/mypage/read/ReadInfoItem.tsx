import { ReactNode } from 'react'

interface ReadInfoItemProps {
  title: string
  children: ReactNode
}
export default function ReadInfoItem({ title, children }: ReadInfoItemProps) {
  return (
    <div className="border-dark-gray flex flex-col gap-y-1 border-b pb-4">
      <div className="title-medium-16 flex h-[52px] items-center">{title}</div>
      <div>{children}</div>
    </div>
  )
}
