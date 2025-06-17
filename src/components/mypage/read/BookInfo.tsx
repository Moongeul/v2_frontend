import Image from 'next/image'

interface BookInfoProps {
  title: string
  author: string
  publisher: string
  pubdate: string
}

export default function BookInfo({ title, author, publisher, pubdate }: BookInfoProps) {
  return (
    <div className="border-dark-gray flex gap-x-2 border-b py-4">
      <Image width={94} height={140} alt={'book'} src={'/book.png'} className="mx-2" />
      <div className="flex flex-col items-start justify-center gap-y-5">
        <p className="title-medium-16">{title}</p>
        <div>
          <p className="body-regular-14 text-dark-gray">{author}</p>
          <p className="body-regular-14 text-dark-gray">{publisher}</p>
          <p className="body-regular-14 text-dark-gray">{pubdate}</p>
        </div>
      </div>
    </div>
  )
}
