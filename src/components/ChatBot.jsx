import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChatCircleDots, PaperPlaneRight, X } from '@phosphor-icons/react'
import { easeOut } from '../motion'

const GREETING = "Hi, I'm Masud's assistant. Ask me about his projects, his stack or his background."
const bubbleIn = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: easeOut } }

function Bubble({ role, children }) {
  const styles = {
    user: 'bg-ink text-on-ink rounded-tr-sm ml-auto',
    model: 'bg-surface text-ink rounded-tl-sm',
    error: 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 rounded-tl-sm',
  }
  return (
    <motion.div {...bubbleIn} className={`w-fit max-w-[85%] p-3 rounded-2xl whitespace-pre-wrap body-6 ${styles[role]}`}>
      {children}
    </motion.div>
  )
}

// Skeleton shaped like a reply, not a spinner
function Typing() {
  return (
    <div className="w-3/4 p-3 rounded-2xl rounded-tl-sm bg-surface space-y-2" aria-label="Assistant is typing">
      <div className="h-3 rounded bg-line animate-pulse" />
      <div className="h-3 w-2/3 rounded bg-line animate-pulse" />
    </div>
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
      setMessages((m) => [...m, { role: 'error', content: 'No reply came back. Check your connection and send the message again.' }])
    } finally {
      setLoading(false)
    }
  }

  const Icon = open ? X : ChatCircleDots

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
      <button onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open} aria-controls="chat-window"
        className="w-12 h-12 grid place-items-center rounded-full bg-ink text-on-ink shadow-lg transition-transform duration-500 ease-base hover:-translate-y-0.5 active:scale-[0.98]">
        <Icon size={22} weight="bold" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div key="chat" id="chat-window" role="dialog" aria-label="Chat with Masud's assistant"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100svh-8rem)] bg-raised rounded-2xl shadow-2xl border border-line flex flex-col overflow-hidden">
            <div className="p-4 border-b border-line flex justify-between items-center">
              <div>
                <h2 className="title-4 text-ink">Masud's assistant</h2>
                <p className="caption-5 text-muted">Answers from his portfolio, powered by AI</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="w-11 h-11 -mr-2 grid place-items-center rounded-full text-muted hover:text-ink hover:bg-surface">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div ref={listRef} aria-live="polite" className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              <Bubble role="model">{GREETING}</Bubble>
              {messages.map((m, i) => <Bubble key={i} role={m.role}>{m.content}</Bubble>)}
              {loading && <Typing />}
            </div>

            <form onSubmit={send} className="p-3 border-t border-line flex gap-2">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} aria-label="Your message"
                placeholder="Ask about a project" required
                className="flex-1 min-w-0 px-3 py-2 body-6 bg-surface border border-line rounded-lg text-ink placeholder:text-muted focus-visible:border-accent" />
              <button type="submit" aria-label="Send message" disabled={loading}
                className="w-11 h-11 grid place-items-center rounded-lg bg-ink text-on-ink transition-transform duration-500 ease-base active:scale-[0.98] disabled:opacity-50">
                <PaperPlaneRight size={18} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
