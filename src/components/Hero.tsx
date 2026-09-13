import { Suspense } from 'react'
import { motion } from 'framer-motion'
import CoreScene from '../three/CoreScene'
import { ArrowIcon } from './Icons'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-full border border-nexus-cyan/30 bg-nexus-cyan/5 shadow-glow" />
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* 3D core */}
      <div className="absolute inset-0">
        <Suspense fallback={<SceneFallback />}>
          <CoreScene accent="#22d3ee" />
        </Suspense>
      </div>

      {/* grid + vignette */}
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#03060d_92%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 font-mono text-xs tracking-widest text-cyan-300/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-nexus-teal" />
            SYSTEM ONLINE · ALL DOMAINS
          </div>

          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl">
            <span className="glow-text">NEXUS</span>
            <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-cyan-400 to-sky-500 bg-clip-text text-3xl text-transparent sm:text-4xl">
              The AI that commands robotics
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cyan-100/70 text-balance">
            A JARVIS-class intelligence that perceives, reasons and orchestrates
            autonomous machines across every domain — healthcare, defense,
            manufacturing, space and beyond. Speak, and the world responds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo('console')}
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-nexus-cyan to-sky-500 px-6 py-3 font-semibold text-nexus-bg shadow-glow transition hover:brightness-110"
            >
              Activate NEXUS
              <ArrowIcon className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo('domains')}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/10"
            >
              Explore domains
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-cyan-300/50"
        >
          SCROLL
          <span className="h-8 w-[1px] bg-gradient-to-b from-cyan-400/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
