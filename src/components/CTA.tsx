import { motion } from 'framer-motion'
import { ArrowIcon } from './Icons'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function CTA() {
  return (
    <section id="deploy" className="relative mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hud-panel corner-brackets scanlines relative overflow-hidden px-6 py-16 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-nexus-cyan/20 blur-[100px]" />
        <div className="relative">
          <p className="font-mono text-xs tracking-[0.4em] text-nexus-cyan/70">// READY WHEN YOU ARE</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Give your machines a mind.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-cyan-100/70">
            Bring NEXUS into your domain and turn fleets of hardware into a single,
            reasoning, autonomous system — with humans always in command.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollTo('console')}
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-nexus-cyan to-sky-500 px-7 py-3.5 font-semibold text-nexus-bg shadow-glow transition hover:brightness-110"
            >
              Talk to NEXUS
              <ArrowIcon className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </button>
            <a
              href="mailto:contact@nexus.ai"
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-7 py-3.5 font-semibold text-cyan-100 transition hover:bg-cyan-400/10"
            >
              Request a briefing
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
