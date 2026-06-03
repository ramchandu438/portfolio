"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowDown, Mail, Film, Music, PenTool, Radio, Play, Code } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// The individual animated card component
function ChapterCard({ 
  index, 
  isExpanded,
  onHover,
  children, 
  bgImage,
  title,
  fontClass
}: { 
  index: number; 
  isExpanded: boolean;
  onHover: () => void;
  children: React.ReactNode;
  bgImage: string;
  title: string;
  fontClass: string;
}) {
  return (
    <motion.div 
      onMouseEnter={onHover}
      animate={{ width: isExpanded ? "65vw" : "6vw" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative h-full flex-shrink-0 rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-white/30 flex items-center bg-black cursor-pointer ${fontClass}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#111]">
        <motion.img 
          animate={{ scale: isExpanded ? 1 : 1.2, x: isExpanded ? "0%" : "-15%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          src={bgImage} 
          alt={title} 
          className="w-full h-full object-cover opacity-90" 
        />
        {/* Vignette to make text readable and look moody */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Dim overlay when collapsed */}
      <motion.div 
        animate={{ opacity: isExpanded ? 0 : 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-black z-10 pointer-events-none"
      />

      {/* Vertical title when collapsed */}
      <motion.div 
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden"
      >
         <h3 className="whitespace-nowrap -rotate-90 text-[8vh] font-black text-white/90 mix-blend-overlay uppercase tracking-tight">
           {title}
         </h3>
         <div className="absolute bottom-12 right-12 text-white/50 text-xs font-mono tracking-widest">#0{index + 1}</div>
      </motion.div>

      {/* Full content when expanded. Fixed width prevents text from reflowing while animating */}
      <motion.div 
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ 
          opacity: isExpanded ? 1 : 0, 
          filter: isExpanded ? "blur(0px)" : "blur(10px)",
          pointerEvents: isExpanded ? "auto" : "none"
        }}
        transition={{ duration: 0.5, delay: isExpanded ? 0.2 : 0 }}
        className="absolute inset-y-0 left-0 w-[65vw] p-8 md:p-16 overflow-y-auto overflow-x-hidden flex flex-col justify-center z-10"
      >
         <div className="absolute top-12 right-12 text-white/50 text-xs font-mono tracking-[0.3em]">CH—0{index + 1}</div>
         {children}
      </motion.div>
    </motion.div>
  );
}

export default function StoryPage() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const projects = [
    {
      title: "Crowd Panic Detection System",
      desc: "An IoT and ML safety system designed to identify crowd panic situations.",
      tags: ["ESP8266", "Firebase", "ML"],
      icon: <Radio className="w-5 h-5 text-brand-accent" />
    },
    {
      title: "Gesture Home Automation",
      desc: "A smart home system to control appliances through hand gestures.",
      tags: ["Embedded", "Sensors"],
      icon: <Play className="w-5 h-5 text-brand-primary" />
    },
    {
      title: "Placement Tracker",
      desc: "A modern web application to track placement opportunities and interviews.",
      tags: ["Web App", "UI/UX"],
      icon: <Code className="w-5 h-5 text-brand-secondary" />
    }
  ];

  return (
    <main className="h-screen bg-[#e4e2de] text-foreground relative selection:bg-black selection:text-white overflow-hidden">
      
      {/* Heavy Film Grain Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-10" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      <div className="h-screen w-full overflow-hidden flex items-center justify-center bg-[#e4e2de]">
        
        {/* Accordion Container */}
        <div className="flex h-[75vh] w-full max-w-[96vw] gap-3 md:gap-4 mx-auto items-center">
          
          {/* ======================= BOX 1: THE BEGINNING ======================= */}
          <ChapterCard title="Identity" index={0} fontClass="font-box-1" isExpanded={hoveredIndex === 0} onHover={() => setHoveredIndex(0)} bgImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <div className="border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] tracking-[0.3em] font-mono text-white/70 mb-8 uppercase">
                Status: Online // System Ready
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-white leading-none uppercase drop-shadow-2xl">
                Ram<br/>Chandu
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-4 mb-10">
                <span className="px-4 py-2 border border-white/20 bg-black/40 backdrop-blur-md rounded-xl text-xs md:text-sm font-bold tracking-widest text-white/90 uppercase font-sans">
                  Developer
                </span>
                <span className="px-4 py-2 border border-white/20 bg-black/40 backdrop-blur-md rounded-xl text-xs md:text-sm font-bold tracking-widest text-white/90 uppercase font-sans">
                  Creator
                </span>
                <span className="px-4 py-2 border border-white/20 bg-black/40 backdrop-blur-md rounded-xl text-xs md:text-sm font-bold tracking-widest text-white/90 uppercase font-sans">
                  Problem Solver
                </span>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

              <p className="text-xl md:text-3xl font-light leading-relaxed text-white/90 drop-shadow-lg font-sans italic tracking-tight">
                "Building with logic. Creating with imagination."
              </p>
              <p className="text-sm md:text-base text-white/60 font-sans mt-4 max-w-2xl">
                I engineer robust backends, design striking interfaces, and craft digital experiences that leave a lasting impact. Turning complex problems into elegant realities.
              </p>
            </div>
          </ChapterCard>

          {/* ======================= BOX 2: BEYOND TECHNOLOGY ======================= */}
          <ChapterCard title="Origins" index={1} fontClass="font-box-2" isExpanded={hoveredIndex === 1} onHover={() => setHoveredIndex(1)} bgImage="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1600&q=80">
            <div className="flex flex-col md:flex-row gap-12 items-center text-white h-full justify-center">
              <div className="flex-1 max-w-xl">
                <div className="inline-block px-3 py-1 bg-white text-black font-bold font-mono text-[10px] tracking-widest uppercase mb-6 rounded-sm">
                  Mission: Redefine Possible
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter uppercase text-white drop-shadow-xl">Origins</h2>
                <div className="pl-6 border-l-2 border-white/20 mb-8">
                  <p className="text-xl text-white/90 font-light leading-relaxed mb-4 font-sans italic">
                    "My journey started with curiosity and evolved into an obsession with the intersection of software, hardware, and raw creativity."
                  </p>
                </div>
                <p className="text-base text-white/70 font-medium leading-relaxed font-sans">
                  Technology is just the canvas. I am also someone who loves capturing moments through cinematic videography, exploring narratives through film, and finding the rhythm of code through music.
                </p>
              </div>
              <div className="flex-1 w-full max-w-md bg-black/50 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/10 shadow-2xl flex flex-col justify-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Film className="w-24 h-24" />
                </div>
                <h3 className="font-bold text-white/50 uppercase tracking-[0.2em] text-xs mb-2 font-sans">Core Pillars</h3>
                <ul className="space-y-6 relative z-10">
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg mt-1 border border-white/10"><Film className="w-5 h-5 text-white/80" /></div>
                    <div>
                      <h4 className="font-bold text-lg font-sans text-white/90">Cinematic Vision</h4>
                      <p className="text-xs text-white/50 font-sans mt-1">Framing the world through a creative lens.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg mt-1 border border-white/10"><Music className="w-5 h-5 text-white/80" /></div>
                    <div>
                      <h4 className="font-bold text-lg font-sans text-white/90">Audio & Rhythm</h4>
                      <p className="text-xs text-white/50 font-sans mt-1">Finding the pulse behind every great project.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg mt-1 border border-white/10"><PenTool className="w-5 h-5 text-white/80" /></div>
                    <div>
                      <h4 className="font-bold text-lg font-sans text-white/90">AI Workflows</h4>
                      <p className="text-xs text-white/50 font-sans mt-1">Automating the mundane to focus on magic.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </ChapterCard>

          {/* ======================= BOX 3: PROJECTS ======================= */}
          <ChapterCard title="Creation" index={2} fontClass="font-box-3" isExpanded={hoveredIndex === 2} onHover={() => setHoveredIndex(2)} bgImage="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1600&q=80">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white leading-none tracking-tighter uppercase drop-shadow-2xl">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
              {projects.map((project, idx) => (
                <div key={idx} className="bg-black/40 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/10 shadow-2xl flex flex-col h-full text-white">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                    {project.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-white/70 font-light leading-relaxed mb-4 flex-grow text-[13px]">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 rounded-full border border-white/20 text-[9px] font-mono text-white/80 bg-white/5 tracking-widest uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ChapterCard>

          {/* ======================= BOX 4: VIBE CODING ======================= */}
          <ChapterCard title="Vibe" index={3} fontClass="font-box-4" isExpanded={hoveredIndex === 3} onHover={() => setHoveredIndex(3)} bgImage="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1600&q=80">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-6 text-white/50 font-mono text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Flow State Active
              </div>
              <h2 className="text-6xl md:text-8xl font-black mb-8 text-white uppercase tracking-tighter leading-none drop-shadow-2xl">Vibe<br/>Coding</h2>
              <div className="inline-block p-10 border border-white/20 rounded-[2.5rem] bg-black/50 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight mb-4 drop-shadow-md">
                  "Good code is poetry. Great code is magic."
                </h3>
                
                <p className="text-lg text-white/70 font-light font-sans max-w-xl mx-auto mb-8">
                  For me, the best projects don't start with a spec sheet. They start with a single, dangerous question:
                </p>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                  <span className="font-black italic text-white text-3xl md:text-5xl tracking-tight drop-shadow-xl">"What if this existed?"</span>
                </div>
                
                <span className="text-white/50 text-[10px] tracking-[0.4em] block uppercase font-black">
                  ...Then I lock in and build it.
                </span>
              </div>
            </div>
          </ChapterCard>

          {/* ======================= BOX 5: CONNECT ======================= */}
          <ChapterCard title="Contact" index={4} fontClass="font-box-5" isExpanded={hoveredIndex === 4} onHover={() => setHoveredIndex(4)} bgImage="https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1600&q=80">
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl font-black mb-4 text-white tracking-tighter uppercase drop-shadow-2xl">Connect</h2>
              
              <div className="bg-black/50 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl w-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-sans tracking-tight">Let's build something extraordinary.</h3>
                <p className="text-sm md:text-base text-white/70 font-light mb-8 leading-relaxed font-sans max-w-2xl mx-auto">
                  Whether it's an IoT project, a modern web application, a cinematic video, or an AI experiment, I love creating experiences that leave a dent in the universe. I thrive at the crossroad of <span className="text-white font-bold">Technology</span>, <span className="text-white font-bold">Creativity</span>, and <span className="text-white font-bold">Storytelling</span>.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <a href="mailto:contact@example.com" className="flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-all font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] font-sans text-xs md:text-sm uppercase tracking-wider">
                    <Mail className="w-4 h-4" /> Start a Conversation
                  </a>
                  <div className="flex gap-3">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-lg text-white group">
                      <GithubIcon className="w-5 h-5 transition-colors" />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all shadow-lg text-white group">
                      <LinkedinIcon className="w-5 h-5 transition-colors" />
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 w-full font-sans">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-px bg-white/20 w-12"></div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-bold">The Core Philosophy</p>
                    <div className="h-px bg-white/20 w-12"></div>
                  </div>
                  <p className="text-lg md:text-xl italic text-white text-center tracking-tight font-medium drop-shadow-md">
                    "Dream in pixels. Execute in code."
                  </p>
                </div>
              </div>
            </div>
          </ChapterCard>

        </div>
      </div>
    </main>
  );
}
