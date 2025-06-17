import { Dispatch, ReactNode, SetStateAction } from 'react'
import { ArrowDropDownIcon, ArrowDropUpIcon } from '@/assets/svgComponents'

interface DropBoxProps {
  selectedContent: string
  isFilterClicked: boolean
  setIsFilterClicked: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}
export default function DropBox({ selectedContent, children, isFilterClicked, setIsFilterClicked }: DropBoxProps) {
  return (
    <div className="relative">
      <DropBoxContent
        setIsFilterClicked={setIsFilterClicked}
        selectedContent={selectedContent}
        isFilterClicked={isFilterClicked}
      />
      {isFilterClicked && <DropBoxFilter children={children} />}
    </div>
  )
}
function DropBoxContent({
  selectedContent,
  isFilterClicked,
  setIsFilterClicked,
}: {
  selectedContent: string
  isFilterClicked: boolean
  setIsFilterClicked: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      onClick={() => {
        setIsFilterClicked(!isFilterClicked)
      }}
      className="flex justify-between rounded-[8px] bg-black px-4 py-3"
    >
      <p className="button text-white">{selectedContent}</p>
      {isFilterClicked ? <ArrowDropUpIcon width={24} height={24} /> : <ArrowDropDownIcon width={24} height={24} />}
    </div>
  )
}

function DropBoxFilter({ children }: { children: ReactNode }) {
  return <div className="absolute top-14 flex w-full flex-col gap-y-2 rounded-[8px] bg-white px-3">{children}</div>
}
