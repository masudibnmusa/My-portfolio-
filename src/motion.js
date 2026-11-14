// Shared animation presets so every section moves the same way
export const easeOut = [0.22, 1, 0.36, 1]
export const spring = { type: 'spring', bounce: 0.2, visualDuration: 0.4 }

// Sections rise 32px and fade in once as they enter the viewport.
// MotionConfig reducedMotion="user" (main.jsx) drops the movement and keeps the fade.
export const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: easeOut },
}

// Parent of a staggered group; children use `rise` (or their own hidden/show variants)
export const stagger = (each = 0.06, delay = 0.1) => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.1 },
  variants: { hidden: {}, show: { transition: { staggerChildren: each, delayChildren: delay } } },
})

export const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}
