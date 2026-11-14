import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { socials } from '../data'
import { easeOut, press } from '../motion'
import FallingIcons from './FallingIcons'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
const child = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }
const drift = (x, y, duration) => ({ animate: { x, y }, transition: { duration, repeat: Infinity, ease: 'easeInOut' } })

const NAME = 'Masud Ibn Musa'
const ROLES = ['Software Developer', 'AI Enthusiast', 'Full-Stack Engineer', 'Backend Developer']

// Types each word, pauses, deletes it, moves to the next
function Typewriter({ words }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return
    const word = words[index]
    let delay = deleting ? 40 : 80
    if (!deleting && text === word) delay = 1600
    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') { setDeleting(false); setIndex((index + 1) % words.length) }
      else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, reduced])

  if (reduced) return <span>{words.join(' · ')}</span>
  return (
    <>
      <span>{text}</span>
      <motion.span className="inline-block w-[0.6ch] h-[1.1em] -mb-[0.15em] ml-0.5 bg-accent"
        animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }} />
    </>
  )
}

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
      <FallingIcons />
      <motion.div {...drift([0, 40, -20, 0], [0, -30, 20, 0], 18)} aria-hidden="true"
        className="absolute -z-10 top-1/4 left-1/2 -ml-72 w-md h-112 rounded-full bg-accent/20 blur-3xl" />
      <motion.div {...drift([0, -30, 25, 0], [0, 25, -15, 0], 22)} aria-hidden="true"
        className="absolute -z-10 bottom-10 left-1/2 ml-8 w-88 h-88 rounded-full bg-purple-500/15 blur-3xl" />

      <motion.div className="max-w-6xl mx-auto px-4 text-center" variants={container} initial="hidden" animate="show">
        <motion.div variants={child} className="relative w-56 h-56 md:w-72 md:h-72 mx-auto mb-8">
          <div className="absolute -inset-1.5 rounded-full bg-linear-to-br from-accent via-purple-500 to-primary opacity-70 blur-md" aria-hidden="true" />
          <div className="relative w-full h-full rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-900 shadow-xl">
            {imgFailed ? 'MIM' : (
              <img src="/profile.png" alt="Masud Ibn Musa" width="288" height="288" onError={() => setImgFailed(true)}
                className="w-full h-full rounded-full object-cover" />
            )}
          </div>
        </motion.div>
        <motion.h1 variants={child} className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">
          <span className="sr-only">{NAME}</span>
          {/* Each letter springs up on hover */}
          <span aria-hidden="true" className="inline-flex flex-wrap justify-center">
            {[...NAME].map((ch, i) => ch === ' ' ? <span key={i} className="w-[0.3em]" /> : (
              <motion.span key={i} className="inline-block cursor-default hover:text-accent transition-colors"
                whileHover={{ y: -10, rotate: i % 2 ? 6 : -6 }} transition={{ type: 'spring', bounce: 0.6, duration: 0.4 }}>
                {ch}
              </motion.span>
            ))}
          </span>
        </motion.h1>
        <motion.p variants={child} className="font-mono text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 h-7">
          <span className="sr-only">{ROLES.join(', ')}</span>
          <span aria-hidden="true"><span className="text-accent">&gt;</span> <Typewriter words={ROLES} /></span>
        </motion.p>
        <motion.p variants={child} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2 max-w-2xl mx-auto">
          Software Engineering Student at Daffodil International University
        </motion.p>
        <motion.p variants={child} className="text-base text-secondary mb-8 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <i className="fas fa-map-marker-alt text-accent" aria-hidden="true" /> Dhaka, Bangladesh
        </motion.p>
        <motion.div variants={child} className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.a href="#projects" {...press}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors shadow-lg shadow-primary/25 font-medium">
            View Projects <i className="fas fa-arrow-right ml-1 text-sm" aria-hidden="true" />
          </motion.a>
          <motion.a href="#contact" {...press}
            className="px-8 py-3 border-2 border-primary dark:border-gray-500 text-primary dark:text-white rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
            Contact Me
          </motion.a>
        </motion.div>
        <motion.div variants={child} className="flex justify-center gap-2 text-2xl text-secondary">
          {socials.map((s) => (
            <motion.a key={s.label} href={s.href} aria-label={s.label} {...press} whileHover={{ y: -3 }}
              {...(s.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              className="w-11 h-11 grid place-items-center hover:text-accent transition-colors">
              <i className={s.icon} aria-hidden="true" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-secondary hover:text-accent transition-colors">
        <motion.i className="fas fa-chevron-down text-lg block" aria-hidden="true"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
      </a>
    </section>
  )
}
