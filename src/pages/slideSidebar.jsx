// Egghead - Will Johnson
// https://egghead.io/blog/how-to-create-a-sliding-sidebar-menu-with-framer-motion
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import menuToggle from '../assets/menu-toggle.png'
import { useState } from 'react'

export default function SlideSidebar() {
  const [open, cycleOpen] = useCycle(false, true)
  const [setRotate, changeSetRotate] = useState(-90)
  const [setDelay, changeSetDelay] = useState(.3)

  const handleOpen = () => {
    const newRotate = setRotate === -90 ? 0 : -90
    const newDelay = setDelay === .3 ? 0 : .3
    changeSetRotate(newRotate)
    changeSetDelay(newDelay)
    cycleOpen()
  }

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
                <motion.a
                  key={id}
                  href={to}
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants}
                >
                  {name}
                </motion.a>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="btn-container mt-auto">
        <motion.button onClick={handleOpen} initial={false} animate={{ rotate: setRotate, transition: { delay: setDelay } }}>
          <img
            className='rotate--90'
            src={menuToggle}
            alt="menu toggle"
            width={25}
          />
        </motion.button>
      </div>
    </main>
  )
}

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.085,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.12,
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
