import { motion, useReducedMotion } from 'motion/react'

// Devicon font classes; `dark` = logo is black/near-black, so lighten it in dark mode
const devicons = [
  // AI / LLM Engineering
  'python-plain', 'pytorch-original', ['huggingface-plain', 'dark'], 'scikitlearn-plain',
  // Backend & Integration
  'fastapi-plain', 'nodejs-plain', ['express-original', 'dark'], 'postgresql-plain', 'java-plain', 'cplusplus-plain', 'mysql-plain',
  // Frontend
  'javascript-plain', 'react-original', 'html5-plain', 'css3-plain', 'tailwindcss-original',
  // Data & Analysis
  ['pandas-plain', 'dark'], 'numpy-plain', 'matplotlib-plain', 'jupyter-plain', 'googlecolab-plain',
  // Deployment & Tools
  'docker-plain', ['linux-plain', 'dark'], 'git-plain', ['github-original', 'dark'], 'vscode-plain',
  ['intellij-plain', 'dark'], ['pycharm-plain', 'dark'], 'arduino-plain',
].map((d) => {
  const [name, tone] = Array.isArray(d) ? d : [d]
  return { key: name, className: `devicon-${name} colored${tone ? ' dark:text-gray-200!' : ''}` }
})

// Not in Devicon: monochrome Simple Icons SVGs, tinted via CSS mask.
// shortcut: pinned to simple-icons@15.0.0 because newer releases dropped the OpenAI logo; self-host the SVGs if jsDelivr ever drops it.
const svgIcon = (slug, tint) => ({
  key: slug,
  className: tint,
  mask: `url(https://cdn.jsdelivr.net/npm/simple-icons@15.0.0/icons/${slug}.svg) center / contain no-repeat`,
})
const svgIcons = [
  svgIcon('langchain', 'bg-gray-800 dark:bg-gray-200'),
  svgIcon('openai', 'bg-gray-800 dark:bg-gray-200'),
  svgIcon('mlflow', 'bg-[#0194E2]'),
  // AI tools
  svgIcon('claude', 'bg-[#D97757]'),
  svgIcon('googlegemini', 'bg-[#8E75B2]'),
  svgIcon('githubcopilot', 'bg-gray-800 dark:bg-gray-200'),
  svgIcon('ollama', 'bg-gray-800 dark:bg-gray-200'),
  svgIcon('perplexity', 'bg-[#1FB8CD]'),
  svgIcon('meta', 'bg-[#0467DF]'),
]

// Fixed pseudo-random spread so positions don't jump between renders
const drops = [...devicons, ...svgIcons].map((icon, i) => ({
  ...icon,
  left: (i * 37 + 5) % 95,         // % across the hero (37 and 95 are coprime, so no two share a column)
  size: 1.5 + ((i * 7) % 4) * 0.4, // 1.5–2.7rem
  duration: 10 + ((i * 5) % 8),    // 10–17s per fall
  delay: -((i * 2.9) % 17),        // negative: already mid-fall on first paint
  spin: i % 2 ? 360 : -360,
}))

export default function FallingIcons() {
  // Continuous motion is decorative; drop it entirely for reduced-motion users
  if (useReducedMotion()) return null

  return (
    // z-10 draws over the hero content; pointer-events-none keeps buttons and links clickable underneath
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {drops.map((d) => (
        <motion.i
          key={d.key}
          className={`${d.className} absolute top-0 opacity-25 dark:opacity-30`}
          style={{
            left: `${d.left}%`,
            fontSize: `${d.size}rem`,
            // SVG icons have no glyph, so give them a 1em box for the mask to fill
            ...(d.mask && { width: '1em', height: '1em', mask: d.mask, WebkitMask: d.mask }),
          }}
          // Animating `transform` as one string lets the browser run it off the main thread
          animate={{ transform: ['translateY(-15vh) rotate(0deg)', `translateY(110vh) rotate(${d.spin}deg)`] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}
