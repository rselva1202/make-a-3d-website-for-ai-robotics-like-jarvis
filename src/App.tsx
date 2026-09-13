import { useState } from 'react'
import Boot from './components/Boot'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import JarvisConsole from './components/JarvisConsole'
import Domains from './components/Domains'
import Capabilities from './components/Capabilities'
import Telemetry from './components/Telemetry'
import Process from './components/Process'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="relative min-h-screen bg-nexus-bg text-cyan-50">
      {!booted && <Boot onDone={() => setBooted(true)} />}

      {/* ambient background glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-nexus-cyan/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <JarvisConsole />
        <Domains />
        <Capabilities />
        <Telemetry />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
