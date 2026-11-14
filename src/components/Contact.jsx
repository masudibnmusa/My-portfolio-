import { motion } from 'motion/react'
import { socials } from '../data'
import { press, reveal } from '../motion'

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 {...reveal} className="font-display tracking-tight text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Get In Touch
        </motion.h2>
        <motion.div {...reveal} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Feel free to reach out for collaborations or just a friendly hello.
          </p>
          <a href="mailto:masudibnmusa10@gmail.com" className="inline-flex items-center gap-2 text-lg sm:text-2xl font-bold break-all text-primary dark:text-accent hover:text-accent transition-colors">
            <i className="fas fa-envelope" aria-hidden="true" />
            masudibnmusa10@gmail.com
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.a href="https://github.com/masudibnmusa" target="_blank" rel="noopener noreferrer" {...press}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 font-medium">
              <i className="fab fa-github" aria-hidden="true" /> GitHub
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/masudibnmusa10" target="_blank" rel="noopener noreferrer" {...press}
              className="px-6 py-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2 font-medium">
              <i className="fab fa-linkedin" aria-hidden="true" /> LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-6 text-2xl">
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} className="hover:text-accent transition-colors"
              {...(s.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
              <i className={s.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Masud Ibn Musa. Software Engineering Student at Daffodil International University.</p>
        <p className="text-gray-500 text-xs mt-2">Dhaka, Bangladesh</p>
      </div>
    </footer>
  )
}
