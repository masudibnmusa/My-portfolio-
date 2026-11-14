import { motion } from 'motion/react'
import { reveal } from '../motion'

// One shell for every section: same container, same vertical rhythm, same heading style
export default function Section({ id, title, intro, surface, children }) {
  return (
    <section id={id} aria-labelledby={id && `${id}-title`} className={`py-16 md:py-24 ${surface ? 'bg-surface' : ''}`}>
      <motion.div {...reveal} className="reveal mx-auto max-w-6xl px-6">
        {title && (
          <header className="mb-10 md:mb-12 max-w-[680px]">
            <h2 id={id && `${id}-title`} className="heading-4 md:heading-3">{title}</h2>
            {intro && <p className="body-3 text-muted mt-3">{intro}</p>}
          </header>
        )}
        {children}
      </motion.div>
    </section>
  )
}
