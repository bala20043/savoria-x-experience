import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

const stats = [
  { v: 12, suf: "+", label: "Years of Excellence" },
  { v: 85, suf: "", label: "Signature Dishes" },
  { v: 4.9, suf: "★", label: "Guest Rating", dec: 1 },
  { v: 50, suf: "K+", label: "Happy Guests" },
];

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-gold)]/[0.03] to-transparent" />
      <div className="mx-auto max-w-6xl px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-gold)]/20 rounded-2xl overflow-hidden glass">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-background/60 px-6 py-10 text-center group hover:bg-[var(--color-gold)]/5 transition-colors"
            >
              <div className="font-display text-4xl md:text-6xl text-gradient-gold glow-gold">
                {inView && <CountUp end={s.v} duration={2.4} decimals={s.dec ?? 0} />}
                <span>{s.suf}</span>
              </div>
              <div className="mt-3 font-sans-ui text-[10px] md:text-xs uppercase tracking-[0.25em] text-cream/70">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
