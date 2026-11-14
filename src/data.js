// All site content lives here — edit this file to add or change projects, stack and FAQ.

export const EMAIL = 'masudibnmusa10@gmail.com'
export const GITHUB = 'https://github.com/masudibnmusa'

export const socials = [
  { label: 'GitHub', href: GITHUB },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/masudibnmusa10' },
  { label: 'Instagram', href: 'https://www.instagram.com/_ordinary_b0y_/' },
  { label: 'Email', href: `mailto:${EMAIL}` },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// Recruiter quick read in the About section
export const facts = [
  ['Studying', 'Software Engineering, Daffodil International University'],
  ['Based in', 'Dhaka, Bangladesh'],
  ['Focus', 'AI engineering, LLM systems, backend'],
  ['Languages', 'Python, Java, JavaScript, C/C++'],
  ['Projects', '60+ on GitHub'],
]

const gh = (repo) => `${GITHUB}/${repo}`

export const caseStudies = [
  { title: 'LLM Fine-tune Pipeline', desc: 'Pipeline for fine tuning large language models on custom datasets.', tags: ['Python', 'LLM', 'Fine tuning'], href: gh('llm-finetune-pipeline') },
  { title: 'Evaluation & Benchmarking Framework', desc: 'Framework for evaluating and benchmarking language model performance.', tags: ['Python', 'Evaluation', 'LLM'], href: gh('Evaluation-Benchmarking-Framework') },
  { title: 'Multi-Agent Research Assistant', desc: 'A team of AI agents that research a topic together and compile the findings.', tags: ['Python', 'Multi agent', 'Research'], href: gh('Multi-Agent-Research-Assistant') },
  { title: 'Autonomous Agent with Tool Use', desc: 'An AI agent that plans a task and calls external tools to complete it on its own.', tags: ['Python', 'Agents', 'Tool use'], href: gh('Autonomous-Agent-with-Tool-Use') },
  { title: 'MCP Server Ecosystem', desc: 'Model Context Protocol servers that connect AI models to external tools and data.', tags: ['MCP', 'Python', 'Integrations'], href: gh('MCP-Server-Ecosystem') },
  { title: 'Multi-Agent Dev Team', desc: 'AI agents with different roles that plan, write and review code together.', tags: ['Python', 'Multi agent', 'Automation'], href: gh('Multi-Agent-Dev-Team') },
]

export const fullStackProjects = [
  { title: 'Slot Map', desc: 'Classroom finder for slot based location management and visualization.', tags: ['JavaScript', 'HTML/CSS'], href: gh('Slotmapp') },
  { title: 'Smart Library Management', desc: 'Manages library operations, books and members.', tags: ['Java', 'MySQL'], href: gh('Smart-Library-Management-System') },
  { title: 'AI Chat Bot', desc: 'Conversational bot running on a local AI model.', tags: ['Python', 'AI/ML'], href: gh('AI-Chat-Bot') },
  { title: 'Professor Office Hour Scheduler', desc: 'Helps professors organize and manage their office hours.', tags: ['Python', 'Scheduling'], href: gh('Professor-Office-Hour-Scheduler') },
  { title: 'Hospital Management System', desc: 'Handles patients, staff and records for a hospital.', tags: ['Python', 'Database'], href: gh('Hospital-Management-System') },
  { title: 'Medilink', desc: 'Connects patients with healthcare providers to manage medical services.', tags: ['Python', 'Healthcare'], href: gh('Medilink') },
  { title: 'Foodaxis', desc: 'Food ordering and restaurant management platform.', tags: ['JavaScript', 'Food tech'], href: 'https://github.com/farhana614/Foodaxis' },
  { title: 'IoT Smart Plant Monitoring', desc: 'Tracks soil moisture, temperature and humidity to automate plant care.', tags: ['Arduino', 'IoT'], href: gh('IoT-Based-Smart-Plant-Monitoring-System') },
  { title: 'Pickaboo DB', desc: 'Database design for an ecommerce style backend.', tags: ['SQL', 'Database'], href: gh('Pickaboo_db') },
  { title: 'Dude AI Assistance', desc: 'Assistant that helps with everyday tasks through conversation.', tags: ['Python', 'AI/ML'], href: gh('Dude-AI-Assistance') },
]

// Real logos. dev = Devicon file name, si = Simple Icons slug (monochrome). dark = black logo, inverted in dark mode.
const dev = (name, file = `${name}-original`, dark) => ({ src: `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.18.0/icons/${name}/${file}.svg`, dark })
// shortcut: pinned to simple-icons@15.0.0 because newer releases dropped the OpenAI logo; self-host the SVGs if jsDelivr ever drops it.
const si = (slug) => ({ src: `https://cdn.jsdelivr.net/npm/simple-icons@15.0.0/icons/${slug}.svg`, dark: true })

export const stack = [
  { title: 'AI and LLM', items: [['Python', dev('python')], ['PyTorch', dev('pytorch')], ['Hugging Face', dev('huggingface')], ['LangChain', si('langchain')], ['OpenAI', si('openai')], ['Ollama', si('ollama')], ['MLflow', si('mlflow')], ['scikit-learn', dev('scikitlearn')]] },
  { title: 'Backend', items: [['FastAPI', dev('fastapi')], ['Node.js', dev('nodejs')], ['Express', dev('express', 'express-original', true)], ['Java', dev('java')], ['C++', dev('cplusplus')], ['PostgreSQL', dev('postgresql')], ['MySQL', dev('mysql')]] },
  { title: 'Frontend', items: [['JavaScript', dev('javascript')], ['React', dev('react')], ['Tailwind CSS', dev('tailwindcss')], ['HTML', dev('html5')], ['CSS', dev('css3')]] },
  { title: 'Data', items: [['pandas', dev('pandas', 'pandas-original', true)], ['NumPy', dev('numpy')], ['Matplotlib', dev('matplotlib')], ['Jupyter', dev('jupyter')], ['Colab', dev('googlecolab')]] },
  { title: 'Tools', items: [['Docker', dev('docker')], ['Linux', dev('linux')], ['Git', dev('git')], ['GitHub', dev('github', 'github-original', true)], ['VS Code', dev('vscode')], ['IntelliJ', dev('intellij')], ['PyCharm', dev('pycharm')], ['Arduino', dev('arduino')]] },
  { title: 'AI assistants', items: [['Claude', si('claude')], ['Gemini', si('googlegemini')], ['Copilot', si('githubcopilot')], ['Perplexity', si('perplexity')]] },
]

export const faqs = [
  ['Where are you based?', 'Dhaka, Bangladesh.'],
  ['What are you studying?', 'Software Engineering at Daffodil International University.'],
  ['Which languages do you use most?', 'Python for AI and backend work, Java for larger systems like the library manager, and JavaScript for web front ends like Slot Map. I also write C and C++.'],
  ['What AI work have you done?', 'A fine tuning pipeline, an evaluation and benchmarking framework for language models, several multi agent systems, and a set of MCP servers that connect models to tools and data.'],
  ['Can I read your code?', 'Yes. Every project on this page links to its GitHub repository.'],
  ['What are you learning right now?', 'AI engineering, LLM based systems and full stack development, while building real projects and improving my software architecture.'],
  ['What is the fastest way to reach you?', `Email me at ${EMAIL}. I am also on LinkedIn.`],
]
