export default function Footer() {
  return (
    <footer className="relative border-t border-cyan-400/10 bg-nexus-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="relative grid h-8 w-8 place-items-center">
            <span className="absolute inset-0 rounded-full border border-nexus-cyan/60" />
            <span className="h-2 w-2 rounded-full bg-nexus-cyan shadow-glow-sm" />
          </span>
          <span className="font-display text-lg font-bold tracking-[0.3em] text-white">NEXUS</span>
        </div>

        <p className="text-center font-mono text-xs text-cyan-200/40">
          AI Robotics Intelligence · Built for every domain · Human-in-the-loop by design
        </p>

        <div className="flex items-center gap-2 font-mono text-xs text-cyan-200/50">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-nexus-teal" />
          ALL SYSTEMS NOMINAL
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center font-mono text-[11px] text-cyan-200/30">
        © {new Date().getFullYear()} NEXUS Robotics — a conceptual JARVIS-class platform demo.
      </div>
    </footer>
  )
}
