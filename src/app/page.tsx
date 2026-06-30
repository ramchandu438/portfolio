"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Menu, X, ArrowUp, ExternalLink, Play } from "lucide-react";

/* ──────────────────────────── ICONS ──────────────────────────── */

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XTwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ──────────────────────────── NAV ──────────────────────────── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Interests", href: "#interests" },
  { label: "Contact", href: "#contact" },
];

const StickyNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#B00909]/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(255,255,255,0.1)]"
          : "bg-[#B00909]"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logotype */}
          <a href="#" className="flex items-center gap-0">
            <span className="font-headline text-2xl md:text-3xl font-black tracking-tight text-white uppercase leading-none">
              Ram Chandu
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-white/80 hover:text-rs-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-rs-gold transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#B00909] border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-ui text-sm font-bold uppercase tracking-[0.15em] text-white hover:text-rs-gold transition-colors py-2 border-b border-white/10"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ──────────────────── SECTION DIVIDER ──────────────────── */

const SectionDivider = ({ className = "" }: { className?: string }) => (
  <div className={`max-w-[1100px] mx-auto px-6 md:px-8 ${className}`}>
    <div className="h-[2px] bg-black/60" />
  </div>
);

/* ──────────────────── CATEGORY LABEL ──────────────────── */

const CategoryLabel = ({
  children,
  color = "red",
}: {
  children: React.ReactNode;
  color?: "red" | "black" | "gold";
}) => {
  const colorClasses = {
    red: "text-rs-gold",
    black: "text-white",
    gold: "text-rs-gold",
  };
  return (
    <span
      className={`font-headline text-[13px] font-black uppercase tracking-[0.08em] ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
};

/* ──────────────────── SCROLL TO TOP ──────────────────── */

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-rs-gold hover:text-black transition-colors duration-200 shadow-lg border border-white/10"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function StoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const projects = [
    {
      title: "Crowd Panic Detection System",
      desc: "An IoT and Machine Learning-based safety system designed to identify crowd panic situations using sensor data and intelligent behavior analysis.",
      tags: ["ESP8266", "Firebase", "Machine Learning", "IoT"],
      category: "IOT + ML",
      image: "/crowd-panic.jpg",
      link: "https://github.com/ramchandu438/CrowdPanicSystem",
      featured: true,
    },
    {
      title: "Gesture Controlled Home Automation",
      desc: "A smart home system that enables users to control household appliances through hand gestures with real-time recognition.",
      tags: ["Embedded Systems", "Sensors", "Real-time"],
      category: "EMBEDDED",
      image: "/gesture-automation.jpg",
      link: "https://github.com/ramchandu438/gesture-home-automation",
      videoLink: "https://drive.google.com/drive/folders/1p01JvdbnK8ddGepT04gOzsAOBzykfFlj?usp=sharing",
      featured: false,
    },
    {
      title: "Placement Tracker Website",
      desc: "A modern web application to help students track placement opportunities, company drives, and interview progress.",
      tags: ["Web App", "UI/UX", "Full Stack"],
      category: "WEB",
      image: "/placement-tracker.jpg",
      link: "https://github.com/ramchandu438/placement-tracker",
      featured: false,
    },
  ];

  const interests = [
    {
      number: "01",
      title: "Cinematic Videography",
      desc: "Capturing moments and transforming them into visual stories. Every frame tells a narrative.",
      icon: "🎥",
    },
    {
      number: "02",
      title: "Music & Sound",
      desc: "Music fuels my creativity and helps me stay focused while building. The rhythm behind every great project.",
      icon: "🎵",
    },
    {
      number: "03",
      title: "Film & Storytelling",
      desc: "Discovering stories, cinematography, and unforgettable characters across genres and cultures.",
      icon: "🎬",
    },
    {
      number: "04",
      title: "AI & Vibe Coding",
      desc: "Transforming random ideas into working products using AI-assisted development workflows.",
      icon: "🤖",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <StickyNav />
      <ScrollToTop />

      <main className="bg-background text-foreground">
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section ref={heroRef} className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="max-w-[1100px] mx-auto px-6 md:px-8"
          >
            {/* Top Rule */}
            <div className="h-[3px] bg-rs-gold w-20 mb-8" />

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {/* Category */}
              <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                <CategoryLabel>Portfolio · 2025</CategoryLabel>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mt-5 mb-8 max-w-4xl"
              >
                Building With Logic.{" "}
                <span className="italic font-normal">Creating With Imagination.</span>
              </motion.h1>

              {/* Byline */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center gap-3 mb-8"
              >
                <span className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                  By Ram Chandu
                </span>
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                <span className="font-ui text-[11px] uppercase tracking-[0.1em] text-white/60">
                  Developer · Creator · Problem Solver
                </span>
              </motion.div>

              {/* Intro */}
              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="font-body text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl"
              >
                I engineer robust systems, design striking interfaces, and craft digital
                experiences that leave a lasting impact. My journey started with curiosity and
                evolved into an obsession with the intersection of software, hardware, and raw
                creativity.
              </motion.p>
            </motion.div>
          </motion.div>
        </section>

        <SectionDivider />

        {/* ═══════════════════ FEATURED PROJECTS ═══════════════════ */}
        <section id="projects" className="py-16 md:py-24">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <CategoryLabel>Featured Work</CategoryLabel>
                <h2 className="font-headline text-3xl md:text-4xl font-black text-white mt-2 tracking-tight">
                  Projects
                </h2>
              </div>
              <div className="hidden md:block h-[2px] bg-black/60 flex-1 ml-8" />
            </div>

            {/* Magazine Grid: Featured + Sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* Featured (Large) Card */}
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="md:col-span-7 group"
              >
                <a href={projects[0].link} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden mb-4">
                  <div className="aspect-[4/3] overflow-hidden bg-rs-grey-lightest border-4 border-black">
                    <img
                      src={projects[0].image}
                      alt={projects[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </a>
                <CategoryLabel color="red">{projects[0].category}</CategoryLabel>
                <h3 className="font-headline text-2xl md:text-3xl font-bold text-white mt-2 mb-3 leading-tight tracking-tight">
                  <a
                    href={projects[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-rs-gold transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    {projects[0].title}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
                  </a>
                </h3>
                <p className="font-body text-base text-white/80 leading-relaxed mb-4 max-w-xl">
                  {projects[0].desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projects[0].tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-ui text-[10px] font-bold uppercase tracking-[0.12em] text-white/90 bg-black/35 px-2.5 py-1 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>

              {/* Sidebar Cards */}
              <div className="md:col-span-5 flex flex-col gap-6 md:gap-8 md:border-l md:border-black/60 md:pl-8">
                {projects.slice(1).map((project, idx) => (
                  <motion.article
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="group cursor-pointer"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <div className="aspect-square overflow-hidden bg-rs-grey-lightest border-4 border-black">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <CategoryLabel color="red">{project.category}</CategoryLabel>
                        <h3 className="font-headline text-lg md:text-xl font-bold text-white mt-1 mb-2 leading-snug tracking-tight">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-rs-gold transition-colors duration-200 inline-flex items-center gap-1.5"
                          >
                            {project.title}
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200 flex-shrink-0" />
                          </a>
                        </h3>
                        <p className="font-body text-sm text-white/80 leading-relaxed line-clamp-2">
                          {project.desc}
                        </p>
                        {project.videoLink && (
                          <a
                            href={project.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-3 font-ui text-[10px] font-bold uppercase tracking-[0.15em] text-rs-gold hover:text-white transition-colors duration-200"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            Watch Demo
                          </a>
                        )}
                      </div>
                    </div>
                    {idx < projects.length - 2 && (
                      <div className="h-[2px] bg-black/60 mt-6 md:mt-8" />
                    )}
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ═══════════════════ ABOUT / ORIGINS ═══════════════════ */}
        <section id="about" className="py-16 md:py-24">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              {/* Left Column — Pull Quote */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="md:col-span-5"
              >
                <CategoryLabel>About</CategoryLabel>
                <h2 className="font-headline text-3xl md:text-4xl font-black text-white mt-3 mb-8 tracking-tight">
                  The Story
                </h2>
                <blockquote className="border-l-[3px] border-rs-gold pl-6">
                  <p className="font-headline text-2xl md:text-3xl font-bold text-white leading-snug italic">
                    "My journey started with curiosity and evolved into creating
                    experiences that blend software, hardware, and storytelling."
                  </p>
                </blockquote>
              </motion.div>

              {/* Right Column — Body */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="md:col-span-7"
              >
                <div className="space-y-6 font-body text-base md:text-lg text-white/95 leading-relaxed">
                  <p>
                    Technology is only one part of who I am. I am also someone who loves
                    capturing moments through videography, exploring stories through movies,
                    and finding inspiration in music. For me, creativity and technology are
                    deeply connected.
                  </p>
                  <p>
                    I enjoy working at the intersection of{" "}
                    <strong className="text-white font-bold">Technology</strong>,{" "}
                    <strong className="text-white font-bold">Creativity</strong>,{" "}
                    <strong className="text-white font-bold">Problem Solving</strong>, and{" "}
                    <strong className="text-white font-bold">Storytelling</strong>. Whether it's an
                    IoT project, a web application, a cinematic video, or an AI experiment, I
                    love creating experiences that leave an impact.
                  </p>
                  <p>
                    Recently, I started exploring the world of{" "}
                    <strong className="text-white font-bold">Vibe Coding</strong> — transforming
                    random ideas into working products using AI-assisted development
                    workflows. The best projects don't start with a spec sheet. They start
                    with a single, dangerous question:
                  </p>
                </div>

                {/* Pull Quote Callout */}
                <div className="mt-10 pt-8 border-t border-white/15">
                  <p className="font-headline text-3xl md:text-4xl font-black text-white italic tracking-tight leading-snug">
                    "What if this existed?"
                  </p>
                  <p className="font-ui text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mt-4">
                    — Then I build it.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ═══════════════════ INTERESTS — THE LIST ═══════════════════ */}
        <section id="interests" className="py-16 md:py-24 bg-rs-off-white">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8">
            {/* Section Header */}
            <div className="mb-12">
              <div className="h-[3px] bg-rs-gold w-12 mb-4" />
              <CategoryLabel>Beyond Code</CategoryLabel>
              <h2 className="font-headline text-3xl md:text-4xl font-black text-white mt-2 tracking-tight">
                The List
              </h2>
              <p className="font-body text-base text-white/80 mt-3 max-w-xl">
                When I'm not building projects, you'll usually find me immersed in
                one of these passions.
              </p>
            </div>

            {/* The List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-black">
              {interests.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`py-8 md:py-10 border-b border-black group cursor-default ${
                    idx % 2 === 0 ? "md:pr-10 md:border-r md:border-black" : "md:pl-10"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    {/* Number */}
                    <span className="font-headline text-4xl md:text-5xl font-black text-white/10 leading-none group-hover:text-rs-gold transition-colors duration-300 select-none">
                      {item.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="font-headline text-xl md:text-2xl font-bold text-white tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-body text-sm md:text-base text-white/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ═══════════════════ VIBE CODING CALLOUT ═══════════════════ */}
        <section className="py-20 md:py-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <CategoryLabel color="red">Philosophy</CategoryLabel>
              <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mt-4 mb-6 tracking-tight leading-[0.95] max-w-3xl mx-auto italic">
                Good code is poetry.{" "}
                <span className="not-italic">Great code is magic.</span>
              </h2>
              <div className="w-16 h-[3px] bg-rs-gold mx-auto my-8" />
              <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-4">
                I enjoy transforming random ideas into working products.
                Productivity tools, creative web experiences, AI-powered utilities,
                storytelling applications, experimental side projects — if it sparks
                curiosity, I'll build it.
              </p>
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 mt-8">
                Dream in pixels. Execute in code.
              </p>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ═══════════════════ CONTACT ═══════════════════ */}
        <section id="contact" className="py-16 md:py-24">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="md:col-span-6"
              >
                <div className="h-[3px] bg-rs-gold w-12 mb-4" />
                <CategoryLabel>Get In Touch</CategoryLabel>
                <h2 className="font-headline text-3xl md:text-4xl font-black text-white mt-2 mb-6 tracking-tight">
                  Let's Connect
                </h2>
                <p className="font-body text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-lg">
                  If you've made it this far, thank you for taking this journey with
                  me. Whether you'd like to collaborate, discuss ideas, build
                  something exciting, or simply connect — I'd love to hear from you.
                </p>
                <a
                  href="mailto:ramchandu438@gmail.com"
                  className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-ui text-[12px] font-bold uppercase tracking-[0.18em] hover:bg-rs-gold hover:text-black transition-colors duration-200 border border-white/10"
                  aria-label="Send email"
                >
                  <Mail className="w-4 h-4" />
                  Start a Conversation
                </a>
              </motion.div>

              {/* Right — Social + Quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="md:col-span-6 flex flex-col justify-between"
              >
                {/* Social Links */}
                <div className="space-y-4 mb-10">
                  <p className="font-ui text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mb-4">
                    Find me on
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/ramchandu438"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200"
                      aria-label="GitHub profile"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ram-chandu-nandamuri-912015254/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-200"
                      aria-label="LinkedIn profile"
                    >
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                    <a
                      href="https://x.com/ramchandu438"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-black hover:text-white transition-all duration-200"
                      aria-label="X (Twitter) profile"
                    >
                      <XTwitterIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Tagline */}
                <blockquote className="border-l-[3px] border-rs-gold pl-6">
                  <p className="font-headline text-xl md:text-2xl font-bold text-white italic leading-snug">
                    "Building with logic. Creating with imagination."
                  </p>
                  <cite className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-white/60 mt-3 block not-italic">
                    — Ram Chandu
                  </cite>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <footer className="bg-black text-white py-10 border-t border-white/10">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo */}
              <span className="font-headline text-xl font-black uppercase tracking-tight">
                Ram Chandu
              </span>

              {/* Nav */}
              <div className="flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-rs-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <p className="font-ui text-[10px] uppercase tracking-[0.15em] text-white/40">
                © {new Date().getFullYear()} Ram Chandu
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
