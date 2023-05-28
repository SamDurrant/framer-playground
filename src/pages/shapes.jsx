import { motion } from 'framer-motion'

function ShapesExplorer() {
  const repeatTypes = ['mirror', 'loop', 'reverse']

  return (
    <div className="overflow-scroll w-full">
      <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-200 gap-8 text-slate-700 text-center">
      <h4>Already {replies.length} furry friends liked this post!</h4>
      <motion.ul
        className='flex my-8 pl-0'
        initial="hidden"
        animate="visible"
        variants={list}
      >
        {replies.map((reply) => (
          <motion.li
            style={{
              listStyle: 'none',
              marginRight: '-10px',
            }}
            key={reply.id}
            data-testid={reply.id}
            variants={item}
            whileHover={{
              scale: 1.2,
              marginRight: '5px',
              transition: { ease: 'easeOut' },
            }}
          >
            <div
              className='h-12 w-12 rounded-full text-3xl border-2 flex items-center justify-center cursor-pointer border-purple-500 bg-gradient-to-r from-pink-400 to-blue-200'
            >
              <span role="img" style={{ paddingRight: 0 }}>
                {reply.photo}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      </div>
      <div className="w-full h-screen flex items-center justify-center bg-slate-200 gap-8 text-slate-700 text-center">
        <motion.div
          style={{
            background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
            height: '200px',
            width: '100px',
            borderRadius: '10%',
          }}
          className="flex flex-col gap-8 justify-center"
          variants={boxVariants}
          initial="out"
          animate="in"
        >
          {['🚀', '🪄', '✨'].map((icon, i) => (
            <motion.span role="img" key={i} variants={iconVariants}>
              {icon}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <div className="w-full h-screen flex items-center justify-center bg-slate-200 gap-8 text-slate-700 text-center">
        {repeatTypes.map((type) => (
          <div className="flex flex-col justify-center h-screen" key={type}>
            <p>{type}</p>
            <motion.div
              style={{
                background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
                height: '100px',
                width: '100px',
                borderRadius: '50%',
              }}
              variants={blockVariants}
              initial="initial"
              animate="target"
              transition={{
                ease: 'easeInOut',
                duration: 0.7,
                delay: 1,
                // repeat: 3,
                repeat: Infinity,
                repeatType: type,
                repeatDelay: 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export { ShapesExplorer }

const replies = [
  {
    id: '1',
    photo: '🐶',
  },
  {
    id: '2',
    photo: '🐱',
  },
  {
    id: '3',
    photo: '🐰',
  },
  {
    id: '4',
    photo: '🐭',
  },
  {
    id: '5',
    photo: '🐹',
  },
  {
    id: '6',
    photo: '🦊',
  },
  {
    id: '7',
    photo: '🐻',
  },
  {
    id: '8',
    photo: '🐼',
  },
  {
    id: '9',
    photo: '🐨',
  },
];

const list = {
  visible: {
    opacity: 1,
    transition: {
      // delayChildren: 1.5,
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -10 },
};

const boxVariants = {
  out: {
    y: 600,
  },
  in: {
    y: 0,
    transition: {
      duration: 0.6,
      // Both children will appear 1.2s AFTER the parent has appeared
      delayChildren: 1.2,
      // The next sibling will appear 0.5s after the previous one
      staggerChildren: 0.5,
    },
  },
}

const iconVariants = {
  out: {
    x: -600,
  },
  in: {
    x: 0,
  },
}

const blockVariants = {
  initial: {
    y: -50,
  },
  target: {
    y: 100,
  },
}
