"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Smartphone, Palette, Database, Shield, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import content from "@/content.json";

const { services: s } = content;

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Palette, Database, Shield, Zap,
};

const serviceAccents: Record<string, { gradient: string; color: string; tagBg: string; tagColor: string; glow: string }> = {
  "web-development":   { gradient: "linear-gradient(135deg, #0170f4, #4494f6)", color: "#0170f4", tagBg: "rgba(1,112,244,0.08)",  tagColor: "#0170f4", glow: "rgba(1,112,244,0.12)" },
  "mobile-apps":       { gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#7c3aed", tagBg: "rgba(124,58,237,0.08)", tagColor: "#7c3aed", glow: "rgba(124,58,237,0.12)" },
  "ui-ux-design":      { gradient: "linear-gradient(135deg, #f43f5e, #fb7185)", color: "#f43f5e", tagBg: "rgba(244,63,94,0.08)",  tagColor: "#f43f5e", glow: "rgba(244,63,94,0.12)" },
  "backend-apis":      { gradient: "linear-gradient(135deg, #059669, #34d399)", color: "#059669", tagBg: "rgba(5,150,105,0.08)",  tagColor: "#059669", glow: "rgba(5,150,105,0.12)" },
  "cloud-devops":      { gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)", color: "#d97706", tagBg: "rgba(245,158,11,0.08)", tagColor: "#d97706", glow: "rgba(245,158,11,0.12)" },
  "performance-tuning":{ gradient: "linear-gradient(135deg, #0170f4, #7c3aed)", color: "#7c3aed", tagBg: "rgba(124,58,237,0.08)", tagColor: "#6d28d9", glow: "rgba(124,58,237,0.12)" },
};

function ServiceCard({ item, index }: { item: typeof s.items[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const Icon   = iconMap[item.icon] ?? Zap;
  const accent = serviceAccents[item.slug] ?? serviceAccents["web-development"];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget, rect = el.getBoundingClientRect();
    const rx = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    const ry = ((e.clientX - rect.left) / rect.width  - 0.5) * -10;
    el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 rounded-2xl border cursor-default overflow-hidden"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        willChange: "transform",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 48px ${accent.glow}`; }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
        style={{ background: "var(--card-hover)" }} />

      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shadow-lg"
        style={{ background: accent.gradient }}>
        <Icon size={20} className="text-white" />
      </div>

      <h3 className="text-base font-bold mb-2.5" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>{item.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {item.tags.map((tag) => (
          <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full"
            style={{ background: accent.tagBg, color: accent.tagColor }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: accent.color }}>
        <Link href={`/services/${item.slug}`} className="flex items-center gap-1">
          Learn more <ArrowRight size={13} className="ml-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "var(--bg-section)" }}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.2)", color: "var(--badge-color)" }}
          >
            <Zap size={13} /> {s.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {s.heading} <span className="gradient-text">{s.headingAccent}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {s.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {s.items.map((item, i) => <ServiceCard key={item.title} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}
