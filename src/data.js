// All site content lives here — edit this file to add or change projects and skills.

export const socials = [
  { label: 'GitHub', href: 'https://github.com/masudibnmusa', icon: 'fab fa-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/masudibnmusa10', icon: 'fab fa-linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/_ordinary_b0y_/', icon: 'fab fa-instagram' },
  { label: 'Email', href: 'mailto:masudibnmusa10@gmail.com', icon: 'fas fa-envelope' },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: 'SWE', label: 'Student' },
  { value: 20, suffix: '+', label: 'Projects Built' },
  { value: 'DIU', label: 'University' },
  { value: 'BD', label: 'Based In' },
]

const gh = (repo) => `https://github.com/masudibnmusa/${repo}`

export const caseStudies = [
  { title: 'LLM Fine-tune Pipeline', desc: 'Pipeline for fine-tuning large language models on custom datasets.', tags: ['Python', 'LLM', 'Fine-tuning'], href: gh('llm-finetune-pipeline') },
  { title: 'Evaluation & Benchmarking Framework', desc: 'Framework for evaluating and benchmarking language model performance.', tags: ['Python', 'Evaluation', 'LLM'], href: gh('Evaluation-Benchmarking-Framework') },
  { title: 'Multi-Agent Research Assistant', desc: 'Team of AI agents that work together to research a topic and compile findings.', tags: ['Python', 'Multi-Agent', 'Research'], href: gh('Multi-Agent-Research-Assistant') },
  { title: 'Autonomous Agent with Tool Use', desc: 'AI agent that plans tasks and calls external tools to complete them on its own.', tags: ['Python', 'AI Agents', 'Tool Use'], href: gh('Autonomous-Agent-with-Tool-Use') },
  { title: 'MCP Server Ecosystem', desc: 'Collection of Model Context Protocol servers that connect AI models to external tools and data.', tags: ['MCP', 'Python', 'Integrations'], href: gh('MCP-Server-Ecosystem') },
  { title: 'Multi-Agent Dev Team', desc: 'AI agents with different roles that collaborate to plan, write, and review code.', tags: ['Python', 'Multi-Agent', 'Automation'], href: gh('Multi-Agent-Dev-Team') },
]

// Full class strings so Tailwind can see them when scanning this file
export const tagColors = {
  blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
  green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
  orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300',
  purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
  cyan: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300',
  red: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300',
  rose: 'bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-300',
  teal: 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300',
  emerald: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300',
  amber: 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300',
  lime: 'bg-lime-100 dark:bg-lime-900 text-lime-600 dark:text-lime-300',
  yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300',
  indigo: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300',
  violet: 'bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300',
}

export const fullStackProjects = [
  { title: 'Slot Map', desc: 'A class room finder application for slot-based location management and visualization.', icon: 'fa-map-marked-alt', gradient: 'from-blue-500 to-indigo-600', tags: [['JavaScript', 'blue'], ['HTML/CSS', 'green']], href: gh('Slotmapp.git') },
  { title: 'Smart Library Management', desc: 'A comprehensive system for managing library operations, books, and users efficiently.', icon: 'fa-book-reader', gradient: 'from-emerald-500 to-teal-600', tags: [['Java', 'blue'], ['MySQL', 'orange']], href: gh('Smart-Library-Management-System.git') },
  { title: 'AI Chat Bot', desc: 'An intelligent conversational bot powered by Local AI for interactive user experiences.', icon: 'fa-robot', gradient: 'from-purple-500 to-pink-600', tags: [['Python', 'blue'], ['AI/ML', 'purple']], href: gh('AI-Chat-Bot.git') },
  { title: 'Professor Office Hour Scheduler', desc: 'A scheduling system that helps professors organize and manage their office hours efficiently.', icon: 'fa-chalkboard-teacher', gradient: 'from-blue-500 to-cyan-600', tags: [['Python', 'blue'], ['Scheduling', 'cyan']], href: gh('Professor-Office-Hour-Scheduler.git') },
  { title: 'Hospital Management System', desc: 'A comprehensive system for managing hospital operations including patients, staff, and records.', icon: 'fa-hospital', gradient: 'from-red-500 to-rose-600', tags: [['Python', 'red'], ['Database', 'rose']], href: gh('Hospital-Management-System.git') },
  { title: 'Medilink', desc: 'A platform connecting patients and healthcare providers for seamless medical service management.', icon: 'fa-user-md', gradient: 'from-teal-500 to-emerald-600', tags: [['Python', 'teal'], ['Healthcare', 'emerald']], href: gh('Medilink.git') },
  { title: 'Foodaxis', desc: 'A food ordering and management platform designed for a smooth and efficient dining experience.', icon: 'fa-utensils', gradient: 'from-orange-500 to-amber-600', tags: [['JavaScript', 'orange'], ['Food Tech', 'amber']], href: 'https://github.com/farhana614/Foodaxis.git' },
  { title: 'IoT Based Smart Plant Monitoring System', desc: 'An IoT solution that monitors soil moisture, temperature, and humidity to automate plant care.', icon: 'fa-seedling', gradient: 'from-green-500 to-lime-600', tags: [['Arduino', 'green'], ['IoT', 'lime']], href: gh('IoT-Based-Smart-Plant-Monitoring-System.git') },
  { title: 'Pickaboo DB', desc: "A database design and management project modeling an e-commerce style platform's backend.", icon: 'fa-database', gradient: 'from-yellow-500 to-orange-600', tags: [['SQL', 'yellow'], ['Database', 'orange']], href: gh('Pickaboo_db.git') },
  { title: 'Dude AI Assistance', desc: 'An AI-powered assistant built to help users with everyday tasks through natural conversation.', icon: 'fa-robot', gradient: 'from-indigo-500 to-violet-600', tags: [['Python', 'indigo'], ['AI/ML', 'violet']], href: gh('Dude-AI-Assistance.git') },
]

export const skillGroups = [
  {
    title: 'Programming', icon: 'fa-code text-primary dark:text-accent', bar: 'bg-primary dark:bg-accent',
    items: [['Java', 85], ['Python', 95], ['JavaScript', 60], ['C/C++', 70]],
  },
  {
    title: 'Database & Tools', icon: 'fa-database text-emerald-500', bar: 'bg-emerald-500',
    items: [['MySQL', 80], ['Git & GitHub', 85], ['VS Code', 90], ['Linux', 70]],
  },
]

export const interests = ['AI & Machine Learning', 'Web Development', 'Problem Solving', 'Open Source Contribution', 'Data Structures', 'Algorithms']
