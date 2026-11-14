import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from '@phosphor-icons/react'
import { navLinks } from '../data'
import { easeOut, spring } from '../motion'

function useDarkMode() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch { /* storage blocked: theme just won't persist */ }
  }, [dark])
  return [dark, () => setDark((d) => !d)]
}

// The section currently crossing the middle of the screen
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids])
  return active
}

// 'top' is watched too, so no link stays highlighted when you scroll back to the hero
const ids = ['top', ...navLinks.map((l) => l.href.slice(1))]

// Two lines that rotate into an X
function MenuIcon({ open }) {
  const t = { duration: 0.5, ease: easeOut }
  return (
    <span className="relative block w-5 h-3" aria-hidden="true">
      <motion.span className="absolute left-0 right-0 top-0 h-0.5 rounded-full bg-ink" transition={t}
        animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }} />
      <motion.span className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full bg-ink" transition={t}
        animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }} />
    </span>
  )
}

export default function Nav() {
  const [dark, toggleDark] = useDarkMode()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const active = useActiveSection(ids)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const ThemeIcon = dark ? Sun : Moon
  const iconBtn = 'w-11 h-11 grid place-items-center rounded-full text-ink hover:bg-surface transition-colors duration-300 ease-base'

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav aria-label="Main" className="flex items-center gap-1 rounded-full border border-line bg-page/70 backdrop-blur-xl p-1 shadow-sm">
        <a href="#top" className="title-4 px-4 min-h-11 inline-flex items-center rounded-full">Masud Ibn Musa</a>

        {/* One pill slides between links: it follows the pointer and rests on the current section */}
        <ul className="hidden md:flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
          {navLinks.map((l) => {
            const id = l.href.slice(1)
            const current = active === id
            const pill = (hovered ?? active) === id
            return (
              <li key={l.label} className="relative">
                {pill && <motion.span layoutId="nav-pill" transition={spring} className="absolute inset-0 rounded-full bg-surface" />}
                <a href={l.href} aria-current={current ? 'location' : undefined}
                  onMouseEnter={() => setHovered(id)} onFocus={() => setHovered(id)} onBlur={() => setHovered(null)}
                  className={`relative caption-1 px-3 min-h-11 inline-flex items-center rounded-full transition-colors duration-300 ease-base ${pill ? 'text-ink' : 'text-muted'}`}>
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>

        <button onClick={toggleDark} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} className={`${iconBtn} overflow-hidden`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={dark ? 'sun' : 'moon'} className="grid"
              initial={{ y: 16, rotate: -90, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} exit={{ y: -16, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25, ease: easeOut }}>
              <ThemeIcon size={18} />
            </motion.span>
          </AnimatePresence>
        </button>
        <button onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu"
          className={`md:hidden ${iconBtn} relative z-10`}>
          <MenuIcon open={open} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" key="menu" className="md:hidden fixed inset-0 -z-10 bg-page/95 backdrop-blur-2xl px-6 pt-24"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: easeOut }}>
            <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
              {navLinks.map((l) => (
                <motion.li key={l.label} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } } }}>
                  <a href={l.href} onClick={() => setOpen(false)} aria-current={active === l.href.slice(1) ? 'location' : undefined}
                    className="heading-4 flex items-center min-h-11 py-3 text-ink aria-[current]:text-accent">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
