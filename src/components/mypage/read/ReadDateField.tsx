interface ReadDateFieldProps {}
export default function ReadDateField({}: ReadDateFieldProps) {
  return (
    <section>
      <section className={'flex flex-col gap-y-2'}>
        <div className="title-medium-16">
          읽은 날<span className="text-brand-color"> *</span>
        </div>
        <div className="border-light-gray rounded-[12px] border px-4 py-3">
          <input
            onChange={(e) => {}}
            type={'date'}
            placeholder={'날짜 선택'}
            className={'text-dark-gray title-regular-14 w-full outline-none'}
          />
        </div>
      </section>
    </section>
  )
}
