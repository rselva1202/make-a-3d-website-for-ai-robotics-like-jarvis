import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { respond, SUGGESTIONS } from '../lib/jarvis'
import { useSpeechRecognition, speak } from '../lib/useSpeech'
import { MicIcon, SendIcon, SoundOnIcon, SoundOffIcon } from './Icons'

type Msg = { id: number; from: 'user' | 'nexus'; text: string }

let nextId = 1

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-6 items-center gap-[3px]">
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-nexus-cyan"
          animate={
            active
              ? { height: [4, 6 + ((i * 7) % 18), 4] }
              : { height: 3 }
          }
          transition={{
            duration: 0.7 + (i % 5) * 0.12,
            repeat: active ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function JarvisConsole() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: nextId++, from: 'nexus', text: 'NEXUS online. Ask me about any domain, our capabilities, or system status. You can type or use the mic.' },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const logRef = useRef<HTMLDivElement>(null)

  const handleVoice = (text: string) => {
    setInput(text)
    submit(text)
  }
  const { listening, supported, start, stop } = useSpeechRecognition(handleVoice)

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  const submit = (raw?: string) => {
    const text = (raw ?? input).trim()
    if (!text) return
    setMessages((m) => [...m, { id: nextId++, from: 'user', text }])
    setInput('')
    setThinking(true)

    const reply = respond(text)
    const delay = 500 + Math.min(text.length * 12, 700)
    window.setTimeout(() => {
      setThinking(false)
      setMessages((m) => [...m, { id: nextId++, from: 'nexus', text: reply.text }])
      if (soundOn) speak(reply.text, true)
      if (reply.action === 'scroll' && reply.target) {
        window.setTimeout(() => {
          document.getElementById(reply.target!)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 900)
      }
    }, delay)
  }

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    if (next) speak('Voice output engaged.', true)
    else if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
  }

  return (
    <section id="console" className="relative mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <div className="mb-10 text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-nexus-cyan/70">// DIRECT INTERFACE</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Converse with the core
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-cyan-100/60">
          A live command line to the NEXUS mind. Type or speak — it understands intent and acts.
        </p>
      </div>

      <div className="hud-panel corner-brackets scanlines overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-cyan-400/15 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexus-teal opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-nexus-teal" />
            </span>
            <span className="font-mono text-xs tracking-widest text-cyan-200/80">
              NEXUS://interface {listening ? '· LISTENING' : thinking ? '· PROCESSING' : '· READY'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Waveform active={listening || thinking} />
            <button
              onClick={toggleSound}
              title={soundOn ? 'Mute voice' : 'Enable voice output'}
              className={`grid h-8 w-8 place-items-center rounded-md border transition ${
                soundOn
                  ? 'border-nexus-cyan/50 bg-nexus-cyan/15 text-nexus-cyan'
                  : 'border-cyan-400/20 text-cyan-200/50 hover:text-cyan-100'
              }`}
            >
              {soundOn ? <SoundOnIcon className="h-4 w-4" /> : <SoundOffIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Log */}
        <div ref={logRef} className="h-[360px] space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed sm:text-[15px] ${
                  m.from === 'user'
                    ? 'rounded-br-sm bg-cyan-500/15 text-cyan-50'
                    : 'rounded-bl-sm border border-cyan-400/15 bg-cyan-950/40 text-cyan-100/90'
                }`}
              >
                {m.from === 'nexus' && (
                  <span className="mr-2 font-mono text-[11px] font-semibold tracking-widest text-nexus-cyan">
                    NEXUS›
                  </span>
                )}
                {m.text}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {thinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-1.5 rounded-xl rounded-bl-sm border border-cyan-400/15 bg-cyan-950/40 px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-nexus-cyan"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 border-t border-cyan-400/10 px-4 py-3 sm:px-6">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 font-mono text-xs text-cyan-200/70 transition hover:border-cyan-400/50 hover:bg-cyan-400/15 hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          className="flex items-center gap-2 border-t border-cyan-400/15 p-3 sm:p-4"
        >
          <span className="pl-2 font-mono text-nexus-cyan">›</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={listening ? 'Listening…' : 'Type a command for NEXUS…'}
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-cyan-50 outline-none placeholder:text-cyan-300/30"
          />
          {supported && (
            <button
              type="button"
              onClick={() => (listening ? stop() : start())}
              title="Voice command"
              className={`grid h-10 w-10 place-items-center rounded-lg border transition ${
                listening
                  ? 'border-nexus-red/60 bg-nexus-red/20 text-nexus-red'
                  : 'border-cyan-400/30 text-cyan-200/70 hover:bg-cyan-400/10 hover:text-white'
              }`}
            >
              <MicIcon className="h-4.5 w-4.5" />
              {listening && (
                <span className="absolute -z-10 h-10 w-10 animate-ping rounded-lg bg-nexus-red/30" />
              )}
            </button>
          )}
          <button
            type="submit"
            className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-nexus-cyan to-sky-500 text-nexus-bg transition hover:brightness-110"
          >
            <SendIcon className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>

      {!supported && (
        <p className="mt-3 text-center font-mono text-xs text-cyan-300/40">
          Voice input isn't supported in this browser — typing works everywhere.
        </p>
      )}
    </section>
  )
}
