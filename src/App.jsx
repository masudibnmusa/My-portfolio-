import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Tagline from './components/Tagline'
import { CaseStudies, FullStackProjects } from './components/Projects'
import Stack from './components/Stack'
import Faq from './components/Faq'
import { Contact, Footer } from './components/Contact'
import ChatBot from './components/ChatBot'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] btn btn-primary">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Tagline />
        <CaseStudies />
        <FullStackProjects />
        <Stack />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}
