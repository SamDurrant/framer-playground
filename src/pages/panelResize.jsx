// resource reference: Sam Selikoff
// https://www.youtube.com/watch?v=G3OyF-lRAWo

/* eslint-disable react/prop-types */
import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import useMeasure from 'react-use-measure'

let duration = 0.5
function PanelResize() {
  let [count, setCount] = useState(0)
  let [foo, setFoo] = useState(false)

  return (
    <MotionConfig transition={{ duration }}>
      <div className="flex min-h-screen flex-col p-10 text-zinc-100">
        <div className="mx-auto mt-8 h-full w-full max-w-sm border border-zinc-500 pt-8">
          <h1 className="mb-8 text-center text-3xl font-thin">Hello</h1>
          <div className="mb-8 flex justify-between px-8">
            <button
              className="border px-2 py-1"
              onClick={() => setCount(count + 1)}
            >
              Toggle
            </button>
            <button className="border px-2 py-1" onClick={() => setFoo(!foo)}>
              Rerender ({foo ? 'y' : 'n'})
            </button>
          </div>

          <ResizablePanel>
            {count % 3 === 2 ? (
              <p>
                Something even longer that it might be the longest. Lorem modi
                vel ipsum dolor sit amet consectetur ipsum dolor adipisicing
                modi vel elit. Repudiandae modi vel modi vel amet consectetur
                ipsum dolor adipisicing modi vel odio.
              </p>
            ) : count % 3 === 1 ? (
              <p>
                Something a bit longer. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Repudiandae modi vel odio.
              </p>
            ) : (
              <p>Something short.</p>
            )}
          </ResizablePanel>
        </div>

        <div className="mx-auto mt-16 max-w-md">
          <p>
            Some other content. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Eveniet distinctio voluptatum dolore, nobis
            debitis sequi error nisi! Eveniet consectetur consequatur, vero sint
            doloribus ducimus laudantium officiis nam recusandae soluta aliquam?
          </p>
        </div>
      </div>
    </MotionConfig>
  )
}

export { PanelResize }

function ResizablePanel({ children }) {
  let [ref, { height }] = useMeasure()

  return (
    <motion.div
      animate={{ height: height || 'auto' }}
      className="overflow-hidden relative"
    >
      <AnimatePresence initial={false}>
        {/* 
          we want the element that is exiting to take half as long as the total duration so we give exit is own transition with duration / 2
          we want th entrance animation to take half as long as the total duration but also be delayed to the second half of the whole animation
        */}
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{ opacity: 0, x: 382 }}
          animate={{ opacity: 1, x: 0, transition: {
            duration: duration / 2,
            delay: duration / 2
          } }}
          exit={{ opacity: 0, x: -382, transition: {
            duration: duration / 2
          } }}
        >
          <div
            ref={ref}
            className={`${height ? 'absolute' : 'relative'} px-8 pb-8`}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

const ignoreCircularReferences = () => {
  const seen = new WeakSet()
  return (key, value) => {
    if (key.startsWith('_')) return // don't compare React's internal props
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return
      seen.add(value)
    }
    return value
  }
}