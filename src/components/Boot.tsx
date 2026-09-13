import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  'INITIALIZING NEXUS CORE…',
  'MOUNTING NEURO-SYMBOLIC KERNEL … OK',
  'CALIBRATING SENSOR FUSION @ 240Hz … OK',
  'LINKING 46,921 AUTONOMOUS UNITS … OK',
  'SYNCING 9 DOMAIN NETWORKS … OK',
  'SAFETY INTERLOCKS … ARMED',
  'NEXUS ONLINE.',
]

export default function Boot({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (visible >= LINES.length) {
      const t = setTimeout(() => {
        setGone(true)
        setTimeout(onDone, 700)
      }, 550)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 250 : 330)
    return () => clearTimeout(t)
  }, [visible, onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-nexus-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="relative w-[min(90vw,560px)] px-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexus-cyan opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-nexus-cyan" />
              </span>
              <span className="font-display text-sm tracking-[0.4em] text-nexus-cyan/90">
                N E X U S
              </span>
            </div>
            <div className="font-mono text-[13px] leading-relaxed">
              {LINES.slice(0, visible).map((l, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    i === LINES.length - 1
                      ? 'mt-1 text-nexus-cyan glow-text'
                      : 'text-cyan-200/70'
                  }
                >
                  <span className="text-cyan-500/50">›</span> {l}
                </motion.div>
              ))}
              {visible < LINES.length && <span className="caret" />}
            </div>
            <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-cyan-900/40">
              <motion.div
                className="h-full bg-gradient-to-r from-nexus-cyan to-nexus-blue"
                initial={{ width: '0%' }}
                animate={{ width: `${(visible / LINES.length) * 100}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
