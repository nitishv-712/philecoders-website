"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Users, DollarSign, FileText, Globe, Star } from "lucide-react";
import content from "@/content.json";

const { whyChooseUs: w } = content;

const iconMap: Record<string, React.ElementType> = { Rocket, Users, DollarSign, FileText, Globe, Star };

const cardAccents = [
  { gradient: "linear-gradient(135deg, #0170f4, #4494f6)", glow: "rgba(1,112,244,0.15)" },
  { gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)", glow: "rgba(124,58,237,0.15)" },
  { gradient: "linear-gradient(135deg, #059669, #34d399)", glow: "rgba(5,150,105,0.15)" },
  { gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)", glow: "rgba(245,158,11,0.15)" },
  { gradient: "linear-gradient(135deg, #f43f5e, #fb7185)", glow: "rgba(244,63,94,0.15)" },
  { gradient: "linear-gradient(135deg, #0170f4, #7c3aed)", glow: "rgba(1,112,244,0.15)" },
];

export default function WhyChooseUs() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--bg-section)" }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.2)", color: "var(--badge-color)" }}
          >
            {w.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {w.heading} <span className="gradient-text">{w.headingAccent}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {w.reasons.map((r, i) => {
            const Icon = iconMap[r.icon] ?? Star;
            const accent = cardAccents[i % cardAccents.length];
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${accent.glow}`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)"; }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-md"
                  style={{ background: accent.gradient }}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
