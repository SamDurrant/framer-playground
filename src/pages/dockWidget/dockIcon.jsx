/* eslint-disable react/prop-types */
import { motion, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

function DockIcon({ mouseX }) {
  let ref = useRef(null)

  let distance = useTransform(mouseX, val => {
    // getBoundingClientRect returns useful info like dimensions, where an element is in the DOM, 
    // val correlates with the mouseX.current property we set onMouseMove
    // x property similar to pageX property - distance from left side of page
    // x = distance of component from left side of page
    // width = width of component - which will range based on our widthSync property below
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0};
    // return the distance from the center of component
    return val - bounds.x  - bounds.width / 2
  })
  // we want to make the width a transformation of 
  // the distance between the mouseX and the center of our icon
  // if mouse is X distance away from the center it will sync with the width
  // the less distance from the center, the more the width grows
  // a larger input range will result in more items with width change
  let widthSync = useTransform(distance, [-150, 0, 150], [40, 70, 40])
  let width = useSpring(widthSync, { damping: 15, mass: 0.1, stiffness: 200 })
  
  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square w-10 rounded-full bg-blue-200"
    />
  )
}

export { DockIcon }