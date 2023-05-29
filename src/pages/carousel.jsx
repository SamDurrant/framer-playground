// resource: https://www.youtube.com/watch?v=aV2YJuxQ2vo

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { useState } from 'react'
import useMeasure from 'react-use-measure'

function Carousel() {
  const [lang, cycleLange] = useCycle('eng', 'span')
  let [count, setCount] = useState(0)
  let [ref, { width }] = useMeasure()
  let prev = usePrevious(count)
  const modulo = count % words.length
  const wordIndex = modulo < 0 ? words.length + modulo : modulo
  let direction = count > prev ? 1 : -1

  return (
    <div
      ref={ref}
      className="relative mx-auto h-screen flex justify-between gap-12 text-sky-50 bg-slate-800 px-8"
    >
      <button
        onClick={() => setCount(count + 1)}
        className="h-fit self-center rounded-full hover:shadow-none hover:scale-125"
      >
        <ChevronLeftIcon className="w-7 h-7" />
      </button>

      <div className="relative flex h-80 w-[50vw] items-center justify-center overflow-hidden self-center box-border px-4">
        <AnimatePresence mode="popLayout" custom={{ direction, width }}>
          <motion.div
            className={`absolute text-4xl font-bold text-sky-50 h-80 w-80 rounded-full flex items-center justify-center cursor-pointer ${colors[wordIndex]}`}
            key={count}
            variants={variants}
            initial="enter"
            animate={['center', lang]}
            exit="exit"
            custom={{ direction, width }}
            onTapStart={cycleLange}
          >
            <motion.p
              variants={{
                eng: { opacity: 0, display: 'none', x: -75 },
                span: { opacity: 1, display: 'block', x: 0 },
              }}
              transition={{
                duration: 0.45
              }}
            >
              {words[wordIndex].s}
            </motion.p>
            <motion.p
              variants={{
                eng: { opacity: 1, display: 'block', x: 0 },
                span: { opacity: 0, display: 'none', x: -75 },
              }}
              transition={{
                duration: 0.45
              }}
            >
              {words[wordIndex].e}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={() => setCount(count - 1)}
        className="h-fit self-center rounded-full hover:shadow-none hover:scale-125"
      >
        <ChevronRightIcon className="w-7 h-7" />
      </button>
    </div>
  )
}

export { Carousel }

function usePrevious(state) {
  let [tuple, setTuple] = useState([null, state]) // [prev, current]

  if (tuple[1] !== state) setTuple([tuple[1], state])

  return tuple[0]
}

let variants = {
  enter: ({ direction, width }) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({ x: direction * -width }),
}

// const words = ['uvas', 'moras', 'peras', 'palta', 'fresas', 'cerezas']
const words = [
  {
    e: 'grapes',
    s: 'uvas',
  },
  {
    e: 'blackberries',
    s: 'moras',
  },
  {
    e: 'pears',
    s: 'peras',
  },
  {
    e: 'avocado',
    s: 'palta',
  },
  {
    e: 'strawberries',
    s: 'fresas',
  },
  {
    e: 'cherries',
    s: 'cerezas',
  },
]
const colors = [
  'bg-purple-200',
  'bg-red-200',
  'bg-orange-400',
  'bg-amber-400',
  'bg-green-300',
  'bg-indigo-300',
]
