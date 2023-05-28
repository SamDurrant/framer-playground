import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
// import { useState } from "react";

function GradientHover() {
  // let [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  // console.log('render') // !! wow! this gets called a lot with useState
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }) {
    // currentTarget is the card
    // top = offset from top of viewport
    // left = offset from left of viewport
    let { left, top } = currentTarget.getBoundingClientRect();
    // if px offset of card is = to px offset of mouseEvent -> left = 0, top = 0
    mouseX.set(clientX - left); // clientX = px from left
    mouseY.set(clientY - top); // clientY = px from top
  }

  return (
    <div className="flex-col w-full">
      <div
        className="group relative rounded-xl border border-white/10 bg-gray-900 px-8 py-16 shadow-2xl w-full h-screen"
        onMouseMove={handleMouseMove}
      >
        {/* need to use useMotionTemplate in order to render MotionValues in template literals */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgb(14 165 233 / 0.2), transparent 80%)`
          }}
        />
        { content() }
      </div>

      <div className="w-full min-h-screen flex-col py-10">
      {[...Array(6).keys()].map((i) => (
        <div
          key={i}
          className="group relative max-w-md rounded-xl border border-white/10 bg-gray-900 px-8 py-16 shadow-2xl mx-auto my-10 self-center"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(14, 165, 233, 0.15),
                  transparent 80%
                )
              `,
            }}
          />
          {content()}
        </div>
      ))}
      </div>
    </div>
  );
}

export { GradientHover }

const content = () => {
  return (
    <div>
<h3 className="text-base font-semibold leading-7 text-sky-500">
  Byline
</h3>
<div className="mt-2 flex items-center gap-x-2">
  <span className="text-5xl font-bold tracking-tight text-white">
    Hero
  </span>
</div>
<p className="mt-6 text-base leading-7 text-gray-300">
  Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis
  illum eum ullam nostrum atque quam.
</p>
</div>
  )
}