import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { GITHUB, stack } from '../data'
import { easeOut, spring, stagger } from '../motion'
import Section from './Section'

const group = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.035, delayChildren: 0.15 } },
}
const chip = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.35, visualDuration: 0.35 } },
}

export default function Stack() {
  return (
    <Section id="stack" title="Tools I work with" intro="Grouped by where I use them. Python is the one I reach for first.">
      {/* Groups rise in turn; inside each, the logos pop in one after another */}
      <motion.div {...stagger(0.1)} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stack.map((g) => (
          <motion.div key={g.title} variants={group} className="rounded-2xl border border-line bg-raised p-6">
            <h3 className="title-3 text-ink mb-4">{g.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map(([name, logo]) => (
                <motion.li key={name} variants={chip} whileHover={{ y: -2, transition: spring }}
                  className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 caption-1 text-ink">
                  <img src={logo.src} alt="" width="16" height="16" loading="lazy" className={`size-4 ${logo.dark ? 'dark:invert' : ''}`} />
                  {name}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4 rounded-2xl border border-line bg-raised p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h3 className="title-3 text-ink">GitHub activity, last 12 months</h3>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer"
            className="caption-1 text-muted hover:text-accent inline-flex items-center gap-1 min-h-11 transition-colors duration-300 ease-base">
            Open profile <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <img src="https://ghchart.rshah.org/2563eb/masudibnmusa" alt="Masud's GitHub contribution graph for the last year"
            width="663" height="104" loading="lazy" className="w-full min-w-[600px] dark:invert dark:hue-rotate-180" />
        </div>
      </div>
    </Section>
  )
}
