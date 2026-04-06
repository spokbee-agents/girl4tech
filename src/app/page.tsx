"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Activity, Zap, ArrowDown } from "lucide-react";

/* ───────────────────────── Constants ───────────────────────── */

const BOOT_LINES = [
  { text: "> Initializing girl4tech...", delay: 0 },
  { text: "> Loading spatial compute layer...", delay: 1200 },
  { text: "> Connecting to Spokbee Architect...", delay: 2600 },
  { text: "> Handshake complete. Session live.", delay: 4000 },
];

const AGENT_MESSAGES = [
  "Agent 0: Compiling GLB payload...",
  "Agent 1: Indexing CAD parameters...",
  "Agent 2: Negotiating render pipeline...",
  "Agent 3: Streaming spatial anchors...",
  "Agent 0: Deploying configurator shell...",
  "Agent 4: Validating mesh topology...",
  "Agent 1: Syncing material graph...",
  "Agent 2: Registering interaction zones...",
  "Agent 3: Optimizing draw calls — 12ms target...",
  "Agent 5: Encrypting telemetry payload...",
  "Agent 0: Pushing scene diff to edge...",
  "Agent 4: Resolving physics constraints...",
  "Agent 1: Compressing texture atlas...",
  "Agent 2: Flushing command buffer...",
  "Agent 6: Heartbeat OK — latency 4ms",
  "Agent 3: Rebuilding BVH acceleration structure...",
  "Agent 5: Writing checkpoint to durable store...",
  "Agent 0: Hot-swapping shader variant...",
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ───────────────────────── Section 1: Anti-Portfolio Hero ───────────────────────── */

function HeroSection() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), BOOT_LINES[i].delay)
    );
    const doneTimer = setTimeout(
      () => setBootComplete(true),
      BOOT_LINES[BOOT_LINES.length - 1].delay + 800
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-machine/5 blur-[160px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="relative w-full max-w-2xl"
      >
        {/* Terminal chrome */}
        <div className="rounded-2xl border border-white/[0.06] bg-plate/70 backdrop-blur-[24px] shadow-2xl overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs tracking-wider text-zinc-500 uppercase">
              girl4tech — session
            </span>
          </div>

          {/* Terminal body */}
          <div className="px-5 py-6 font-mono text-sm leading-7 min-h-[220px]">
            <AnimatePresence>
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-machine">{line.text}</span>
                  {i === visibleLines - 1 && !bootComplete && (
                    <span className="text-signal">
                      {cursorVisible ? "_" : "\u00A0"}
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {bootComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mt-4 flex items-center gap-3"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-machine opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-machine" />
                </span>
                <span className="text-machine font-medium tracking-wide">
                  LIVE
                </span>
                <span className="text-zinc-500">
                  — Spokbee Architect connected
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tagline beneath terminal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          girl4tech<span className="text-signal">.</span>com
        </h1>
        <p className="mt-3 font-sans text-lg text-zinc-500 max-w-md mx-auto">
          Industrial Spatial Computing &mdash; by Karina C
        </p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 0.4 : 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-1"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowDown className="h-4 w-4 text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Section 2: Manifesto ───────────────────────── */

function ManifestoSection() {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <Zap className="h-4 w-4 text-signal" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-signal">
              Manifesto
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            The End of Software
          </h2>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-zinc-400">
            <p>
              Static UIs are dead. The era of hand-coded screens, pixel-perfect
              mockups shipped once and never touched again&mdash;it&rsquo;s over.
              Interfaces should be{" "}
              <span className="text-white font-medium">
                generated dynamically
              </span>
              , assembled in real-time by autonomous agents that understand
              context, intent, and spatial constraints.
            </p>
            <p>
              We are building the{" "}
              <span className="text-signal font-semibold">
                Configurator Factory
              </span>
              &mdash;a system where every product experience is a living,
              breathing computation. Not a page. Not an app. A{" "}
              <span className="text-white font-medium">spatial program</span>{" "}
              that configures itself to the viewer, the device, and the moment.
            </p>
            <p>
              The old web was documents. The new web is{" "}
              <span className="text-machine font-medium">
                orchestrated intelligence
              </span>
              . Background agents compile 3D payloads, negotiate render
              pipelines, and stream interactive experiences at the edge. No
              templates. No themes. Just raw computation shaped into form.
            </p>
          </div>

          {/* Divider line */}
          <div className="mt-12 h-px w-full bg-gradient-to-r from-signal/40 via-white/5 to-transparent" />

          <p className="mt-8 font-mono text-sm text-zinc-600 tracking-wide">
            &ldquo;Software is the scaffolding. Intelligence is the
            architecture.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Section 3: Swarm Telemetry ───────────────────────── */

function SwarmTelemetrySection() {
  const feedRef = useRef<HTMLDivElement>(null);
  const [feed, setFeed] = useState<{ text: string; ts: string }[]>([]);

  useEffect(() => {
    const initial = AGENT_MESSAGES.slice(0, 5).map((text, i) => ({
      text,
      ts: fakeTimestamp(i),
    }));
    setFeed(initial);

    let idx = 5;
    const id = setInterval(() => {
      const msg = AGENT_MESSAGES[idx % AGENT_MESSAGES.length];
      idx++;
      setFeed((prev) => [
        ...prev.slice(-30),
        { text: msg, ts: fakeTimestamp(idx) },
      ]);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [feed]);

  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <Activity className="h-4 w-4 text-machine" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-machine">
              Swarm Telemetry
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            The Glass Box
          </h2>
          <p className="mt-4 text-zinc-500 max-w-lg">
            Real-time feed from background agents orchestrating the spatial
            compute layer.
          </p>

          {/* Glass card */}
          <div
            className="mt-10 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(20, 20, 24, 0.7)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
            }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-machine" />
                <span className="font-mono text-xs tracking-wider text-zinc-500 uppercase">
                  Agent Swarm
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-machine opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-machine" />
                </span>
                <span className="font-mono text-[10px] text-machine/80 uppercase tracking-wider">
                  streaming
                </span>
              </div>
            </div>

            {/* Feed */}
            <div
              ref={feedRef}
              className="h-[320px] overflow-y-auto scroll-smooth px-5 py-4 space-y-1"
            >
              <AnimatePresence initial={false}>
                {feed.map((entry, i) => (
                  <motion.div
                    key={`${entry.ts}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-xs leading-6 flex gap-3 group"
                  >
                    <span className="text-zinc-700 shrink-0 tabular-nums">
                      {entry.ts}
                    </span>
                    <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {entry.text}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Utilities ───────────────────────── */

function fakeTimestamp(offset: number): string {
  const h = String(12 + (Math.floor(offset / 60) % 12)).padStart(2, "0");
  const m = String((offset * 3) % 60).padStart(2, "0");
  const s = String((offset * 7) % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/* ───────────────────────── Page ───────────────────────── */

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <HeroSection />
      <ManifestoSection />
      <SwarmTelemetrySection />

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <span className="font-mono text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} girl4tech — Karina C
          </span>
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-zinc-700" />
            <span className="font-mono text-[10px] text-zinc-700 uppercase tracking-wider">
              Spokbee 4.0
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
