import { useEffect, useRef, useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Send,
  Download,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import './App.css';

const projects = [
  {
    id: 1,
    title: 'Enterprise SaaS & API Systems',
    company: 'Sonder',
    description: 'Designed and maintained large-scale API integrations including Listing APIs, LOS Records APIs, Pricing APIs, and upgraded Airbnb APIs to the latest supported versions. Successfully upgraded a Rails 6 monolith to Rails 7 while maintaining production stability and improving developer tooling across environments.',
    technologies: ['Ruby on Rails', 'RESTful APIs', 'PostgreSQL', 'System Upgrades', 'API Versioning'],
    stats: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'APIs', value: '50+' }
    ],
    image: '/project-sonder.jpg',
    color: 'teal',
    link: 'https://www.sonder.com/'
  },
  {
    id: 2,
    title: 'Enterprise SaaS License Intelligence Platform',
    company: 'subble',
    description: 'Designed and implemented SaaS license intelligence by integrating Microsoft 365 (Graph API), Atlassian, Jira, and other SaaS APIs.',
    technologies: ['Ruby on Rails', 'Large-Scale Databases', 'Performance Optimization', 'Data Systems'],
    stats: [
      { label: 'Keywords', value: '400k' },
      { label: 'Records/Day', value: '2M+' }
    ],
    image: '/project-subble.png',
    color: 'purple',
    link: 'https://www.subble.com/'
  },
  {
    id: 3,
    title: 'Event & Fundraising Platform',
    company: 'Donorbox',
    description: 'Donorbox is a fundraising platform that helps nonprofits, charities, and individuals collect donations, sell event tickets, and manage fundraising campaigns online. It offers customizable donation forms, recurring donations, and event ticketing with features like tiered pricing and attendee management. The platform supports multiple payment methods, including credit cards, PayPal, and ACH bank transfers.',
    technologies: ['Ruby on Rails', 'Stripe', 'PostgreSQL', 'AWS'],
    stats: [
      { label: 'Processed', value: '$10M+' },
      { label: 'Users', value: '100k+' }
    ],
    image: '/project-donorbox.png',
    color: 'green',
    link: 'https://donorbox.org/'
  },
  {
    id: 4,
    title: 'SaaS Analytics Platform',
    company: 'Chartmogul',
    description: 'ChartMogul is a SaaS analytics platform for subscription businesses, tracking MRR, ARR, churn, LTV, and retention. It automates revenue reporting, integrates with Stripe, PayPal, and CRMs (Salesforce), and offers dashboards for insights. Features include dunning management (failed payment recovery), cohort analysis, and compliance (ASC 606). Tiered pricing scales with revenue volume.',
    technologies: ['Ruby on Rails', 'Stripe', 'PostgreSQL', 'AWS'],
    stats: [
      { label: 'Processed', value: '$10M+' },
      { label: 'Users', value: '100k+' }
    ],
    image: '/project-chartmogul.png',
    color: 'green',
    link: 'https://chartmogul.com/'
  },
  {
    id: 5,
    title: 'Automation Platform',
    company: 'Zen Arbitrage',
    description: 'Built and maintained microservices powering an Amazon FBA arbitrage platform.',
    technologies: ['Ruby', 'Microservices', 'API Integrations', 'Distributed Systems'],
    stats: [
      { label: 'Books', value: '1M+' },
      { label: 'Accuracy', value: '99%' }
    ],
    image: '/project-zenarbitrage.jpg',
    color: 'orange',
    link: 'https://www.zenarbitrage.com/'
  },
  {
    id: 6,
    title: 'Enterprise SEO Intelligence',
    company: 'DemandSphere',
    description: 'Engineered high-performance systems for tracking search rankings.',
    technologies: ['Ruby on Rails', 'Large-Scale Databases', 'Performance Optimization'],
    stats: [
      { label: 'Keywords', value: '400k' },
      { label: 'Records/Day', value: '2M+' }
    ],
    image: '/project-demandsphere.png',
    color: 'purple',
    link: 'https://www.demandsphere.com/'
  }
];


// Skills data
const skills = [
  'Ruby on Rails',
  'PostgreSQL',
  'Redis',
  'Stripe',
  'AWS',
  'React',
  'RESTful APIs',
  'Microservices',
  'System Design',
  'Performance Optimization'
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [activeProject, setActiveProject] = useState(0);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking for gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Project carousel navigation
  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-navy text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
          scrolled 
            ? 'glass border-b border-navy-light py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a 
            href="#" 
            className="text-xl font-semibold text-slate-100 hover:text-teal transition-colors duration-300"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            Umar Muhammad Sheikh
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm text-slate hover:text-teal transition-colors duration-300 link-underline"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-sm text-slate hover:text-teal transition-colors duration-300 link-underline"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm text-slate hover:text-teal transition-colors duration-300 link-underline"
            >
              Contact
            </button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-teal text-teal hover:bg-teal hover:text-navy transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
        } as React.CSSProperties}
      >
        {/* Mouse-tracking gradient */}
        <div className="absolute inset-0 mouse-gradient pointer-events-none" />
        
        {/* Floating accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/3 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-teal/5 rounded-full blur-3xl animate-float-delayed-2 pointer-events-none" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(94, 234, 212, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(94, 234, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="reveal opacity-0 translate-y-8 transition-all duration-700 ease-out-expo">
                <p className="text-teal font-medium mb-4">Hi, I'm a</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 leading-tight">
                  Senior{' '}
                  <span className="text-gradient">Ruby on Rails</span>
                  <br />
                  Engineer
                </h1>
              </div>
              
              <p className="text-lg text-slate leading-relaxed max-w-lg reveal opacity-0 translate-y-8 transition-all duration-700 delay-150 ease-out-expo">
                I build scalable SaaS platforms, API-driven systems, and high-performance 
                web applications with clean backend architectures.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out-expo">
                <a 
                  href="https://github.com/amar-sheikh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-navy-light text-slate hover:text-teal hover:bg-navy-light/80 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/umar-sheikh-5459b311/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-navy-light text-slate hover:text-teal hover:bg-navy-light/80 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-450 ease-out-expo">
                <Button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-teal text-navy hover:bg-teal-dark transition-all duration-300"
                >
                  View Projects
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => scrollToSection('contact')}
                  className="border-slate-dark text-slate-light hover:border-teal hover:text-teal transition-all duration-300"
                >
                  Get in Touch
                </Button>
              </div>
            </div>

            {/* Right content - Stats */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out-expo">
                  <div className="p-6 rounded-2xl bg-navy-light/50 border border-navy-light backdrop-blur-sm">
                    <div className="text-4xl font-bold text-teal mb-2">10+</div>
                    <div className="text-sm text-slate">Years Experience</div>
                  </div>
                </div>
                <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out-expo mt-8">
                  <div className="p-6 rounded-2xl bg-navy-light/50 border border-navy-light backdrop-blur-sm">
                    <div className="text-4xl font-bold text-teal mb-2">50+</div>
                    <div className="text-sm text-slate">Projects Delivered</div>
                  </div>
                </div>
                <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-400 ease-out-expo">
                  <div className="p-6 rounded-2xl bg-navy-light/50 border border-navy-light backdrop-blur-sm">
                    <div className="text-4xl font-bold text-teal mb-2">20+</div>
                    <div className="text-sm text-slate">Enterprise Clients</div>
                  </div>
                </div>
                <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-500 ease-out-expo mt-8">
                  <div className="p-6 rounded-2xl bg-navy-light/50 border border-navy-light backdrop-blur-sm">
                    <div className="text-4xl font-bold text-teal mb-2">99%</div>
                    <div className="text-sm text-slate">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-dark flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-teal rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left column - Title */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4 reveal opacity-0 translate-y-8 transition-all duration-700 ease-out-expo">
                About Me
              </h2>
              <div className="w-16 h-1 bg-teal rounded-full reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out-expo" />
            </div>

            {/* Right column - Content */}
            <div className="lg:col-span-3 space-y-6">
              <p className="text-lg text-slate leading-relaxed reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out-expo">
                I'm a senior Ruby on Rails engineer specializing in building scalable SaaS platforms, 
                API-driven systems, and high-performance web applications. With over a decade of experience, 
                I focus on designing clean backend architectures, optimizing databases, and developing secure, 
                production-ready systems built for long-term growth.
              </p>
              
              <p className="text-lg text-slate leading-relaxed reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out-expo">
                I work extensively with Ruby on Rails, PostgreSQL, Redis, Stripe, and cloud infrastructure, 
                and collaborate with frontend teams using React and modern JavaScript frameworks to deliver 
                complete, scalable solutions.
              </p>

              {/* Skills */}
              <div className="pt-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-400 ease-out-expo">
                <h3 className="text-sm font-medium text-slate-light mb-4 uppercase tracking-wider">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge 
                      key={skill}
                      variant="secondary"
                      className="bg-navy-light text-slate-light hover:bg-teal/10 hover:text-teal border border-navy-light hover:border-teal/30 transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* View Resume CTA */}
              <div className="pt-6 reveal opacity-0 translate-y-8 transition-all duration-700 delay-500 ease-out-expo">
                <a 
                  href="#"
                  className="inline-flex items-center gap-2 text-teal hover:text-teal-dark transition-colors duration-300 group"
                >
                  <span className="link-underline">View Full Résumé</span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy-light to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4 reveal opacity-0 translate-y-8 transition-all duration-700 ease-out-expo">
                Projects
              </h2>
              <p className="text-slate reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out-expo">
                A selection of my recent work
              </p>
            </div>
            
            {/* Carousel navigation */}
            <div className="flex items-center gap-3 reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out-expo">
              <button
                onClick={prevProject}
                className="p-3 rounded-lg bg-navy-light text-slate hover:text-teal hover:bg-navy-light/80 transition-all duration-300"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProject(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeProject 
                        ? 'w-8 bg-teal' 
                        : 'bg-slate-dark hover:bg-slate'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextProject}
                className="p-3 rounded-lg bg-navy-light text-slate hover:text-teal hover:bg-navy-light/80 transition-all duration-300"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Project carousel */}
          <div 
            ref={projectsRef}
            className="relative overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-out-expo"
              style={{ transform: `translateX(-${activeProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="w-full flex-shrink-0 px-1"
                >
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Project image */}
                    <div className={`relative group img-zoom rounded-xl overflow-hidden ${
                      index % 2 === 1 ? 'lg:order-2' : ''
                    }`}>
                      <div className="aspect-[3/2] relative">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                      </div>
                      
                      {/* Stats overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                        {project.stats.map((stat) => (
                          <div 
                            key={stat.label}
                            className="px-4 py-2 rounded-lg bg-navy/80 backdrop-blur-sm border border-navy-light"
                          >
                            <div className="text-xl font-bold text-teal">{stat.value}</div>
                            <div className="text-xs text-slate">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project content */}
                    <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div>
                        <p className="text-sm text-teal font-medium mb-2">{project.company}</p>
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-100 mb-4">
                          {project.title}
                        </h3>
                        <p className="text-slate leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech}
                            variant="outline"
                            className="border-navy-light text-slate hover:border-teal hover:text-teal transition-all duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Project link */}
                    <a 
  href={project.link}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 text-teal hover:text-teal-dark transition-colors duration-300 group"
>
  <span className="link-underline">View Project</span>
  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32 relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy-light to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column - Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4 reveal opacity-0 translate-y-8 transition-all duration-700 ease-out-expo">
                  Get In Touch
                </h2>
                <p className="text-slate leading-relaxed reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out-expo">
                  Have a project in mind or want to discuss opportunities? I'd love to hear from you.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out-expo">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-navy-light text-teal">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate">Email</p>
                    <a 
                      href="mailto:hello@example.com" 
                      className="text-slate-100 hover:text-teal transition-colors duration-300"
                    >
                      umar.m.sheikh@gmail.com 
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-navy-light text-teal">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate">Location</p>
                    <p className="text-slate-100">Lahore, Pakistan.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-navy-light text-teal">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate">Availability</p>
                    <p className="text-slate-100">Open to freelance & full-time</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out-expo">
                <a 
                  href="https://github.com/amar-sheikh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-navy-light text-slate hover:text-teal hover:bg-navy-light/80 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/umar-sheikh-5459b311/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-navy-light text-slate hover:text-teal hover:bg-navy-light/80 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

          {/* Right column - Form */}
<div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-400 ease-out-expo">
  <form
    action="https://formspree.io/f/xykdvzlw"
    method="POST"
    className="space-y-6"
  >
    {/* Optional hidden fields */}
    <input type="hidden" name="_subject" value="New Project Inquiry" />
    {/* <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" /> */}

    <div className="grid sm:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-slate-light">
          Name <span className="text-teal">*</span>
        </label>
        <Input
          id="name"
          type="text"
          name="name"
          required
          placeholder="John Doe"
          className="bg-navy-light border-navy-light text-slate-100 placeholder:text-slate-dark focus:border-teal transition-colors duration-300"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-slate-light">
          Email <span className="text-teal">*</span>
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          required
          placeholder="john@example.com"
          className="bg-navy-light border-navy-light text-slate-100 placeholder:text-slate-dark focus:border-teal transition-colors duration-300"
        />
      </div>
    </div>

    <div className="space-y-2">
      <label htmlFor="subject" className="text-sm text-slate-light">
        Subject
      </label>
      <Input
        id="subject"
        type="text"
        name="subject"
        placeholder="Project inquiry"
        className="bg-navy-light border-navy-light text-slate-100 placeholder:text-slate-dark focus:border-teal transition-colors duration-300"
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="message" className="text-sm text-slate-light">
        Message <span className="text-teal">*</span>
      </label>
      <Textarea
        id="message"
        name="message"
        required
        rows={5}
        placeholder="Tell me about your project..."
        className="bg-navy-light border-navy-light text-slate-100 placeholder:text-slate-dark focus:border-teal transition-colors duration-300 resize-none"
      />
    </div>

    <Button
      type="submit"
      className="w-full bg-teal text-navy hover:bg-teal-dark transition-all duration-300"
    >
      <span className="flex items-center gap-2">
        <Send className="w-4 h-4" />
        Send Message
      </span>
    </Button>
  </form>
</div>
</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative">
        {/* Top border with shimmer */}
        <div className="absolute top-0 left-0 w-full h-px">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-teal/30 to-transparent animate-shimmer" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo and tagline */}
            <div className="text-center md:text-left">
              <a 
                href="#" 
                className="text-xl font-semibold text-slate-100 hover:text-teal transition-colors duration-300"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Portfolio
              </a>
              <p className="text-sm text-slate mt-1">
                Building the future, one Rails app at a time.
              </p>
            </div>

            {/* Quick links */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-sm text-slate hover:text-teal transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-sm text-slate hover:text-teal transition-colors duration-300"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-sm text-slate hover:text-teal transition-colors duration-300"
              >
                Contact
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/amar-sheikh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate hover:text-teal hover:bg-navy-light transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/umar-sheikh-5459b311/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate hover:text-teal hover:bg-navy-light transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
             
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-navy-light text-center">
            <p className="text-sm text-slate-dark">
              © {new Date().getFullYear()} All rights reserved. Crafted with precision.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS for reveal animations */}
      <style>{`
        .reveal.animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>
    </div>
  );
}

export default App;
