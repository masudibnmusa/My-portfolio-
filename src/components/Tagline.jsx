import { useRef } from 'react'
import { cubicBezier, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

// Line breaks fall where the thought breaks
const LINES = ['From fine tuning a model', 'to shipping the app that uses it,', 'I like owning the whole path.']
const WORDS = LINES.flatMap((line, l) => line.split(' ').map((w, i, a) => ({ w, br: i === a.length - 1 && l < LINES.length - 1 })))
const ease = cubicBezier(0.22, 1, 0.36, 1)

function Word({ progress, i, children }) {
  const step = 1 / WORDS.length
  // Each word lights up as the scroll passes its own slice, in reading order
  const opacity = useTransform(progress, [i * step, (i + 1) * step], [0.3, 1], { ease })
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

export default function Tagline() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  // rAF driven by motion, no raw scroll listener
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] })

  return (
    <section aria-label="What I do" className="py-24 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p ref={ref} className="heading-4 sm:heading-3 lg:heading-2 max-w-[680px] lg:max-w-[880px] text-ink">
          {WORDS.map(({ w, br }, i) => (
            <span key={i}>
              {reduced ? w : <Word progress={scrollYProgress} i={i}>{w}</Word>}
              {br ? <br className="hidden sm:block" /> : null}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
