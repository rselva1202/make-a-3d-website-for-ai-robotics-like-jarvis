import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '../data/content'

function useCountUp(target: number, run: boolean, format: string) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const dur = 1600
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run])

  if (format === 'int') return Math.round(val).toLocaleString()
  if (format === 'pct') return val.toFixed(3)
  return val.toFixed(1)
}

function StatCard({ s, run }: { s: (typeof STATS)[number]; run: boolean }) {
  const display = useCountUp(s.value, run, s.format)
  return (
    <div className="hud-panel corner-brackets p-6">
      <div className="font-display text-4xl font-black text-white sm:text-5xl">
        {display}
        <span className="text-nexus-cyan">{s.suffix}</span>
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-widest text-cyan-200/50">
        {s.label}
      </div>
    </div>
  )
}

const CHANNELS = ['PERCEPTION', 'COGNITION', 'MOTOR CTRL', 'NETWORK', 'SAFETY BUS']

function LiveBars() {
  const [levels, setLevels] = useState<number[]>(CHANNELS.map(() => 40))
  useEffect(() => {
    const t = setInterval(() => {
      setLevels((prev) => prev.map((v) => Math.max(18, Math.min(98, v + (Math.random() - 0.45) * 24))))
    }, 900)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="hud-panel corner-brackets p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest text-cyan-200/70">// LIVE LOAD</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-nexus-teal">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-nexus-teal" /> STREAMING
        </span>
      </div>
      <div className="space-y-3">
        {CHANNELS.map((c, i) => (
          <div key={c} className="flex items-center gap-3">
            <span className="w-24 shrink-0 font-mono text-[11px] tracking-wide text-cyan-200/50">
              {c}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-cyan-900/40">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-nexus-teal via-nexus-cyan to-sky-400"
                animate={{ width: `${levels[i]}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </div>
            <span className="w-10 text-right font-mono text-[11px] text-cyan-200/70">
              {Math.round(levels[i])}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Telemetry() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="telemetry" className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <div ref={ref} className="mb-12 text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-nexus-cyan/70">// REAL-TIME TELEMETRY</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          The fleet, at a glance
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} s={s} run={inView} />
        ))}
      </div>

      <div className="mt-4">
        <LiveBars />
      </div>
    </section>
  )
}
