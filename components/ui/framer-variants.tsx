import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function AnimatedCard() {
  return (
    <motion.div
      className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
        Hello with Framer Variants!
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mt-2">
        This is a card that fades and slides into view.
      </p>
    </motion.div>
  )
}
