"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Box, Cpu } from "lucide-react";

export default function Home() {
  const cards = [
    {
      title: "Generative Configuration",
      description: "Translating static catalogs into dynamic mathematical payloads. From PDF to parametric 3D instantly.",
      icon: <Box strokeWidth={1.5} className="w-5 h-5 text-[#666]" />,
    },
    {
      title: "Spatial Computing",
      description: "Rendering high-fidelity industrial logic directly to the glass, bypassing legacy monolithic web clients.",
      icon: <Layers strokeWidth={1.5} className="w-5 h-5 text-[#666]" />,
    },
    {
      title: "Agentic Engineering",
      description: "Orchestrating swarms of headless intelligence to automate the architecture of the physical world.",
      icon: <Cpu strokeWidth={1.5} className="w-5 h-5 text-[#666]" />,
    },
  ];

  return (
    <main className="min-h-screen relative font-sans overflow-x-hidden selection:bg-black/10">
      {/* Background gradients managed via globals.css */}
      
      <div className="mx-auto max-w-5xl px-6 sm:px-12 py-32 flex flex-col gap-40 relative z-10">
        
        {/* Section 1: The "Breathe" Hero */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-[#111] leading-[1.1] tracking-tight max-w-4xl mx-auto">
              Technology should feel like <span className="italic font-light">magic</span>,<br/> not mechanics.
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex items-center gap-4 bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full px-6 py-3"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden relative shadow-inner bg-gradient-to-tr from-orange-200 to-emerald-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-700/60" />
            </div>
            <p className="text-[15px] text-[#444] font-medium tracking-tight">
              I&apos;m <span className="text-[#111] font-semibold">Karina C</span>. I build generative infrastructure for the physical world.
            </p>
          </motion.div>
        </section>

        {/* Section 2: The Organic Manifesto */}
        <section className="flex flex-col gap-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="font-display text-3xl sm:text-4xl text-[#111] mb-8 leading-snug">
              Software is an ephemeral service. 
            </h2>
            <div className="flex flex-col gap-6 text-[#555] text-lg sm:text-xl leading-relaxed font-light">
              <p>
                We have spent a decade building rigid, static dropdown menus and monolithic databases to map reality. But reality isn't static. It is parametric.
              </p>
              <p>
                Interfaces should not be hard-coded; they should generate themselves to solve human problems in real-time. I build systems where raw language and raw geometry meet—where the interface is completely invisible until the exact moment you need it.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 3: Floating Work Showcase */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              animate={{ 
                y: [0, -10, 0], 
              }}
              className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col gap-6"
              style={{
                transition: "transform 4s ease-in-out infinite",
                animationDelay: `${i * 0.5}s`
              }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/60 shadow-sm border border-white/80 flex items-center justify-center">
                {card.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[#222] text-lg mb-3 tracking-tight">{card.title}</h3>
                <p className="text-[#666] leading-relaxed text-sm">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </section>
        
        {/* Footer */}
        <footer className="pt-32 pb-12 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-black/5 text-sm text-[#888]">
          <p className="font-display italic text-lg text-[#444]">girl4tech</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#111] transition-colors">Philosophy</a>
            <a href="#" className="hover:text-[#111] transition-colors">Spokbee Engine</a>
            <a href="#" className="hover:text-[#111] transition-colors">Contact</a>
          </div>
        </footer>

      </div>
    </main>
  );
}
