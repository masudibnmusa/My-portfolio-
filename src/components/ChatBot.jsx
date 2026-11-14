import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const GREETING = "Hi there! 👋 I'm Masud's AI assistant. Ask me anything about his projects, tech stack, or background!"
const bubbleIn = { initial: { opacity: 0, y: 8, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: 'spring', bounce: 0.2, duration: 0.35 } }

function Bubble({ role, children }) {
  const styles = {
    user: 'bg-primary text-white rounded-tr-none shadow-sm',
    model: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none',
    error: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-tl-none text-xs',
    loading: 'bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-tl-none text-xs animate-pulse',
  }
  return (
    <motion.div {...bubbleIn} className={role === 'user' ? 'flex justify-end' : 'flex items-start gap-2'}>
      <div className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap ${styles[role]}`}>{children}</div>
    </motion.div>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  // Each entry: { role: 'user' | 'model' | 'error', content }
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Error bubbles are UI-only; never send them to the model
        body: JSON.stringify({ messages: next.filter((m) => m.role !== 'error') }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Server error')
      setMessages((m) => [...m, { role: 'model', content: data.reply }])
    } catch (err) {
      console.error('Chat error:', err)
      setMessages((m) => [...m, { role: 'error', content: 'Failed to get a reply. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open} aria-controls="chat-window" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-white dark:border-gray-800">
        <AnimatePresence mode="wait" initial={false}>
          <motion.i key={open ? 'close' : 'open'} className={`fas ${open ? 'fa-times' : 'fa-robot'} text-2xl`} aria-hidden="true"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0, transition: { duration: 0.1 } }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.35 }} />
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div key="chat" id="chat-window" role="dialog" aria-label="Chat with Masud's assistant"
            initial={{ opacity: 0, scale: 0.85, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12, transition: { duration: 0.15, ease: 'easeIn' } }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 max-w-[calc(100vw-3rem)] h-[480px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden origin-bottom-right">
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="fas fa-robot text-sm" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Masud's Assistant</h4>
                  <p className="text-xs text-blue-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="w-9 h-9 grid place-items-center text-white/80 hover:text-white">
                <i className="fas fa-times" aria-hidden="true" />
              </button>
            </div>

            <div ref={listRef} aria-live="polite" className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
              <Bubble role="model">{GREETING}</Bubble>
              {messages.map((m, i) => <Bubble key={i} role={m.role}>{m.content}</Bubble>)}
              {loading && <Bubble role="loading">Thinking...</Bubble>}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <form onSubmit={send} className="flex gap-2">
                <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} aria-label="Your message"
                  placeholder="Ask something..." required
                  className="flex-1 px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-accent text-gray-900 dark:text-white placeholder-gray-400" />
                <motion.button type="submit" aria-label="Send message" disabled={loading} whileTap={{ scale: 0.9 }}
                  className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50">
                  <i className="fas fa-paper-plane text-xs" aria-hidden="true" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
