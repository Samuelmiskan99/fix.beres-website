import CursorGlow from '@/components/effects/CursorGlow'
import ScrollProgress from '@/components/effects/ScrollProgress'
import Footer from '@/components/layout/Footer'
import Marquee from '@/components/layout/Marquee'
import RadialNav from '@/components/RadialNav/RadialNav'
import Contact from '@/components/sections/Contact/Contact'
import Faq from '@/components/sections/Faq'
import Gallery from '@/components/sections/Gallery'
import Pricing from '@/components/sections/Pricing'
import Hero from '@/components/sections/Hero/Hero'
import Perks from '@/components/sections/Perks'
import Services from '@/components/sections/Services/Services'
import Steps from '@/components/sections/Steps'
import { SECTION_IDS } from '@/data'
import useInteractions from '@/hooks/useInteractions'
import useActiveSection from '@/hooks/useActiveSection'
import useRevealOnScroll from '@/hooks/useRevealOnScroll'
import useScrollFx from '@/hooks/useScrollFx'
import useTheme from '@/hooks/useTheme'
import { scrollToSection } from '@/utils/scroll'

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS)
  const [theme, toggleTheme] = useTheme()
  useRevealOnScroll()
  useInteractions()
  useScrollFx()

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <RadialNav
        active={activeSection}
        onNavigate={scrollToSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
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
        <Footer />
      </main>
    </>
  )
}
