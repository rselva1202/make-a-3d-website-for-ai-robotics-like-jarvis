import { motion } from 'framer-motion'
import { CAPABILITIES } from '../data/content'

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative overflow-hidden py-24 sm:py-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mb-14 text-center">
          <p className="font-mono text-xs tracking-[0.4em] text-nexus-cyan/70">// CORE FACULTIES</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
            The stack behind the intelligence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cyan-100/60">
            Six tightly-coupled systems turn raw sensor data into safe, explainable action —
            in milliseconds.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-cyan-400/15 bg-cyan-400/10 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative bg-nexus-bg/95 p-7 transition hover:bg-nexus-panel/80"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-nexus-cyan/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white group-hover:text-nexus-cyan">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cyan-100/60">{c.description}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 font-mono text-xs text-nexus-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-nexus-cyan" />
                {c.metric}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
