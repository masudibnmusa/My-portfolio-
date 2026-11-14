// Shared animation presets so every section moves the same way
export const easeOut = [0.22, 1, 0.36, 1]
export const spring = { type: 'spring', bounce: 0.2, duration: 0.6 }

// Spread onto any motion element: fades up once when scrolled into view
export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easeOut },
}

// Parent of a staggered grid; children use `item`
export const staggerGrid = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.1 },
  variants: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
}

export const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring },
}

// Card lift on hover; springs stay smooth when hover is interrupted
export const cardHover = { whileHover: { y: -6, transition: spring } }

export const press = { whileTap: { scale: 0.94 } }
