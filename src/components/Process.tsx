import { motion } from 'framer-motion'
import { TIMELINE } from '../data/content'

export default function Process() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <div className="mb-14 text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-nexus-cyan/70">// OPERATING LOOP</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Deploy → Perceive → Reason → Act
        </h2>
      </div>

      <div className="relative grid gap-8 md:grid-cols-4">
        {/* connecting line */}
        <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent md:block" />
        {TIMELINE.map((t, i) => (
          <motion.div
            key={t.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <div className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border border-nexus-cyan/40 bg-nexus-bg font-display font-bold text-nexus-cyan shadow-glow-sm md:mx-0">
              {t.year}
            </div>
            <h3 className="mt-5 text-center font-display text-lg font-bold text-white md:text-left">
              {t.title}
            </h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-cyan-100/60 md:text-left">
              {t.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
