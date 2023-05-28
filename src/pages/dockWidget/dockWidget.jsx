/* eslint-disable react/jsx-key */
// resource reference: Sam Selikoff
// https://www.youtube.com/watch?v=JV5BlbRy_mg
/* eslint-disable react/prop-types */
import { useMotionValue } from 'framer-motion'
import { DockIcon } from './dockIcon'

function DockWidget() {
  // using framer motions motion value is a better fit because onMouseMove updates so frequently. We can avoid triggering re-renders
  // set to Infinity as this is still a number but it will never fall within the range of distances to sync, allowing the components to load in their initial state and to move back to initial state when we rest to Infinity onMouseLeave
  let mouseX = useMotionValue(Infinity)

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto self-end flex h-16 items-end gap-4 rounded-2xl bg-gray-700 px-4 pb-3 mb-8"
    >
      {[...Array(6).keys()].map((i) => (
        <DockIcon key={i} mouseX={mouseX} />
      ))}
    </div>
  )
}

export { DockWidget }
