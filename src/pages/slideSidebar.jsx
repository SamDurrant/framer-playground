// Egghead - Will Johnson
// https://egghead.io/blog/how-to-create-a-sliding-sidebar-menu-with-framer-motion

import { AnimatePresence, motion, useCycle } from 'framer-motion'

export default function SlideSidebar() {
  const [open, cycleOpen] = useCycle(false, true)
  return (
    <main className="bg-white text-slate-700 p-4 flex flex-col">
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 300 }}
            exit={{ width: 0, transition: { delay: 0.5, duration: 0.3 } }}
          >
            <motion.div
              className="container flex flex-col gap-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              {links.map(({ name, to, id }) => (
                <motion.a key={id} href={to} whileHover={{ scale: 1.1 }} variants={itemVariants}>
                  {name}
                </motion.a>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="btn-container mt-auto">
        <button onClick={cycleOpen}>{open ? 'Close' : 'Open'}</button>
      </div>
    </main>
  )
}

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.14,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.14,
      staggerDirection: 1,
    },
  },
}

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  },
}

const links = [
  { name: 'Home', to: '#', id: 1 },
  { name: 'About', to: '#', id: 2 },
  { name: 'Blog', to: '#', id: 3 },
  { name: 'Contact', to: '#', id: 4 },
]
