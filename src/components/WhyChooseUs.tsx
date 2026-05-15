"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Users, DollarSign, FileText, Globe, Star } from "lucide-react";
import content from "@/content.json";

const { whyChooseUs: w } = content;

const iconMap: Record<string, React.ElementType> = { Rocket, Users, DollarSign, FileText, Globe, Star };

const accents = [
  { color: "#2563EB", bg: "rgba(37,99,235,0.07)", border: "rgba(37,99,235,0.16)", icon: "rgba(37,99,235,0.12)" },
  { color: "#7c3aed", bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.16)", icon: "rgba(124,58,237,0.12)" },
  { color: "#059669", bg: "rgba(5,150,105,0.07)", border: "rgba(5,150,105,0.16)", icon: "rgba(5,150,105,0.12)" },
  { color: "#d97706", bg: "rgba(217,119,6,0.07)", border: "rgba(217,119,6,0.16)", icon: "rgba(217,119,6,0.12)" },
  { color: "#db2777", bg: "rgba(219,39,119,0.07)", border: "rgba(219,39,119,0.16)", icon: "rgba(219,39,119,0.12)" },
  { color: "#0891b2", bg: "rgba(8,145,178,0.07)", border: "rgba(8,145,178,0.16)", icon: "rgba(8,145,178,0.12)" },
];

const INDEX_LABELS = ["01", "02", "03", "04", "05", "06"];

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ background: "var(--bg-section, #fff)" }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border, #e5e7eb)" }} />

      {/* Soft radial glow centered */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* Two-column header: label left, heading + sub right */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8" style={{ background: "var(--badge-color, #7c3aed)" }} />
              <span
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{ color: "var(--badge-color, #7c3aed)" }}
              >
                {w.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight"
              style={{
                color: "var(--text-primary, #111827)",
                fontFamily: "'DM Serif Display', Georgia, serif",
              }}
            >
              {w.heading}{" "}
              <span className="gradient-text">{w.headingAccent}</span>
            </motion.h2>
          </div>

          {/* Decorative stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex gap-8 lg:gap-10 shrink-0"
          >
            {[["200+", "Projects"], ["98%", "Satisfaction"], ["12+", "Years"]].map(([num, label]) => (
              <div key={label} className="text-center lg:text-left">
                <div
                  className="text-2xl sm:text-3xl font-black tracking-tight leading-none mb-1"
                  style={{ color: "var(--text-primary, #111827)", fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {num}
                </div>
                <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted, #9ca3af)" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {w.reasons.map((r, i) => {
            const Icon = iconMap[r.icon] ?? Star;
            const accent = accents[i % accents.length];

            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-7 rounded-2xl border overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: "var(--bg-card, #fff)",
                  borderColor: "var(--border, #e5e7eb)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = accent.border;
                  el.style.boxShadow = `0 12px 40px ${accent.bg}, 0 0 0 1px ${accent.border}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border, #e5e7eb)";
                  el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                }}
              >
                {/* Hover radial bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${accent.bg} 0%, transparent 65%)` }}
                />

                {/* Index label */}
                <div className="relative flex items-center justify-between mb-6">
                  <span
                    className="font-mono text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded"
                    style={{ color: accent.color, background: accent.icon }}
                  >
                    {INDEX_LABELS[i]}
                  </span>
                  {/* Subtle connecting line decoration */}
                  <div className="h-px flex-1 mx-3 opacity-30" style={{ background: accent.color }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent.color, opacity: 0.4 }} />
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: accent.icon, border: `1px solid ${accent.border}` }}
                >
                  <Icon size={22} style={{ color: accent.color }} />
                </div>

                {/* Text */}
                <h3
                  className="text-[15px] font-bold tracking-tight mb-2.5 leading-snug"
                  style={{
                    color: "var(--text-primary, #111827)",
                    fontFamily: "'DM Serif Display', Georgia, serif",
                  }}
                >
                  {r.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--text-muted, #6b7280)" }}>
                  {r.desc}
                </p>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-7 right-7 h-[2px] rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: accent.color, opacity: 0.4 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}