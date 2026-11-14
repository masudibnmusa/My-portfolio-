import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import { CaseStudies, FullStackProjects } from './components/Projects'
import { GitHubGraph, Skills } from './components/Skills'
import { Contact, Footer } from './components/Contact'
import ChatBot from './components/ChatBot'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <CaseStudies />
        <FullStackProjects />
        <Skills />
        <GitHubGraph />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}
