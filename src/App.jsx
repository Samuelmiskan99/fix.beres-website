import { useEffect, useState } from 'react'
import CursorGlow from '@/components/effects/CursorGlow'
import ScrollProgress from '@/components/effects/ScrollProgress'
import Marquee from '@/components/layout/Marquee'
import Footer from '@/components/layout/Footer'
import RadialNav from '@/components/RadialNav/RadialNav'
import Hero from '@/components/sections/Hero/Hero'
import Services from '@/components/sections/Services/Services'
import Perks from '@/components/sections/Perks'
import Gallery from '@/components/sections/Gallery'
import Pricing from '@/components/sections/Pricing'
import Steps from '@/components/sections/Steps'
import Faq from '@/components/sections/Faq'
import Contact from '@/components/sections/Contact/Contact'
import * as InteractionsMod from '@/hooks/useInteractions'
import * as RevealMod from '@/hooks/useRevealOnScroll'
import * as ScrollFxMod from '@/hooks/useScrollFx'
import { scrollToSection } from '@/utils/scroll'

// Resolusi aman baik untuk default export maupun named export
const useInteractions = InteractionsMod.useInteractions || InteractionsMod.default || (() => {})
const useRevealOnScroll = RevealMod.useRevealOnScroll || RevealMod.default || (() => {})
const useScrollFx = ScrollFxMod.useScrollFx || ScrollFxMod.default || (() => {})

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('fb-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('fb-theme', theme)
    } catch {
      // abaikan
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  useRevealOnScroll()
  useScrollFx()
  useInteractions()

  return (
    <>
      <ScrollProgress />
      <CursorGlow />

      <main>
        <Hero theme={theme} />
        <Marquee />
        <Services />
        <Perks />
        <Gallery />
        <Pricing />
        <Steps />
        <Faq />
        <Contact />
      </main>

      <Footer />

      {/* Satu-satunya Navbar di Pojok Kiri Bawah (Sudah Termasuk Toggle Dark/Light Mode) */}
      <RadialNav
        onNavigate={scrollToSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </>
  )
}