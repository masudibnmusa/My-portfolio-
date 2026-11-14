import { useEffect, useRef } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { stats } from '../data'
import { cardHover, item, reveal, staggerGrid } from '../motion'

function CountUp({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => { ref.current.textContent = Math.round(v) } })
    return () => controls.stop()
  }, [inView, to])
  return <span ref={ref}>{to}</span>
}

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 {...reveal} className="font-display tracking-tight text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          About Me
        </motion.h2>
        <motion.div {...reveal} className="max-w-3xl mx-auto text-center">
          <p className="text-lg leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
            Software Developer | AI Enthusiast | Full-Stack Engineer <br />
            I am a Software Engineering student at Daffodil International University, Bangladesh,
            passionate about building scalable software systems and intelligent applications.
            I specialize in backend development, system design, and turning ideas into real-world
            products using modern technologies. I focus on writing clean, efficient code and
            creating user-friendly solutions that solve practical problems.
            <br />
            Currently, I'm exploring <span className="text-purple-600 dark:text-purple-400 font-bold">AI engineering, LLM-based systems, and full-stack development</span> while
            actively working on real projects and improving my software architecture skills.
          </p>
          <motion.div {...staggerGrid} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {stats.map((s) => (
              <motion.div key={s.label} variants={item} {...cardHover}
                className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="font-mono text-3xl font-bold text-primary dark:text-accent mb-1">
                  {typeof s.value === 'number' ? <CountUp to={s.value} /> : s.value}{s.suffix}
                </div>
                <div className="text-sm text-secondary">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
