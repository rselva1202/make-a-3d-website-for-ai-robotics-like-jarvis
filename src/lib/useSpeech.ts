import { useCallback, useEffect, useRef, useState } from 'react'

// Minimal typings for the Web Speech API (not in default TS lib).
interface SpeechRecognitionResultLike {
  0: { transcript: string }
  isFinal: boolean
}
interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>
  resultIndex: number
}
interface SpeechRecognitionLike {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((e: SpeechRecognitionEventLike) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike

function getRecognition(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition || w.webkitSpeechRecognition || null
}

export function useSpeechRecognition(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false)
  const supported = typeof window !== 'undefined' && !!getRecognition()
  const recRef = useRef<SpeechRecognitionLike | null>(null)
  const cbRef = useRef(onResult)
  cbRef.current = onResult

  const stop = useCallback(() => {
    recRef.current?.stop()
    setListening(false)
  }, [])

  const start = useCallback(() => {
    const Ctor = getRecognition()
    if (!Ctor) return
    try {
      const rec = new Ctor()
      rec.lang = 'en-US'
      rec.continuous = false
      rec.interimResults = false
      rec.onresult = (e) => {
        const last = e.results[e.results.length - 1]
        if (last && last.isFinal !== false) {
          cbRef.current(last[0].transcript)
        }
      }
      rec.onend = () => setListening(false)
      rec.onerror = () => setListening(false)
      recRef.current = rec
      rec.start()
      setListening(true)
    } catch {
      setListening(false)
    }
  }, [])

  useEffect(() => () => recRef.current?.abort(), [])

  return { listening, supported, start, stop }
}

export function speak(text: string, enabled: boolean) {
  if (!enabled || typeof window === 'undefined' || !window.speechSynthesis) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 1.02
    u.pitch = 0.85
    u.volume = 0.9
    const voices = window.speechSynthesis.getVoices()
    const preferred =
      voices.find((v) => /Google UK English Male|Daniel|Microsoft David/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith('en'))
    if (preferred) u.voice = preferred
    window.speechSynthesis.speak(u)
  } catch {
    /* no-op */
  }
}
