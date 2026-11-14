import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { caseStudies, fullStackProjects } from '../data'
import { rise, spring, stagger } from '../motion'
import Section from './Section'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

function Tags({ tags }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech used">
      {tags.map((t) => (
        <li key={t} className="font-mono caption-4 px-2 py-1 rounded-md border border-line text-muted">{t}</li>
      ))}
    </ul>
  )
}

// Arrow nudges toward the link's destination when its card or row is hovered
const arrowClass = 'text-muted transition-transform duration-500 ease-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-focus-visible:text-accent'

export function CaseStudies() {
  return (
    <Section id="work" title="Selected AI work" intro="LLM pipelines, agents and the tooling around them. Each card opens the source on GitHub.">
      <motion.ul {...stagger(0.08)} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((p, i) => (
          <motion.li key={p.title} variants={rise}>
            <motion.a href={p.href} {...ext}
              whileHover={{ y: -6, transition: spring }} whileTap={{ scale: 0.98, transition: spring }}
              className="group h-full flex flex-col gap-4 rounded-2xl border border-line bg-raised p-6 transition-[border-color,box-shadow] duration-500 ease-base hover:border-muted hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono caption-4 text-muted">{String(i + 1).padStart(2, '0')}</span>
                <ArrowUpRight size={20} aria-hidden="true" className={arrowClass} />
              </div>
              <h3 className="title-1 text-ink">{p.title}</h3>
              <p className="body-6 text-muted flex-1">{p.desc}</p>
              <Tags tags={p.tags} />
              <span className="sr-only">(opens GitHub in a new tab)</span>
            </motion.a>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

export function FullStackProjects() {
  // One highlight glides between rows, following the pointer or keyboard focus
  const [hovered, setHovered] = useState(null)

  return (
    <Section id="projects" title="More projects" intro="Full stack, database and IoT work from university and side projects." surface>
      <motion.ul {...stagger(0.04)} onMouseLeave={() => setHovered(null)}
        className="rounded-2xl border border-line bg-raised divide-y divide-line overflow-hidden">
        {fullStackProjects.map((p, i) => (
          <motion.li key={p.title} variants={rise} className="relative">
            {hovered === i && <motion.span layoutId="row-highlight" transition={spring} className="absolute inset-0 bg-surface" aria-hidden="true" />}
            <a href={p.href} {...ext} onMouseEnter={() => setHovered(i)} onFocus={() => setHovered(i)} onBlur={() => setHovered(null)}
              className="group relative grid gap-3 p-6 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
              <div>
                <h3 className="title-2 text-ink">
                  {p.title}{' '}
                  <ArrowUpRight size={16} aria-hidden="true" className={`inline align-baseline ml-1 ${arrowClass}`} />
                </h3>
                <p className="body-6 text-muted mt-1">{p.desc}</p>
              </div>
              <Tags tags={p.tags} />
              <span className="sr-only">(opens GitHub in a new tab)</span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
