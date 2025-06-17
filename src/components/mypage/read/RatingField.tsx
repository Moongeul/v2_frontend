import { useState } from 'react'

export default function RatingField() {
  const [value, setValue] = useState(0)
  return (
    <section className="flex flex-col gap-y-2">
      <section className={'flex flex-col gap-y-2'}>
        <div className="title-medium-16">
          평점<span className="text-dark-gray"> (선택)</span>
        </div>
      </section>
      <section className="flex gap-x-3">
        <input
          value={value}
          type="range"
          min="0"
          max="5"
          step="0.5"
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="accent-brand-color w-[90%] bg-gray-200 outline-none"
        />
        <p className="title-regular-14">{value}</p>
      </section>
    </section>
  )
}
