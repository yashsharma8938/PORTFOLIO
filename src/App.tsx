import { LoadingScreen } from './components/ui/LoadingScreen'
import { Navbar } from './components/ui/Navbar'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/FooterSection'
import { useAppStore } from './store/useAppStore'

export default function App() {
  const { isLoading } = useAppStore()

  return (
    <div className="relative min-h-screen bg-dark-950 text-white overflow-x-hidden">
      {/* Loading screen */}
      <LoadingScreen />

      {/* Main content — only render after loading */}
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
