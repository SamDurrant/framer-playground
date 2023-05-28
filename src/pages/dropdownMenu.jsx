/* eslint-disable react/prop-types */
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'

function Dropdown() {
  let [text, setText] = useState('Select an item')
  // open state is internal to start (because radix wants it to be easy) but we can take control of it if we want to take care of the state ourselves
  let [open, setOpen] = useState(false)
  let controls = useAnimationControls()

  const closeMenu = async () => {
    // this allows us to await the menu closing before running the alert on Item 3
    await controls.start('closed')
    setOpen(false)
  }

  useEffect(() => {
    // respond to changes of 'open' here
    if (open) {
      controls.start('open')
    }
  }, [controls, open])

  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-md border border-gray-300 bg-white text-slate-700">
        <header className="border-b border-gray-100 p-2">
          {/* 
            We don't want to set controls when calling setOpen here
            it would be like trying to set open andd run animation in the same render. An element needs to be mounted first before the animations are run
          */}
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger className="cursor-default select-none rounded px-4 text-2xl hover:bg-gray-200/50 focus-visible:outline-none data-[state=open]:bg-gray-200/75">
              
            </DropdownMenu.Trigger>

            {/* 
              we need AnimatePresence to wrap this component in order for the exit animation to work.
              For AnimatePresence to work, we need the conditional logic in the jsx underneath it 
              - we need someway to tell if the menu is open
              - if it's open, then render the menu

            */}
            <AnimatePresence>
              {open && (
                <DropdownMenu.Portal forceMount>
                  <DropdownMenu.Content
                    align="start"
                    className="mt-1 overflow-hidden rounded bg-white/75 p-2 text-left shadow backdrop-blur"
                    asChild
                  >
                    <motion.div
                      initial='open'
                      animate={controls}
                      exit='closed'
                      variants={{
                        open: { opacity: 1, transition: {
                          ease: 'easeOut',
                          duration: 0.1
                        } },
                        closed: { opacity: 0, transition: {
                          ease: 'easeIn',
                          duration: 0.2
                        } }
                      }}
                    >
                      <Item
                        closeMenu={closeMenu}
                        onSelect={() => setText('Clicked Item 1')}
                      >
                        Item 1
                      </Item>
                      <Item
                        closeMenu={closeMenu}
                        onSelect={() => setText('Clicked Item 2')}
                      >
                        Item 2
                      </Item>
                      <Item closeMenu={closeMenu} onSelect={() => alert(';)')}>
                        Item 3
                      </Item>
                    </motion.div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              )}
            </AnimatePresence>
          </DropdownMenu.Root>
        </header>
        <div className="px-6 py-8 text-right">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export { Dropdown }

function Item({ children, closeMenu = () => {}, onSelect = () => {} }) {
  let controls = useAnimationControls()

  const selectItem = async (e) => {
    e.preventDefault()
    // controls.start returns a promise which means we can await it to  orchestrate different parts of our animation
    await controls.start({
      backgroundColor: '#fff',
      color: '#000',
      transition: { duration: 0.04 },
    })
    await controls.start({
      backgroundColor: '#38bdf8',
      color: '#fff',
      transition: { duration: 0.04 },
    })

    // small pause after animation before closing menu
    await sleep(0.075)

    await closeMenu()
    onSelect()
  }

  return (
    <DropdownMenu.Item
      onSelect={selectItem}
      className="w-40 select-none rounded px-2 py-1.5 text-gray-700 data-[highlighted]:bg-sky-400 data-[highlighted]:text-white data-[highlighted]:focus:outline-none"
      asChild
    >
      <motion.div animate={controls}>{children}</motion.div>
    </DropdownMenu.Item>
  )
}

const sleep = num => new Promise(resolve => setTimeout(resolve, num * 1000))