"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Database, Workflow, Cpu, Code2, Globe } from "lucide-react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Initializing girl4tech... \nConnecting to Spokbee Architect... \nAccess Granted.";
  
  useEffect(() => {
    let current = "";
    let i = 0;
    const interval = setInterval(() => {
      current += fullText[i];
      setTypedText(current);
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    { id: 1, action: "Compiling GLB payload...", status: "OK" },
    { id: 2, action: "Updating pricing schema...", status: "SYNCED" },
    { id: 3, action: "Mapping STEP geometry to React...", status: "ACTIVE" },
    { id: 4, action: "Optimizing WebGPU shaders...", status: "OK" }
  ];

  return (
    <main className="min-h-screen bg-[#09090B] text-[#A1A1AA] font-mono selection:bg-[#FF6B00]/30 selection:text-white relative overflow-hidden flex flex-col items-center">
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Glowing Ambient Sphere */}
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#FF6B00] rounded-full blur-[200px] opacity-10 z-0 pointer-events-none" />

      <div className="z-10 w-full max-w-6xl px-6 py-24 flex flex-col gap-32">
        
        {/* Section 1: The Anti-Portfolio */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#00FF88] animate-pulse shadow-[0_0_12px_rgba(0,255,136,0.6)]" />
            <span className="text-[#00FF88] text-sm uppercase tracking-widest font-mono">Live Session</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tight leading-tight">
            girl4tech<span className="text-[#FF6B00]">.</span>
          </h1>
          
          <div className="bg-[#141418] border border-white/10 rounded-2xl p-8 shadow-2xl max-w-2xl font-mono text-sm leading-relaxed">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-[#00FF88] whitespace-pre-line">
              {typedText}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-[#FF6B00] ml-1 align-middle"
              />
            </div>
            {typedText.length === fullText.length && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-white text-base font-sans"
              >
                Hi. I&apos;m <span className="text-[#FF6B00] font-semibold">Karina C</span>. I orchestrate machine labor and build generative infrastructure for the industrial web.
              </motion.div>
            )}
          </div>
        </section>

        {/* Section 2: The End of Software Manifesto */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Static UIs <br /> Are Dead.
            </h2>
            <div className="flex flex-col gap-6 text-lg font-sans text-zinc-400">
              <p>
                Software is an ephemeral service. If you are building a million dropdown menus and static databases, you are building legacy technology.
              </p>
              <p>
                I build the <strong>Configurator Factory</strong>. Systems that take natural language, process it through headless geometry kernels, and output live, photorealistic 3D commerce instantly.
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF6B00] text-white font-sans font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:bg-[#FF8A33] transition-colors self-start flex items-center gap-3"
            >
              <Workflow size={20} />
              Explore The Architecture
            </motion.button>
          </div>
          
          {/* Swarm Telemetry Glass Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#141418]/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent opacity-50" />
            <h3 className="text-white font-display text-xl font-bold mb-8 flex items-center gap-3">
              <Cpu size={24} className="text-[#00FF88]" />
              Live Swarm Telemetry
            </h3>
            
            <div className="flex flex-col gap-4 font-mono text-sm">
              {agents.map((agent, i) => (
                <motion.div 
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 + 2 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <span className="text-zinc-300">{agent.action}</span>
                  <span className="text-[#00FF88] text-xs px-2 py-1 bg-[#00FF88]/10 rounded-md">
                    {agent.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Footer */}
        <footer className="border-t border-white/10 pt-12 pb-24 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display font-bold text-white text-2xl">girl4tech.</div>
          <div className="flex gap-6 text-zinc-500 font-sans">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Globe size={16} /> Architecture</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Database size={16} /> Infrastructure</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Code2 size={16} /> GitHub</a>
          </div>
        </footer>

      </div>
    </main>
  );
}
