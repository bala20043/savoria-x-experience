import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2400&q=80",
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const headline = ["WHERE", "FLAVOR", "MEETS", "ART"];

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Background slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 animate-ken-burns bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[idx]})` }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
        <div className="aurora" />
      </div>

      {/* Floating glow orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[var(--color-gold)]/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[var(--color-purple-accent)]/15 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full glass px-5 py-2"
        >
          <span className="text-[var(--color-gold)]">✦</span>
          <span className="font-sans-ui text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/90">
            Est. 2012 — Chennai, India
          </span>
          <span className="text-[var(--color-gold)]">✦</span>
        </motion.div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.95] tracking-tight max-w-6xl">
          {headline.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.6 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-block mr-4 md:mr-6 ${i === 1 || i === 3 ? "text-gradient-gold glow-gold" : "text-cream"}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-10 max-w-2xl font-serif-elegant text-lg md:text-2xl italic text-cream/80"
        >
          An unforgettable dining experience crafted for every occasion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <a href="#menu" className="btn-luxury rounded-full px-10 py-4 text-sm">Explore Menu</a>
          <a href="#reserve" className="btn-outline-gold rounded-full px-10 py-4 text-sm">Book a Table</a>
        </motion.div>

        {/* Open badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0 flex items-center gap-3 glass rounded-full px-5 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-sans-ui text-[10px] uppercase tracking-[0.3em] text-cream/80">Open Now · Until 11 PM</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-sans-ui text-[10px] uppercase tracking-[0.3em] text-cream/60">Scroll</span>
            <div className="h-10 w-[1px] bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
