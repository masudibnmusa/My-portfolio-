import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, EnvelopeSimple, GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { EMAIL, socials } from '../data'
import { reveal } from '../motion'
import { Actions } from './Hero'

const icons = { GitHub: GithubLogo, LinkedIn: LinkedinLogo, Instagram: InstagramLogo, Email: EnvelopeSimple }

function CopyEmail() {
  const [state, setState] = useState('idle')
  async function copy() {
    try { await navigator.clipboard.writeText(EMAIL); setState('copied') } catch { setState('failed') }
    setTimeout(() => setState('idle'), 2500)
  }
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      <span className="font-mono body-6 text-muted break-all">{EMAIL}</span>
      <button onClick={copy} className="caption-1 inline-flex items-center gap-1 min-h-11 px-3 rounded-lg text-ink hover:bg-surface transition-colors duration-300 ease-base active:scale-[0.98]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={state === 'copied' ? 'check' : 'copy'} className="grid"
            initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.4, visualDuration: 0.25 }}>
            {state === 'copied' ? <Check size={16} weight="bold" className="text-accent" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
        {state === 'copied' ? 'Email copied' : 'Copy email'}
      </button>
      <span role="status" className="caption-1 text-muted">{state === 'failed' ? 'Copy failed. Select the address above instead.' : ''}</span>
    </div>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24">
      <motion.div {...reveal} className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-line bg-surface p-8 md:p-16">
          <h2 id="contact-title" className="heading-4 md:heading-3 max-w-[680px]">Have a role or a project <br className="hidden md:block" />in mind?</h2>
          <p className="body-3 text-muted mt-4 mb-8 max-w-[680px]">
            Email is the quickest way to reach me. You can also read through my code on GitHub first.
          </p>
          <Actions />
          <CopyEmail />
        </div>
      </motion.div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
        <p className="caption-5 text-muted">© {new Date().getFullYear()} Masud Ibn Musa · Dhaka, Bangladesh</p>
        <ul className="flex items-center gap-1 -ml-3 md:ml-0 md:-mr-3">
          {socials.map((s) => {
            const Icon = icons[s.label]
            return (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} {...(s.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="w-11 h-11 grid place-items-center rounded-full text-muted hover:text-ink hover:bg-surface transition-colors duration-300 ease-base">
                  <Icon size={20} aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}
