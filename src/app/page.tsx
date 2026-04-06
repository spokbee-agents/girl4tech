"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/* ─────────────────────────────────────────────
   Atmosphere presets — warm peach → cool ethereal
   ───────────────────────────────────────────── */
function lerpColor(a: string, b: string, t: number) {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bv = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r}, ${g}, ${bv})`;
}

function getAtmosphere(t: number) {
  // t: 0 = warm peach, 1 = cool ethereal blue
  return {
    tl: lerpColor("#FDE8D0", "#D0E8FD", t),
    tr: lerpColor("#FDDCD0", "#D0DCFD", t),
    br: lerpColor("#FDF0D0", "#D0F0FD", t),
    bl: lerpColor("#FDD0E0", "#D0D0FD", t),
  };
}

/* ─────────────────────────────────────────────
   Floating Orb — decorative element
   ───────────────────────────────────────────── */
function FloatingOrb({
  size,
  initialX,
  initialY,
  color,
  motionSpeed,
}: {
  size: number;
  initialX: number;
  initialY: number;
  color: string;
  motionSpeed: number;
}) {
  const duration = 6 + Math.random() * 6;
  const scaledDuration = duration / Math.max(motionSpeed, 0.1);
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
        background: color,
        filter: "blur(60px)",
        opacity: 0.5,
      }}
      animate={{
        y: [0, -30 * motionSpeed, 15 * motionSpeed, 0],
        x: [0, 20 * motionSpeed, -10 * motionSpeed, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: scaledDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Geometric Core — CSS abstract shape cluster
   ───────────────────────────────────────────── */
function SpatialCore({ blur }: { blur: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central ring */}
      <motion.div
        className="absolute w-32 h-32 rounded-full border-2 border-white/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ backdropFilter: `blur(${blur * 0.5}px)` }}
      />
      {/* Inner diamond */}
      <motion.div
        className="absolute w-16 h-16 bg-white/20 border border-white/40"
        style={{ rotate: 45, backdropFilter: `blur(${blur}px)` }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Outer orbit ring */}
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-white/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      {/* Orbiting dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-white/60 shadow-lg"
        animate={{
          x: [0, 80, 0, -80, 0],
          y: [-80, 0, 80, 0, -80],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Small accent shapes */}
      <motion.div
        className="absolute w-6 h-6 bg-white/10 rounded-sm border border-white/20"
        style={{ top: "20%", right: "25%" }}
        animate={{ rotate: [0, 90, 180, 270, 360], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white/15 border border-white/25"
        style={{ bottom: "25%", left: "30%" }}
        animate={{ scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Label */}
      <span className="absolute bottom-4 text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
        Spatial Compute Core
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3D Glass Card — mouse-tracking parallax
   ───────────────────────────────────────────── */
function GlassCard3D({ blur }: { blur: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div style={{ perspective: 800 }} className="w-full max-w-2xl mx-auto">
      <motion.div
        className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-crosshair"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <SpatialCore blur={blur} />
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Configurator Slider Component
   ───────────────────────────────────────────── */
function ConfigSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#555] font-medium">
          {label}
        </span>
        <span className="text-[11px] tabular-nums text-[#999] font-mono">
          {(value * 100).toFixed(0)}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 appearance-none rounded-full bg-black/10 outline-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black/10
          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:hover:scale-125"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stat Pill — animated counters in hero
   ───────────────────────────────────────────── */
function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <span className="text-2xl sm:text-3xl font-display font-semibold text-[#111]">
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#666]">
        {label}
      </span>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════
   MAIN PAGE
   ═════════════════════════════════════════════ */
export default function Home() {
  // Configurator state
  const [atmosphere, setAtmosphere] = useState(0.3);
  const [diffusion, setDiffusion] = useState(0.5);
  const [motionSpeed, setMotionSpeed] = useState(0.5);
  const [panelOpen, setPanelOpen] = useState(false);

  // Derived values
  const blur = 8 + diffusion * 32; // 8px to 40px
  const atmo = getAtmosphere(atmosphere);

  // Keyboard shortcut to toggle panel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "c" && !e.metaKey && !e.ctrlKey) {
        setPanelOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <main className="min-h-screen relative font-sans overflow-x-hidden selection:bg-black/10">
      {/* ── Dynamic Background ── */}
      <div
        className="fixed inset-0 -z-10 transition-colors duration-700"
        style={{
          background: `
            radial-gradient(at 0% 0%, ${atmo.tl} 0%, transparent 50%),
            radial-gradient(at 100% 0%, ${atmo.tr} 0%, transparent 50%),
            radial-gradient(at 100% 100%, ${atmo.br} 0%, transparent 50%),
            radial-gradient(at 0% 100%, ${atmo.bl} 0%, transparent 50%),
            #FAFAFA
          `,
        }}
      />

      {/* ── Floating Orbs ── */}
      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        <FloatingOrb size={300} initialX={10} initialY={20} color={atmo.tl} motionSpeed={motionSpeed} />
        <FloatingOrb size={200} initialX={70} initialY={60} color={atmo.tr} motionSpeed={motionSpeed} />
        <FloatingOrb size={250} initialX={50} initialY={10} color={atmo.br} motionSpeed={motionSpeed} />
        <FloatingOrb size={180} initialX={85} initialY={80} color={atmo.bl} motionSpeed={motionSpeed} />
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-6 sm:px-12 py-24 sm:py-32 flex flex-col gap-32 relative z-10">
        {/* ═══ HERO ═══ */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center gap-10">
          <motion.p
            className="text-[11px] uppercase tracking-[0.35em] text-[#999] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            girl4tech.com
          </motion.p>

          <motion.h1
            className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] text-[#111] leading-[1.05] tracking-tight max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            I don&apos;t write software.
            <br />
            <span className="italic font-light">I orchestrate reality.</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-[#666] font-light tracking-tight max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="font-semibold text-[#333]">Karina C.</span>{" "}
            Architect of the generative web.
          </motion.p>

          {/* Stats row */}
          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
            <StatPill value="3D" label="Configurators" />
            <StatPill value="AI" label="Orchestration" />
            <StatPill value="XR" label="Spatial" />
          </div>

          {/* 3D Glass Card */}
          <div className="w-full mt-8">
            <GlassCard3D blur={blur} />
          </div>
        </section>

        {/* ═══ MANIFESTO (punchy, no paragraphs) ═══ */}
        <section className="flex flex-col gap-6 max-w-4xl mx-auto text-center">
          {[
            "Static interfaces are dead.",
            "The future is parametric, generative, alive.",
            "I build the systems that make it breathe.",
          ].map((line, i) => (
            <motion.h2
              key={i}
              className="font-display text-3xl sm:text-5xl text-[#111] leading-snug"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            >
              {line}
            </motion.h2>
          ))}
        </section>

        {/* ═══ CAPABILITIES — horizontal scroll cards ═══ */}
        <section className="flex flex-col gap-8">
          <motion.p
            className="text-[11px] uppercase tracking-[0.3em] text-[#999] font-medium text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What I Build
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                title: "Generative Configuration",
                sub: "PDF → parametric 3D. Instantly.",
                tag: "CORE",
              },
              {
                title: "Spatial Computing",
                sub: "Industrial logic rendered to glass.",
                tag: "XR",
              },
              {
                title: "Agentic Engineering",
                sub: "Swarms of intelligence. Automated.",
                tag: "AI",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="group relative rounded-3xl p-8 flex flex-col gap-4 cursor-default overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: `blur(${blur}px)`,
                  WebkitBackdropFilter: `blur(${blur}px)`,
                  border: "1px solid rgba(255,255,255,0.35)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#aaa] font-semibold">
                  {card.tag}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-[#111] leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-[#666] font-light">{card.sub}</p>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="flex flex-col items-center gap-6 py-20">
          <motion.h2
            className="font-display text-4xl sm:text-6xl text-[#111] text-center leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Let&apos;s build something{" "}
            <span className="italic font-light">impossible.</span>
          </motion.h2>
          <motion.a
            href="mailto:hello@girl4tech.com"
            className="px-8 py-3.5 rounded-full text-sm font-medium tracking-wide text-white
              bg-[#111] hover:bg-[#333] transition-colors shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in Touch
          </motion.a>
        </section>

        {/* ── Footer ── */}
        <footer className="pt-16 pb-12 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-black/5 text-sm text-[#888]">
          <p className="font-display italic text-lg text-[#444]">girl4tech</p>
          <p className="text-[11px] tracking-wider text-[#bbb]">
            Press <kbd className="px-1.5 py-0.5 rounded bg-black/5 text-[#666] font-mono text-[10px]">C</kbd> to configure this reality
          </p>
        </footer>
      </div>

      {/* ═══════════════════════════════════════
           REALITY CONFIGURATOR — floating panel
         ═══════════════════════════════════════ */}

      {/* Toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl flex items-center justify-center
          text-[#555] hover:text-[#111] transition-colors"
        style={{
          background: "rgba(255,255,255,0.3)",
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
        onClick={() => setPanelOpen(!panelOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Reality Configurator"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            className="fixed bottom-20 right-6 z-50 w-72 rounded-3xl p-6 flex flex-col gap-5"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: `blur(${Math.max(blur, 24)}px)`,
              WebkitBackdropFilter: `blur(${Math.max(blur, 24)}px)`,
              border: "1px solid rgba(255,255,255,0.45)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.08)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#777] font-semibold">
                Reality Configurator
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <ConfigSlider
              label="Atmosphere"
              value={atmosphere}
              onChange={setAtmosphere}
            />
            <ConfigSlider
              label="Diffusion"
              value={diffusion}
              onChange={setDiffusion}
            />
            <ConfigSlider
              label="Motion"
              value={motionSpeed}
              onChange={setMotionSpeed}
            />

            <p className="text-[10px] text-[#aaa] text-center mt-1">
              This site is a live configurator.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
