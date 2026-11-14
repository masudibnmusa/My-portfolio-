import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useScroll, useTransform } from 'motion/react'
import { EnvelopeSimple, GithubLogo, MapPin } from '@phosphor-icons/react'
import { EMAIL, GITHUB } from '../data'
import { easeOut, spring } from '../motion'

const enter = (delay) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: easeOut, delay } })
const LINES = ['I build AI agents', 'and the apps around them']

// Same pair of actions at the top and the bottom of the page
export function Actions() {
  return (
    <div className="flex flex-wrap gap-3">
      <motion.a href={`mailto:${EMAIL}`} whileTap={{ scale: 0.97 }} transition={spring} className="btn btn-primary">
        <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />Email me
      </motion.a>
      <motion.a href={GITHUB} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.97 }} transition={spring} className="btn btn-secondary">
        <GithubLogo size={18} aria-hidden="true" />View GitHub
      </motion.a>
    </div>
  )
}

// Counts up once on load; the number renders straight from the motion value, no React re-renders
function CountUp({ to, delay = 0 }) {
  const value = useMotionValue(0)
  const rounded = useTransform(() => Math.round(value.get()))
  useEffect(() => {
    const controls = animate(value, to, { duration: 1.6, ease: easeOut, delay })
    return () => controls.stop()
  }, [value, to, delay])
  return <motion.span>{rounded}</motion.span>
}

export default function Hero() {
  const ref = useRef(null)
  // Photo drifts up a little slower than the page as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={ref} id="top" className="min-h-svh flex items-center pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-6 w-full grid gap-12 md:grid-cols-[auto_1fr] md:items-center">
        <div>
          <motion.p {...enter(0)} className="caption-1 text-muted flex items-center gap-2 mb-6">
            <MapPin size={16} aria-hidden="true" /> Dhaka, Bangladesh
          </motion.p>

          {/* Each line slides up from behind its own mask */}
          <h1 className="heading-3 sm:heading-2 max-w-[680px]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span className="block hero-gradient"
                  initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: easeOut, delay: 0.1 + i * 0.12 }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...enter(0.35)} className="title-2 font-normal text-muted mt-6 max-w-[680px]">
            I'm Masud, studying Software Engineering at Daffodil International University.
            I work on LLM pipelines, multi agent systems and MCP servers, and ship full stack apps
            in Python, Java and JavaScript.
          </motion.p>
          <motion.div {...enter(0.45)} className="mt-8"><Actions /></motion.div>
          <motion.p {...enter(0.55)} className="caption-1 text-muted mt-6">
            <span className="text-ink tabular-nums"><CountUp to={60} delay={0.6} />+ projects</span> with public source on GitHub
          </motion.p>
        </div>

        <motion.div style={{ y: photoY }} className="w-full max-w-sm mx-auto md:mx-0 md:order-first md:w-96 lg:w-md">
          {/* Wipes open from the bottom while the photo settles from a slight zoom; the cut edge at the waist fades out */}
          <motion.div className="[mask-image:linear-gradient(to_bottom,#000_80%,transparent)]"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }} animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.1, ease: easeOut, delay: 0.2 }}>
            <motion.img src="/profile-cutout.webp" alt="Portrait of Masud Ibn Musa" width="900" height="1301" fetchPriority="high"
              className="w-full h-auto origin-bottom"
              initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: easeOut, delay: 0.2 }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
