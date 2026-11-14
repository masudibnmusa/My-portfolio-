import { motion } from 'motion/react'
import { caseStudies, fullStackProjects, tagColors } from '../data'
import { cardHover, item, press, reveal, staggerGrid } from '../motion'

const linkProps = { target: '_blank', rel: 'noopener noreferrer' }

export function CaseStudies() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...reveal} className="text-center mb-20">
          <p className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-accent mb-6">Featured Work</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">Case Studies</h2>
          <p className="text-base md:text-lg text-secondary max-w-2xl mx-auto">What I built, the tools behind it, and what each project does</p>
        </motion.div>

        <motion.div {...staggerGrid} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((p) => (
            <motion.article key={p.title} variants={item} {...cardHover}
              className="flex flex-col rounded-xl transition-shadow duration-300 hover:shadow-2xl ring-1 ring-gray-200/70 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800 px-8 py-10">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">{p.title}</h3>
              <p className="font-medium leading-relaxed text-gray-700 dark:text-gray-300 mb-6">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((t) => (
                  <span key={t} className="px-3 py-1.5 border border-primary dark:border-accent text-primary dark:text-accent rounded font-mono text-xs font-medium">{t}</span>
                ))}
              </div>
              <motion.a href={p.href} {...linkProps} {...press}
                className="mt-auto self-start text-sm font-semibold text-primary dark:text-accent hover:text-accent dark:hover:text-white transition-colors">
                <i className="fab fa-github mr-1" aria-hidden="true" />Code
              </motion.a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function FullStackProjects() {
  return (
    <section id="fullstack" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 {...reveal} className="font-display tracking-tight text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Full-Stack Projects
        </motion.h2>
        <motion.div {...staggerGrid} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fullStackProjects.map((p) => (
            <motion.div key={p.title} variants={item} {...cardHover}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className={`h-48 bg-linear-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
                <i className={`fas ${p.icon} text-6xl text-white/80 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`} aria-hidden="true" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{p.title}</h3>
                <p className="text-secondary mb-4 text-sm">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(([label, color]) => (
                    <span key={label} className={`px-3 py-1 rounded-full text-xs font-medium ${tagColors[color]}`}>{label}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.a href={p.href} {...linkProps} {...press} className="text-primary dark:text-accent hover:text-accent transition-colors text-sm font-medium">
                    <i className="fab fa-github mr-1" aria-hidden="true" />Code
                  </motion.a>
                  <span className="text-gray-400 text-sm"><i className="fas fa-clock mr-1" aria-hidden="true" />Coming Soon</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
