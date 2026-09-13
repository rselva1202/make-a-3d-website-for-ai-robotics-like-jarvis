import { motion } from 'framer-motion'
import { DOMAINS } from '../data/content'
import { DomainIcon } from './Icons'

export default function Domains() {
  return (
    <section id="domains" className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.4em] text-nexus-cyan/70">// DEPLOYED NETWORKS</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-white sm:text-4xl">
            One intelligence. <span className="text-nexus-cyan glow-text">Every domain.</span>
          </h2>
        </div>
        <p className="max-w-sm text-cyan-100/60">
          NEXUS adapts its perception, reasoning and control stack to the physics and stakes
          of each field it enters.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.map((d, i) => (
          <motion.article
            key={d.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-nexus-panel/50 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20"
            style={{ ['--accent' as string]: d.color }}
          >
            {/* glow wash */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: d.color }}
            />
            <div className="relative flex items-start justify-between">
              <span
                className="grid h-12 w-12 place-items-center rounded-xl border transition-colors"
                style={{ borderColor: `${d.color}55`, color: d.color, background: `${d.color}12` }}
              >
                <DomainIcon name={d.icon} className="h-6 w-6" />
              </span>
              <span className="font-mono text-[11px] tracking-widest text-cyan-200/40">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-5 font-display text-xl font-bold text-white">{d.name}</h3>
            <p className="mt-1 text-sm font-medium" style={{ color: d.color }}>
              {d.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cyan-100/60">{d.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-4">
              {d.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-lg font-bold text-white">{s.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-200/40">
                    {s.label}
                  </div>
                </div>
              ))}
              <div className="ml-auto self-end font-mono text-[11px] text-cyan-200/50">{d.units}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
