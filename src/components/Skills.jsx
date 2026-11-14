import { motion } from 'motion/react'
import { interests, skillGroups } from '../data'
import { cardHover, easeOut, item, reveal, staggerGrid } from '../motion'

const cardClass = 'bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-600'

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 {...reveal} className="font-display tracking-tight text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Skills &amp; Tools
        </motion.h2>
        <motion.div {...staggerGrid} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((g) => (
            <motion.div key={g.title} variants={item} {...cardHover} className={cardClass}>
              <h3 className="text-lg font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                <i className={`fas ${g.icon} mr-2`} aria-hidden="true" /> {g.title}
              </h3>
              <div className="space-y-3">
                {g.items.map(([name, pct]) => (
                  <div key={name}>
                    <div className="flex justify-between mb-1 text-sm"><span>{name}</span><span>{pct}%</span></div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <motion.div className={`${g.bar} h-2 rounded-full origin-left`} style={{ width: `${pct}%` }}
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                        transition={{ duration: 1, ease: easeOut, delay: 0.15 }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div variants={item} {...cardHover} className={cardClass}>
            <h3 className="text-lg font-bold mb-4 flex items-center text-gray-900 dark:text-white">
              <i className="fas fa-brain text-purple-500 mr-2" aria-hidden="true" /> Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <span key={i} className="px-4 py-2 bg-gray-100 dark:bg-gray-600 rounded-lg text-sm">{i}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function GitHubGraph() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2 {...reveal} className="font-display text-2xl font-bold mb-6 text-gray-900 dark:text-white">GitHub Contributions</motion.h2>
        <motion.div {...reveal} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <img src="https://ghchart.rshah.org/39d353/masudibnmusa" alt="Masud's GitHub Contribution Graph" loading="lazy"
            className="w-full min-w-[600px] dark:opacity-90" />
        </motion.div>
        <p className="mt-4 text-sm text-secondary">
          <a href="https://github.com/masudibnmusa" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            View full profile on GitHub →
          </a>
        </p>
      </div>
    </section>
  )
}
