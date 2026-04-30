"use client";

import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

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
}: {
  size: number;
  initialX: number;
  initialY: number;
  color: string;
}) {
  const duration = 6 + Math.random() * 6;
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
        y: [0, -15, 8, 0],
        x: [0, 10, -5, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Masked Word — word slides up from invisible mask
   ───────────────────────────────────────────── */
function MaskedWord({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="inline-flex overflow-hidden py-[0.1em] -my-[0.1em] pr-[0.1em] -mr-[0.1em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   AI Marketplace App Card (kept for future use)
   ───────────────────────────────────────────── */
const marketplaceApps = [
  {
    title: "1000 Books Scanner",
    description:
      "A mobile-first PWA that helps kids track their reading goals. Powered by Gemini 1.5 Vision AI for instant book-cover scanning, Google Books API for metadata, and real-time Firestore sync.",
    link: "https://1000-books.vercel.app",
    tags: ["Next.js", "Gemini Vision", "Firebase Lite"],
    gradient: "from-amber-200/40 to-orange-200/40",
    accent: "#F59E0B",
  },
  {
    title: "Ohio AI Agency",
    description:
      "A B2B platform for a specialized AI consultancy delivering custom autonomous agents — from customer service automation to algorithmic trading — for Ohio-based businesses.",
    link: "https://ohio-ai-agency.vercel.app",
    tags: ["Next.js", "Framer Motion", "B2B"],
    gradient: "from-blue-200/40 to-indigo-200/40",
    accent: "#6366F1",
  },
  {
    title: "Spokbee 4.0 Engine",
    description:
      "A dual-engine parametric geometry platform that translates natural language into interactive 3D interfaces. Built on WebGPU with LLM-driven AST generation.",
    link: "#",
    tags: ["WebGPU", "LLM AST", "Headless CAD"],
    gradient: "from-emerald-200/40 to-teal-200/40",
    accent: "#10B981",
    comingSoon: true,
  },
];

function AppCard({
  app,
  index,
}: {
  app: (typeof marketplaceApps)[number];
  index: number;
}) {
  return (
    <motion.a
      href={app.comingSoon ? undefined : app.link}
      target={app.comingSoon ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`group relative rounded-3xl p-8 flex flex-col gap-5 overflow-hidden ${
        app.comingSoon ? "cursor-default" : "cursor-pointer"
      }`}
      style={{
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        transition: { duration: 0.35, ease: "easeOut" },
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />
      <div className="relative flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{
            background: `${app.accent}18`,
            border: `1px solid ${app.accent}30`,
          }}
        >
          <Sparkles size={20} style={{ color: app.accent }} />
        </div>
        {app.comingSoon ? (
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full bg-black/5 text-[#999]">
            Coming Soon
          </span>
        ) : (
          <ExternalLink
            size={16}
            className="text-[#bbb] group-hover:text-[#666] transition-colors"
          />
        )}
      </div>
      <h3 className="relative font-display text-xl sm:text-2xl text-[#111] leading-tight">
        {app.title}
      </h3>
      <p className="relative text-sm text-[#666] font-light leading-relaxed">
        {app.description}
      </p>
      <div className="relative flex flex-wrap gap-2 mt-auto pt-2">
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-[0.15em] font-medium px-3 py-1.5 rounded-full"
            style={{
              background: `${app.accent}10`,
              color: app.accent,
              border: `1px solid ${app.accent}20`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
    </motion.a>
  );
}

/* ═════════════════════════════════════════════
   MAIN PAGE
   ═════════════════════════════════════════════ */
export default function Home() {
  const atmo = getAtmosphere(0.3);

  return (
    <main className="min-h-screen relative font-sans overflow-x-hidden selection:bg-black/10">
      {/* ── Dynamic Background ── */}
      <div
        className="fixed inset-0 -z-10"
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
        <FloatingOrb size={300} initialX={10} initialY={20} color={atmo.tl} />
        <FloatingOrb size={200} initialX={70} initialY={60} color={atmo.tr} />
        <FloatingOrb size={250} initialX={50} initialY={10} color={atmo.br} />
        <FloatingOrb size={180} initialX={85} initialY={80} color={atmo.bl} />
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-6 sm:px-12 py-24 sm:py-32 flex flex-col gap-40 relative z-10">

        {/* ═══ HERO — staggered editorial typography ═══ */}
        <section className="min-h-[90vh] flex flex-col justify-center gap-16">
          {/* Top label */}
          <motion.p
            className="text-[11px] uppercase tracking-[0.4em] text-[#999] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            girl4tech.com
          </motion.p>

          {/* Headline — staggered word reveal */}
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-6xl sm:text-8xl lg:text-[7rem] text-[#111] leading-[1.1] tracking-tight">
              <MaskedWord delay={0.3}>Exploring</MaskedWord>{" "}
              <MaskedWord delay={0.4}>what</MaskedWord>
            </h1>
            <h1 className="font-display text-6xl sm:text-8xl lg:text-[7rem] text-[#111] leading-[1.1] tracking-tight">
              <MaskedWord delay={0.5}>happens</MaskedWord>{" "}
              <MaskedWord delay={0.6}>when</MaskedWord>
            </h1>
            <h1 className="font-display italic font-light text-6xl sm:text-8xl lg:text-[7rem] text-[#111] leading-[1.1] tracking-tight">
              <MaskedWord delay={0.7}>machines</MaskedWord>{" "}
              <MaskedWord delay={0.8}>learn</MaskedWord>{" "}
              <MaskedWord delay={0.9}>to</MaskedWord>{" "}
              <MaskedWord delay={1.0}>help.</MaskedWord>
            </h1>
          </div>

          {/* Subtitle — offset to the right */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 sm:pl-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hidden sm:block w-16 h-px bg-[#ccc]" />
            <p className="text-lg sm:text-xl text-[#666] font-light tracking-tight">
              Hi, I&apos;m{" "}
              <span className="font-semibold text-[#333]">Karina</span>.
              Developer, founder, and mother exploring the edge of AI.
            </p>
          </motion.div>

          {/* Discipline pills */}
          <motion.div
            className="flex gap-3 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {["AI Assistants", "3D Web", "Generative Tools"].map((label) => (
              <span
                key={label}
                className="text-[10px] uppercase tracking-[0.25em] font-medium px-5 py-2.5 rounded-full
                  bg-white/20 backdrop-blur-xl border border-white/30 text-[#555]"
              >
                {label}
              </span>
            ))}
          </motion.div>
        </section>

        {/* ═══ MANIFESTO — editorial magazine spread ═══ */}
        <section className="flex flex-col gap-24 max-w-5xl mx-auto">
          {/* Opening quote */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
          >
            <span className="absolute -top-16 -left-4 text-[12rem] leading-none font-display text-black/[0.04] select-none pointer-events-none">
              &ldquo;
            </span>
            <div className="flex flex-col gap-8 pl-0 sm:pl-16">
              <motion.h2
                className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#111] leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Technology shouldn&apos;t feel
                <br />
                <span className="italic font-light">like a barrier.</span>
              </motion.h2>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-black/10 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#bbb] font-medium whitespace-nowrap">
              What I believe
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-black/10 to-transparent" />
          </motion.div>

          {/* Second statement — right-aligned for asymmetry */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-2xl text-right">
              <motion.h2
                className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#111] leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                AI can handle the busywork,
                <br />
                <span className="italic font-light">so we can focus on what matters.</span>
              </motion.h2>
            </div>
          </motion.div>

          {/* Thin line accent */}
          <motion.div
            className="w-24 h-px bg-black/10 mx-auto"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          {/* Third statement — centered, with closing quote */}
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#111] leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Building Spokbee — making
              <br />
              <span className="italic font-light">complex manufacturing simpler.</span>
            </motion.h2>
            <span className="absolute -bottom-12 right-0 sm:right-12 text-[12rem] leading-none font-display text-black/[0.04] select-none pointer-events-none rotate-180">
              &ldquo;
            </span>
          </motion.div>
        </section>

        {/* ═══ AI MARKETPLACE — temporarily hidden ═══ */}
        {/*
        <section className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <motion.p
              className="text-[11px] uppercase tracking-[0.35em] text-[#999] font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              The AI Marketplace
            </motion.p>
            <motion.h2
              className="font-display text-4xl sm:text-6xl text-[#111] leading-tight max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Generative apps.{" "}
              <span className="italic font-light">Shipped.</span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-[#777] font-light max-w-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A curated showcase of AI-powered products — from vision AI to
              autonomous agents to spatial compute engines.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketplaceApps.map((app, i) => (
              <AppCard key={app.title} app={app} index={i} />
            ))}
          </div>
        </section>
        */}

        {/* ═══ CAPABILITIES — editorial cards ═══ */}
        <section className="flex flex-col gap-12">
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
                title: "3D on the Web",
                sub: "Turning documents into interactive 3D models you can explore in a browser.",
                tag: "CORE",
              },
              {
                title: "Spatial Interfaces",
                sub: "Bringing industrial data into the physical world through mixed reality.",
                tag: "XR",
              },
              {
                title: "AI Assistants",
                sub: "Small, helpful agents that quietly handle the repetitive stuff.",
                tag: "AI",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="group relative rounded-3xl p-8 flex flex-col gap-4 cursor-default overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
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
            Let&apos;s make something{" "}
            <span className="italic font-light">together.</span>
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
            &copy; 2026 Karina C. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
