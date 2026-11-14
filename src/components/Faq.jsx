import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from '@phosphor-icons/react'
import { faqs } from '../data'
import { easeOut, spring } from '../motion'
import Section from './Section'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" title="Questions recruiters ask" surface>
      <div className="rounded-2xl border border-line bg-raised divide-y divide-line max-w-3xl">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i
          return (
            <div key={q}>
              <h3>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left title-3 text-ink">
                  {q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={spring} className="shrink-0 grid text-muted">
                    <Plus size={18} aria-hidden="true" />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div key="answer" id={`faq-${i}`} role="region"
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeOut }} style={{ overflow: 'hidden' }}>
                    <p className="body-3 text-muted px-6 pb-6 max-w-[680px]">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
