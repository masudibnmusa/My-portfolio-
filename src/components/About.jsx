import { facts } from '../data'
import Section from './Section'

export default function About() {
  return (
    <Section id="about" title="A quick read before you dig in" surface>
      <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
        <div className="space-y-4 body-3 text-muted max-w-[680px]">
          <p>
            I'm studying Software Engineering at Daffodil International University in Bangladesh.
            Most of my time goes into backend work and system design: the parts of an application
            that store the data, run the logic and talk to other services.
          </p>
          <p>
            Right now I'm going deep on <span className="text-ink font-medium">AI engineering</span>.
            I've built a fine tuning pipeline, an evaluation framework for language models, and
            several multi agent systems that plan, call tools and review each other's work.
          </p>
          <p>
            I care about code that is clean, readable and solves a real problem for the person using it.
          </p>
        </div>

        <dl className="rounded-2xl border border-line bg-raised p-6 divide-y divide-line">
          {facts.map(([term, value]) => (
            <div key={term} className="grid grid-cols-[96px_1fr] gap-4 py-3 first:pt-0 last:pb-0">
              <dt className="caption-4 uppercase tracking-wider text-muted pt-0.5">{term}</dt>
              <dd className="title-4 text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
