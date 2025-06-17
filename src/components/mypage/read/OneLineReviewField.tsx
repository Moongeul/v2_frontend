export default function OneLineReviewField() {
  return (
    <div>
      <section className={'flex flex-col gap-y-2'}>
        <div className="title-medium-16">
          한줄평<span className="text-dark-gray"> (선택)</span>
        </div>
        <div className="border-light-gray rounded-[12px] border px-4 py-3">
          <input
            onChange={(e) => {}}
            placeholder={'한줄평을 작성해주세요.'}
            className={'text-dark-gray title-regular-14 w-full outline-none'}
          />
        </div>
      </section>
    </div>
  )
}
