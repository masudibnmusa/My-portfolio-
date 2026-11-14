import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { navLinks } from '../data'

function useDarkMode() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, () => setDark((d) => !d)]
}

export default function Nav() {
  const [dark, toggleDark] = useDarkMode()
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  const themeIcon = <i className={dark ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-gray-600'} aria-hidden="true" />

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary via-accent to-purple-500 origin-left z-60"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="#top" className="font-display text-lg font-bold text-primary dark:text-white tracking-tight">
              Masud Ibn Musa
            </a>
            <div className="hidden md:flex gap-8 items-center">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="hover:text-accent transition-colors text-sm font-medium">{l.label}</a>
              ))}
              <motion.button onClick={toggleDark} aria-label="Toggle dark mode" whileTap={{ scale: 0.9, rotate: -20 }}
                className="w-10 h-10 grid place-items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {themeIcon}
              </motion.button>
            </div>
            <button onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="mobileMenu" aria-expanded={open}
              className="md:hidden w-11 h-11 grid place-items-center">
              <i className={`fas ${open ? 'fa-times' : 'fa-bars'} text-xl text-gray-600 dark:text-gray-300`} aria-hidden="true" />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="menu" id="mobileMenu"
              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0, transition: { duration: 0.2 } }}
              style={{ overflow: 'hidden' }}
              className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
            >
              <motion.div className="px-4 py-3 space-y-2" initial="hidden" animate="show"
                variants={{ show: { transition: { staggerChildren: 0.04 } } }}>
                {navLinks.map((l) => (
                  <motion.a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block py-2 hover:text-accent"
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                    {l.label}
                  </motion.a>
                ))}
                <button onClick={toggleDark} className="flex items-center gap-2 py-2 hover:text-accent">
                  {themeIcon} Toggle theme
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
