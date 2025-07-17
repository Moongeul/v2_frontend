import { motion } from 'framer-motion'

interface MiddleModalProps {
  onClick: () => void
}

const MiddleModal = ({ onClick }: MiddleModalProps) => {
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
        className="bg-deep-dark-gray flex w-full flex-col items-center justify-center rounded-[20px] p-5"
      >
        <div></div>
      </motion.div>
    </div>
  )
}
export default MiddleModal
