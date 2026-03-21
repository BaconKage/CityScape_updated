import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MessageCircle, SendHorizontal, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { chatFAQ, chatPrompts, contactInfo } from '../data/siteData'

function normalize(input) {
  return (input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
}

function buildReply(input, faqItems) {
  const normalized = normalize(input)

  const exact = faqItems.find((item) => normalize(item.question) === normalized)
  if (exact) {
    return {
      text: exact.answers.join('\n\n'),
      href: exact.showContact ? contactInfo.whatsapp : null,
      fallbackContact: exact.showContact,
    }
  }

  const matched = faqItems.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())),
  )

  if (matched) {
    return {
      text: matched.answers.join('\n\n'),
      href: matched.showContact ? contactInfo.whatsapp : null,
      fallbackContact: matched.showContact,
    }
  }

  return {
    text: `That needs a more specific discussion. Share your requirement, budget band, and area, and our team will guide you with a tailored response.`,
    href: contactInfo.whatsapp,
    fallbackContact: true,
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 'init',
      from: 'agent',
      text: 'Hi there! Choose a quick topic below or type your question to get instant answers about our services.',
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const listRef = useRef(null)
  const faqItems = useMemo(() => chatFAQ, [])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text) => {
    const messageText = normalize(text)
    if (!messageText) return

    const userMessage = { id: `${Date.now()}-u`, from: 'user', text: text.trim() }
    const reply = buildReply(messageText, faqItems)

    setMessages((prev) => [...prev, userMessage])
    setDraft('')
    setIsTyping(true)

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-a`,
          from: 'agent',
          text: reply.text,
          href: reply.href,
          showContactHint: reply.fallbackContact,
        },
      ])
      setIsTyping(false)
    }, 320)
  }

  const onSendClick = () => {
    sendMessage(draft)
  }

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.07, rotate: 0.25 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        onClick={() => setIsOpen((current) => !current)}
        className="fixed right-4 sm:right-7 bottom-4 sm:bottom-7 z-40 h-14 w-14 rounded-full bg-gold-100 text-charcoal shadow-luxe grid place-items-center hover:scale-105 transition-colors"
        aria-label="Toggle assistant"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed z-40 right-[max(1rem,env(safe-area-inset-right))] sm:right-7 bottom-[max(5rem,calc(5.5rem+env(safe-area-inset-bottom)))] sm:bottom-28 w-[min(360px,calc(100vw-1.25rem))] max-w-[min(360px,calc(100vw-1.25rem))]"
          >
            <div className="section-surface flex flex-col max-h-[calc(100vh-120px)] sm:max-h-[min(640px,calc(100vh-160px))] rounded-3xl border border-white/20 overflow-hidden bg-charcoal/95 backdrop-blur-2xl shadow-2xl">
              <div className="shrink-0 px-5 py-4 border-b border-white/10 bg-white/5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-gold-50">FAQ & Guidance</h4>
                    <p className="text-[11px] text-stone/60 mt-0.5">Instant answers to common queries</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-gold-100/10 border border-gold-100/20 text-gold-100 font-medium">
                    Auto-Reply
                  </span>
                </div>
              </div>

              <div className="flex-1 min-h-[200px] overflow-y-auto p-4 space-y-3" ref={listRef}>
                {messages.map((message) => (
                  <div key={message.id} className={`grid ${message.from === 'user' ? 'justify-items-end' : 'justify-items-start'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm max-w-[86%] w-fit min-w-0 break-words overflow-hidden leading-relaxed shadow-sm transition-all ${
                        message.from === 'user'
                          ? 'bg-gold-600/90 text-charcoal font-medium rounded-br-sm'
                          : 'bg-white/10 text-stone/95 border border-white/10 rounded-bl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.text}</p>
                      {message.from === 'agent' && message.showContactHint ? (
                        <p className="text-[11px] mt-2 opacity-85">
                          Need a direct response? Use WhatsApp or contact details.
                        </p>
                      ) : null}
                      {message.href ? (
                        <a
                          href={message.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex text-xs text-gold-100 hover:text-gold-50 transition-colors"
                        >
                          Open WhatsApp
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}

                {isTyping ? (
                  <div className="justify-items-start grid">
                    <div className="rounded-2xl px-3 py-2 text-sm bg-white/8 border border-white/12 text-stone/75">
                      Typing...
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="shrink-0 px-4 py-3 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-wider text-stone/50 mb-2.5 font-medium">Suggested topics</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {chatPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="rounded-full border border-gold-100/30 bg-gold-100/5 px-3 py-1.5 text-[11px] text-gold-50/90 hover:bg-gold-100/20 hover:text-gold-50 hover:border-gold-100/50 transition-all font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <label className="sr-only" htmlFor="chat-input">
                  Type your question
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="chat-input"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault()
                        onSendClick()
                      }
                    }}
                    placeholder="Type your question..."
                    className="min-h-[44px] w-full rounded-full border border-white/15 bg-white/5 px-4 text-sm focus:outline-none focus:border-gold-100/40 focus:bg-white/10 transition-colors placeholder:text-stone/50"
                  />
                  <button
                    type="button"
                    onClick={onSendClick}
                    disabled={isTyping}
                    className="h-11 w-11 rounded-full bg-gold-600 text-charcoal grid place-items-center disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <SendHorizontal size={16} />
                  </button>
                </div>

                <p className="mt-2 text-[11px] text-stone/65">
                  Email: {contactInfo.email} | Phone: {contactInfo.phone}
                </p>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  )
}
