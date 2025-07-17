import { motion } from 'framer-motion'

import { ReactNode } from 'react'

interface OptionModalProps {
  onClick: () => void
  title: string | undefined
  children: ReactNode
}
export default function OptionModal({ onClick, title, children }: OptionModalProps) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
        className="bg-deep-dark-gray absolute bottom-0 flex w-full flex-col items-center justify-center rounded-t-[20px] pb-5"
      >
        <div className="bg-dark-gray mt-[6px] mb-[10px] h-[5px] w-[36px] rounded-full"></div>
        <div className="title-regular-14 text-light-gray flex h-[48px] items-center justify-center">{title}</div>
        {children}
      </motion.div>
    </div>
  )
}
